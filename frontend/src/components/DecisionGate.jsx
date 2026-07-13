import Info from "./Info";

function calculateEsgRisk(esg) {
  if (!esg) return 0;

  const forecast = Number(esg.forecast ?? esg.actual ?? 0);
  const index = String(esg.index ?? "").toLowerCase();

  if (index === "very high" || forecast >= 300) return 5;
  if (index === "high" || forecast >= 200) return 4;
  if (index === "moderate" || forecast >= 100) return 3;
  if (index === "low") return 1;

  return 1;
}

function DecisionGate({ alert, climate, esg }) {
  const publicHealthThreshold = 30;
  const climateThreshold = 3;
  const esgThreshold = 3;

  const riskScore = Number(alert?.riskScore ?? 0);
  const climateRisk = Number(climate?.riskLevel ?? climate?.climateRisk ?? 0);
  const esgRisk = calculateEsgRisk(esg);

  const publicHealthDecision =
    riskScore >= publicHealthThreshold ? "Trigger Alert" : "Monitor Only";

  const climateDecision =
    climateRisk >= climateThreshold ? "Trigger Alert" : "Monitor Only";

  const esgDecision =
    esgRisk >= esgThreshold ? "Trigger Alert" : "Monitor Only";

  const shouldPublish =
    riskScore >= publicHealthThreshold ||
    climateRisk >= climateThreshold ||
    esgRisk >= esgThreshold;

  const overallDecision = shouldPublish
    ? "Publish On-chain Alert"
    : "Skip Publication";

  return (
    <section className="mt-6 rounded-[2rem] border border-emerald-500/30 bg-emerald-950/20 p-6">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
          Agent Decision Gate
        </p>
        <h2 className="mt-2 text-xl font-bold">Risk Threshold Evaluation</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Info label="Public Health Decision" value={publicHealthDecision} />
        <Info label="Climate Decision" value={climateDecision} />
        <Info label="ESG Decision" value={esgDecision} />
        <Info label="Overall Decision" value={overallDecision} />

        <Info label="Health Risk" value={`${riskScore}/100`} />
        <Info label="Climate Risk" value={`${climateRisk}/5`} />
        <Info label="ESG Risk" value={`${esgRisk}/5`} />

        <Info label="Health Threshold" value={`${publicHealthThreshold}/100`} />
        <Info label="Climate Threshold" value={`${climateThreshold}/5`} />
        <Info label="ESG Threshold" value={`${esgThreshold}/5`} />
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-400">
        The decision gate mirrors the CRE workflow thresholds for public-health,
        climate, and carbon-intensity risks.
      </p>
    </section>
  );
}

export default DecisionGate;