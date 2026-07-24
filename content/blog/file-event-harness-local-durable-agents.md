---
title: Keep Agent Work Alive When the Chat Dies
description: >-
  Long AI jobs shouldn’t vanish when a laptop sleeps or a tab crashes. Store
  progress on disk and wake the next step from files—so restarts resume, risk
  drops, and you aren’t renting a cloud workflow just for durability.
date: 2026-07-24
tags:
  - agents
  - harness
  - durable
  - local
  - reliability
  - process
cover: /blog/file-event-harness-cover.jpeg
tldr: >-
  Chat memory and process RAM die with the session. A file-event harness keeps
  the to-do list, progress, and “done” proof on disk so work can wake and resume
  after a crash. You get reliability without a managed workflow bill—tokens still
  cost.
ctaHeadline: Need agents that survive crashes?
ctaBody: >-
  I help build local durable agent setups—file-backed progress so long jobs
  resume after a restart, without renting a cloud workflow just for durability.
ctaLabel: Connect on LinkedIn
---

You start a long AI job. The tab crashes. The laptop sleeps. The process dies. Whatever lived only in chat—or only in memory—is gone. You didn’t need a multi-region workflow platform. You needed work that **survives the crash** and can **pick up where it left off**.

This is the fourth post in the harness series. It builds on [roles that don’t collide](/blog/building-multi-agent-harness), [checks that can fail](/blog/writing-validation-contract-that-catches-bugs), and [looping until the outcome is met](/blog/loop-goal-harness-skills-and-scripts). The missing layer is simple: **progress on disk**, not in the conversation.

## What “durable” means here

**Fragile:** The plan, status, and “what’s next” live in a chat window or a running process. Kill either one and you’re reconstructing from memory—expensive and error-prone.

**Durable (local):** The same facts live as ordinary files—a short status note, a queue of next steps, a log of what already ran, a checklist that must pass before “done.” Restart the machine; open the folder; the loop can continue.

That’s **reliability** (work isn’t lost), **risk** (you don’t ship half-finished because the session evaporated), and **cost** (you restart the failed slice, not the whole project—and you aren’t paying a cloud orchestrator just to remember where you were).

## How it fits the series

| Earlier lesson | What files add |
|----------------|----------------|
| Planner / builder / checker | Written handoffs and one active editor—still true; the queue enforces “one claim at a time” |
| Validation contract | A gate script (or checklist) must pass before anyone accepts “done” |
| Loop until the goal | Status on disk says which phase you’re in; a wake (new file, timer, or folder watch) starts the next slice |

Roles and contracts keep people (and agents) honest. Loops keep going until the outcome holds. **Files** make that loop wakeable overnight without babysitting the chat.

## The business shape (no API tour)

Think of a run folder the way you’d think of a paper job ticket:

1. **A goal and phase** — what “done” means, and whether you’re planning, building, checking, or blocked.
2. **A queue** — next slices waiting; at most one claimed at a time so two workers don’t edit the same thing.
3. **A history** — append-only notes of what ran (evidence), not a rewrite of the past when something fails.
4. **A gate** — before close, the [contract](/blog/writing-validation-contract-that-catches-bugs) checks must pass with proof in the handoff.

The model still does the thinking. The **files** decide what runs next and what counts as finished. Chat is a window, not the filing cabinet.

You can wake the next step by watching a folder, polling every few minutes, or dropping a small “please continue” sentinel—same idea as the [loop post](/blog/loop-goal-harness-skills-and-scripts), just durable across restarts.

## Crash resume, in plain terms

On start (or after a kill):

1. Read the status files—what phase, what’s already finished, what’s mid-flight.
2. Skip completed slices.
3. Re-run only the in-progress slice (or compensate if it left a mess).
4. Do **not** treat chat history as the source of truth.

The kill test that matters: restart mid-step and confirm you continue from the last **completed** step, not from vibes in the transcript. If resume lies, the rest of the harness is theater.

## Cost: what’s free vs what still isn’t

**Usually $0 for orchestration SaaS:** keeping a log and queue on disk, a lock so only one worker claims a job, and a simple gate before “done.”

**Still costs money or time:** model tokens (or electricity for a local model), and your attention when the run is blocked on a human decision.

Don’t sell “free agents forever.” The real win is narrower: **durability without renting a managed workflow** on day one. Graduate to a hosted orchestrator when you need multi-region reliability, team dashboards, or ops you won’t staff yourself—and pay then.

Vendors sell model toolkits, durable step runners, and file-shaped agent products. Steal the **ideas** (checkpoint, resume, files as source of truth). You don’t need their brand names to get the business outcome on a laptop.

## When files are enough—and when to graduate

**Stay on files** when you’re solo or small-team, jobs run on one machine overnight, and crash-resume plus a paper trail is the main gap.

**Graduate** when you need multi-region durability, shared team observability, or managed queues you won’t operate. Heavy tooling is fine; the idea stays the same—state outside the chat, proof before close.

Skip the whole setup for a typo fix or a throwaway spike. Use it when the work spans hours or days and losing the thread would hurt.

## Closing

A file-event harness is the series made **crash-safe**: roles as who owns the next ticket, contracts as the gate, loops as a state machine on disk, handoffs as evidence in a folder. One shippable slice at a time. Wake, claim, step, check, record—then sleep without fearing a dead tab.

Start with a status file, a queue folder, and one gate that can fail. Tokens still cost. Forgetting where you were shouldn’t.

---

*Related: [Stop One AI Agent From Owning the Whole Job](/blog/building-multi-agent-harness) · [Writing a Validation Contract That Actually Catches Bugs](/blog/writing-validation-contract-that-catches-bugs) · [Keep Working Until the Outcome Is Met](/blog/loop-goal-harness-skills-and-scripts)*
