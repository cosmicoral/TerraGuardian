import { Contract, JsonRpcProvider } from "ethers";
import {
  HEALTH_ALERT_REGISTRY_ADDRESS,
  SEPOLIA_RPC_URL,
} from "./blockchainConfig";
import { registryAbi } from "./registryAbi";

const provider = new JsonRpcProvider(SEPOLIA_RPC_URL);
const registry = new Contract(
  HEALTH_ALERT_REGISTRY_ADDRESS,
  registryAbi,
  provider,
);

export async function getLatestHealthAlert() {
  const count = await registry.getAlertCount();
  if (count === 0n) return null;

  const latest = await registry.getLatestAlert();
  return {
    source: latest.source,
    region: latest.region,
    disease: latest.disease,
    riskScore: Number(latest.riskScore),
    summary: latest.summary,
    timestamp: Number(latest.timestamp),
  };
}

export async function getLatestClimateAlert() {
  const count = await registry.getClimateAlertCount();
  if (count === 0n) return null;

  const latest = await registry.getLatestClimateAlert();
  return {
    alertId: Number(latest.alertId),
    city: latest.city,
    temperature: Number(latest.temperature) / 10,
    humidity: Number(latest.humidity),
    uvIndex: Number(latest.uvIndex),
    riskLevel: Number(latest.riskLevel),
    safetyAdvice: latest.safetyAdvice,
    dataSource: latest.dataSource,
    evidenceHash: latest.evidenceHash,
    timestamp: Number(latest.timestamp),
    publisher: latest.publisher,
  };
}
