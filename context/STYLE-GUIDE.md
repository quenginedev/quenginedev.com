# Blog and Site Copy Style Guide

ASD-STE100-inspired writing rules for blog posts and user-facing site copy on this project.

## Purpose

This guide distills public [ASD-STE100 Simplified Technical English](https://www.asd-europe.org/standards-specifications/simplified-technical-english/) principles for software technical writing. The goal is clear, unambiguous prose that reads well for humans and coding agents.

This is **ASD-STE100-inspired**, not certification-level STE. We do not reproduce the licensed STE dictionary (~900 approved words). We apply the public writing rules and a project vocabulary list for domain terms.

## Core rules

### 1. Sentence length

| Text type | Max words | Notes |
|-----------|-----------|-------|
| Procedural | 20 | Steps, instructions, CTAs |
| Descriptive | 25 | Explanations, arguments, summaries |

- One topic per sentence. Split long sentences instead of chaining clauses with "and", "which", or "because".
- A paragraph should contain at most six sentences.
- Prefer short paragraphs. Use lists when a block has more than one distinct point.

**Procedural example (≤20 words):**

> Run the test suite before you merge. Fix failures before you push to main.

**Descriptive example (≤25 words):**

> Architecture diagrams describe intent. They do not fail the build when a developer breaks a layering rule during a hotfix.

### 2. Active voice

Use active voice in procedures and as much as possible in descriptions.

| Avoid (passive) | Prefer (active) |
|-----------------|-----------------|
| Violations are caught by the linter | The linter catches violations |
| The rule must be enforced | Teams enforce the rule in CI |
| Errors should be fixed | Fix errors before merge |

Passive voice is acceptable only when the agent of the action is unknown or irrelevant (for example, "The build fails when dependencies conflict").

In procedures, use imperative verbs: "Run the test", "Add the rule", "Check the output".

### 3. Controlled vocabulary

Pick one word per concept and use it consistently. Do not rotate synonyms for style.

| Concept | Use | Avoid rotating with |
|---------|-----|----------------------|
| Start | start | begin, commence, initiate |
| Use | use | utilize, employ, leverage |
| Show | show | demonstrate, illustrate, depict |
| Help | help | assist, facilitate, enable |
| Fix | fix | rectify, resolve, remediate |
| Test | test | verify, validate (unless validation is the specific concept) |
| Rule | rule | guideline, policy, directive (pick one per document) |

Additional vocabulary rules:

- Use simple, common words. Prefer "get" over "obtain", "change" over "modify".
- Do not use more than three nouns in a row (for example, "agent loop validation contract" is acceptable; "multi-agent orchestration validation contract template file" is not).
- Do not use contractions (write "do not", not "don't").
- Do not omit articles or words that aid clarity.
- Avoid slang, idioms, and figurative language ("the same movie twice", "on the wall").

### 4. Impersonal voice

Write from the reader's perspective. Do not use first-person author voice.

| Avoid | Prefer |
|-------|--------|
| I've watched teams ignore diagrams | Teams often ignore diagrams under deadline pressure |
| In my experience, ADRs get skipped | ADRs often get skipped during spikes |
| I help teams turn rules into tests | Teams can turn rules into executable tests |
| We built a harness that… | The harness uses file events to… |

Use neutral subjects: **Teams**, **Developers**, **Organizations**, **The build**, **The agent**, **This post**.

"We" is acceptable only when it means "the reader and the author together" in a direct instruction ("We can split this into two tests"). Do not use "we" as "my team and I" or "I".

Do not include personal anecdotes, career stories, or opinion framed as autobiography. State observations as general patterns backed by technical fact.

### 5. Domain technical terms

Software and agent-domain terms are allowed and should stay precise. Do not replace them with vague plain-language substitutes.

Approved domain terms (non-exhaustive):

- API, CI, CD, CLI, HTTP, JSON, YAML
- agent, orchestrator, worker, validator, harness, loop
- validation, contract, assertion, schema, middleware
- repository, dependency, layer, boundary, module
- TypeScript, Java, Nuxt, Vue, ArchUnit, ts-arch
- pull request, merge, commit, build, deploy

When a term appears in code, tags, or tool names, keep the exact spelling. Explain it once in plain language if the audience may be mixed.

## What to preserve

When rewriting existing content, change **prose only**. Do not alter:

- File names and URL slugs
- Fenced code blocks (content and language tags)
- Inline code spans
- Markdown links (URL and anchor text may be tightened for STE but must remain functional)
- Frontmatter keys: `date`, `tags`, `cover`
- Structural headings that anchor cross-references (wording may improve; do not remove sections)

### Prose frontmatter fields

These fields must follow this guide:

- `title`
- `description`
- `tldr`
- `ctaHeadline`
- `ctaBody`
- `ctaLabel`

Keep titles concise. Prefer sentence case. Frontmatter strings count toward sentence-length limits.

## Writing a new blog post

Use this checklist before you publish.

### Planning

- [ ] Define one main idea for the post
- [ ] List sections as a logical sequence (problem → approach → example → takeaway)
- [ ] Identify domain terms; add brief definitions where needed

### Drafting

- [ ] Use impersonal voice throughout (no "I", "my", "we" as author)
- [ ] Keep descriptive sentences to ≤25 words
- [ ] Keep procedural sentences and steps to ≤20 words
- [ ] Use active voice; use imperative verbs in how-to steps
- [ ] One topic per sentence; split run-ons
- [ ] Use one term per concept; no synonym rotation
- [ ] Allow domain technical terms; avoid buzzword synonyms
- [ ] Remove idioms, metaphors, and filler ("actually", "really", "very")
- [ ] Use lists for sequences with three or more items

### Frontmatter

- [ ] `title` — clear, ≤12 words, no clickbait
- [ ] `description` — one or two sentences, ≤25 words each
- [ ] `tldr` — summary a busy reader can scan in one pass
- [ ] CTA fields (`ctaHeadline`, `ctaBody`, `ctaLabel`) — impersonal, active, no first-person sales voice
- [ ] `tags`, `date`, `cover` — set correctly; do not rewrite for STE

### Final review

- [ ] Read aloud; shorten any sentence you pause on
- [ ] Search for "I ", " my ", " we ", "I've", "we've" — rewrite to impersonal voice
- [ ] Search for passive constructions ("is done", "are used", "must be") — rewrite to active where possible
- [ ] Confirm code blocks, links, and slugs are unchanged
- [ ] Confirm build passes (`pnpm build`)

## Before and after examples

### Voice

**Before:**

> I've watched the same movie twice: a careful C4 diagram on Confluence, and six weeks later a routes file importing the database client directly because someone was in a hurry.

**After:**

> Teams often start with a C4 diagram in Confluence. Six weeks later, a routes file imports the database client directly because the diagram is not in the editor.

### Sentence length

**Before:**

> Passive artifacts—C4 models, dependency graphs, ADRs, sequence diagrams—are valuable for onboarding and alignment because they answer what the team decided and why, but they do not answer whether a commit respected that decision at the moment someone writes the code.

**After:**

> C4 models, dependency graphs, and ADRs help onboarding. They record what the team decided. They do not show whether a commit broke that decision at edit time.

### CTA frontmatter

**Before:**

> I help teams turn layering and dependency rules into executable tests so humans and coding agents get the same fast pass/fail signal.

**After:**

> Teams can turn layering rules into executable tests. Humans and coding agents get the same pass/fail signal in CI and in the agent loop.

## Scope

This guide applies to:

- All files in `content/blog/`
- User-facing prose strings in `data/portfolio.ts`

It does not apply to Vue component labels, harness tooling, config files, or agent rules. The canonical copy standard lives in this file only.

## References

- [ASD-STE100 overview (ASD)](https://www.asd-europe.org/standards-specifications/simplified-technical-english/)
- [ASD-STE100 FAQs](https://asd-ste100.org/faq.html)
- Public rule summaries: active voice, short sentences, one topic per sentence, controlled vocabulary

Do not copy or distribute the licensed STE dictionary. Use this guide and the domain term list instead.
