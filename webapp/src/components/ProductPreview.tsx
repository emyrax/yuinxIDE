export function ProductPreview() {
  return (
    <section className="section product-preview" id="product">
      <div className="section-head reveal">
        <h2>What Yuinx looks like</h2>
        <p>Code, components, and circuit context in one IDE.</p>
      </div>

      <div
        className="product-frame product-shot reveal"
        data-reveal-delay="60"
        aria-label="Yuinx IDE screenshot"
      >
        <img
          src="./assests/yunix_IDE_screenshot.jpg"
          alt="Yuinx IDE screenshot showing code editor, Analyze Verify Upload actions, and breadboard circuit view"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <p className="product-mobile-note mobile-only reveal" data-reveal-delay="120">
        Full editor, circuit view, and hardware context in a single workspace.
      </p>
    </section>
  );
}
