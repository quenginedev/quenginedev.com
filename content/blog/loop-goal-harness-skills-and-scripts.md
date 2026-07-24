---
title: Keep Working Until the Outcome Is Met—Not Until the Chat Ends
description: >-
  Why one-shot AI prompts stop too early, and how a simple loop—clear goal,
  reusable playbooks, and hard stop rules—cuts wasted spend and unfinished work.
date: 2026-06-27
tags:
  - agents
  - harness
  - process
  - skills
  - loop
  - reliability
cover: /blog/loop-goal-harness.jpeg
tldr: >-
  One-shot prompts end when the assistant feels done. A loop-until-goal setup
  keeps going until a defined outcome is proven—or a human stops it. Skills and
  scripts are reusable playbooks and gates: cheaper retries, clearer “done,”
  less drift.
ctaHeadline: Stuck in one-shot prompts that stop early?
ctaBody: >-
  I help design loop-until-goal harnesses with skills and stop rules so work
  finishes on the outcome—not when the chat feels done.
ctaLabel: Reach out on LinkedIn
---

You ask for a finished outcome. The assistant writes something, says it’s done, and the session ends. Days later the checks fail, the scope drifted, and you’re paying again to rediscover what “done” meant.

The model wasn’t the whole problem. The process stopped at a **one-shot answer** instead of looping until a **defined outcome** was met.

This is the third post in the harness series. It builds on [roles that don’t collide](/blog/building-multi-agent-harness) and [checks that can fail](/blog/writing-validation-contract-that-catches-bugs). Here the focus is the **loop** itself: keep working toward the goal, with playbooks and stop rules you can reuse—not a fresh hopeful prompt every time.

## One-shot vs loop-until-goal

**One-shot:** Ask once. Take the reply. Hope it stuck.

**Loop-until-goal:** State an outcome you can verify. Plan → do a slice → check → repeat until the outcome holds—or until someone blocks with a reason.

You’re not asking the model to “try harder.” You’re changing when the work is allowed to stop. That matters for **cost** (fewer full restarts), **reliability** (drift gets caught mid-flight), and **accountability** (someone owns the stop decision).

## What the harness is, in plain terms

Three pieces:

1. **A goal** — specific enough to check. Not “make it good.” Something like “every published item shows a title and date on the list.”
2. **A loop** — small steps with a check after each one, not a single marathon reply.
3. **A harness** — the rules and files that force order, keep handoffs short, and refuse “done” without evidence.

![The loop goal harness: goal verification loop, coordinator, workers, gates, and reusable playbooks](/blog/loop-goal-harness-flow.jpeg)

The harness doesn’t replace judgment. It **channels** it: one shippable step at a time, proof at the gate.

## Why one-shots fail on real work

Same patterns show up whether one person or several agents are involved:

| What goes wrong | What you feel | What the loop fixes |
|-----------------|---------------|---------------------|
| Early decisions forgotten | “We already decided that” | Written state and short handoffs |
| Two people edit the same thing | Collisions and rework | One changer at a time |
| “Looks done” with no proof | Surprises after the fact | A [validation contract](/blog/writing-validation-contract-that-catches-bugs) before you accept |
| Gold-plating | Bigger bill, slower ship | Playbooks that prefer the smallest fix |
| First failure ends the job | Start from scratch next week | Retry the failed slice only |

Treat these as process problems, not luck with wording.

## Skills and scripts = reusable playbooks

You don’t need a new vendor product to get most of this value.

**Skills** are short written playbooks the assistant loads when the job matches—how to stay minimal, how to hand work off, how to talk in status notes instead of novels. Same idea travels across tools: a file of instructions beats reinventing “how we work here” in every chat.

**Scripts** (or any automatic check you already run) are the **enforcement** layer. Prompts suggest. Checks **block**. Lint fails, tests fail, a required handoff section is missing → the loop does not accept “done.” The [contract](/blog/writing-validation-contract-that-catches-bugs) says what must be true; the check proves some of it without arguing in chat.

Together: playbooks for behavior, gates for stop/go. Portable across sessions. Cheap to version. No lock-in required for the core idea.

## Who decides what happens next

Every serious setup maps to the same stack, whatever the brand names:

- **Coordinator** — owns the goal, picks the *one* next task, never does the whole product in one breath
- **Workers** — do one scoped slice, return a summary with evidence, not a transcript dump
- **Gates** — run checks; fail means remake or stop, not a polite shrug

Different platforms call these subagents, handoffs, supervisors, or workflow steps. The business shape is the same: **specialist in, summary out, proof before close.**

## When to stop (and when not to use a loop)

Stop when:

- Every check tied to the goal **passes with evidence**, or
- A human **blocks** with a clear reason (wrong scope, missing decision, unsafe change)

Do **not** stop because the chat felt finished.

Skip the harness for a typo, a one-file spike, or a throwaway experiment. Use it when the outcome spans multiple steps, you care about an evidence trail, or the work may span days and you can’t afford to lose the thread. Heavy vendor tooling is fine when you need audit trails and approvals at scale—the loop idea still applies; you’re just buying more instrumentation.

For work that has to survive crashes and restarts, the next post covers [keeping state on disk with file events](/blog/file-event-harness-local-durable-agents).

## Closing

A loop-until-goal harness is discipline in files: playbooks for how to work, checks for when to stop, a written goal for what “done” means. One-shot prompts are cheap until they aren’t. Start with one clear outcome, one short checklist, and one automatic gate. Loop until the evidence says stop—not until the assistant says so.

---

*Related: [Building a Multi-Agent Harness](/blog/building-multi-agent-harness) · [Writing a Validation Contract That Actually Catches Bugs](/blog/writing-validation-contract-that-catches-bugs) · [File-Event Durable Agents](/blog/file-event-harness-local-durable-agents)*
