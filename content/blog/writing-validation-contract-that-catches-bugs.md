---
title: Writing a Validation Contract That Actually Catches Bugs
description: >-
  How to write implementation-agnostic assertions with stable IDs, verification
  methods, and edge cases—so your mission harness blocks "looks done" handoffs
  before they ship.
date: 2026-06-23
tags:
  - agents
  - missions
  - cursor
  - validation
  - harness
cover: /blog/validation-contract-cover.jpeg
---

In a [multi-agent harness](/blog/building-multi-agent-harness), the **validation contract** is the gate between "the worker said it's done" and "it's actually done." A weak contract lets bugs through with a clean handoff. A strong one turns vague success criteria into **checkable behavior** that workers, orchestrators, and validators can disagree about—with evidence.

This post is the follow-up I wish I'd had when I wrote my first contract: what makes an assertion *catch* something instead of just *documenting intent*.

## What the contract is for

`validation_contract.md` lives in `.missions/` (gitignored by default). It is written **after scope is stable** and **before any application code**. Each assertion gets:

- A **stable ID** (`A-01`, `A-02`, …) referenced by `active_plan.md` tasks and worker handoffs
- A **behavior statement** — what the system must do, not how it's implemented
- A **verification method** — command, test, or manual check that produces evidence

The orchestrator does not accept a task until every linked assertion is **met**, with proof. Failed or unverified assertions require a remediation task—not a note in chat.

That only works if the assertions were written to fail when the behavior is wrong.

## Anatomy of a catchable assertion

Use this shape every time:

```markdown
### A-12 — Draft exclusion

Published blog queries exclude posts with `draft: true` in frontmatter.
Posts without a `draft` field remain visible.

**Verify:** Add `draft: true` to a test post (or inspect query filter);
index and RSS omit it.
```

Why this catches bugs:

| Property | What it does |
|----------|----------------|
| **Named behavior** | "Draft exclusion" — you know what broke when A-12 fails |
| **Observable outcome** | Published listings omit drafts; default is visible |
| **Edge case explicit** | Missing `draft` field ≠ hidden — prevents the classic `if (draft)` footgun |
| **Verify names an attack** | "Add `draft: true` to a test post" — a validator can actually try it |

Compare with a assertion that *sounds* fine but catches nothing:

```markdown
### A-12 — Draft support

Blog supports draft posts via frontmatter.

**Verify:** Code review.
```

The worker adds `draft` to the schema, never filters it, and marks A-12 met. Users see unfinished posts on `/blog` and in RSS. The contract green-lit a bug.

## Rules that keep assertions honest

### 1. Behavior, not implementation

**Bad:** "Post page uses `useSeoMeta` with `ogImage` from frontmatter."

**Good:** "Blog post pages emit Open Graph meta including title, description, and image."

The first assertion passes when the meta tags are missing but the composable is imported. The second fails until a browser or `curl` shows `og:image` in the output.

Your orchestrator agent should enforce this explicitly: no function names, file paths, or framework hooks as requirements.

### 2. One behavior per ID (split compound assertions)

**Bad:**

```markdown
### A-04 — Blog UX

Blog has nav link, readable typography, and SEO.
**Verify:** Looks good.
```

When A-04 fails, you don't know which third failed. Workers mark it "partial" and move on.

**Good:** Split into A-04 (nav link), A-09 (SEO metadata), A-10 (readability). Each task in `active_plan.md` links to the IDs it owns. Handoffs stay auditable.

### 3. Verification must be executable

Every `**Verify:**` line should answer: *What would I run or click to prove this false?*

| Tier | When to use | Example |
|------|-------------|---------|
| **Automated** | CI-safe, deterministic | `pnpm run build` exits 0 |
| **Command** | Quick, scriptable | `curl -s /feed.xml \| head` shows `<rss` |
| **Manual** | UX, visual, interaction | Click tag → filtered list; copy button fills clipboard |

"We implemented it" is not a verification method. Neither is "worker confirmed."

Automate what you can. For manual checks, name the **steps**, not the vibe.

### 4. Write the failure you're afraid of

Before you finalize an assertion, ask: *If the worker took the laziest correct-looking shortcut, what would break?*

Examples from real missions:

| Fear | Assertion that catches it |
|------|---------------------------|
| Draft posts leak to production | A-12 — explicit filter + "posts without `draft` remain visible" |
| SEO works on homepage but not posts | A-14 — social meta **on post pages**, not "site has OG tags" |
| TOC renders but anchors are dead | A-17 — "anchor links work", not "TOC visible" |
| Related posts show the current post | A-24 — "excluding current post" |
| Build passes locally but not on Cloudflare | A-29 — `pnpm run build` with **existing Cloudflare Pages preset** |

