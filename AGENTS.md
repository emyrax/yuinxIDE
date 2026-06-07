# yuinx.app — agent instructions

All code is in `webapp/`. Root directory has nothing else.

## Commands (run from `webapp/`)

| Action | Command |
|--------|---------|
| Dev server | `npm run dev` |
| Full build | `npm run build` (runs `tsc -b` THEN `vite build`) |
| Lint | `npm run lint` (ESLint flat config) |
| Preview prod build | `npm run preview` |

No test framework or Prettier are installed.

## Tech stack

- **React 19 + TypeScript ~6.0 + Vite 8** (single-page landing, no router)
- **Firebase Realtime Database** (modular SDK v12, no Auth, no Firestore)
- **CSS**: single `src/index.css` (~3100 lines, hand-written, no CSS modules/Tailwind)
- **Deploy**: Vercel (`framework: "vite"` in vercel.json, output `dist/`)

## Quirks & gotchas

- `"verbatimModuleSyntax": true` in tsconfig — use `import type { Foo }` for type-only imports.
- `"erasableSyntaxOnly": true` (TS 6+) — no enums, namespaces, or parameter properties.
- `public/assests/` typo is **intentional and consistent** (not "assets"). Asset URLs use `./assests/...`.
- Hooks use direct DOM queries (`document.querySelector`, `classList`) instead of React refs/state.
- No `.env` — Firebase config is hardcoded in `src/lib/firebase.ts`.
- Waitlist form uses a honeypot field (`name="company"`, hidden from users).

## Firebase RTDB

- Paths: `/waitlist`, `/waitlistCount`, `/waitlistEmails/{emailLower}`.
- No Auth — all reads/writes depend on **Firebase Realtime Database Rules** being set to public/true.
- Required index: `"waitlist": { ".indexOn": ["email"] }`.
- Atomic email dedup via `runTransaction` on `/waitlistEmails/{emailLower}` (gracefully degrades if rules block it).

## Architecture notes

- **Single entry**: `src/main.tsx` → `App.tsx` (no lazy loading, no routing).
- **3 layers per page section**: `src/components/`, `src/hooks/` (DOM-manipulation hooks), `src/lib/` (pure utils).
- Form status handled via `data-form-status` elements, not React state.
- Waitlist count animated via `setCount()` in `countUtils.ts` (appends `digit-char` spans).
- `npm run build` must run both `tsc -b` AND `vite build` (separate steps, order matters).
