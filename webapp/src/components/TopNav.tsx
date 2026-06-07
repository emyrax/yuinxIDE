export function TopNav() {
  return (
    <header className="top-nav" id="topNav">
      <a className="brand" href="/" aria-label="Yuinx home">
        <img
          src="./assests/brandYuinxTrans.jpg"
          alt="Yuinx logo"
        />
      </a>

      <nav className="nav-links" aria-label="Primary">
        <a href="#home">Home</a>
        <a href="#product">Product</a>
        <a href="#features">Features</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="nav-actions">
        <a href="/auth" className="btn btn-ide">
          Open Yuinx IDE <span className="btn-ide-beta">Beta</span>
        </a>

        <button
          type="button"
          className="btn btn-primary btn-waitlist nav-waitlist"
          data-open-waitlist
        >
          <span className="btn-label">
            <span className="nav-waitlist-full">Join Waitlist</span>
            <span className="nav-waitlist-short">Waitlist</span>
          </span>
        </button>
      </div>
    </header>
  );
}
