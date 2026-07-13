/**
 * TerraGuardian Chainlink CRE workflow.
 *
 * Fetches public-health, climate, and carbon-intensity data, evaluates the
 * configured publication rules, and submits qualifying reports to the
 * configured Ethereum Sepolia receiver address.
 *
 * Groth16 proof generation and zkVerify submission are intentionally separate
 * and run from /zkverify. This workflow does not generate or verify proofs.
 */
import {
  cre,
  bytesToHex,
  consensusIdenticalAggregation,
  EVMClient,
  getNetwork,
  hexToBase64,
  ok,
  text,
  TxStatus,
  type CronPayload,
  type HTTPSendRequester,
  type Runtime,
} from "@chainlink/cre-sdk";
import { Buffer } from "buffer";
import { encodeAbiParameters, parseAbiParameters } from "viem";
import { z } from "zod";
import {
  calculateClimateRisk,
  calculateEsgRisk,
  evaluateDecisionGate,
  type RiskAssessment,
} from "../shared/decisionPolicy";

const CLIMATE_CITY = "London";
const CRE_REPORT_SOURCE =
  "CDC Open Data + Open-Meteo + Carbon Intensity + Gemini";

const scoreStringSchema = z.string().refine(
  (value) => {
    const score = Number(value);
    return Number.isFinite(score) && score >= 0 && score <= 100;
  },
  { message: "alertThreshold must be a number between 0 and 100" },
);

export const configSchema = z.object({
  schedule: z.string().min(1),
  chainSelectorName: z.string().min(1),
  cdcApiUrl: z.string().url(),
  openMeteoApiUrl: z.string().url(),
  carbonIntensityApiUrl: z.string().url(),
  geminiApiUrl: z.string().url(),
  alertThreshold: scoreStringSchema,
  healthAlertRegistryAddress: z
    .string()
    .regex(/^0x[0-9a-fA-F]{40}$/, "Invalid registry address"),
  gasLimit: z.string().regex(/^\d+$/, "gasLimit must be an integer string"),
});

type Config = z.infer<typeof configSchema>;

const cdcResponseSchema = z.array(z.record(z.unknown()));

const climateResponseSchema = z.object({
  current: z.object({
    temperature_2m: z.number().finite(),
    relative_humidity_2m: z.number().finite(),
    wind_speed_10m: z.number().finite(),
    uv_index: z.number().finite(),
  }),
});

const carbonResponseSchema = z.object({
  data: z
    .array(
      z.object({
        from: z.string().optional(),
        to: z.string().optional(),
        intensity: z.object({
          actual: z.number().finite().nullable().optional(),
          forecast: z.number().finite().nullable().optional(),
          index: z.string().optional(),
        }),
      }),
    )
    .min(1),
});

const geminiApiResponseSchema = z.object({
  candidates: z
    .array(
      z.object({
        content: z.object({
          parts: z.array(z.object({ text: z.string() })).min(1),
        }),
      }),
    )
    .min(1),
});

const geminiAnalysisSchema = z.object({
  riskScore: z.coerce.number().finite().min(0).max(100),
  disease: z.string().trim().min(1),
  region: z.string().trim().min(1),
  summary: z.string().trim().min(1),
});

type CdcResponse = z.infer<typeof cdcResponseSchema>;
type GeminiAnalysis = z.infer<typeof geminiAnalysisSchema>;

type HttpRequest = {
  label: string;
  method: "GET" | "POST";
  url: string;
  body?: string;
};

type ClimateAssessment = RiskAssessment & {
  temperature: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
};

type CarbonAssessment = RiskAssessment & {
  actual: number;
  forecast: number;
  index: string;
  from: string;
  to: string;
};

let evmClient: EVMClient;

function requestText(sendRequester: HTTPSendRequester, request: HttpRequest) {
  const response = sendRequester
    .sendRequest({
      method: request.method,
      url: request.url,
      ...(request.body === undefined ? {} : { body: request.body }),
    })
    .result();

  if (!ok(response)) {
    throw new Error(
      `${request.label} failed with status ${response.statusCode}: ${text(response)}`,
    );
  }

  return text(response);
}

function fetchAndValidate<T>(
  runtime: Runtime<Config>,
  request: HttpRequest,
  schema: z.ZodType<T>,
): T {
  const responseText = new cre.capabilities.HTTPClient()
    .sendRequest(
      runtime,
      requestText,
      consensusIdenticalAggregation<string>(),
    )(request)
    .result();

  let response: unknown;
  try {
    response = JSON.parse(responseText);
  } catch {
    throw new Error(`${request.label} returned invalid JSON`);
  }

  return schema.parse(response);
}

function fetchCDC(runtime: Runtime<Config>): CdcResponse {
  runtime.log("Fetching CDC Open Data");
  return fetchAndValidate(
    runtime,
    {
      label: "CDC Open Data request",
      method: "GET",
      url: runtime.config.cdcApiUrl,
    },
    cdcResponseSchema,
  );
}

function fetchClimate(runtime: Runtime<Config>): ClimateAssessment {
  runtime.log("Fetching Open-Meteo climate data");
  const url =
    `${runtime.config.openMeteoApiUrl}` +
    "?latitude=51.5072" +
    "&longitude=-0.1276" +
    "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,uv_index" +
    "&timezone=Europe%2FLondon";

  const response = fetchAndValidate(
    runtime,
    { label: "Open-Meteo request", method: "GET", url },
    climateResponseSchema,
  );
  const current = response.current;
  const risk = calculateClimateRisk(current.temperature_2m, current.uv_index);

  return {
    temperature: current.temperature_2m,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    uvIndex: current.uv_index,
    ...risk,
  };
}

