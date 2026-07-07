import Info from "./Info";

function DecisionGate({ alert, climate }) {
  const publicHealthThreshold = 30;
  const climateThreshold = 3;

  const riskScore = alert?.riskScore ?? 0;

  const publicHealthDecision =
    riskScore >= publicHealthThreshold ? "Trigger Alert" : "Monitor Only";

  const climateDecision =
    climate?.riskLevel >= climateThreshold ? "Trigger Alert" : "Monitor Only";
  
  const esgDecision =
     esg?.forecast >= esgThreshold
     ? "Tirgger Alert"
     : "Monitor Only";

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
        <Info label="Health Threshold" value={`${publicHealthThreshold}/100`} />
        <Info label="Climate Threshold" value={`${climateThreshold}/5`} />
        <Info label="Esg Decision" value ={esgDecision} />
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-400">
        The agent evaluates AI-generated and climate-derived risk scores before deciding whether to trigger an on-chain alert.
      </p>
    </section>
  );
}

export default DecisionGate;