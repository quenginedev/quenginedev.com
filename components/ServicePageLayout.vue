<script setup lang="ts">
import type { ServiceOffering } from '~/data/services'
import { contact } from '~/data/portfolio'
import { buildServiceJsonLd, jsonLdScript, LINKEDIN_URL } from '~/composables/useStructuredData'

const props = defineProps<{
  service: ServiceOffering
}>()

const canonicalUrl = `${contact.site}${props.service.path}`

useHead({
  title: props.service.title,
  meta: [
    { name: 'description', content: props.service.description },
    { property: 'og:title', content: props.service.title },
    { property: 'og:description', content: props.service.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonicalUrl },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: props.service.title },
    { name: 'twitter:description', content: props.service.description },
  ],
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: jsonLdScript(
    buildServiceJsonLd({
      name: props.service.title,
      description: props.service.description,
      url: canonicalUrl,
    }),
  ),
})
</script>

<template>
  <div class="page-service">
    <section class="section service-hero">
      <SectionReveal>
        <span class="label-caps" data-reveal>Contracting</span>
        <h1 class="service-hero__title" data-reveal>{{ service.h1 }}</h1>
        <p class="service-hero__lead" data-reveal>{{ service.description }}</p>
        <div class="service-hero__keywords" data-reveal>
          <span v-for="kw in service.keywords" :key="kw" class="lane-chip">{{ kw }}</span>
        </div>
      </SectionReveal>
    </section>

    <section class="section">
      <SectionReveal>
        <div class="section-header">
          <span class="section-index">01</span>
          <h2 class="section-title" data-reveal>The Problem</h2>
        </div>
        <article class="panel panel--glow service-pas" data-reveal>
          <p>{{ service.problem }}</p>
        </article>
      </SectionReveal>
    </section>

    <section class="section">
      <SectionReveal>
        <div class="section-header">
          <span class="section-index">02</span>
          <h2 class="section-title" data-reveal>What's at Stake</h2>
        </div>
        <article class="panel panel--glow service-pas" data-reveal>
          <p>{{ service.agitate }}</p>
        </article>
      </SectionReveal>
    </section>

    <section class="section">
      <SectionReveal :stagger="0.06">
        <div class="section-header">
          <span class="section-index">03</span>
          <h2 class="section-title" data-reveal>The Solution</h2>
        </div>
        <article class="panel panel--glow service-pas" data-reveal>
          <p>{{ service.solution }}</p>
        </article>

        <div class="service-deliverables-header" data-reveal>
          <h3 class="service-deliverables-title">What You Get</h3>
        </div>
        <ul class="service-deliverables">
          <li
            v-for="(item, i) in service.deliverables"
            :key="item"
            class="panel panel--glow service-deliverable"
            data-reveal
          >
            <span class="service-deliverable__index">{{ String(i + 1).padStart(2, '0') }}</span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </SectionReveal>
    </section>

    <section class="section">
      <SectionReveal>
        <div class="section-header">
          <span class="section-index">04</span>
          <h2 class="section-title" data-reveal>Stack</h2>
        </div>
        <div class="service-stack" data-reveal>
          <span v-for="tech in service.stack" :key="tech" class="lane-chip">{{ tech }}</span>
        </div>
      </SectionReveal>
    </section>

    <section class="section service-cta-section">
      <SectionReveal>
        <article class="panel panel--glow panel--accent service-cta" data-reveal>
          <h2 class="service-cta__title">Start Your Project</h2>
          <p class="service-cta__copy">
            Tell me about your goals on LinkedIn. Book a discovery call and get a scoped plan for your platform.
          </p>
          <a
            :href="LINKEDIN_URL"
            class="service-cta__btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect on LinkedIn ↗
          </a>
        </article>
      </SectionReveal>
    </section>
  </div>
</template>

<style scoped>
.service-hero {
  padding-block: clamp(2rem, 6vw, 4rem) var(--space-2xl);
}

.service-hero__title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4.5vw, 2.75rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: var(--space-md) 0 var(--space-lg);
  max-width: 28ch;
}

.service-hero__lead {
  font-size: clamp(1rem, 2vw, 1.125rem);
  line-height: 1.6;
  color: var(--text-muted);
  max-width: 52ch;
  margin: 0 0 var(--space-xl);
}

.service-hero__keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.service-pas {
  padding: var(--space-xl);
  max-width: 52rem;
}

.service-pas p {
  margin: 0;
  font-size: 1.0625rem;
  line-height: 1.65;
  color: var(--text-muted);
}

.service-deliverables-header {
  margin-top: var(--space-3xl);
  margin-bottom: var(--space-lg);
}

.service-deliverables-title {
  font-family: var(--font-display);
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin: 0;
}

.service-deliverables {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: var(--space-md);
}

.service-deliverable {
  display: flex;
  align-items: flex-start;
  gap: var(--space-lg);
  padding: var(--space-lg) var(--space-xl);
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--text-muted);
}

.service-deliverable__index {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--gold-dim);
  flex-shrink: 0;
  padding-top: 0.15em;
}

.service-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.service-cta-section {
  padding-bottom: var(--space-4xl);
}

.service-cta {
  padding: var(--space-2xl);
  text-align: center;
  max-width: 36rem;
  margin-inline: auto;
}

.service-cta__title {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin: 0 0 var(--space-md);
}

.service-cta__copy {
  margin: 0 0 var(--space-xl);
  color: var(--text-muted);
  line-height: 1.6;
}

.service-cta__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.75rem 1.5rem;
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--text);
  background: var(--accent);
  border: 1px solid var(--accent-bright);
  transition: background 0.25s ease, box-shadow 0.25s ease;
}

.service-cta__btn:hover {
  background: var(--accent-bright);
  box-shadow: 0 0 24px var(--accent-glow);
}
</style>