function fetchCarbon(runtime: Runtime<Config>): CarbonAssessment {
  runtime.log("Fetching Carbon Intensity data");
  const response = fetchAndValidate(
    runtime,
    {
      label: "Carbon Intensity request",
      method: "GET",
      url: runtime.config.carbonIntensityApiUrl,
    },
    carbonResponseSchema,
  );
  const data = response.data[0];
  const actual = data.intensity.actual ?? 0;
  const forecast = data.intensity.forecast ?? actual;
  const index = (data.intensity.index ?? "unknown").toLowerCase();
  const risk = calculateEsgRisk(forecast, index);

  return {
    actual,
    forecast,
    index,
    from: data.from ?? "",
    to: data.to ?? "",
    ...risk,
  };
}

function callGemini(
  runtime: Runtime<Config>,
  cdcData: CdcResponse,
): GeminiAnalysis {
  runtime.log("Requesting Gemini public-health analysis");
  const secret = runtime
    .getSecret({ namespace: "GEMINI_API_KEY", id: "GEMINI_API_KEY" })
    .result();
  const apiKey = secret.value;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY value");
  }

  const prompt = `
You are a public health analyst.

Analyze this CDC COVID-19 hospitalization dataset and return ONLY valid JSON.

CDC data:
${JSON.stringify(cdcData)}

Return format:
{
  "riskScore": 0-100,
  "disease": "COVID-19",
  "region": "United States",
  "summary": "one concise sentence"
}
`;
  const body = Buffer.from(
    JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
  ).toString("base64");
  const apiResponse = fetchAndValidate(
    runtime,
    {
      label: "Gemini request",
      method: "POST",
      url: `${runtime.config.geminiApiUrl}?key=${apiKey}`,
      body,
    },
    geminiApiResponseSchema,
  );
  const modelText = apiResponse.candidates[0].content.parts[0].text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  let analysis: unknown;
  try {
    analysis = JSON.parse(modelText);
  } catch {
    throw new Error("Gemini returned invalid analysis JSON");
  }

  return geminiAnalysisSchema.parse(analysis);
}

function buildDecisionSummary(
  analysis: GeminiAnalysis,
  climate: ClimateAssessment,
  carbon: CarbonAssessment,
): string {
  return (
    `${analysis.summary} ` +
    `Climate signal: ${CLIMATE_CITY} temperature ${climate.temperature}°C, ` +
    `humidity ${climate.humidity}%, UV index ${climate.uvIndex}, ` +
    `climate risk ${climate.riskLevel}/5. Advice: ${climate.advice} ` +
    `Carbon-intensity signal: actual ${carbon.actual} gCO₂/kWh, ` +
    `forecast ${carbon.forecast} gCO₂/kWh, index ${carbon.index}, ` +
    `ESG risk ${carbon.riskLevel}/5. Advice: ${carbon.advice}`
  );
}

function buildCREPayload(
  analysis: GeminiAnalysis,
  summary: string,
): `0x${string}` {
  return encodeAbiParameters(
    parseAbiParameters(
      "string source, string region, string disease, uint256 riskScore, string summary",
    ),
    [
      CRE_REPORT_SOURCE,
      analysis.region,
      analysis.disease,
      BigInt(analysis.riskScore),
      summary,
    ],
  );
}

function publishCREReport(
  runtime: Runtime<Config>,
  encodedPayload: `0x${string}`,
): void {
  const report = runtime
    .report({
      encodedPayload: hexToBase64(encodedPayload),
      encoderName: "evm",
      signingAlgo: "ecdsa",
      hashingAlgo: "keccak256",
    })
    .result();
  const writeResult = evmClient
    .writeReport(runtime, {
      receiver: runtime.config.healthAlertRegistryAddress as `0x${string}`,
      report,
      gasConfig: { gasLimit: runtime.config.gasLimit },
    })
    .result();

  if (writeResult?.txStatus !== TxStatus.SUCCESS) {
    throw new Error(`CRE report write failed: ${writeResult?.errorMessage}`);
  }

  runtime.log(
    `Chainlink CRE report transaction: ${bytesToHex(writeResult.txHash ?? new Uint8Array(32))}`,
  );
}

function on10MinHealthCheck(
  runtime: Runtime<Config>,
  payload: CronPayload,
): string {
  if (!payload.scheduledExecutionTime) {
    throw new Error("Missing scheduledExecutionTime");
  }

  runtime.log(`Decision Gate run started at ${payload.scheduledExecutionTime}`);

  const cdcData = fetchCDC(runtime);
  const climate = fetchClimate(runtime);
  const carbon = fetchCarbon(runtime);
  const analysis = callGemini(runtime, cdcData);
  const decision = evaluateDecisionGate(
    analysis.riskScore,
    Number(runtime.config.alertThreshold),
    climate.riskLevel,
    carbon.riskLevel,
  );

  runtime.log(
    `Decision Gate: health=${decision.publishHealth}, climate=${decision.publishClimate}, ESG=${decision.publishEsg}`,
  );

  if (!decision.shouldPublish) {
    runtime.log("No publication threshold was met; skipping the CRE report");
    return "Skipped";
  }

  const summary = buildDecisionSummary(analysis, climate, carbon);
  publishCREReport(runtime, buildCREPayload(analysis, summary));
  return "Published";
}

export function initWorkflow(config: Config) {
  const network = getNetwork({
    chainFamily: "evm",
    chainSelectorName: config.chainSelectorName,
    isTestnet: true,
  });

  if (!network) {
    throw new Error(`Network not found: ${config.chainSelectorName}`);
  }

  evmClient = new EVMClient(network.chainSelector.selector);
  const cronTrigger = new cre.capabilities.CronCapability();

  return [
    cre.handler(
      cronTrigger.trigger({ schedule: config.schedule }),
      on10MinHealthCheck,
    ),
  ];
}
