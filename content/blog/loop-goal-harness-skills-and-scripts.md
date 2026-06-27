---
title: 'The Loop Goal Harness: Skills and Scripts for Any AI Agent'
description: >-
  How to build a portable loop goal harness using only skills and shell scripts—no
  SDK lock-in. Cross-provider survey of OpenAI, Anthropic, LangGraph, Google ADK, and
  Cursor, plus simplicity skills that keep agents from over-building.
date: 2026-06-27
tags:
  - agents
  - harness
  - cursor
  - skills
  - loop
  - orchestration
  - multi-agent
cover: /blog/cover-placeholder.svg
---

You ask an agent to "build the feature." It writes code, says done, and moves on. Two sessions later you discover half the tests fail, scope drifted, and nobody verified the original constraints. The problem is not the model—it is the **missing loop**. A one-shot prompt has no gate, no retry, and no memory of what "done" meant.

A **loop goal harness** fixes that. It is a coordination layer that repeatedly drives an agent (or team of agents) toward a goal until verifiable completion—or until a human blocks. The surprising part: you do not need LangGraph, the OpenAI Agents SDK, or a custom framework to get 80% of the value. **Skills plus shell scripts** are enough, and they travel across Cursor, Claude Code, OpenAI, and most other agent platforms.

This post is the third in a series on agent harnesses. If you have not read them yet, start with [Building a Multi-Agent Harness](/blog/building-multi-agent-harness) and [Writing a Validation Contract That Actually Catches Bugs](/blog/writing-validation-contract-that-catches-bugs). Here we focus on the **loop** itself and how to implement it with portable artifacts instead of vendor SDKs.

## What is a loop goal harness?

A loop goal harness is three things working together:

1. **A goal** — stated clearly enough to verify (not "make it good" but "blog index lists title and date for every published post")
2. **A loop** — plan → implement → test → verify, repeating until the goal is met or blocked
3. **A harness** — infrastructure that enforces order, isolates context, and requires evidence before accepting "done"

Think of it as a `while (!goalMet && !blocked)` around your agent work. Inside each iteration, specialized agents do focused work. Outside the loop, scripts and contracts decide whether to continue, retry, or stop.

The harness does not replace the LLM's reasoning. It **channels** it: one shippable step at a time, with proof at the gate.

## Why one-shot prompts fail

Single-agent sessions fail predictably on non-trivial goals:

| Failure mode | What happens | Harness fix |
|--------------|--------------|-------------|
| Context drift | Early decisions get forgotten | Structured handoffs + mission state files |
| Parallel collision | Two agents edit the same files | Serial execution; one mutator at a time |
| "Looks done" handoffs | Agent claims success without evidence | Validation contract + assertion runner |
| Over-engineering | Agent builds abstractions nobody asked for | Simplicity skills (ponytail, caveman) |
| No retry | First failure ends the session | Loop commands retry failing micro-units only |

A loop goal harness treats these as **engineering problems**, not prompt-engineering luck.

## Three layers — coordinator, workers, gates

Every serious multi-agent system—regardless of vendor—maps to this stack:

```text
┌─────────────────────────────────────────┐
│  Coordinator loop (plan → delegate)     │
├─────────────────────────────────────────┤
│  Worker loops (isolated context, act)     │
├─────────────────────────────────────────┤
│  Gate layer (scripts, contracts, ticks) │
└─────────────────────────────────────────┘
```

### Layer 1 — Coordinator loop

The coordinator owns the goal, breaks work into serial tasks, and decides what happens next. It does **not** write application code. In Cursor, this is the Orchestrator persona triggered by `/mission`. In other platforms, it is a supervisor agent, a triage agent with handoffs, or simply **you** running a checklist between sub-agent calls.

Each coordinator iteration:

1. **Observe** — read current state (plan, handoffs, diff)
2. **Decide** — pick the single next task
3. **Act** — delegate to a worker with scope + assertions
4. **Verify** — evaluate handoff evidence; accept, replan, or loop back

### Layer 2 — Isolated workers

Workers execute one atomic task in a **fresh or scoped context**. They implement, self-check, and return a structured handoff—never raw chain-of-thought.

