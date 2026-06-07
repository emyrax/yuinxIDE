export function Hero() {
  return (
    <section className="section hero reveal visible" id="home">
      <p className="hero-badge desktop-only">
        <span className="live-dot" aria-hidden="true" />
        Waitlist is live
      </p>

      <div className="mobile-hero-lockup mobile-only" aria-label="Yuinx brand">
        <p className="hero-badge hero-badge-mobile">
          <span className="live-dot" aria-hidden="true" />
          Waitlist is live
        </p>
        <img src="./assests/yuinxlogo.png" alt="Yuinx logo" />
        <p className="mobile-hero-tagline">Your Vibe-mechatronics engine</p>
      </div>

      <h1 className="desktop-only">
        Your Vibe-mechatronics,
        <span className="hero-accent"> engine.</span>
      </h1>

      <p className="hero-copy desktop-only">
      Your modern IDE for Firmware. Upload circuit photos, get AI-powered
        analysis, and ship firmware faster.
      </p>

      <p className="mobile-hero-copy mobile-only">
        Build, debug, and ship Arduino projects in one clean workspace.
      </p>

      <div className="hero-actions">
        <button
          type="button"
          className="btn btn-primary btn-waitlist"
          data-open-waitlist
        >
          <span className="btn-label">Join Waitlist</span>
        </button>
        <a className="btn btn-outline desktop-only" href="#features">
          Learn More
        </a>
      </div>

      <p className="hero-meta">
        <span
          className="waitlist-count-loading"
          data-waitlist-count
          aria-label="Loading waitlist count"
        />{' '}
        + builders joined for early access
      </p>
    </section>
  );
}
