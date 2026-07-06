# Design System — Accra Signal Brutalism

Visual specification for quenginedev. Tokens live in `assets/css/portfolio.css`; blog extends via `assets/css/blog.css`. Do not invent new palette values — refine within this system.

## Color Strategy

**Committed dark-tech:** near-black surfaces, teal primary accent (~10–30% of interactive emphasis), gold secondary accent for display strokes and highlights. Light mode inverts surfaces while keeping teal/gold roles.

### Core tokens (`:root` / dark default)

| Token | Value | Role |
|-------|-------|------|
| `--bg` | `#0a0c0f` | Page background |
| `--bg-elevated` | `#0f1216` | Grid cells, lane cards, elevated panels |
| `--bg-panel` | `rgba(15, 18, 22, 0.92)` | HUD panels, overlays |
| `--text` | `#e8f0ed` | Primary ink (mint-tinted white) |
| `--text-muted` | `rgba(232, 240, 237, 0.55)` | Body secondary |
| `--text-dim` | `rgba(232, 240, 237, 0.32)` | Labels, meta, marquee idle |
| `--accent` | `#1a6b5c` | Teal base |
| `--accent-bright` | `#22a088` | Links, icons, hover emphasis |
| `--accent-glow` | `rgba(26, 107, 92, 0.45)` | CTA shadow glow |
| `--gold` | `#c9a227` | Gold base |
| `--gold-bright` | `#e8c547` | Display accent lines, hero name accent |
| `--gold-dim` | `rgba(201, 162, 39, 0.55)` | Section-index stroke |
| `--gold-glow` | `rgba(201, 162, 39, 0.35)` | Panel hover glow |
| `--border` | `rgba(232, 240, 237, 0.12)` | 1px grid seams |
| `--border-strong` | `rgba(232, 240, 237, 0.22)` | Hover borders |
| `--grid-line` | `rgba(232, 240, 237, 0.06)` | Fixed grid overlay |

### Light mode (`html.light`)

| Token | Value | Notes |
|-------|-------|-------|
| `--bg` | `#f4f7f5` | Cool mint paper |
| `--bg-elevated` | `#ffffff` | Cards |
| `--bg-panel` | `#ffffff` | Panels solid |
| `--text` | `#080c0a` | Near-black ink |
| `--text-muted` | `rgba(8, 12, 10, 0.78)` | Stronger than dark-mode muted for contrast |
| `--text-dim` | `rgba(8, 12, 10, 0.55)` | Labels |
| `--accent` / `--accent-bright` | `#1a6b5c` / `#126b58` | Teal preserved |
| `--border` | `rgba(8, 12, 10, 0.14)` | Darker seams on light |

Vuetify theme mirrors surfaces: dark `#0A0C0F` / `#0F1216`; light `#F2F6F4` / `#FFFFFF` (`nuxt.config.ts`).

### Semantic component tokens

Pillar/orbit HUD tokens (`--orbit-pill-*`, `--pillar-*`) remap per mode in `portfolio.css`. Blog prose maps Tailwind typography to CSS vars (`.blog-prose`).

### Contrast rules

- Body text uses `--text` on `--bg` or `--bg-elevated`; avoid `--text-dim` for paragraphs
- Light mode: bump muted text opacity vs dark (already in CSS)
- Placeholders and captions: still ≥4.5:1 where used as readable copy
- Selection: `--accent` fill, `--bg` text

## Typography

### Families

| Role | Stack | Source |
|------|-------|--------|
| Display | `'Syne', system-ui, sans-serif` | `--font-display` |
| Body | `'Instrument Sans', system-ui, sans-serif` | `--font-body` |

Loaded via `@nuxtjs/google-fonts` (weights Syne 400–800, Instrument Sans 400–700, `display: swap`).

**Note:** Syne and Instrument Sans are committed brand fonts (identity-preservation over impeccable reflex-reject list).

### Scale & treatment

| Element | Spec |
|---------|------|
| Body | `clamp(0.9375rem, 1.1vw, 1.0625rem)`, line-height 1.6 |
| `.font-display` | weight 700, letter-spacing -0.03em, line-height 0.92, uppercase |
| Hero name | Syne 800, `clamp(2.75rem, 11vw, 9rem)`, letter-spacing -0.04em (floor) |
| Section index | `clamp(3rem, 8vw, 6rem)`, stroke via `-webkit-text-stroke: 1px var(--gold-dim)` |
| `.label-caps` | 0.6875rem, weight 600, letter-spacing 0.18em, uppercase, `--text-dim` |
| Section leads | max-width 42rem, `clamp(1rem, 1.8vw, 1.25rem)`, line-height 1.65 |
| Blog article title | `clamp(2rem, 4.5vw, 2.75rem)`, letter-spacing -0.03em |
| Blog prose | max-width 48rem article column; headings Syne, body Instrument Sans |

Hero display ceiling: max clamp ≤ 9rem on name (within 6rem guideline for generic heroes — intentional brutalist exception for surname stack).

Use `text-wrap: balance` on major headings where supported; cap prose at ~65–75ch.

## Spacing & Layout

### Spacing scale

| Token | Value |
|-------|-------|
| `--space-xs` | 0.5rem |
| `--space-sm` | 0.75rem |
| `--space-md` | 1rem |
| `--space-lg` | 1.5rem |
| `--space-xl` | 2rem |
| `--space-2xl` | 3rem |
| `--space-3xl` | 4rem |
| `--space-4xl` | 6rem |

### Layout tokens

