---
title: Split AI Coding Work Across Three Roles
description: >-
  Teams split AI coding work into planner, builder, and checker roles. Written
  gates and one editor at a time reduce mistakes. Done means proof, not chat
  confidence.
date: 2026-06-22
tags:
  - agents
  - orchestration
  - harness
  - multi-agent
  - process
cover: /blog/multi-agent-cover.jpeg
tldr: >-
  One chat should not plan, build, and grade itself. Use three roles plus a
  written checklist before code. Only one agent edits the project at a time.
  Handoffs carry evidence, not chat claims.
ctaHeadline: Need a custom payment rail or GTM automation built for your platform?
ctaBody: >-
  Message me on LinkedIn for an Architectural Discovery Call. I scope backend
  architecture, payment infrastructure, and GTM pipeline work for your stack.
ctaLabel: Message me on LinkedIn
---

Ask one AI session to plan, build, and declare victory. It will sound confident. Reviews still find broken edges, missing scope, and edits that fight each other. The model is not the root problem. The **process** is: one actor holds the pen, the plan, and the grade.

A **multi-agent harness** is infrastructure for that process. It separates who plans, who builds, and who checks. It forces a paper trail so done is not a chat claim alone.

Teams can use a local mission folder (`.missions/`, gitignored) and a `/mission` trigger in the editor. Copy the shape without specific tooling. The point is roles, gates, and serial edits, not a product pitch.

## Key Takeaways

| Topic | Takeaway |
|-------|----------|
| Roles | Split planning, building, and checking across three roles. |
| Gates | Write a validation contract before any product code edits. |
| Serial edits | Allow only one builder to mutate files at a time. |
| Evidence | Handoffs cite check IDs and proof, not chat claims. |
| When to skip | Use for multi-file work; skip one-line fixes. |

## What goes wrong without a harness

Without rails, agents tend to:

- Edit the same files at once and leave the project half-broken
- Skip a real check because the builder said it works
- Reuse the same reasoning, so the same blind spots ship twice

That pattern drives risk and rework. Token spend and calendar time both climb.

## Three roles, three jobs

| Role | Job | Touches product code? |
|------|-----|------------------------|
| **Orchestrator** (planner) | Scope, checklist, task order, who runs next | No |
| **Worker** (builder) | One small task from the plan | Yes |
| **Validator** (checker) | Argue against the checklist using the diff and facts | No |

The planner never ships a quick fix by default. The builder never grades their own work as final. The checker runs on a **different model family** than the builder when possible. It does **not** read the builder's private reasoning. It reads the checklist, the change, and the handoff facts. Same idea as not letting the author of a report also be the only auditor.

## Paper before code

Before anyone edits the product:

1. **Mission profile**: mission scope, what is in and out, what success means
2. **Validation contract**: numbered checks (`A-01`, `A-02`, …): observable behavior and how to verify it. No coding until this is approved.
3. **Active plan**: one task in progress at a time, each tied to those check IDs

When a builder finishes, they send a short handoff. It lists status, which checks they claim, and where the evidence lives. The planner marks checks met, partial, or failed. Failed checks become a remake task, not a note in the transcript.

See [Writing a Validation Contract That Actually Catches Bugs](/blog/writing-validation-contract-that-catches-bugs) for checks that catch bad work.

## One editor at a time

Hard rules that keep the tree honest:

1. **One writer**: only one builder mutates files at a time
2. **Clean start**: the next builder inherits a known tree or a declared, owned diff
3. **Checklist first**: contract before code; checks before done
4. **Parallel is for reading**: search and review can run together; writes stay serial

Two builders editing the same files without a lock breaks the tree. Serial writes are slower than parallel reads but safer.

## Loops on top of infrastructure

Each role runs a small loop: look → decide → act → verify. The harness holds shared state, sandboxes, and logs. The next planner decision uses ground truth, not last night's chat memory.

![Multi-agent orchestration architecture: Orchestrator loop, worker loops, and infrastructure harness](/blog/multi-agent-orchestration-architecture.png)

The next posts add two layers: [keeping the work looping until the goal is met](/blog/loop-goal-harness-skills-and-scripts), and [surviving crashes with files as durable state](/blog/file-event-harness-local-durable-agents).

## When this is worth it (and when it is not)

**Use a harness** when the change spans many files, failure is expensive, or teams want a trail of scope and proof.

**Skip it** for a one-line fix, a typo, or a throwaway spike. Over-process is also cost.

Keep mission drafts and live handoffs local while the work is in flight. Keep product code, and anything others should reuse, in the repo.

## Tradeoff, in one line

Teams pay coordination overhead up front. They buy fewer silent failures, clearer ownership, and a definition of done that survives the chat closing.

The harness does not replace judgment. It channels it: scope in the open, evidence at the gate, one shippable step at a time.
