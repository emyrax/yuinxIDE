import { FeatureCard } from './FeatureCard';

export function Features() {
  return (
    <section className="section features" id="features">
      <div className="mobile-feature-stack mobile-only reveal">
        <div className="mobile-feature-head">
          <p className="mobile-feature-kicker">Why Yuinx</p>
          <h2>Built for faster hardware work.</h2>
        </div>

        <div className="mobile-feature-grid">
          <article className="mobile-feature-card">
            <strong>AI circuit checks</strong>
            <span>Upload a build photo and get wiring help fast.</span>
          </article>

          <article className="mobile-feature-card">
            <strong>Code + hardware together</strong>
            <span>Keep firmware, parts, and board context in one place.</span>
          </article>

          <article className="mobile-feature-card">
            <strong>Faster debug loop</strong>
            <span>Analyze, fix, verify, and upload without bouncing between tools.</span>
          </article>
        </div>
      </div>

      <div className="section-head reveal">
        <h2>Features</h2>
        <p>Everything you need to build hardware projects in one clean workflow.</p>
      </div>

      <div className="feature-grid">
        <FeatureCard
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="8" cy="10" r="2" />
              <path d="M21 16l-5-5-8 8" />
            </svg>
          }
          tag="AI Analysis"
          heading="AI Circuit Analysis"
          description="Upload breadboard photos and get component detection, wiring checks, and fixes you can actually apply."
          delay={0}
        />

        <FeatureCard
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M8 7 4 12l4 5" />
              <path d="m16 7 4 5-4 5" />
              <path d="m14 4-4 16" />
            </svg>
          }
          tag="Editor"
          heading="Smart Code Editor"
          description="Write and iterate fast with a clean editor, compiler output, and debugging feedback in one place."
          delay={80}
        />

        <FeatureCard
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3" y="6" width="18" height="12" rx="2" />
              <path d="M8 12h1" />
              <path d="M12 12h1" />
              <path d="M16 12h1" />
            </svg>
          }
          tag="Boards"
          heading="Multi-Board Support"
          description="Start with the classics and scale up: Uno, Nano, Mega, ESP32, and more over time."
          delay={160}
        />

        <FeatureCard
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4.5 12.2c2.4-2.4 5.1-3.6 7.5-3.6s5.1 1.2 7.5 3.6" />
              <path d="M7.2 14.9c1.6-1.6 3.2-2.4 4.8-2.4s3.2.8 4.8 2.4" />
              <path d="M10 17.7c.8-.8 1.4-1.2 2-1.2s1.2.4 2 1.2" />
              <path d="M12 20h.01" />
            </svg>
          }
          tag="API"
          heading="Web Serial API"
          description="Connect to your board right from the browser and iterate without extra tooling."
          delay={240}
        />

        <FeatureCard
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="12" rx="2" />
              <path d="M8 20h8" />
              <path d="M12 16v4" />
            </svg>
          }
          tag="Debug"
          heading="Serial Monitor"
          description="See what your board is doing in real time. Debug without bouncing between tools."
          delay={320}
        />

        <FeatureCard
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M7 7h10" />
              <path d="M7 12h10" />
              <path d="M7 17h10" />
              <path d="M5 7h.01" />
              <path d="M5 12h.01" />
              <path d="M5 17h.01" />
            </svg>
          }
          tag="Libraries"
          heading="Library Manager"
          description="Search, install, and update libraries without leaving your workflow."
          delay={400}
        />
      </div>
    </section>
  );
}