Isolation is the point. Search results, terminal logs, and failed experiments stay in the worker's window. The coordinator sees a summary: changed files, test output, open issues.

Every major platform has a name for this:

- **Cursor:** subagents via the Task tool
- **OpenAI:** handoffs or `agent.as_tool()`
- **Anthropic:** subagents or Agent Teams
- **LangGraph:** worker nodes returning to supervisor
- **Google ADK:** sub-agents or AgentTool wrappers

Different APIs. Same idea: **specialist in, summary out**.

### Layer 3 — Script gates

Scripts enforce what prompts cannot reliably enforce:

- **Assertion runners** — lint, typecheck, test; exit non-zero blocks progress
- **Loop ticks** — shell sentinels that wake the agent on a schedule or event
- **Handoff validators** — grep for required sections in worker output

The gate layer is bash, not Python frameworks. It runs the same in CI, locally, and inside agent sandboxes.

## Skills — the portable instruction layer

Skills are **markdown instruction files** the agent loads when relevant. They are the most portable part of a loop harness because every platform eventually converges on "specialized instructions in a file":

| Platform | Skill / agent instruction location |
|----------|-------------------------------------|
| **Cursor** | `.cursor/skills/*/SKILL.md` or `~/.cursor/skills/` |
| **Claude Code** | `.claude/agents/*.md` or `~/.claude/agents/` |
| **OpenAI Agents SDK** | Agent `instructions=` string (often sourced from a file) |
| **Generic** | `AGENTS.md`, `CLAUDE.md`, or any markdown the agent reads at session start |

A skill has two jobs:

1. **Trigger** — frontmatter `description` tells the agent *when* to load it
2. **Behavior** — body tells the agent *what to do* once loaded

Good skill descriptions are job postings, not taglines. Compare:

```text
❌ "Helps with coding tasks"
✅ "Forces minimal diffs: stdlib first, no unrequested abstractions. Use when user says ponytail or complains about over-engineering."
```

Subagents inherit project skills but **not** conversational context. The description is the only handshake. Write it accordingly.

### Portability sidebar — same skill, three homes

**Cursor** (`~/.cursor/skills/ponytail/SKILL.md`):

```markdown
---
name: ponytail
description: >-
  Minimal solution only. Stdlib before dependencies. Use when user says
  ponytail, yagni, or complains about over-engineering.
---
# Ponytail
Stop at the first rung that holds: YAGNI → reuse codebase → stdlib → one line → minimum code.
```

**Claude Code** (`.claude/agents/minimal.md`):

```markdown
---
name: minimal
description: Same as ponytail — shortest working diff, no speculative abstractions.
tools: Read, Edit, Bash
---
You are a lazy senior dev. Reuse before rewrite. Stdlib before npm.
```

**OpenAI Agents SDK** (load from file into `instructions`):

```python
instructions = Path("skills/ponytail.md").read_text()
worker = Agent(name="Worker", instructions=instructions, tools=[...])
```

Same behavior. Different path. That is why skills-first harnesses age well—SDKs change; instruction files do not.

## Scripts — the enforcement layer

Prompts suggest. Scripts **block**. Two patterns cover most loop harnesses.

### Pattern 1 — Assertion gate (`run-assertions.sh`)

Run before accepting any worker handoff. Non-zero exit = task not complete.

```bash
#!/usr/bin/env bash
# .harness/hooks/run-assertions.sh
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

pnpm run typecheck
pnpm run lint
pnpm test -- --run --passWithNoTests
echo "ASSERTIONS_PASSED"
```

Wire it into your coordinator workflow:

```text
Worker handoff received → run run-assertions.sh → exit 0? accept : remediation task
```

This is the script equivalent of a [validation contract](/blog/writing-validation-contract-that-catches-bugs). The contract says *what* must be true; the script proves *some* of it automatically.

### Pattern 2 — Loop tick sentinels

Time-driven loops wake the agent on an interval. Event-driven loops wake on observable change (git push, CI finish, file write).

**Fixed interval** (every 5 minutes):

```bash
# Loop every 5m: check deploy status
while true; do
  sleep 300
  echo 'AGENT_LOOP_TICK_deploy {"prompt":"Check deploy status and report drift from main"}'
done
```

