# Yuinx — Design Theme

> A dark, futuristic design system for the hardware builder's IDE.

---

## Brand Identity

Yuinx is an AI-powered IDE for firmware and hardware development. The brand fuses:

- **Cyberpunk precision** (neon cyan, dark backgrounds, grid lines)
- **Hardware authenticity** (breadboard visuals, PCB traces, oscilloscope waves)
- **Developer clarity** (monospace typography, clean layout, glass panels)

**Tone**: Confident, builder-first, futuristic but grounded. Speaks to both solo makers and enterprise hardware teams.

**Tagline**: *Build hardware at the speed of AI.*

---

## Color System

### Dark Theme (only — no light mode)

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#02040a` | Page background |
| `--bg-soft` | `#0a1226` | Soft background variant |
| `--glass-bg` | `rgba(2,4,10,0.55)` | Glass panel backgrounds |
| `--glass-border` | `rgba(0,242,255,0.10)` | Subtle glass borders |
| `--glass-glow` | `rgba(0,242,255,0.06)` | Glass shadow glow |
| `--line` | `rgba(0,242,255,0.15)` | Dividers, subtle borders |
| `--line-strong` | `rgba(0,242,255,0.50)` | Stronger borders |
| `--text` | `#E0F7FA` | Primary text (near-white cyan) |
| `--text-soft` | `#8ab4c4` | Secondary text |
| `--text-muted` | `#5a7a8a` | Tertiary / footnote text |
| `--accent` | `#00F2FF` | Primary accent — cyan |
| `--accent-2` | `#0066FF` | Secondary accent — blue |
| `--accent-gradient` | `135deg, #00A3FF, #00FFD1` | Gradient accents |
| `--shadow-glow` | `rgba(0,242,255,0.4)` | Glow shadow |

### Application

- **Background**: Deep navy-black (`--bg`). Never pure white.
- **Accents**: Cyan (`--accent`) draws attention — used for CTAs, active states, highlights.
- **Glass**: `--glass-bg` + `--glass-border` creates frosted glass cards.
- **Text hierarchy**: Primary (`--text`) for headings/body, soft for supporting text, muted for captions.

---

## Typography

| Token | Font Stack | Usage |
|---|---|---|
| `--font-display` | `'Inter', 'Space Grotesk', sans-serif` | Headings (h1–h3) |
| `--font-body` | `'Space Grotesk', 'Inter', sans-serif` | Body copy, labels |
| `--font-mono` | `'IBM Plex Mono', ui-monospace, Menlo, monospace` | Code, badges, pills |

### Size Scale

- **h1**: `clamp(2.5rem, 5vw, 3.5rem)` — Hero headline
- **h2**: `clamp(1.6rem, 3vw, 2.2rem)` — Section headings
- **h3**: `1.25rem` — Card headings
- **Body**: `0.92rem–1rem` — Paragraphs, feature descriptions
- **Small**: `0.72rem–0.82rem` — Badges, meta, captions
- **Mono**: `0.72rem` — Code badges, stat pills

### Usage Guidelines

- Headings use `--font-display` with tight letter-spacing on uppercase elements.
- Body text uses `--font-body` with generous line-height (1.5–1.6).
- Monospace is reserved for code-like elements, badges, and pill labels.
- Never mix more than 2 font families in a single component.

---

## Spacing & Layout

### Max Content Width

