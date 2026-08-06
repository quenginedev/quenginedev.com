---
name: blog-site-copy-style
description: Writes and edits ASD-STE100-inspired blog posts and user-facing site copy for this project. Use when drafting or rewriting content in content/blog/, prose strings in data/portfolio.ts, data/services.ts, data/hire.ts, or frontmatter fields (title, description, tldr, ctaHeadline, ctaBody, ctaLabel). Triggers on blog posts, site copy, STE style, or style guide requests.
---

# Blog and Site Copy Style

ASD-STE100-inspired rules for clear, unambiguous prose. Full reference: [context/STYLE-GUIDE.md](../../../context/STYLE-GUIDE.md).

## Scope

| Applies to | Does not apply to |
|------------|-------------------|
| `content/blog/` | Vue component labels |
| User-facing prose in `data/portfolio.ts`, `data/services.ts`, `data/hire.ts` | Harness tooling, config, agent rules |

## Voice by surface

| Surface | Voice |
|---------|-------|
| Blog body | Impersonal: **Teams**, **Developers**, **The build**. No "I" or "we" as author voice. |
| Blog CTAs (`ctaHeadline`, `ctaBody`, `ctaLabel`) | First person **I**: "I scope…", "Message me on LinkedIn". |
| Service and hire pages (`data/services.ts`, `data/hire.ts`, `/hire`, `/services/*`) | First person **I**. Direct conversion tone. No "we". |

## Punctuation

Do not use em dashes (`—`) or en dashes as separators in user-facing prose. Use a comma, period, colon, or hyphen instead.

| Avoid | Use |
|-------|-----|
| `edits—not a pitch` | `edits, not a pitch` |
| `Work With Me — Backend` | `Work With Me: Backend` |
| `2–3 days` (en dash) | `2-3 days` |

## Core rules

### Sentence length

| Text type | Max words |
|-----------|-----------|
| Procedural (steps, CTAs) | 20 |
| Descriptive (explanations) | 25 |

- One topic per sentence. Split run-ons instead of chaining with "and", "which", "because".
- At most six sentences per paragraph. Use lists for multiple distinct points.

### Active voice

Use active voice. In procedures, use imperative verbs ("Run the test", "Add the rule").

Passive is OK only when the agent is unknown or irrelevant ("The build fails when dependencies conflict").

### Controlled vocabulary

One word per concept. No synonym rotation.

| Concept | Use | Avoid |
|---------|-----|-------|
| Start | start | begin, commence, initiate |
| Use | use | utilize, employ, leverage |
| Show | show | demonstrate, illustrate |
| Fix | fix | rectify, resolve, remediate |
| Test | test | verify, validate (unless validation is the concept) |

Also: no contractions ("do not", not "don't"); no slang or idioms; no more than three nouns in a row.

### Domain terms

Keep precise software terms (API, CI, agent, orchestrator, validation, TypeScript, pull request, etc.). Match exact spelling from code and tool names. Explain once in plain language if the audience is mixed.

## Preserve when rewriting

Change **prose only**. Do not alter:

- File names, URL slugs
- Fenced code blocks and inline code
- Markdown links (URLs must stay functional)
- Frontmatter keys: `date`, `tags`, `cover`

Frontmatter fields that **must** follow this guide: `title`, `description`, `tldr`, `ctaHeadline`, `ctaBody`, `ctaLabel`.

## Workflow

### New blog post

1. Define one main idea; outline problem → approach → example → takeaway
2. Draft blog body in impersonal, active voice with sentence limits above
3. Set frontmatter: title ≤12 words, description ≤25 words per sentence, scan-friendly `tldr`
4. Set CTA fields in first person **I**
5. Final review: search for em dashes, " we ", passive ("is done", "must be"); read aloud and shorten pauses
6. Confirm `pnpm build` passes

### Rewrite existing content

1. Apply prose rules to body and STE frontmatter fields
2. Leave code blocks, links, slugs, and `date`/`tags`/`cover` unchanged
3. Compare before/after against examples in [context/STYLE-GUIDE.md](../../../context/STYLE-GUIDE.md)

## Quick before/after

**Voice (blog body): before:** I've watched teams ignore diagrams under deadline pressure.

**Voice (blog body): after:** Teams often ignore diagrams under deadline pressure.

**Voice (service page): before:** Bring in a GTM engineering contractor who designs pipelines.

**Voice (service page): after:** I design and ship production GTM automation pipelines.

**Punctuation: before:** Missed follow-ups stack up — HubSpot records drift.

**Punctuation: after:** Missed follow-ups stack up. HubSpot records drift.

**Length: before:** Passive artifacts are valuable for onboarding because they answer what the team decided, but they do not answer whether a commit respected that decision.

**Length: after:** C4 models and ADRs record what the team decided. They do not show whether a commit broke that decision at edit time.
