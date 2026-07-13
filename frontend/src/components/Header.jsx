import commandCenter from "../assets/environmental-command-center.svg";
import heroOrbit from "../assets/hero-orbit.jpg";
import planetIllustration from "../assets/planet-illustration.svg";
import signalOrbit from "../assets/signal-orbit.svg";

function Header({ lastUpdated, loading, onRefresh }) {
  const updateLabel = lastUpdated
    ? lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "Awaiting telemetry";

  return (
    <>
      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="TerraGuardian home">
          <span className="brand__mark">T</span>
          <span>TerraGuardian</span>
        </a>
        <div className="topbar__links">
          <a href="#health-intelligence">Signals</a>
          <a href="#decision-gate">Decision Gate</a>
          <a href="#verification">Verification</a>
          <a href="#architecture">Architecture</a>
        </div>
        <button className="refresh-button" onClick={onRefresh} disabled={loading}>
          <span className={loading ? "refresh-button__icon is-spinning" : "refresh-button__icon"}>↻</span>
          {loading ? "Synchronizing" : "Refresh data"}
        </button>
      </nav>

      <header id="top" className="hero">
        <img className="hero__background" src={heroOrbit} alt="" />
        <div className="hero__veil" />
        <div className="hero__content motion-fade-up">
          <div className="chapter-question chapter-question--hero"><span>00</span><p>What is TerraGuardian?</p></div>
          <div className="eyebrow"><span /> Environmental decision intelligence</div>
          <h1>Planetary signals.<br /><em>Decision-grade clarity.</em></h1>
          <p className="hero__lede">
            TerraGuardian combines public-health, climate, and carbon-intensity
            signals into a deterministic Chainlink CRE publication decision.
          </p>
          <div className="hero__actions">
            <a className="primary-button" href="#decision-gate">Explore decision gate <span>↘</span></a>
            <a className="secondary-button" href="#architecture">View system architecture</a>
          </div>
          <div className="hero__status-row">
            <div><span className="live-dot" /> Sepolia read channel</div>
            <div>Updated {updateLabel}</div>
            <div>CRE simulation architecture</div>
          </div>
        </div>

        <img
          className="hero__planet motion-scale-in"
          src={planetIllustration}
          alt="Illustrated environmental intelligence globe"
        />
        <img className="hero__signal-orbit" src={signalOrbit} alt="" />
      </header>

      <div className="trust-rail" aria-label="Technology stack">
        {[
          ["Chainlink CRE", "Workflow"],
          ["Gemini 2.5", "AI analysis"],
          ["Ethereum", "Sepolia"],
          ["Groth16", "Independent proof demo"],
        ].map(([name, detail]) => (
          <div className="trust-rail__item" key={name}>
            <span>{name}</span><small>{detail}</small>
          </div>
        ))}
      </div>

      <div className="hero-showcase" aria-label="TerraGuardian product overview">
        <div className="hero-showcase__copy">
          <span className="overline">Product surface</span>
          <strong>One operating view. Explicit trust boundaries.</strong>
          <p>Health, climate, and carbon evidence remain distinct until the deterministic Decision Gate evaluates publication.</p>
        </div>
        <div className="hero-showcase__stage">
          <div className="command-frame">
            <div className="command-frame__bar">
              <div><span /><span /><span /></div>
              <p>TerraGuardian · Environmental command center</p>
              <span>Live view</span>
            </div>
            <img src={commandCenter} alt="TerraGuardian environmental command center interface" />
            <div className="command-frame__scan" aria-hidden="true" />
          </div>
          <span className="floating-source floating-source--cdc">CDC</span>
          <span className="floating-source floating-source--weather">Open-Meteo</span>
          <span className="floating-source floating-source--grid">Grid API</span>
        </div>
      </div>
      <div className="chapter-transition chapter-transition--hero" aria-hidden="true"><span /><i /></div>
    </>
  );
}

export default Header;
