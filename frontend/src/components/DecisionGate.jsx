import decisionIllustration from "../assets/decision-gate-illustration.svg";
import healthIcon from "../assets/health-icon.svg";
import climateIcon from "../assets/climate-icon.svg";
import esgIcon from "../assets/esg-icon.svg";
import { evaluateDecision } from "../domain/decision";

const signalRadius = 18;
const signalCircumference = 2 * Math.PI * signalRadius;

function SignalInput({ icon, label, input, unit, delay }) {
  const progress = Math.min(1, input.threshold > 0 ? input.value / input.threshold : 0);
  const offset = signalCircumference - progress * signalCircumference;

  return (
    <div className={`signal-input motion-reveal-left ${input.triggered ? "is-triggered" : ""}`} style={{ "--reveal-delay": `${delay}s` }}>
      <div className="signal-input__visual" aria-hidden="true">
        <svg viewBox="0 0 44 44">
          <circle className="signal-input__track" cx="22" cy="22" r={signalRadius} />
          <circle className="signal-input__progress" cx="22" cy="22" r={signalRadius} strokeDasharray={signalCircumference} style={{ "--ring-offset": offset, "--ring-delay": `${delay}s` }} />
        </svg>
        <img src={icon} alt="" />
      </div>
      <div><span>{label}</span><strong>{input.value}{unit}</strong><small>Threshold {input.threshold}{unit}</small></div>
      <i>{input.triggered ? "Triggered" : "Monitor"}</i>
    </div>
  );
}

function DecisionGate({ healthAlert, climate, carbonData }) {
  const decision = evaluateDecision({ healthAlert, climate, carbonData });

  return (
    <section id="decision-gate" className="module-section decision-section chapter-section" data-chapter="04">
      <div className="section-heading section-heading--center"><div><div className="chapter-question chapter-question--center"><span>04</span><p>How are decisions made?</p></div><div className="eyebrow eyebrow--green"><span /> Deterministic Decision Gate</div><h2>Three signals. One publication decision.</h2><p>This client-side preview applies the same thresholds as the CRE workflow; it is not an on-chain execution receipt.</p></div></div>
      <article className="decision-console">
        <img className="decision-console__watermark" src={decisionIllustration} alt="" />
        <div className="decision-console__inputs">
          <SignalInput icon={healthIcon} label="Health risk" input={decision.inputs.health} unit="/100" delay={0} />
          <SignalInput icon={climateIcon} label="Climate risk" input={decision.inputs.climate} unit="/5" delay={0.08} />
          <SignalInput icon={esgIcon} label="Carbon risk" input={decision.inputs.esg} unit="/5" delay={0.16} />
        </div>
        <div className="decision-connector"><span /><span /><span /><i /><b /><b /></div>
        <div className="decision-engine motion-scale-reveal">
          <div className="decision-engine__core"><span>OR</span></div>
          <div><span className="overline">Policy engine</span><strong>Threshold evaluation</strong><small>Deterministic · auditable · off-chain</small><span className="decision-engine__status"><i /> Evaluating three inputs</span></div>
        </div>
        <div className="decision-arrow"><span>Decision output</span><i>↓</i></div>
        <div className={`decision-result motion-reveal ${decision.shouldPublish ? "decision-result--publish" : "decision-result--skip"}`}>
          <div><span className="decision-result__pulse" /><div><small>Current preview</small><strong>{decision.shouldPublish ? "Publish CRE Report" : "Skip publication"}</strong></div></div>
          <p>{decision.shouldPublish ? "At least one signal meets its publication threshold." : "All signals remain below their configured thresholds."}</p>
          <span className="decision-result__chain">Next: {decision.shouldPublish ? "Ethereum Sepolia" : "Next scheduled run"}</span>
        </div>
      </article>
      <div className="chapter-transition" aria-hidden="true"><span /><i /></div>
    </section>
  );
}

export default DecisionGate;
