import esgIcon from "../assets/esg-icon.svg";
import { calculateEsgRisk } from "../domain/decision";

function ESGModule({ carbonData, loading, error }) {
  const actual = Number(carbonData?.actual ?? 0);
  const forecast = Number(carbonData?.forecast ?? 0);
  const risk = calculateEsgRisk(carbonData);
  const trend = !carbonData ? "Unavailable" : forecast > actual ? "Rising" : forecast < actual ? "Improving" : "Stable";
  const recommendation = risk >= 4
    ? "Defer non-critical energy-intensive workloads."
    : risk >= 3
      ? "Monitor grid conditions before scheduling flexible demand."
      : "Grid conditions support normal operating schedules.";
  const scale = Math.max(actual, forecast, 350);
  const actualY = 78 - (actual / scale) * 54;
  const forecastY = 78 - (forecast / scale) * 54;
  const riskRadius = 22;
  const riskCircumference = 2 * Math.PI * riskRadius;
  const riskOffset = riskCircumference - (risk / 5) * riskCircumference;
  const trendArrow = forecast > actual ? "↗" : forecast < actual ? "↘" : "→";

  return (
    <section
      id="carbon-intelligence"
      className={`module-section module-section--esg chapter-section ${loading ? "is-loading" : ""}`}
      data-chapter="03"
      aria-busy={loading}
    >
      <div className="section-heading">
        <div><div className="chapter-question"><span>03</span><p>What environmental signal is collected?</p></div><div className="eyebrow eyebrow--green"><span /> Carbon intelligence</div><h2>Institutional grid signal monitor.</h2></div>
        <span className="status-pill" aria-live="polite">{loading ? "Synchronizing" : "Great Britain · Live API"}</span>
      </div>
      <article className="glass-card esg-terminal">
        <div className="esg-terminal__masthead"><div><img src={esgIcon} alt="" /><div><span className="overline">National Grid ESO</span><h3>Carbon intensity</h3></div></div><div className="market-status"><span /> Market data live</div></div>
        <div className="esg-terminal__grid">
          <div className="carbon-primary"><span>Current intensity</span><strong>{carbonData ? actual : "—"}</strong><small>gCO₂ / kWh</small><div className="trend-chip">{trendArrow} {trend}</div></div>
          <div className="carbon-bars">
            {[["Actual", actual, "cyan"], ["Forecast", forecast, "green"]].map(([label, value, tone]) => (
              <div className="carbon-bar" key={label}><div><span>{label}</span><strong>{carbonData ? value : "—"}</strong></div><div className="carbon-bar__track"><span className={`carbon-bar__fill carbon-bar__fill--${tone}`} style={{ "--bar-width": carbonData ? `${Math.min(100, (value / scale) * 100)}%` : "0%" }} /></div></div>
            ))}
            <div className="carbon-mini-trend" role="img" aria-label={`Carbon intensity changes from ${actual} actual to ${forecast} forecast grams of carbon dioxide per kilowatt-hour`}>
              <div><span>Actual</span><small>Forecast</small></div>
              <svg viewBox="0 0 260 96" aria-hidden="true">
                <defs>
                  <linearGradient id="carbon-trend-area" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor="#67E8F9" stopOpacity=".28" />
                    <stop offset="1" stopColor="#34D399" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="carbon-trend-line" x1="18" y1="0" x2="242" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#67E8F9" />
                    <stop offset="1" stopColor="#6EE7B7" />
                  </linearGradient>
                </defs>
                <path d={`M18 ${actualY} C92 ${actualY}, 168 ${forecastY}, 242 ${forecastY} L242 88 L18 88 Z`} fill="url(#carbon-trend-area)" />
                <path className={carbonData ? "carbon-mini-trend__line is-visible" : "carbon-mini-trend__line"} pathLength="1" d={`M18 ${actualY} C92 ${actualY}, 168 ${forecastY}, 242 ${forecastY}`} fill="none" stroke="url(#carbon-trend-line)" strokeWidth="3" strokeLinecap="round" />
                <circle cx="18" cy={actualY} r="4" fill="#67E8F9" opacity={carbonData ? 1 : 0} />
                <circle cx="242" cy={forecastY} r="4" fill="#6EE7B7" opacity={carbonData ? 1 : 0} />
              </svg>
            </div>
          </div>
          <div className="carbon-table">
            <div className="carbon-risk-summary">
              <div className="carbon-risk-ring" aria-hidden="true">
                <svg viewBox="0 0 56 56">
                  <circle className="carbon-risk-ring__track" cx="28" cy="28" r={riskRadius} />
                  <circle className="carbon-risk-ring__progress" cx="28" cy="28" r={riskRadius} strokeDasharray={riskCircumference} style={{ "--ring-offset": riskOffset }} />
                </svg>
                <strong>{carbonData ? risk : "—"}</strong>
              </div>
              <p><span>Decision input</span><strong>{carbonData ? `${risk} / 5` : "Unavailable"}</strong></p>
            </div>
            <div><span>Grid index</span><strong>{carbonData?.index ?? "Unavailable"}</strong></div>
            <div><span>Direction</span><strong>{trend}</strong></div>
            <div><span>Window</span><strong>{carbonData?.from ? new Date(carbonData.from).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}</strong></div>
          </div>
        </div>
        <div className="recommendation"><span>System recommendation</span><p>{carbonData ? recommendation : error ?? "Carbon-intensity data unavailable."}</p></div>
      </article>
      <div className="chapter-transition" aria-hidden="true"><span /><i /></div>
    </section>
  );
}

export default ESGModule;
