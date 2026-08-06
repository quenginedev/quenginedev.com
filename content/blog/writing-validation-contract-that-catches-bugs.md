---
title: How to Solve False Done Claims using Validation Contracts
description: >-
  Vague done claims green-light bugs in AI and human handoffs. Validation
  contracts turn success into numbered, falsifiable behavior checks with proof
  paths.
date: 2026-06-23
tags:
  - agents
  - validation
  - harness
  - process
  - quality
cover: /blog/validation-contract-cover.jpeg
tldr: >-
  A validation contract gates done from proven. Numbered checks describe
  visible behavior, test steps, and edge cases. Checkers try to disprove each
  ID. Weak wording green-lights bugs.
ctaHeadline: Need a custom payment rail or GTM automation built for your platform?
ctaBody: >-
  Message me on LinkedIn for an Architectural Discovery Call. I scope backend
  architecture, payment infrastructure, and GTM pipeline work for your stack.
ctaLabel: Message me on LinkedIn
---

In a [multi-agent harness](/blog/building-multi-agent-harness), the **validation contract** is the gate between "the builder said it is done" and "it is actually done." A weak list of hopes lets bad work through with a clean handoff. A strong one turns vague success into **checkable behavior**. The planner, builder, and checker can disagree with evidence, not vibes.

This post shows how to write checks that catch something instead of only documenting good intentions.

## Key Takeaways

| Topic | Takeaway |
|-------|----------|
| Purpose | Gate done with numbered, falsifiable behavior checks. |
| IDs | Stable IDs link tasks, handoffs, and verification steps. |
| Behavior | Each check states observable outcome, not implementation. |
| Attack | Write the shortcut the team fears; verify with a real path. |
| Checker | Different model family than builder when possible. |

## What the contract is for

After scope is stable and **before** anyone edits the product, write a short approved checklist. Each item gets:

- A **stable ID** (`A-01`, `A-02`, …) that tasks and handoffs point at
- A **behavior statement**: what must be true for the user or the business, not which file or function did it
- A **verification method**: a command, a click path, or a test that produces evidence

The planner does not close a task until every linked ID is **met**, with proof. Failed or unchecked IDs become remake work, not a shrug in chat.

That only works if the checks were written to fail when the behavior is wrong.

## What a catchable check looks like

Say the team cares that unfinished blog posts stay off the public site.

**Weak:** "Blog supports drafts." Verify: "code review."

A builder can add a draft flag, never hide it, mark the check met, and unfinished posts still show up in the list and the feed. The contract green-lit a bug.

**Strong:** "Published listings omit posts marked draft; posts with no draft flag stay visible." Verify: mark one post as draft and confirm the index and feed drop it.

Why the strong version catches trouble:

- The team knows **what broke** when the ID fails (draft exclusion, not "draft support")
- The outcome is **observable** (listings, not "we added a field")
- The **edge case** is spelled out (missing flag does not mean hidden. The classic shortcut hides everything or nothing)
- Verification names an **attack** someone can actually try

## Rules that keep checks honest

**1. Behavior, not implementation.**  
Bad: "Use this library to set social image tags."  
Good: "Post pages expose title, description, and image for social previews."  
The first can pass while tags are still missing. The second fails until the team can see them in the page output.

**2. One behavior per ID.**  
"Nav link, readable type, and SEO" as one check is a trap. When it fails, nobody knows which third failed. Builders mark it "partial" and move on. Split them. Each task owns specific IDs.

**3. Verification must be doable.**  
Every verify line should answer: *What command or click path would prove this false?* Builds, a quick fetch of a feed, or named manual steps are fine. "We implemented it" and "the builder confirmed" are not.

**4. Write the failure the team is afraid of.**  
Before approving a check, ask: *If someone took the laziest correct-looking shortcut, what would break?* Drafts leaking live. Social tags on the homepage but not on posts. A table of contents that looks fine but whose links go nowhere. A related-items block that includes the current item. A local build that passes while the real hosting target fails. Write the contract like someone will try to pass without doing the work.

**5. Map every success line.**  
If "success" in the scope doc has no ID, it will get negotiated away under time pressure. Each line becomes at least one assertion.

## How checks move through the work

Scope defines success. The contract turns success into numbered IDs. The plan ties each small task to those IDs. The builder ships one task and cites evidence per ID. The checker argues against each ID using the contract and the change, not the builder's private reasoning. Failed IDs become remake tasks. Partial is not a silent accept.

Missing evidence for an ID means **unverified**, same as failed until proven.

When possible, the checker runs on a **different model family** than the builder. Same idea as not letting the author of a report be the only auditor.

## Before you approve a contract

- Every success line from scope maps to at least one ID
- No check requires a specific file, function, or library
- Every verify step is a command, test, or numbered procedure
- Edge cases are explicit (defaults, empty lists, missing optional fields)
- At least one check per feature would fail on a stub
- Deploy and build checks match the **real** target, not a generic "build passes"
- Plan tasks link to IDs, no orphans, no overloaded mega-checks

## When to skip it

Not every change needs a long checklist. A typo, a one-line config tweak, or a throwaway spike: single agent, no contract. The overhead pays when scope spans many files, a second pair of eyes has value, or the team needs an audit trail.

Use it when "done" is ambiguous and expensive to unwind.

## After the mission

If a bug shipped and no check fired, **add a check** before the next similar job. If a check always passes without thought, merge or sharpen it. Contracts are living specs, not tombstones from kickoff.

The [harness post](/blog/building-multi-agent-harness) covered *why* roles and serial gates exist. The contract is *how* those gates know what to block. Write checks like tests for product behavior: specific, falsifiable, and rude to shortcuts.

Next in the series: [keeping work looping until the goal is actually met](/blog/loop-goal-harness-skills-and-scripts), and [surviving crashes with files as durable state](/blog/file-event-harness-local-durable-agents).
