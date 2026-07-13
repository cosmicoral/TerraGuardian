const creSteps = [
  "Public Data",
  "Gemini Analysis",
  "Decision Gate",
  "CRE Report",
  "Sepolia Registry",
  "Dashboard",
];

const proofSteps = [
  "Decision Input",
  "Circom Circuit",
  "Groth16 Proof",
  "zkVerify Volta",
  "Finalized Statement",
];

function StepGrid({ title, steps }) {
  return (
    <div className="mt-5">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
        {title}
      </h3>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {steps.map((step, index) => (
          <div
            key={step}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-center"
          >
            <p className="text-xs text-slate-500">Step {index + 1}</p>
            <p className="mt-2 font-semibold">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Workflow() {
  return (
    <section className="mt-6 rounded-[2rem] border border-slate-800 bg-slate-900/60 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
        System Workflow
      </p>

      <h2 className="mt-2 text-xl font-bold">
        Environmental Decision and Verification Pipelines
      </h2>

      <StepGrid title="Chainlink CRE pipeline" steps={creSteps} />
      <StepGrid title="zkVerify proof pipeline" steps={proofSteps} />

      <p className="mt-5 text-sm leading-6 text-slate-400">
        Both pipelines are operational in the prototype. Automated CRE-to-zkVerify
        orchestration and destination-chain receipt verification are planned next.
      </p>
    </section>
  );
}

export default Workflow;