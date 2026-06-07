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
          <img
          src="./assests/brandYuinxTrans.jpg"
          alt="Yuinx logo"
        />
        <p className="mobile-hero-tagline">Your Vibe-mechatronics engine</p>
      </div>

      <h1 className="desktop-only">
        Build hardware at the
        <span className="hero-accent"> speed of AI.</span>
      </h1>

      <p className="hero-copy desktop-only">
        Yuinx is the first AI-native IDE for firmware. Snap a photo of your
        breadboard, get instant component analysis and wiring fixes, then ship
        working code — all from your browser.
      </p>

      <p className="mobile-hero-copy mobile-only">
        The AI-powered IDE for firmware. Snap, analyze, and ship — all in your browser.
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
        + engineers, students, and founders joined for early access
      </p>
    </section>
  );
}
