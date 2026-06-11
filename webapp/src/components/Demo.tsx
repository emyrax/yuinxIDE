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
    </section>
  );
}
