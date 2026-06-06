# Yuinx web.1v

Static landing page for Yuinx (AI-powered Arduino IDE).

## Structure

```
yuinx.app/
  AGENTS.md
  web.1v/
    index.html   -- main landing page (vanilla HTML)
    app.js       -- waitlist form, animated builder showcase, nav/reveal
    styles.css   -- all styles (~3300 lines)
    assests/     -- images (brand logos, IDE screenshot, part SVGs)
```

No build step, no package manager, no tests.

## Dev workflow

There are no build, lint, test, or typecheck commands. Just open `index.html` in a browser or serve with any static file server:

```
npx serve web.1v
```

## Key facts

- **Waitlist form** in `app.js` POSTs JSON to `/api/waitlist` and GETs `/api/waitlist/count` — these are external endpoints not in this repo.
- **Animation logic** (`setupBuilderShowcase`) cycles through example prompts; uses `IntersectionObserver` for scroll reveals.
- **Mobile-responsive** with explicit `.mobile-only` / `.desktop-only` classes.
- **All asset references** use the misspelled path `./assests/` (not `./assets/`). This is intentional — the directory is named `assests/` on disk.
- No external JS dependencies, no CDN scripts except Google Fonts and Cloudflare beacon.