- `--max-width: 1140px` — standard content constraint
- `>=1440px` screens: `--max-width: 1320px` with scaled typography

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius` | `14px` | Default cards, buttons |
| `--radius-lg` | `20px` | Modal cards, feature containers |

### Section Spacing

- **Desktop**: `padding: 60px 0 40px` per section, with `24px` gap between items.
- **Tablet (768px)**: `padding: 40px 0 30px`.
- **Mobile (640px)**: `padding: 20px 18px` inside rounded cards, sections spaced `14px` apart.

### Glass Panel Pattern

```css
.glass-panel {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: 0 0 40px var(--glass-glow);
  backdrop-filter: blur(6px);
}
```

Used for: nav, hero card (mobile), feature cards, form shells, modals.

---

## Component Patterns

### Navigation (`TopNav`)
- Fixed/sticky at top, glass panel background.
- Brand logo left, nav links center, waitlist CTA right.
- On scroll, `.scrolled` class applied — slightly more opaque background with stronger border.
- Mobile: compact rounded bar, only logo + waitlist button visible.

### Buttons

| Variant | Class | Style |
|---|---|---|
| Primary | `.btn-primary` | `--accent` background, dark text, glow shadow |
| Waitlist | `.btn-waitlist` | Primary + animated shine overlay |
| Outline | `.btn-outline` | Glass panel style, transparent bg, subtle border |

- All buttons: `48px` min-height, `14px` radius, `0.92rem` font.
- Mobile: `52px` min-height, larger tap target.

### Feature Cards (`FeatureCard`)
- Dark glass panel with icon, tag (mono badge), heading, description.
- Desktop: 3-column grid. Tablet: 2-column. Mobile: stacked single column.
- Icons are inline SVG (currentColor) — always `16px` viewbox.
- Scroll-reveal animation with staggered delay.

### Workflow Steps (`WorkflowStep`)
- Horizontal timeline with arrow connectors between steps.
- 5 steps: Idea → Context → Build → Debug → Ship.
- Desktop: single row. Tablet: 2-column wrap. Mobile: vertical list.
- Each step has an icon, heading, label badge, and description.

### Builder Showcase
- Interactive demo with typing animation cycling through example prompts.
- 6 mode panels: Generate, Add Part, Breadboard, Schematic, PCB, Simulate, Serial Monitor.
- Decorative hardware visuals (breadboard with LED/resistor/chip, PCB traces, oscilloscope wave).
- Mobile: simplified typing-only view (breadboard/PCB art hidden).

### Modal (Waitlist)
- Centered overlay with backdrop blur.
- Fixed `max-width` that scales with viewport (440px → 600px).
- Bottom sheet on mobile (full-width, sticky submit button).
- Form fields: Name, Email, Role, Use Case, Notes.
- Honeypot field (hidden) for bot protection.

---

## Animation & Motion

| Animation | Trigger | Duration | Easing |
|---|---|---|---|
| Scroll reveal | IntersectionObserver | 0.6s | ease-out |
| Typing effect | BuilderShowcase mount | cycle 4s | steps |
| Hero fade-up | Page load | 0.8s | ease-out |
| Modal in | Button click | 0.3s | ease-out |
| Pulse dot | Live indicator | 1.5s infinite | ease-in-out |

### `prefers-reduced-motion`

All animations and transitions are disabled when `prefers-reduced-motion: reduce` is active:
- Scroll reveals appear immediately (opacity: 1, transform: none).
- Typing effect stops.
- Modal appears without animation.
- Scroll-behavior set to `auto`.

---

## Responsive Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| **Ultrawide** | `>=1440px` | `--max-width` → 1320px, larger typography (h1 up to 4.5rem), 3-column features, 2-column form fields |
| **Desktop** | `1040px–1439px` | Default layout, 3-column features, 5-step workflow row |
| **Small desktop** | `860px–1039px` | Workflow arrows hidden, actions row scrollable, nav links hidden |
| **Tablet** | `768px–859px` | 2-column workflow, 2-column features, single-column layout begins |
| **Mobile** | `<=640px` | Single column, hidden desktop elements, bottom-sheet modal, rounded cards, sticky submit button |

---

## Accessibility

- **Form validation**: `aria-invalid` on error, `role="status"` + `aria-live="polite"` on status messages.
- **Focus**: `.btn:focus-visible` outline included on all interactive elements.
- **Modals**: `aria-modal="true"`, `aria-hidden` toggle, focus trap on input, Escape key closes.
- **Motion**: Full `prefers-reduced-motion` support.
- **Body scroll lock**: `body.modal-open` prevents background scrolling.
- **Touch targets**: All interactive elements ≥44px at all sizes (52px on mobile).
- **Contrast**: Text/background contrast ratio ≥7:1 for primary text, ≥4.5:1 for soft text.

---

## Asset Conventions

- Images and SVGs stored in `public/assests/` (intentional typo — do not rename).
- Inline SVG for icons (currentColor fill, inherits text color).
- Component illustrations (breadboard, schematic, PCB) are pure CSS/HTML — no external assets.
- Product screenshots are JPG format in `public/assests/`.