The contract is adversarial input. Write it like someone will try to pass without doing the work.

### 5. Map every success criterion

When I scoped the first blog mission, success looked like:

- HUD nav link to `/blog`
- Index lists posts with cover, date, tags
- Tutorial post covers harness architecture
- Build passes on Cloudflare

Each line became at least one assertion (A-02 through A-11). If a success criterion has no ID, it will be negotiated away under time pressure.

## Good vs weak — side by side

### Blog index (A-02)

```markdown
<!-- Weak -->
### A-02 — Blog page
Blog index exists at /blog.
**Verify:** Route defined.

<!-- Strong -->
### A-02 — Blog index route
Navigating to `/blog` shows a page listing blog posts with at least
title and publication date for each entry.
**Verify:** Manual — open `/blog` in dev or preview; one post visible.
```

The strong version fails if the route 404s, renders empty, or drops dates from the card layout.

### Content coverage (A-06)

Tutorial missions need **substance** assertions, not just "file exists":

```markdown
### A-06 — Tutorial content coverage
The first post includes substantive sections covering: harness motivation,
`/mission` bootstrap, agent roles (orchestrator/worker/validator), mission
artifacts, serial execution gates, architecture diagram reference, and
practical usage tips.
**Verify:** Manual read of markdown source.
```

This caught a handoff where the worker stubbed headings with one-line placeholders. The route worked; the mission didn't.

### Build compatibility (A-11 / A-29)

```markdown
### A-29 — Cloudflare build
`pnpm run build` succeeds with existing Cloudflare Pages preset after all V2 changes.
**Verify:** `pnpm run build` exits 0.
```

Naming the **preset** matters. A generic "build passes" misses Nitro/edge bundling failures that only show up under `cloudflare-pages`.

## How assertions flow through the harness

```text
mission_profile.md (success definition)
        ↓
validation_contract.md (A-01 … A-N, approved)
        ↓
active_plan.md (tasks → assertion IDs)
        ↓
Worker implements ONE task → handoff cites A-IDs + evidence
        ↓
Orchestrator / Validator checks each A-ID → met | partial | failed
        ↓
Failed → remediation task. Partial → no silent accept.
```

Worker handoffs should look like:

```markdown
## Handoff — Task 5: Tags

**Status:** complete
**Assertions addressed:** A-19, A-20
**Evidence:**
- `/blog/tags/agents` lists only posts tagged `agents`
- Index tag chips link to filter route (screenshot or path)
**Recommendation:** accept
```

If evidence is missing for an ID, the assertion stays **unverified**—same as failed until proven.

## Validator pass: use the contract as a script

When a validator agent runs (ideally on a different model family than the worker), it should **not** read worker reasoning. It reads:

- `validation_contract.md`
- Git diff
- Handoff facts only

For each assertion, the validator tries to **disprove** met status:

1. Run automated `**Verify:**` commands
2. For manual assertions, perform the named steps
3. Hunt counterexamples (draft post in RSS, broken prev/next on single-post blog, empty related section)

If your contract has no disprovable steps, the validator has nothing to do except agree—and shared blind spots win.

## Checklist before you approve a contract

- [ ] Every success criterion from `mission_profile.md` maps to ≥1 assertion ID
- [ ] No assertion mentions implementation (files, functions, libraries)
- [ ] Each `**Verify:**` is a command, test, or numbered manual procedure
- [ ] Edge cases are explicit (defaults, empty states, single-item lists, missing optional fields)
- [ ] At least one assertion per feature would fail on a stub or partial implementation
- [ ] Build/deploy assertions match your real target (Cloudflare preset, not generic `npm run build`)
- [ ] `active_plan.md` tasks link to assertion IDs; no orphan IDs, no overloaded tasks

## When to skip the contract

Not every change needs eighteen assertions. A typo fix, a one-line config tweak, or a spike with throwaway code—single agent, no contract. The harness has overhead; use it when **multi-file scope**, **validator value**, or **audit trail** justify the gate.

Use it when "done" is ambiguous and expensive to unwind.

## Closing the loop

After a mission, if an assertion never fired but a bug shipped anyway, **add an assertion** before the next similar mission. If an assertion always passes without thought, merge or sharpen it. Contracts are living specs—not tombstones from the scope phase.

The harness post covered *why* roles and serial gates exist. The contract is *how* those gates know what to block. Write assertions like tests for product behavior: specific, falsifiable, and rude to shortcuts. Your future validator—and your production users—will thank you.

---

**Previously:** [Building a Multi-Agent Harness Orchestration Framework](/blog/building-multi-agent-harness)
