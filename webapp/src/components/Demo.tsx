export function Demo() {
  return (
    <section className="section demo" id="demo">
      <div className="section-head reveal">
        <h2>See Yuinx in action</h2>
        <p>Watch how Yuinx transforms a hardware idea into working firmware — from circuit analysis to deployed code.</p>
      </div>

      <div className="demo-video reveal" data-reveal-delay="80">
        <div className="demo-video-wrap">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Drxsn-r5z28?si=fSXDgd4ACIL8p2-X"
            title="Yuinx demo video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>

      <div className="demo-stores reveal" data-reveal-delay="160">
        <span className="demo-store-badge" aria-disabled="true">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4.2 3.2c-.2.2-.2.5-.2.9v15.8c0 .4 0 .7.2.9l.1.1 8.6-8.6v-.4L4.3 3.1l-.1.1z" />
            <path d="M14.1 13.1 12 15.2l-2.1-2.1 2.1-2.1 2.1 2.1z" />
            <path d="m20.2 10.7-3.8-2.2-2.7 2.7 2.1 2.1 4.4-2.6z" />
            <path d="m12 15.2 2.1 2.1 3.8-2.2-2.2-1.3" />
            <path d="M12 15.2v0" />
            <path d="M4.3 20.9c.2.2.6.3 1 .1l8-4.6-2.3-2.2" />
            <path d="M4.3 3.1c.2-.2.6-.3 1-.1l8 4.6-2.3 2.2" />
            <path d="M14.1 13.1v0" />
          </svg>
          Google Play
          <span className="demo-store-coming">Coming soon</span>
        </span>

        <span className="demo-store-badge" aria-disabled="true">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M11.67 1.8c.34-.46.8-.8 1.2-.8.04.36-.1.74-.34 1.02-.24.28-.6.5-1 .48-.04-.34.1-.7.34-.98.24-.28.56-.48.88-.52.1.02.2.06.3.1l.02.02c-.68.38-1.13 1.14-1.2 2.02-.08.88.32 1.68.94 2.16-.44.08-.9.08-1.36.08h-.48c-.46 0-.92 0-1.36-.08.62-.48 1.02-1.28.94-2.16-.08-.88-.52-1.64-1.2-2.02l.02-.02c.1-.04.2-.08.3-.1.32.04.64.24.88.52.24.28.38.64.34 1.02 0 0 .4.32.88.32s.88-.32.88-.32z" />
            <path d="M12 6.5c1.5 0 2.5 1 2.5 2.5v7c0 1.5-1 2.5-2.5 2.5s-2.5-1-2.5-2.5V9c0-1.5 1-2.5 2.5-2.5z" />
            <path d="M8 16v1.5c0 2.2 1.8 4 4 4s4-1.8 4-4V16h1v1.5c0 2.8-2.2 5-5 5s-5-2.2-5-5V16h1z" />
            <path d="M6 12h1v4H6zM17 12h1v4h-1z" />
          </svg>
          App Store
          <span className="demo-store-coming">Coming soon</span>
        </span>
      </div>
    </section>
  );
}