**Dynamic interval** (self-pacing with fallback heartbeat):

```bash
# One-shot wake after agent decides delay
sleep 900
echo 'AGENT_LOOP_WAKE_research {"prompt":"Resume literature review; summarize new findings only"}'
```

The agent monitors stdout for `^AGENT_LOOP_TICK_` or `^AGENT_LOOP_WAKE_` regex, reads the JSON payload, executes the prompt, and re-arms the next tick. No cron daemon. No SDK. A background shell and a convention.

Combine ticks with loop phases:

```text
/plan    → researchers bubble up optimized path
/implement → workers per micro-unit; bubble up diffs
/test    → QA agents; fail loops back to /implement
/verify  → check original constraints; gap loops back to /plan
```

Each phase is a loop iteration. The harness decides which phase comes next based on evidence—not vibes.

## Cross-provider survey — how everyone handles agents

Every major provider shipped multi-agent features in 2025–2026. The vocabulary differs; the architecture rhymes.

| Platform | Delegation patterns | Context isolation | Loop / orchestration |
|----------|--------------------|--------------------|----------------------|
| **Cursor** | Subagents (Task tool); built-in explore/bash/browser | Separate context window per subagent | `/mission`, `/loop`, `/multitask`; skills + rules |
| **OpenAI Agents SDK** | **Handoffs** (specialist owns reply) vs **agents-as-tools** (manager synthesizes) | Per-agent in `Runner.run()` | Agent loop with guardrails; tracing via SDK |
| **Anthropic Claude Agent SDK** | Subagents (report back); **Agent Teams** (peer task board, 2026); Dynamic Workflows (script-orchestrated) | Subagent isolation; teams share task list | Turn-by-turn delegation; workflows at scale via JS scripts |
| **LangGraph** | Supervisor routes via `Command(goto=...)`; workers as graph nodes | Shared TypedDict state; per-node agent loop | Graph loops until supervisor → END; `Send` API for parallel fan-out |
| **Google ADK** | **Sub-agents** (stateful, shared session) vs **AgentTool** (stateless call) | Session state for sub-agents; tools are transactional | SequentialAgent, ParallelAgent, LoopAgent primitives |

### Cursor

Cursor subagents are markdown files in `.cursor/agents/` with YAML frontmatter (`description`, `model`, `readonly`, `is_background`). The parent agent delegates via the Task tool; built-in explore, bash, and browser subagents handle context-heavy ops automatically. Skills compose across subagents—the metadata is the activation contract.

Best for: developers who want harness artifacts in-repo without running a Python orchestrator.

### OpenAI Agents SDK

Two patterns, one decision: **who owns the final answer?**

- **Handoffs** — specialist takes the conversation. Use when the specialist should respond directly (support triage → refund agent).
- **Agents as tools** — manager calls specialists and synthesizes. Use when you need one stable outer workflow with guardrails in one place.

The SDK adds guardrails, tracing, and human-in-the-loop approvals. Powerful—but you can replicate the ownership decision with skills and serial delegation without importing `openai-agents`.

### Anthropic (Claude Agent SDK / Claude Code)

Anthropic's evolution tells the story: **subagents** (isolated workers reporting up) → **Agent Teams** (peers with a shared task board and direct messaging, Feb 2026) → **Dynamic Workflows** (orchestration moved into scripts the runtime executes outside conversation context).

Subagents excel at parallel research with context pruning. Teams excel when agents need to coordinate dependencies without the lead as bottleneck. Workflows excel at dozens-to-hundreds of agents on migrations.

For a skills-and-scripts harness, subagents map cleanly to worker roles. Teams and workflows are upgrades when serial scripts become the bottleneck.

### LangGraph

LangGraph models agents as **graph nodes**. A supervisor node reads conversation history, emits a structured routing decision, and returns `Command(goto="worker_a")`. Workers loop back to the supervisor until it emits END.

LangChain now recommends implementing supervisor-via-tools manually rather than a dedicated library—more control, same pattern. The lesson for harness builders: **graphs are optional; routing + state + loop is not**.

