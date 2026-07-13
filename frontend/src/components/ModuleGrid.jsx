const modules = [
  {
    icon: "🦠",
    title: "Public Health",
    status: "Active",
    text: "CDC Open Data and Gemini health-risk analysis",
  },
  {
    icon: "🌡️",
    title: "Climate",
    status: "Active",
    text: "Open-Meteo climate-risk evaluation",
  },
  {
    icon: "🌱",
    title: "ESG",
    status: "Active",
    text: "UK grid carbon-intensity monitoring",
  },
  {
    icon: "🔐",
    title: "zkVerify",
    status: "Verified",
    text: "Groth16 proof finalized on zkVerify Volta",
  },
  {
    icon: "🔗",
    title: "Integration",
    status: "Next",
    text: "Automate CRE-to-proof submission and receipt consumption",
  },
];

function ModuleGrid() {
  return (
    <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {modules.map((module) => (
        <div
          key={module.title}
          className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5"
        >
          <div className="text-3xl">{module.icon}</div>
          <h3 className="mt-4 text-xl font-bold">{module.title}</h3>
          <p className="mt-2 text-sm font-semibold text-cyan-300">
            {module.status}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {module.text}
          </p>
        </div>
      ))}
    </section>
  );
}

export default ModuleGrid;