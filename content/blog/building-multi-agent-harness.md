---
title: Building a Multi-Agent Harness Orchestration Framework
description: >-
  A practical tutorial on the mission skill, Orchestrator–Worker–Validator roles,
  serial execution gates, and the infrastructure harness that keeps multi-agent
  coding sessions safe and shippable.
date: 2026-06-22
tags:
  - agents
  - orchestration
  - cursor
  - missions
  - multi-agent
  - harness
cover: /blog/multi-agent-cover.jpeg
---

Single-agent coding sessions hit a ceiling fast: context drifts, edits collide, and “it works in chat” rarely survives review. A **multi-agent harness** separates **planning**, **implementation**, and **verification** into distinct roles with explicit artifacts and gates—so each agent does one job well and the system stays auditable.

This post walks through how I structure that harness using the **mission skill** (`/mission`), the `.missions/` framework, and a loop-within-loop architecture you can adapt to your own stack.

## Why a harness?

Without a harness, multiple agents (or repeated sessions) tend to:

- Edit the same files in parallel and corrupt the working tree
- Skip validation because “the worker said it works”
- Share reasoning chains, which amplifies blind spots instead of catching them

A harness adds **infrastructure**: state files, assertion contracts, serial handoffs, and tool sandboxes. Agents still use LLM reasoning inside their loops, but the **coordination layer** enforces order and evidence.

## The `/mission` trigger

The mission skill intercepts prompts like:

```text
/mission Build a blog section with Nuxt Content
```

On first run it bootstraps a local framework directory (gitignored so orchestration state never pollutes the repo):

```text
.missions/
├── agents/          # Orchestrator, worker, validator instructions
├── skills/          # Encoded learnings from completed tasks
├── hooks/           # Assertion runners (e.g. run-assertions.sh)
├── handoffs/        # Worker and validator logs
├── mission_profile.md
├── validation_contract.md
├── active_plan.md
└── mission_control.md
```

**Key idea:** application code lives in git; **mission state** stays local until you choose to commit docs or handoffs.

## Roles — Orchestrator, Worker, Validator

| Role | Responsibility | Writes app code? |
|------|----------------|------------------|
| **Orchestrator** | Scope, validation contract, serial plan, delegation | No |
| **Worker** | One atomic task from `active_plan.md` | Yes |
| **Validator** | Adversarial check against assertions only | No |

### Orchestrator loop

1. **Observe** — Read mission profile, contract, plan, and handoffs
2. **Decide** — Pick the single `in_progress` task and linked assertion IDs
3. **Act** — Delegate to a worker with scope + assertions + handoff format
4. **Verify** — On handoff, mark assertions met/partial/failed; accept or replan

### Worker loop

1. **Observe** — Task description, assertions, current codebase
2. **Decide** — Implementation approach within scope
3. **Act** — Edit files, run commands in sandbox
4. **Verify** — Self-check against assertions; emit structured handoff

### Validator loop

Runs on a **different model family** than the worker when possible, reads **only** the contract, diff, and handoff facts—not worker chain-of-thought—to hunt counterexamples.

## Artifacts

### `mission_profile.md`

Living scope doc: objective, success definition, in/out of scope, technical boundaries. Populated during **Scope Phase** before any contract or code.

### `validation_contract.md`

Implementation-agnostic assertions with stable IDs (`A-01`, `A-02`, …), behavior statements, and verification methods. **No coding until this is approved.**

Example assertion shape:

```markdown
### A-02 — Blog index route
Navigating to `/blog` lists posts with title and date.
**Verify:** Manual — open `/blog`; posts visible.
```

### `active_plan.md`

Serial task table: one `in_progress` task at a time, each linked to assertion IDs, with done-when criteria aligned to the contract.

### Handoffs

Workers return:

```markdown
## Handoff — Task 2: Blog routes
**Status:** complete
**Assertions addressed:** A-02, A-03
**Evidence:** build output, file paths
**Recommendation:** accept
```

## Serial execution & gates

Hard rules that keep the harness honest:

1. **One editor** — Only one worker mutates the tree at a time
2. **Clean slate** — Workers start from a verified tree (or declared task-owned diff)
3. **Validation-first** — Contract before code; assertions before “done”
4. **Read-only parallelism** — Search, docs, and reviews can run in parallel; writes are serial
5. **Failed assertions** — Require a remediation task, not silent acceptance

Hooks like `.missions/hooks/run-assertions.sh` can automate lint, typecheck, and tests at verification checkpoints.

## Architecture — loops within a harness

The coordination stack has three layers:

1. **Orchestrator loop** (top) — User input → observe → decide → invoke worker → verify output
2. **Worker loops** (middle) — Specialized agents (coder, researcher, scraper) each with their own observe/decide/act/verify cycle
3. **Infrastructure harness** (bottom) — Shared state, tool providers, sandboxes, token/observability controls

![Multi-agent orchestration architecture — Orchestrator loop, worker loops, and infrastructure harness](/blog/multi-agent-orchestration-architecture.png)

**State management** — Mission files and per-worker state with explicit permissions (e.g. write-only to own ledger, read-only across workers).

**Tool providers** — Docker, interpreters, API clients, MCP servers—workers act inside sandboxes, not on production blindly.

**Observability** — Logging and token control feed back into Orchestrator **Observe**, so the next decision uses ground truth.

## Practical tips

### When to use `/mission`

- Multi-file features with clear success criteria
- Work that benefits from a validator pass
- Missions where you want a paper trail of scope and evidence

### When a single agent is enough

- One-file fixes, typo edits, exploratory spikes
- Tasks with no need for adversarial review

### Local vs repo

| Keep local (`.missions/`) | Keep in repo |
|---------------------------|--------------|
| Active plan during flight | Agent instruction templates |
| Validation contract drafts | Application code |
| Handoff logs | Published docs / blog posts |

### Bootstrapping your own harness

1. Add the mission skill and gitignore `.missions/`
2. Copy orchestrator, worker, and validator agent definitions
3. Run `/mission` with a small objective; resist coding until contract approval
4. Encode recurring patterns into `.missions/skills/` after successful missions

## What we shipped with this mission

This very blog section was scoped and built through the harness:

- Nuxt Content collection for `content/blog/*.md`
- `/blog` index and `/blog/[slug]` routes
- HUD nav link, SEO metadata, and prose styling
- First post (this article) with cover placeholder you can swap via frontmatter

The harness does not replace engineering judgment—it **channels** it: scope in the open, evidence at the gate, and one shippable step at a time.
