const radius = 20;
const circumference = 2 * Math.PI * radius;

function Info({ label, value, detail, accent = "cyan", progress = 0 }) {
  const safeProgress = Math.max(0, Math.min(100, Number(progress) || 0));
  const offset = circumference - (safeProgress / 100) * circumference;

  return (
    <div className="metric-card">
      <div className={`metric-ring metric-ring--${accent}`} aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <circle className="metric-ring__track" cx="24" cy="24" r={radius} />
          <circle
            className="metric-ring__progress"
            cx="24"
            cy="24"
            r={radius}
            strokeDasharray={circumference}
            style={{ "--ring-offset": offset }}
          />
        </svg>
        <span />
      </div>
      <div className="metric-card__copy">
        <p className="metric-card__label">{label}</p>
        <p className="metric-card__value">{value}</p>
        {detail ? <p className="metric-card__detail">{detail}</p> : null}
      </div>
    </div>
  );
}

export default Info;