| Token | Value | Use |
|-------|-------|-----|
| `--max-content` | 1280px | Section max-width |
| `--section-pad` | `clamp(2.5rem, 8vw, 8rem)` | Vertical section rhythm |
| `--hud-offset` | `clamp(0.75rem, 2.5vw, 1.75rem)` | Fixed HUD inset |
| `--main-pad-top` | `calc(var(--hud-offset) + 5.5rem)` | Clear fixed nav |
| `--main-pad-inline` | `clamp(1rem, 4vw, var(--hud-offset))` | Horizontal gutter |

### Patterns

- **Brutalist grid seams:** `gap: 1px; background: var(--border)` on container; children `background: var(--bg-elevated)`
- **Panels:** `.panel` — `--bg-panel`, 1px `--border`, hover `--border-strong`; `.panel--glow` gold border on hover; `.panel--accent` teal border tint
- **Sections:** `.section` centered, `--section-pad` block padding, adjacent sections separated by `border-top: 1px solid var(--border)`
- **HUD nav:** fixed corners, z-index 100, `.hud-panel` inline flex chips
- **Hero:** full-viewport (`100dvh`) 3D cluster + content block below fold line
- **Bento projects:** 12-column grid with intentional span variation (not uniform cards)
- **Blog cards:** `.blog-card` panel, 2px radius (minimal, not pill-soft)

Avoid nested cards. Prefer grid seams over floating shadow cards.

## Motion

### Libraries & integration

- **GSAP + ScrollTrigger:** `SectionReveal.vue` — `[data-reveal]` children animate `y: 48 → 0`, `opacity: 0 → 1`, duration 0.9s, `ease: power3.out`, stagger 0.06–0.1, `scrollTrigger.once: true`
- **Lenis + GSAP ticker:** smooth scroll (`useSmoothScroll.ts`) when perf profile allows
- **CSS marquees:** `.capabilities-belt__track` (28s linear), `.marquee-track` (40s linear) — **sitewide cap: one capabilities belt only**
- **Micro:** panel/hover transitions 0.25–0.35s `--ease-out-expo`; HUD progress fill 0.08s linear
- **3D hero:** `Scene3D` + `TechOrbit` scroll-linked (essential brand moment; degrade gracefully)

### Easing

| Token | Curve |
|-------|-------|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |

No bounce/elastic. Prefer transform/opacity over layout properties.

### Reduced motion (`prefers-reduced-motion: reduce`)

Already in `portfolio.css`:

- Stop `.marquee-track` and `.capabilities-belt__track` animations
- Stop `.hero__scroll-hint` pulse
- Reset `[data-reveal]` to visible (no translate)
- Disable `.magnetic` transition

**Required for new motion:** mirror this policy; GSAP paths should check `matchMedia('(prefers-reduced-motion: reduce)')` or rely on CSS fallback + skip init.

### Reveal safety

Content must be readable before GSAP fires. CSS fallback: `[data-reveal] { transform: translateY(2rem) }` → `.reveal-ready [data-reveal] { transform: none }`. Never gate visibility solely on animation completion.

## Light / Dark Mode

- **Module:** `@nuxtjs/color-mode`, `classSuffix: ""`, `preference: "system"`, `fallback: "dark"`, `storageKey: "quenginedev-color-mode"`
- **Classes:** `html.dark` / `html.light` on document; portfolio tokens override in `html.light { ... }`
- **Toggle:** HUD theme control; dark hover uses `mix-blend-mode: difference` on `.hud-panel`
- **Blog code highlight:** Shiki `material-theme-darker` (dark) / `github-light` (light) per `nuxt.config.ts`
- **Grid overlay:** fixed 48px grid, radial mask — works both modes via `--grid-line`

Both modes must apply tokens consistently (validation A-08).

## Anti-Slop Bans (A-07 aligned)

Banned sitewide unless explicitly approved in PRODUCT.md:

| Tell | Status |
|------|--------|
| Scroll entry cues ("Scroll to enter", bouncing hints) | Remove |
| Hero locale strip | Remove; footer/blog author Accra OK |
| Custom cursor overlay | Remove |
| Performative uppercase eyebrows on every section | Max 1 deliberate label system; not per-section grammar |
| Section-number eyebrows (`01`, `02`…) | Max 1 per 3 sections |
| More than one marquee belt | One capabilities belt only |
| Side-stripe accent borders (>1px left/right) | Banned |
| Gradient text (`background-clip: text`) | Banned |
| Glassmorphism as default | Banned |
| Hero-metric SaaS template | Banned |
| Identical icon+heading+copy card grids | Banned — use bento/lanes/timeline |
| Em-dashes in visible UI copy | Banned (meta/SEO excluded) |

## Z-Index Scale

| Layer | z-index |
|-------|---------|
| Grid overlay | 0 |
| Main content | 1 |
| Hero orbit cluster | 1–3 (internal) |
| HUD nav | 100 |
| Custom cursor (deprecated) | 9999 — remove |

## Imagery

- Hero: WebGL/canvas (`Scene3D`, `FluidCanvas`) as primary visual — not stock photography
- Blog: 16:9 covers, 1px border, 2px radius
- Avatar: `/me.png`, circular in blog author block

## File Map

| File | Responsibility |
|------|----------------|
| `assets/css/portfolio.css` | Token source, homepage components |
| `assets/css/blog.css` | Blog layout + prose overrides |
| `nuxt.config.ts` | Fonts, colorMode, Vuetify surface colors, Shiki themes |
| `components/SectionReveal.vue` | GSAP scroll reveals |
| `data/portfolio.ts` | Copy and content structure (not visual tokens) |
