import climateIcon from "../assets/climate-icon.svg";
import Info from "./Info";

function ClimateModule({ climate, climateSource, loading, error }) {
  const riskLevel = Number(climate?.riskLevel ?? 0);
  const humidityProgress = Number(climate?.humidity ?? 0);
  const uvProgress = Math.min(100, (Number(climate?.uvIndex ?? 0) / 11) * 100);
  const windProgress = Math.min(100, (Number(climate?.windSpeed ?? 0) / 60) * 100);
  const heatCells = Array.from({ length: 18 }, (_, index) => {
    const intensity = Math.max(0.08, Math.min(1, (riskLevel + (index % 4)) / 8));
    return <span key={index} aria-hidden="true" style={{ "--cell-opacity": intensity, "--cell-delay": `${index * 0.025}s` }} />;
  });

  return (
    <section
      id="climate-intelligence"
      className={`module-section module-section--climate chapter-section ${loading ? "is-loading" : ""}`}
      data-chapter="02"
      aria-busy={loading}
    >
      <div className="section-heading">
        <div><div className="chapter-question"><span>02</span><p>What climate signal is collected?</p></div><div className="eyebrow eyebrow--amber"><span /> Climate intelligence</div><h2>London atmospheric conditions.</h2></div>
        <span className="status-pill" aria-live="polite">{loading ? "Synchronizing" : climateSource}</span>
      </div>
      <div className="climate-layout">
        <article className="glass-card weather-visual">
          <div className="weather-visual__orb"><div className="weather-visual__sun" /><span className="weather-visual__ring" /></div>
          <div className="weather-visual__copy"><img src={climateIcon} alt="" /><span>{climate?.city ?? "London"}</span><strong>{climate ? `${climate.temperature}°` : "—"}</strong><p>{climate?.safetyAdvice ?? error ?? "Climate data unavailable."}</p></div>
        </article>
        <div className="climate-metrics">
          <Info label="Humidity" value={climate ? `${climate.humidity}%` : "—"} detail="Relative humidity" accent="amber" progress={humidityProgress} />
          <Info label="UV index" value={climate?.uvIndex ?? "—"} detail="Current Open-Meteo value" accent="amber" progress={uvProgress} />
          <Info label="Wind" value={climate?.windSpeed !== undefined ? `${climate.windSpeed} km/h` : "—"} detail={climate?.windSpeed === undefined && climate ? "Not stored on-chain" : "10 m wind speed"} accent="blue" progress={windProgress} />
          <Info label="Climate risk" value={climate ? `${riskLevel}/5` : "—"} detail="Deterministic heat / UV rule" accent="rose" progress={(riskLevel / 5) * 100} />
        </div>
        <article className="glass-card heatmap-card">
          <div className="heatmap-card__header"><div><span className="overline">Risk surface</span><h3>Heat signal matrix</h3></div><strong>{riskLevel || "—"}/5</strong></div>
          <div className="heatmap" role="img" aria-label={`Climate risk heat signal matrix, ${riskLevel} out of 5`}>{heatCells}</div>
          <div className="heatmap-card__legend"><span>Lower exposure</span><i /><span>Higher exposure</span></div>
        </article>
      </div>
      <div className="chapter-transition" aria-hidden="true"><span /><i /></div>
    </section>
  );
}

export default ClimateModule;
