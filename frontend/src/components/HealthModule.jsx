import Badge from "./Badges";
import Info from "./Info";

function HealthModule({ alert, loading }) {
  const riskScore = alert?.riskScore ?? 0;
  const riskWidth = `${riskScore}%`;
  const riskLabel =
    riskScore <= 30 ? "Low Risk" : riskScore <= 70 ? "Medium Risk" : "High Risk";
  const analysisTime = alert?.timestamp
    ? new Date(alert.timestamp * 1000).toLocaleString()
  : "Waiting...";
  return (
    <section className="mt-6 rounded-[2rem] border border-cyan-500/20 bg-cyan-950/10 p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Public Health Module
          </p>
          <h2 className="mt-2 text-xl font-bold">CDC COVID-19 Intelligence</h2>
        </div>

        <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-300">
          {alert ? "On-chain Alert" : "Waiting for Alert"}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
            Latest Risk
          </p>

          <div className="mt-8 flex items-end gap-3">
            <span className="text-8xl font-black">
              {loading ? "..." : riskScore}
            </span>
            <span className="mb-4 text-xl text-slate-400">/100</span>
          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-emerald-400" style={{ width: riskWidth }} />
          </div>

          <p className="mt-5 text-lg font-semibold text-emerald-300">{riskLabel}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Based on CDC hospitalization data analyzed by Gemini.
            </p>

            <p className="mt-3 text-xs text-slate-500">
            Analysis Time: {analysisTime}
            </p>
        </div>

        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
          <div className="mb-6 flex flex-wrap gap-3">
            <Badge>CDC Open Data ✓</Badge>
            <Badge>Gemini 2.5 Flash ✓</Badge>
            <Badge>Sepolia Registry ✓</Badge>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
           <Info label="Disease" value={alert?.disease || "No alert"} />

            <Info label="Region" value={alert?.region || "No alert"} />

            <Info label="Source" value={alert?.source || "Waiting"} />

            <Info
            label="Status"
            value={alert ? "Verified • Loaded from Sepolia" : "Waiting"}
            />

            <Info
            label="Recorded At"
            value={
                alert?.timestamp
                ? new Date(alert.timestamp * 1000).toLocaleString()
                : "Waiting"
            }
            />

            <Info
            label="Network"
            value="Sepolia Testnet"
            />
          </div>

          <div className="mt-8 rounded-3xl border border-slate-800 bg-black/30 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              AI Summary
            </p>
            <p className="mt-4 text-xl leading-9 text-slate-200">
              {alert?.summary ||
                "No on-chain alert has been recorded yet. CRE simulation is complete; live alerts will appear after deployment or manual contract interaction."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HealthModule;