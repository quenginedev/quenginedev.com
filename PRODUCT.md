# Product

## Register

brand

## Project

**quenginedev** — Ernest Hayford's developer portfolio and technical blog. A Nuxt 3 site (Cloudflare Pages) showcasing full-stack engineering work, architecture depth, and long-form writing. Design is the product: visitors judge craft from typography, motion, and cohesion across homepage and blog surfaces.

## Users

- **Hiring managers & tech leads** evaluating senior full-stack fit for fintech, distributed systems, and platform work
- **Engineering peers** scanning architecture depth, stack breadth, and blog posts on systems and AI engineering
- **Collaborators & clients** finding contact paths, résumé, and proof of shipped systems

Context: quick scan on mobile or desktop, often between meetings; they need signal fast (role, scope, credibility) without template noise.

## Goals

- Communicate senior full-stack credibility with concrete outcomes (HustleSasa scale, module federation, serverless, edge)
- Feel premium and intentional — not another AI-generated dev portfolio
- Unify homepage and blog under one visual system (Accra Signal Brutalism)
- Preserve SEO, nav labels, and existing content structure while elevating craft

Success: cohesive dark-tech aesthetic, WCAG AA contrast, reduced-motion respect, zero AI-slop tells (per validation contract).

## Brand Identity — Accra Signal Brutalism

**Name rationale:** *Accra* anchors origin and context (Ghana, West Africa tech hub) without performative locale strips. *Signal* reflects the site's voice: direct engineering signal over marketing fluff. *Brutalism* describes the visual grammar — full borders, 1px grid seams, uppercase Syne display, teal/gold accents on near-black surfaces, HUD-corner navigation, no soft SaaS card mush.

**Personality (3 words:** mechanical, grounded, precise)

**Voice:** Confident practitioner. Outcome-led copy. No hype adjectives. Technical specificity over generic "passionate developer" filler.

**Emotional target:** Trust through craft — "this person ships production systems and cares how things look and read."

## Anti-references

- Generic AI dev portfolio (Inter + purple gradient, identical icon-card grids, hero metrics)
- Editorial-magazine lane (Fraunces italic, ruled columns, pseudo-editorial eyebrows on every section)
- SaaS landing clichés (hero-metric blocks, gradient text, glassmorphism cards)
- Performative locality (hero "📍 Accra" strips, map pins, globe-tourism cues)
- Scroll guilt cues ("Scroll to enter", bouncing chevrons as default grammar)
- Custom cursor overlays and decorative mono-as-tech costume typography
- Em-dashes in visible UI copy

## Design Principles

1. **Preserve, don't rebrand** — evolve Accra Signal Brutalism; tokens and voice stay recognizable across iterations
2. **Show systems thinking** — layout reflects engineering (grids, lanes, timelines) not marketing templates
3. **Restrained motion** — GSAP reveals and one marquee belt earn their place; no uniform fade-on-every-section reflex
4. **Practice what you preach** — portfolio quality should match the engineering standards described in copy
5. **Blog = same house** — prose, cards, and code blocks inherit portfolio tokens; readability beats decoration

## Scope

### In scope

- Homepage (`pages/index.vue`, components, `assets/css/portfolio.css`)
- Blog index, post, tag pages (`pages/blog/*`, `components/blog/*`, `assets/css/blog.css`)
- Layout (`layouts/default.vue`, `app.vue`, `components/HudNav.vue`)
- Design token refinement in CSS variables
- Motion polish (SectionReveal, scroll, 3D/canvas where appropriate)
- PRODUCT.md and DESIGN.md (this init)

### Out of scope

- Backend / API changes (`server/`, wrangler)
- New blog posts (`content/blog/*.md` except typo fixes)
- Vuetify overhaul (minimal touch unless blocking)
- URL / nav label changes (SEO preservation)
- Environment / secrets (`.env`)

## Constraints

- **Baseline:** build on current uncommitted WIP; no revert
- **Redesign mode:** preserve Accra Signal Brutalism
- **Design-taste dials (dev portfolio):** `DESIGN_VARIANCE ~7`, `MOTION_INTENSITY ~6`, `VISUAL_DENSITY ~4` — asymmetric brutalist grids allowed; motion purposeful not cinematic; airy section rhythm without cockpit density
- **Implementation:** ponytail full — reuse tokens and components before adding new abstractions
- **Approved removals (future tasks):** custom cursor (`useCustomCursor.ts`); hero locale strip (`hero__location`); keep footer + blog author Accra context
- **Marquee:** exactly one restrained capabilities belt sitewide (homepage); no second marquee belt
- **Section numbers:** decorative `section-index` eyebrows max 1 per 3 sections

## Accessibility & Inclusion

- Target WCAG 2.1 AA for body text (≥4.5:1 contrast) and large text (≥3:1)
- `prefers-reduced-motion: reduce` — disable marquees, scroll hints, magnetic hover; instant or crossfade reveals
- System color mode via `@nuxtjs/color-mode` (`preference: system`, fallback dark)
- Coarse pointer: no custom cursor dependency
- Prose line length capped (~65–75ch in blog article column)
