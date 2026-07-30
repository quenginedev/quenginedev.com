---
title: Why You Need Architectural Testing (For Both Humans and LLMs)
description: >-
  Architecture diagrams and ADRs describe intent—but they don't stop violations
  at build time. Executable architectural tests give humans and coding agents
  the same fast, objective feedback loop that linters already provide.
date: 2026-07-30
tags:
  - architecture
  - agents
  - typescript
  - quality
  - process
cover: /blog/archunit.jpeg
tldr: >-
  Written architecture erodes under delivery pressure and can't stop violations
  at edit time. Tools like ArchUnit and ts-arch turn layering rules into tests
  that fail in CI—and in the agent loop—before bad structure ships.
ctaHeadline: Want architectural rules that actually enforce themselves?
ctaBody: >-
  I help teams turn layering and dependency rules into executable tests—so
  humans and coding agents get the same fast pass/fail signal on structure,
  not a diagram nobody reads under deadline pressure.
ctaLabel: Talk on LinkedIn
---

I've watched the same movie twice: a careful C4 diagram on Confluence, a folder structure everyone agreed to in sprint planning, and six weeks later a `routes/` file importing the database client directly because someone was in a hurry and the diagram wasn't in their editor.

That's not a people problem. It's a **feedback** problem. Architecture documentation describes what you meant. It doesn't tell you—or an LLM—that you just broke it.

## When documentation is the only guardrail

Under delivery pressure, written architecture is the first thing to slip. ADRs get skipped because "we'll write it after the spike." Layering rules live in a wiki page nobody opens during a hotfix. The team *knows* the domain layer shouldn't call HTTP clients, but nothing in the build fails when it does.

I've been that person. I've also reviewed PRs where the author genuinely didn't know they'd violated a boundary—because the boundary only existed in a Miro board from three months ago.

Passive artifacts—C4 models, dependency graphs, ADRs, sequence diagrams—are valuable for **onboarding and alignment**. They answer "what did we decide and why?" They do not answer "did this commit respect the decision?" at the moment someone (or something) writes the code.

## Executable rules vs. diagrams on the wall

**Architectural testing** closes that gap. Instead of documenting "controllers must not import repositories directly," you write a test that fails when they do. The rule lives in the repo, runs on every commit, and produces the same binary outcome as a unit test: pass or fail.

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

These aren't full project setups—they're the shape of the constraint. One assertion, one failure mode, one place to look when someone (human or agent) routes a dependency the wrong way.

## LLMs don't hold your architecture in working memory

This matters more now that coding agents edit files in parallel. An LLM sees local context: the file open, nearby imports, the task description. It does not hold your entire layering model unless you force it into every prompt—and even then, it optimizes for "make the test pass" or "wire this endpoint," not "preserve the hexagonal boundary we agreed on in Q2."

I've watched agents:

- Put database queries in route handlers because that's where the HTTP request lives
- Bypass an event bus and call a service directly because it's fewer files
- Stuff business logic into React hooks because the component was the only file in context

None of this is malice. It's **architectural blindness**: no global constraint in the feedback loop, so local convenience wins.

A [validation contract](/blog/writing-validation-contract-that-catches-bugs) catches behavioral bugs at the handoff. Architectural tests catch **structural** bugs at edit time—before the behavior checks even run. In a [multi-agent harness](/blog/building-multi-agent-harness), that's the difference between an agent shipping a green handoff for the wrong shape of code and getting a hard fail on the first dependency violation.

## Fast feedback for humans and machines

Unit tests tell you a function returned the wrong value. Architectural tests tell you a **relationship** is wrong: this module shouldn't know about that one, this layer leaked, this cycle appeared.

The feedback is immediate and objective. Run the suite locally—fail in two seconds. Wire it into CI—fail before merge. Wire it into the agent loop—fail before the handoff says "done."

Humans get a guardrail that doesn't depend on remembering a diagram. LLMs get a **machine-readable** constraint they can't negotiate away in chat. "The architecture says…" becomes "the test failed with this import edge."

That loop is what makes the investment pay off under pressure, when wiki pages are ignored but red builds are not.

## What you actually gain

**Onboarding.** New engineers—and new agents—learn boundaries by running tests, not by hunting Confluence. A failing arch test names the violation in plain terms.

**Cheaper reviews.** Reviewers stop playing dependency archaeologist. If the architectural suite is green, structural arguments move off the PR thread.

**Safer refactors.** Move a folder, rename a package, split a module—the tests tell you what you broke globally, not what your IDE happened to highlight.

**Agent safety net.** When an LLM generates ten files in one task, architectural tests are the structural equivalent of typechecking: automatic, repeatable, not vibes.

**Self-documenting rules.** The test *is* the spec. It doesn't drift from the codebase because it runs against the codebase.

## Automate it like Prettier

I don't ask engineers to manually enforce semicolon style. Prettier runs on save and in CI; violations get fixed or the build stops. Architectural rules deserve the same treatment.

Diagrams and ADRs still belong in the process—for context, history, and the "why." But **enforcement** belongs in executable tests that nobody has to remember to apply when the sprint is on fire.

Start with three rules you already argue about in review: no domain-to-UI imports, no circular dependencies between packages, no direct DB access from presentation code. Write one test per rule. Put them in the same pipeline as lint and typecheck.

The first time an agent—or a tired human— tries to shortcut a layer and the build goes red in ten seconds, you'll wonder why the diagram was ever the only lock on the door.
