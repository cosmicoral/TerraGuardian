import "./index.css";
import { useEffect, useState } from "react";
import { getLatestAlert } from "./services/blockchain";
import { createZkVerifyRecord } from "./services/zkverify";
import { getClimateRisk } from "./services/climate";

const modules = [
  { icon: "🦠", title: "Public Health", status: "Active", color: "emerald", text: "CDC + Gemini live risk workflow" },
  { icon: "🌡️", title: "Heatwave", status: "Next", color: "amber", text: "Connect Heatwave-Proof-AI module" },
  { icon: "🌱", title: "EU ESG", status: "Planned", color: "lime", text: "Carbon, water, energy indicators" },
  { icon: "🔐", title: "zkVerify", status: "Planned", color: "violet", text: "Proof-backed AI and data outputs" },
  { icon: "📈", title: "The Graph", status: "Planned", color: "sky", text: "Index alerts for dashboards" },
];

function App() {
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [climate, setClimate] = useState(null);
  useEffect(() => {
  async function loadAlert() {
    try {
      const latest = await getLatestAlert();
      setAlert(latest);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadClimate() {
    try {
      const latestClimate = await getClimateRisk();
      setClimate(latestClimate);
    } catch (err) {
      console.error(err);
    }
  }

  loadAlert();
  loadClimate();
}, []);

  const riskScore = alert?.riskScore ?? 0;
  const zkRecord = createZkVerifyRecord(alert);
  const riskWidth = `${riskScore}%`;
  const riskLabel = riskScore <= 30 ? "Low Risk" : riskScore <= 70 ? "Medium Risk" : "High Risk";
  const publicHealthThreshold = 30;
  const climateThreshold = 3;
  const publicHealthDecision =
    riskScore >= publicHealthThreshold ? "Trigger Alert" : "Monitor Only";
  const climateDecision =
    climate?.riskLevel >= climateThreshold ? "Trigger Alert" : "Monitor Only";
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Chainlink CRE × Gemini × zkVerify
                    </p>
                    <h1
                    className="
                    mt-3
                    text-6xl
                    font-extrabold
                    tracking-tight
                    text-white
                    "
                  >
                    Environmental Health Intelligence
                  </h1>
            <p className="mt-2 text-slate-400">
              Verifiable AI monitoring for public health, climate risk, and ESG data.
            </p>
          </div>

          <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
            ● CRE Simulation Live
          </div>
        </header>

             <section className="mt-6 rounded-[2rem] border border-amber-500/30 bg-amber-950/20 p-6">
  <div className="flex items-center justify-between gap-4">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
        Climate Risk Module
      </p>
      <h2 className="mt-2 text-xl font-bold">
        London Heatwave Intelligence
      </h2>
    </div>

    <span className="rounded-full bg-amber-400/10 px-3 py-1 text-sm font-semibold text-amber-300">
      {climate ? "Live Climate Data" : "Loading"}
    </span>
  </div>

  <div className="mt-5 grid gap-4 md:grid-cols-4">
    <Info label="City" value={climate?.city || "Loading"} />
    <Info label="Temperature" value={climate ? `${climate.temperature}°C` : "Loading"} />
    <Info label="Humidity" value={climate ? `${climate.humidity}%` : "Loading"} />
    <Info label="Risk Level" value={climate ? `${climate.riskLevel}/5` : "Loading"} />
  </div>

  <div className="mt-5 rounded-3xl border border-slate-800 bg-black/30 p-6">
    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
      Safety Advice
    </p>
    <p className="mt-4 text-lg leading-8 text-slate-200">
      {climate?.safetyAdvice || "Fetching climate risk data from Open-Meteo..."}
    </p>
    <p className="mt-4 text-sm text-slate-500">
      Source: {climate?.source || "Open-Meteo API"}
    </p>
  </div>
</section>

        <section className="mt-6 rounded-[2rem] border border-cyan-500/20 bg-cyan-950/10 p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Public Health Module
            </p>
            <h2 className="mt-2 text-xl font-bold">
              CDC COVID-19 Intelligence
            </h2>
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
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
            <div className="mb-6 flex flex-wrap gap-3">
              <Badge>CDC Open Data</Badge>
              <Badge>Gemini 2.5 Flash</Badge>
              <Badge>Sepolia Registry</Badge>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Info label="Disease" value={alert?.disease || "No alert yet"} />
              <Info label="Region" value={alert?.region || "No alert yet"} />
              <Info label="Source" value={alert?.source || "Waiting for on-chain data"} />
              <Info label="Status" value={alert ? "Loaded from Sepolia" : "No on-chain alert yet"} />
            </div>

            <div className="mt-8 rounded-3xl border border-slate-800 bg-black/30 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                AI Summary
              </p>
              <p className="mt-4 text-xl leading-9 text-slate-200">
                {alert?.summary || "No on-chain alert has been recorded yet. CRE simulation is complete; live alerts will appear after deployment or manual contract interaction."}
              </p>
            </div>
            </div>
          </div>
        </section>

            <section className="mt-6 rounded-[2rem] border border-emerald-500/30 bg-emerald-950/20 p-6">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
          Agent Decision Gate
        </p>
        <h2 className="mt-2 text-xl font-bold">
          Risk Threshold Evaluation
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Info
          label="Public Health Decision"
          value={publicHealthDecision}
        />
        <Info
          label="Climate Decision"
          value={climateDecision}
        />
        <Info
          label="Health Threshold"
          value={`${publicHealthThreshold}/100`}
        />
        <Info
          label="Climate Threshold"
          value={`${climateThreshold}/5`}
        />
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-400">
        The agent evaluates AI-generated and climate-derived risk scores before deciding whether to trigger an on-chain alert.
      </p>
    </section>

  <section className="mt-6 rounded-[2rem] border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-bold">Workflow</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-6">
            {[
                "Public Health Data",
                "Climate Data",
                "Gemini Risk Analysis",
                "AI Decision Gate",
                "Solidity Registry",
                "Dashboard",
              ].map((step, i) => (
              <div key={step} className="rounded-2xl bg-slate-950 p-4 text-center">
                <p className="text-xs text-slate-500">Step {i + 1}</p>
                <p className="mt-2 font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {modules.map((m) => (
            <div key={m.title} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-3xl">{m.icon}</div>
              <h3 className="mt-4 text-xl font-bold">{m.title}</h3>
              <p className="mt-2 text-sm font-semibold text-cyan-300">{m.status}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">{m.text}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-300">
      {children}
    </span>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-950/70 p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}

export default App;