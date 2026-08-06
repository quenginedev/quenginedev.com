---
title: How to Solve Layer Violations using ArchUnit and ts-arch
description: >-
  Layer violations slip past wiki diagrams under delivery pressure. ArchUnit and
  ts-arch turn dependency rules into executable tests that fail in CI and agent
  loops.
date: 2026-07-30
tags:
  - architecture
  - agents
  - typescript
  - quality
  - process
cover: /blog/archunit.jpeg
tldr: >-
  Written architecture erodes under delivery pressure. It cannot stop violations
  at edit time. Tools like ArchUnit and ts-arch turn layering rules into tests
  that fail in CI and in the agent loop before bad structure ships.
ctaHeadline: Need a custom payment rail or GTM automation built for your platform?
ctaBody: >-
  Message me on LinkedIn for an Architectural Discovery Call. I scope backend
  architecture, payment infrastructure, and GTM pipeline work for your stack.
ctaLabel: Message me on LinkedIn
---

Teams often start with a C4 diagram in Confluence. They agree on a folder structure in sprint planning. Six weeks later, a `routes/` file imports the database client directly. The diagram is not in the editor.

That is not a people problem. It is a **feedback** problem. Architecture documentation describes what the team meant. It does not tell a developer or an LLM that the change broke the rule.

## Key Takeaways

| Topic | Takeaway |
|-------|----------|
| Problem | Diagrams describe intent; they do not fail builds on violation. |
| Tooling | ArchUnit and ts-arch turn layering rules into CI tests. |
| Agents | LLMs optimize local context; arch tests enforce global structure. |
| Feedback | Red builds beat wiki pages under deadline pressure. |
| Start | Write three rules the team already argues about in review. |

## When documentation is the only guardrail

Under delivery pressure, written architecture is the first thing to slip. ADRs get skipped because the team plans to write them after the spike. Layering rules live in a wiki page nobody opens during a hotfix. The team knows the domain layer should not call HTTP clients. Nothing in the build fails when it does.

Developers skip boundaries under deadline pressure. Reviewers also see PRs where the author did not know they violated a boundary. The boundary existed only on a Miro board from three months ago.

C4 models, dependency graphs, ADRs, and sequence diagrams help **onboarding and alignment**. They answer what the team decided and why. They do not answer whether a commit respected that decision at edit time.

## Executable rules vs. passive diagrams

**Architectural testing** closes that gap. Instead of documenting "controllers must not import repositories directly," teams write a test that fails when they do. The rule lives in the repo. It runs on every commit. It produces the same binary outcome as a unit test: pass or fail.

In Java, [ArchUnit](https://www.archunit.org/) has been doing this for years:

```java
@ArchTest
static final ArchRule layers = layeredArchitecture()
    .layer("Controller").definedBy("..controller..")
    .layer("Service").definedBy("..service..")
    .layer("Repository").definedBy("..repository..")
    .whereLayer("Controller").mayNotBeAccessedByAnyLayer()
    .whereLayer("Service").mayOnlyBeAccessedByLayers("Controller");
```

In TypeScript monorepos, [ts-arch](https://github.com/ts-arch/ts-arch) (and similar AST-based tools) express the same idea:

```typescript
import { filesOfProject } from "tsarch";

it("domain should not depend on infrastructure", async () => {
  const rule = filesOfProject()
    .inFolder("domain")
    .shouldNot()
    .dependOnFiles()
    .inFolder("infrastructure");

  expect(rule).toPass();
});
```

These are not full project setups. They show the shape of the constraint. One assertion, one failure mode, one place to look when a human or agent routes a dependency the wrong way.

## LLMs do not hold architecture in working memory

This matters more now that coding agents edit files in parallel. An LLM sees local context: the open file, nearby imports, the task description. It does not hold the full layering model unless every prompt forces it in. Even then, it optimizes for "make the test pass" or "wire this endpoint." It does not optimize for the hexagonal boundary from Q2.

Coding agents often:

- Put database queries in route handlers because the HTTP request lives there
- Bypass an event bus and call a service directly because it uses fewer files
- Put business logic in React hooks because the component was the only file in context

None of this is malice. It is **architectural blindness**. No global constraint sits in the feedback loop. Local convenience wins.

A [validation contract](/blog/writing-validation-contract-that-catches-bugs) catches behavioral bugs at the handoff. Architectural tests catch **structural** bugs at edit time. Behavior checks have not run yet. In a [multi-agent harness](/blog/building-multi-agent-harness), that separates two outcomes. An agent can ship a green handoff for the wrong code shape. A dependency violation can hard-fail before merge.

## Fast feedback for humans and machines

Unit tests show when a function returned the wrong value. Architectural tests show when a **relationship** is wrong. This module should not know about that one. This layer leaked. This cycle appeared.

The feedback is immediate and objective. Run the suite locally. Fail in two seconds. Wire it into CI. Fail before merge. Wire it into the agent loop. Fail before the handoff says done.

Humans get a guardrail that does not depend on remembering a diagram. LLMs get a **machine-readable** constraint they cannot negotiate away in chat. "The architecture says…" becomes "the test failed with this import edge."

That loop pays off under pressure. Wiki pages get ignored. Red builds do not.

## What teams gain

**Onboarding.** New engineers and new agents learn boundaries by running tests. They do not hunt Confluence. A failing arch test names the violation in plain terms.

**Cheaper reviews.** Reviewers stop tracing dependency chains by hand. If the architectural suite is green, structural arguments move off the PR thread.

**Safer refactors.** Move a folder, rename a package, split a module. The tests show what broke globally. The IDE may only highlight local files.

**Agent safety net.** When an LLM generates ten files in one task, architectural tests are the structural equivalent of typechecking. They are automatic and repeatable.

**Self-documenting rules.** The test is the spec. It does not drift from the codebase because it runs against the codebase.

## Automate it like Prettier

Teams do not manually enforce semicolon style. Prettier runs on save and in CI. Violations get fixed or the build stops. Architectural rules deserve the same treatment.

Diagrams and ADRs still belong in the process. They carry context, history, and the why. **Enforcement** belongs in executable tests. Nobody has to remember to apply them when the sprint is on fire.

Start with three rules the team already argues about in review. Block domain-to-UI imports, package cycles, and direct DB access from presentation code. Write one test per rule. Put them in the same pipeline as lint and typecheck.

The first time an agent or a tired human shortcuts a layer, the build goes red in ten seconds. Teams then see why a diagram alone was never enough.
