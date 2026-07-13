import environmentGraph from "../assets/environment-node-graph.svg";
import blockchainIcon from "../assets/blockchain-icon.svg";

const capabilities = [
  ["01", "Multi-source collection", "CDC Open Data, Open-Meteo, and UK grid carbon intensity are normalized before evaluation."],
  ["02", "AI-assisted analysis", "Gemini produces a validated public-health score and concise summary; deterministic rules remain outside the model."],
  ["03", "CRE publication", "Threshold-qualified health alerts are encoded into a Chainlink CRE report for the configured Sepolia write path."],
  ["04", "Transparent limits", "The registry is permissionless for demonstration, and zkVerify remains an independent historical proof demo."],
];

const boundaries = [
  ["Implemented path", "CRE collects signals, evaluates deterministic thresholds, and prepares the Sepolia health report."],
  ["Independent proof", "The historical Groth16 proof was finalized on zkVerify Volta with no automatic handoff from CRE."],
  ["Demonstration limits", "The registry is permissionless and does not authenticate CRE provenance or enforce zkVerify-gated publication."],
];

function ModuleGrid() {
  return (
    <section className="module-section capabilities-section boundary-section chapter-section" data-chapter="07">
      <div className="section-heading boundary-section__heading">
        <div>
          <div className="chapter-question"><span>07</span><p>What are the project boundaries?</p></div>
          <div className="eyebrow eyebrow--violet"><span /> Scope and trust model</div>
          <h2>Designed to demonstrate the boundary, not obscure it.</h2>
          <p>TerraGuardian separates implemented runtime behavior, an independent proof demonstration, and future verification work.</p>
        </div>
      </div>
      <div className="boundary-rail">
        {boundaries.map(([title, detail]) => <article key={title}><span /><div><strong>{title}</strong><p>{detail}</p></div></article>)}
      </div>
      <div className="capabilities-visual"><img src={environmentGraph} alt="Environmental data node graph" /><div><img src={blockchainIcon} alt="" /><span>Built for transparent evaluation</span><strong>Intelligence you can trace.</strong></div></div>
      <div className="capabilities-grid">
        {capabilities.map(([number, title, detail]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{detail}</p></article>)}
      </div>
      <footer><div className="brand"><span className="brand__mark">T</span><span>TerraGuardian</span></div><p>Environmental decision intelligence · Encode Club Remix AI Bootcamp final project</p><span>Ethereum Sepolia · 2026</span></footer>
    </section>
  );
}

export default ModuleGrid;
