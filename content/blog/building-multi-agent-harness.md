---
title: Stop One AI Agent From Owning the Whole Job
description: >-
  Why I split AI coding work into planner, builder, and checker roles—with
  written gates and one editor at a time—so mistakes cost less and “done”
  means something you can prove.
date: 2026-06-22
tags:
  - agents
  - orchestration
  - harness
  - multi-agent
  - process
cover: /blog/multi-agent-cover.jpeg
tldr: >-
  Don’t let one chat plan, build, and grade itself. Use three roles—planner,
  builder, checker—plus a written checklist before any code, and only one
  person (or agent) editing the project at a time. Evidence at the handoff,
  not vibes.
ctaHeadline: Need a multi-agent harness for your team?
ctaBody: >-
  I help set up planner, builder, and checker roles with written gates so AI
  coding work ships with evidence—not one chat owning the whole job.
ctaLabel: Message me on LinkedIn
---

Ask one AI session to plan, build, and declare victory. It will sound confident. Reviews still find broken edges, missing scope, and edits that fight each other. The model isn’t uniquely evil. The **process** is: one actor holding the pen, the plan, and the grade.

A **multi-agent harness** is just infrastructure for that process. It separates who plans, who builds, and who checks—and it forces a paper trail so “done” isn’t a vibe in chat.

I use a local mission folder (`.missions/`, gitignored) and a `/mission` trigger in the editor. You can copy the shape without my tooling. The point is roles, gates, and serial edits—not a product pitch.

## What goes wrong without a harness

Without rails, agents (or you, bouncing between chats) tend to:

- Edit the same files at once and leave the project half-broken
- Skip a real check because “the builder said it works”
- Reuse the same reasoning, so the same blind spots ship twice

That’s risk and rework. Token spend and calendar time both climb.

## Three roles, three jobs

| Role | Job | Touches product code? |
|------|-----|------------------------|
| **Orchestrator** (planner) | Scope, checklist, task order, who runs next | No |
| **Worker** (builder) | One small task from the plan | Yes |
| **Validator** (checker) | Argue against the checklist using the diff and facts | No |

The planner never “just ships a quick fix.” The builder never grades their own work as final. The checker, when I can, runs on a **different model family** than the builder, and does **not** read the builder’s private reasoning—only the checklist, the change, and the handoff facts. Same idea as not letting the author of a report also be the only auditor.

## Paper before code

Before anyone edits the product:

1. **Mission profile** — what we’re doing, what’s in/out, what “success” means
2. **Validation contract** — numbered checks (`A-01`, `A-02`, …): observable behavior and how you’ll verify it. No coding until this is approved.
3. **Active plan** — one task in progress at a time, each tied to those check IDs

When a builder finishes, they don’t send a novel. They send a short handoff: status, which checks they claim, where the evidence is, accept or rework. The planner marks checks met, partial, or failed. Failed checks become a remake task—not a shrug in the transcript.

I go deeper on writing checks that actually catch bad work in [Writing a Validation Contract That Actually Catches Bugs](/blog/writing-validation-contract-that-catches-bugs).

## One editor at a time

Hard rules that keep the tree honest:

1. **One writer** — only one builder mutates files at a time
2. **Clean start** — next builder inherits a known tree (or a declared, owned diff)
3. **Checklist first** — contract before code; checks before “done”
4. **Parallel is for reading** — search and review can run together; writes stay serial

Think of it like a shop floor: two people welding the same joint without a lockout isn’t speed—it’s scrap.

## Loops on top of infrastructure

Each role runs a small loop: look → decide → act → verify. The harness underneath holds shared state, sandboxes, and logs so the next planner decision uses ground truth—not last night’s chat memory.

![Multi-agent orchestration architecture — Orchestrator loop, worker loops, and infrastructure harness](/blog/multi-agent-orchestration-architecture.png)

The next posts in this series add two more layers: [keeping the work looping until the goal is actually met](/blog/loop-goal-harness-skills-and-scripts), and [surviving crashes with files as durable state](/blog/file-event-harness-local-durable-agents).

## When this is worth it (and when it isn’t)

**Use a harness** when the change spans many files, failure is expensive, or you want a trail of scope and proof.

**Skip it** for a one-line fix, a typo, or a throwaway spike. Over-process is also cost.

Keep mission drafts and live handoffs local while the work is in flight. Keep product code—and anything you want others to reuse—in the repo.

## Tradeoff, in one line

You pay a little coordination overhead up front. You buy fewer silent failures, clearer ownership, and a definition of done that survives the chat closing.

The harness doesn’t replace judgment. It channels it: scope in the open, evidence at the gate, one shippable step at a time.