### Google ADK

Google draws a bright line:

- **AgentTool** — discrete, stateless, reusable (like a function call)
- **Sub-agent** — complex, stateful, multi-step (shares session context)

Workflow agents (`SequentialAgent`, `ParallelAgent`, `LoopAgent`) compose these for fan-out/fan-in pipelines. The coordinator + specialist split from ADK docs matches exactly what a `/mission` orchestrator does with worker subagents.

## Convergence — five vendors, four primitives

Strip the branding and every platform implements the same four primitives:

1. **Isolated specialists** — focused context, narrow job, summary returned
2. **Coordinator loop** — something decides what happens next
3. **Structured handoffs** — results cross boundaries as data, not raw chat
4. **Verification gates** — something blocks "done" without evidence

Handoffs, agents-as-tools, supervisor-worker, sub-agents vs AgentTool—these are **ownership and state tradeoffs**, not different species.

| Primitive | Handoffs (OpenAI) | Agents-as-tools (OpenAI) | Subagents (Anthropic) | Supervisor (LangGraph) |
|-----------|-------------------|--------------------------|----------------------|------------------------|
| Who owns the reply? | Specialist | Manager | Parent (summary only) | Supervisor until END |
| State sharing | Transferred | Manager holds | Session or isolated | Shared graph state |
| Best for | Direct specialist response | Synthesized final answer | Context pruning | Dynamic branching |

A skills-and-scripts harness implements all four primitives without picking a vendor:

- **Specialists** → skill-defined subagents or `/task` delegations
- **Coordinator** → `/mission` orchestrator or your checklist between calls
- **Handoffs** → markdown template workers must emit
- **Gates** → `run-assertions.sh` + validation contract

You lose SDK tracing and built-in guardrails. You gain **portability**, **version control**, and **zero dependency lock-in**.

## Simplicity skills — keep agents from over-building

Complex harnesses fail when agents over-build inside the loop. These skills compress behavior into enforceable defaults.

### loop-agent — the recursive completion engine

The `loop-agent` skill defines the bubble-up architecture and phase commands:

```text
/plan     → spawn researchers → optimized path
/implement → micro-units → worker subagents → bubble up code
/test     → QA subagents → fail loops to /implement
/verify   → check original constraints → 100% or loop to /plan
```

Key rules: subagents return **only results** to parent; parent prunes detail. At 90% context, emit a `[MACHINE_HANDOFF_NOTE]` and stop—density over narrative.

Use when: autonomously building toward a defined goal across multiple sessions.

### loop — time and event driven iteration

The `loop` skill runs prompts on fixed or dynamic intervals via shell sentinels:

```text
/loop 5m check deploy status
/loop every 10m run test suite on changed files
/loop (no interval) → agent self-paces with fallback heartbeat
```

Use when: the goal requires **waiting**—deploy propagation, CI completion, scheduled audits.

### ponytail — minimal implementation

Ponytail enforces the laziest correct solution:

```text
1. Does this need to exist? (YAGNI)
2. Already in codebase? Reuse it.
3. Stdlib?
4. Native platform feature?
5. Installed dependency?
6. One line?
7. Minimum code that works.
```

Output pattern: `[code] → skipped: X, add when Y.`

Use when: agents add abstractions, dependencies, or 200-line diffs for 10-line fixes.

### caveman — terse prose (proposed template)

Ponytail governs **code**. Caveman governs **words**. Pair them when agents write essays where a paragraph would do.

```markdown
---
name: caveman
description: >-
  Terse prose only. Short sentences. No filler, no feature tours, no
  "great question". Use when user says caveman, terser, or when explanation
  exceeds code length.
---
# Caveman

ACTIVE EVERY RESPONSE until "stop caveman".

## Rules
- Short sentences. One idea each.
- No preamble. No recap unless asked.
- Lists over paragraphs when listing.
- Code first. Then max three lines context.
- Delete any sentence that does not change what the reader does next.

## Output shape
[answer or code]
[optional: one line why]
[optional: one line next step]

Off: "stop caveman" / "normal mode".
```

Use when: handoffs, status updates, or PR descriptions balloon into markdown novels.

