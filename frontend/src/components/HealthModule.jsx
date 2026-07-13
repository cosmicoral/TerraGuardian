import healthIcon from "../assets/health-icon.svg";
import { clamp, DECISION_THRESHOLDS, getHealthRiskLabel } from "../domain/decision";
import Badge from "./Badge";

const requiredFields = ["source", "region", "disease", "riskScore", "summary"];

function HealthModule({ healthAlert, loading, error }) {
  const score = clamp(healthAlert?.riskScore, 0, 100);
  const circumference = 2 * Math.PI * 86;
  const gaugeOffset = circumference - (score / 100) * circumference;
  const completeness = healthAlert
    ? Math.round(
        (requiredFields.filter((field) => healthAlert[field] !== undefined && healthAlert[field] !== "").length /
          requiredFields.length) * 100,
      )
    : 0;
  const recordedAt = healthAlert?.timestamp
    ? new Date(healthAlert.timestamp * 1000).toLocaleString()
    : "No Sepolia record available";

  return (
    <section
      id="health-intelligence"
      className={`module-section module-section--health chapter-section ${loading ? "is-loading" : ""}`}
      data-chapter="01"
      aria-busy={loading}
    >
      <div className="section-heading">
        <div>
          <div className="chapter-question"><span>01</span><p>What public-health signal is collected?</p></div>
          <div className="eyebrow"><span /> Public health intelligence</div>
          <h2>Health signals with traceable context.</h2>
        </div>
        <div className="section-heading__meta">
          <span className={healthAlert ? "status-pill status-pill--live" : "status-pill"} aria-live="polite">
            {loading ? "Synchronizing" : healthAlert ? "Sepolia record loaded" : "No record"}
          </span>
        </div>
      </div>

      <div className="health-grid">
        <article className="glass-card risk-card">
          <div className="risk-card__heading">
            <div className="card-kicker"><img src={healthIcon} alt="" /> Latest health signal</div>
            <span className={`status-chip ${score >= DECISION_THRESHOLDS.health ? "status-chip--alert" : "status-chip--stable"}`}>
              <i aria-hidden="true" />
              {score >= DECISION_THRESHOLDS.health ? "Threshold reached" : "Below threshold"}
            </span>
          </div>
          <div className="risk-gauge" aria-label={`Health risk score ${score} out of 100`}>
            <div className="risk-gauge__halo" aria-hidden="true" />
            <svg viewBox="0 0 220 220" aria-hidden="true">
              <defs>
                <linearGradient id="health-risk-gradient" x1="22" y1="28" x2="198" y2="192" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#67E8F9" />
                  <stop offset="0.62" stopColor="#4ADEB0" />
                  <stop offset="1" stopColor="#FBBF24" />
                </linearGradient>
              </defs>
              <circle className="risk-gauge__track" cx="110" cy="110" r="86" />
              <circle
                className="risk-gauge__progress"
                cx="110" cy="110" r="86"
                strokeDasharray={circumference}
                style={{ "--gauge-offset": gaugeOffset }}
              />
            </svg>
            <div className="risk-gauge__threshold-marker" aria-hidden="true"><i /></div>
            <div className="risk-gauge__value"><strong>{loading ? "—" : score}</strong><span>/100</span></div>
          </div>
          <div className="risk-card__summary">
            <strong>{getHealthRiskLabel(score)}</strong>
            <span>CRE health threshold: {DECISION_THRESHOLDS.health}</span>
          </div>
          <div className="confidence">
            <div><span>Record completeness</span><strong>{completeness}%</strong></div>
            <div className="confidence__track"><span style={{ "--progress-width": `${completeness}%` }} /></div>
          </div>
        </article>

        <article className="glass-card health-context">
          <div className="health-context__header">
            <div>
              <span className="overline">Latest public record</span>
              <h3>{healthAlert?.disease ?? "Health alert unavailable"}</h3>
              <p>{healthAlert?.region ?? error ?? "Waiting for a registry response."}</p>
            </div>
            <div className="badge-row">
              <Badge>CDC Open Data</Badge><Badge tone="violet">Gemini</Badge><Badge tone="blue">Sepolia</Badge>
            </div>
          </div>
          <blockquote>
            {healthAlert?.summary ??
              "No on-chain health summary is available. Live climate and carbon signals can still be explored independently."}
          </blockquote>
          <div className="provenance-grid">
            <div><span>Declared source</span><strong>{healthAlert?.source ?? "Unavailable"}</strong></div>
            <div><span>Recorded at</span><strong>{recordedAt}</strong></div>
            <div><span>Registry model</span><strong>Permissionless demo</strong></div>
          </div>
          <div className="timeline" aria-label="Health signal workflow">
            {[
              ["01", "Collect", "CDC dataset"],
              ["02", "Analyze", "Gemini summary"],
              ["03", "Evaluate", "Decision Gate"],
              ["04", "Record", "Sepolia registry"],
            ].map(([number, title, detail], index) => (
              <div className="timeline__step" key={title}>
                <span>{number}</span><strong>{title}</strong><small>{detail}</small>
                {index < 3 ? <i /> : null}
              </div>
            ))}
          </div>
        </article>
      </div>
      <div className="chapter-transition" aria-hidden="true"><span /><i /></div>
    </section>
  );
}

export default HealthModule;
