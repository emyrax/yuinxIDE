export function Contact() {
  return (
    <section className="section contact reveal" id="contact">
      <div className="contact-card">
        <div className="contact-head">
          <h2>Contact</h2>
          <p>Reach Yuinx across email, social, and docs.</p>
        </div>

        <div className="contact-actions">
          <a
            className="contact-link"
            href="https://yuinx.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./assests/yuinxLogo_Trans.jpg" alt="" aria-hidden="true" />
            <span className="contact-link-copy">
              <strong>Website</strong>
              <span>Yuinx</span>
            </span>
          </a>

          <a
            className="contact-link"
            href="mailto:emyrax.ai@gmail.com"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
              <path d="m5.5 8 6.5 5 6.5-5" />
            </svg>
            <span className="contact-link-copy">
              <strong>Email</strong>
              <span>emyrax@yuinx.vercel.app</span>
            </span>
          </a>

          <a
            className="contact-link contact-link-instagram"
            href="https://www.instagram.com/yuinx_ai/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span className="contact-link-copy">
              <strong>Instagram</strong>
              <span>@yuinx_ai</span>
            </span>
          </a>

          <a
            className="contact-link contact-link-x"
            href="https://x.com/yuinx_ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4.5 4.5h4.4l10.6 15h-4.4z" />
              <path d="M19.5 4.5 4.5 19.5" />
            </svg>
            <span className="contact-link-copy">
              <strong>X</strong>
              <span>@yuinx_ai</span>
            </span>
          </a>

          <span className="contact-link contact-link-muted" aria-disabled="true">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 4.5h8.5L19 8v11.5H7z" />
              <path d="M15.5 4.5V8H19" />
              <path d="M10 12h6" />
              <path d="M10 15h6" />
            </svg>
            <span className="contact-link-copy">
              <strong>Yuinx Docs</strong>
              <span className="contact-soon">Coming soon</span>
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