### mission — scoped work with gates

The `mission` skill bootstraps `.missions/` state, routes to the Orchestrator, and enforces **scope → contract → plan → delegate** before code:

```text
/mission Add checkout email notifications
→ Scope phase (you confirm boundaries)
→ validation_contract.md (assertions)
→ active_plan.md (serial tasks)
→ worker implements one task at a time
```

Use when: multi-file features with clear success criteria and adversarial validation.

## Bootstrapping your loop harness tonight

You can stand up a portable loop goal harness in one evening. No SDK required.

1. **Create the directory layout**

   ```text
   .harness/                    # or .missions/ — gitignored
   ├── hooks/
   │   └── run-assertions.sh     # chmod +x
   ├── handoffs/                 # worker + validator logs
   ├── skills/                   # encoded patterns from completed loops
   └── validation_contract.md    # assertions before code
   
   .cursor/skills/               # or ~/.cursor/skills — portable skills
   ├── loop-agent/SKILL.md
   ├── loop/SKILL.md
   ├── ponytail/SKILL.md
   └── caveman/SKILL.md
   
   .cursor/agents/               # subagent definitions
   ├── orchestrator.md           # scope, plan, delegate — no app code
   ├── worker.md                 # one task, structured handoff
   └── validator.md              # adversarial, contract-only reads
   ```

2. **Gitignore local state** — append `.harness/` or `.missions/` to `.gitignore`. Keep skills and agent templates in repo (or global config).

3. **Write three skills minimum** — `loop-agent` (phases), `ponytail` (minimal code), `caveman` (minimal prose). Copy from this post or your existing `~/.cursor/skills/`.

4. **Write the assertion script** — typecheck + lint + test. Must exit non-zero on failure. Run it before every handoff accept.

5. **Define the handoff template** — workers emit a fixed markdown shape: status, assertions addressed, evidence, open issues, recommendation. Coordinators reject shapeless "done."

6. **Run a small `/mission`** — pick a 1–2 file objective. Resist coding until validation contract is written. Complete one serial task. Encode what worked into `.harness/skills/`.

7. **Add a loop tick** — for long-running goals, arm a background shell with a unique sentinel. Agent wakes, executes one phase (`/verify`), re-arms or stops.

8. **Review and prune** — after the mission, delete skills that never triggered. Merge skills that overlap. Harnesses rot from accumulation, not omission.

## When to use this vs alternatives

| Situation | Recommendation |
|-----------|----------------|
| One-file fix, typo, spike | Single agent — no harness overhead |
| Multi-file feature, needs evidence trail | Loop harness with `/mission` |
| Long-running goal across days | Loop harness + tick sentinels + machine handoff notes |
| Production workflow with compliance audit | Vendor SDK (OpenAI/ADK) for tracing + guardrails + approvals |
| Team of 10+ agents on migration | Anthropic Dynamic Workflows or LangGraph graph |

The loop goal harness is not the most powerful option. It is the **most portable** option—and for most individual developers and small teams, portability beats features until you hit real scale.

## What stays local vs what goes in git

| Gitignored (`.harness/` or `.missions/`) | In repo or global config |
|------------------------------------------|--------------------------|
| Active plan during flight | Skill definitions (`SKILL.md`) |
| Validation contract drafts | Agent templates (orchestrator, worker) |
| Handoff logs | Assertion script |
| Mission profile scratch | Published blog posts, application code |

Skills and scripts in git mean the next agent session—and the next platform migration—starts with your harness, not from scratch.

## Closing the loop

A loop goal harness is not magic. It is **discipline encoded in files**: skills tell agents how to behave, scripts tell the system when to stop, contracts tell everyone what "done" means. The major AI providers spent 2025–2026 converging on the same architecture with different names. You can use their SDKs when you need tracing, guardrails, and scale—or you can capture the same primitives tonight with markdown and bash.

Start small. One mission. One contract. One assertion script. Loop until the evidence says done.

---

*Related: [Building a Multi-Agent Harness Orchestration Framework](/blog/building-multi-agent-harness) · [Writing a Validation Contract That Actually Catches Bugs](/blog/writing-validation-contract-that-catches-bugs)*
