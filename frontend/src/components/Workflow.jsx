import workflowIllustration from "../assets/workflow-constellation.svg";

const primarySteps = [
  ["01", "Data", "CDC · climate · carbon"],
  ["02", "AI", "Gemini health analysis"],
  ["03", "Decision", "Deterministic gate"],
  ["04", "CRE", "Signed report"],
  ["05", "Sepolia", "Health registry"],
];

const proofSteps = [
  ["A", "Circom", "Sample decision hash"],
  ["B", "Groth16", "snarkjs proof"],
  ["C", "zkVerify", "Historical Volta finalization"],
];

function Workflow() {
  return (
    <section id="architecture" className="module-section architecture-section chapter-section" data-chapter="06">
      <div className="section-heading"><div><div className="chapter-question"><span>06</span><p>How do the independent systems interact?</p></div><div className="eyebrow"><span /> System architecture</div><h2>Two honest, independent pipelines.</h2><p>The CRE publication path and the proof demonstration are intentionally separate.</p></div></div>
      <article className="glass-card workflow-card">
        <img className="workflow-card__illustration" src={workflowIllustration} alt="Parallel CRE and zkVerify pipeline illustration" />
        <div className="pipeline">
          <div className="pipeline__label"><span>Primary</span><strong>Chainlink CRE decision pipeline</strong><small>Operational workflow path</small></div>
          <div className="pipeline__steps">
            {primarySteps.map(([number, title, detail], index) => (
              <div className="pipeline-step motion-reveal" style={{ "--reveal-delay": `${index * 0.08}s` }} key={title}><span>{number}</span><strong>{title}</strong><small>{detail}</small>{index < primarySteps.length - 1 ? <i>→</i> : null}</div>
            ))}
          </div>
        </div>
        <div className="pipeline pipeline--proof">
          <div className="pipeline__label"><span>Independent</span><strong>Groth16 proof demo</strong><small>No automatic CRE handoff</small></div>
          <div className="pipeline__steps pipeline__steps--proof">
            {proofSteps.map(([number, title, detail], index) => (
              <div className="pipeline-step" key={title}><span>{number}</span><strong>{title}</strong><small>{detail}</small>{index < proofSteps.length - 1 ? <i>→</i> : null}</div>
            ))}
          </div>
        </div>
      </article>
      <div className="chapter-transition" aria-hidden="true"><span /><i /></div>
    </section>
  );
}

export default Workflow;
