<script setup lang="ts">
import { contact } from '~/data/portfolio'
import { hireMeta, hireOfferings, hireFaqs } from '~/data/hire'
import { buildFaqPageJsonLd, jsonLdScript, LINKEDIN_URL } from '~/composables/useStructuredData'

const canonicalUrl = `${contact.site}/hire`

useHead({
  title: hireMeta.title,
  meta: [
    { name: 'description', content: hireMeta.description },
    { property: 'og:title', content: hireMeta.title },
    { property: 'og:description', content: hireMeta.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonicalUrl },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: hireMeta.title },
    { name: 'twitter:description', content: hireMeta.description },
  ],
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: jsonLdScript(buildFaqPageJsonLd(hireFaqs)),
})
</script>

<template>
  <div class="page-hire">
    <section class="section hire-hero">
      <SectionReveal>
        <span class="label-caps" data-reveal>Consulting</span>
        <h1 class="hire-hero__title" data-reveal>{{ hireMeta.h1 }}</h1>
        <p class="hire-hero__lead" data-reveal>{{ hireMeta.description }}</p>
      </SectionReveal>
    </section>

    <section class="section">
      <SectionReveal>
        <div class="section-header">
          <span class="section-index">01</span>
          <h2 class="section-title" data-reveal>How I Work</h2>
        </div>
        <article class="panel panel--glow hire-intro" data-reveal>
          <p>
            Pick the engagement model that fits your timeline. You get direct access to my backend,
            GTM, and AI engineering work, with no agency overhead. Tell me your goals on LinkedIn
            and I will scope a plan for your platform.
          </p>
        </article>
      </SectionReveal>
    </section>

    <section class="section">
      <SectionReveal>
        <div class="section-header">
          <span class="section-index">02</span>
          <h2 class="section-title" data-reveal>Engagement Models</h2>
        </div>
        <div class="hire-table-wrap panel panel--glow" data-reveal>
          <table class="hire-table">
            <thead>
              <tr>
                <th scope="col">Engagement</th>
                <th scope="col">Scope</th>
                <th scope="col">Stack</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in hireOfferings" :key="row.name">
                <th scope="row">{{ row.name }}</th>
                <td>{{ row.scope }}</td>
                <td>{{ row.stack }}</td>
                <td>{{ row.engagementType }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SectionReveal>
    </section>

    <section class="section">
      <SectionReveal :stagger="0.06">
        <div class="section-header">
          <span class="section-index">03</span>
          <h2 class="section-title" data-reveal>FAQ</h2>
        </div>
        <div class="hire-faq">
          <details
            v-for="faq in hireFaqs"
            :key="faq.question"
            class="panel panel--glow hire-faq__item"
            data-reveal
          >
            <summary class="hire-faq__question">{{ faq.question }}</summary>
            <p class="hire-faq__answer">{{ faq.answer }}</p>
          </details>
        </div>
      </SectionReveal>
    </section>

    <section class="section hire-cta-section">
      <SectionReveal>
        <article class="panel panel--glow panel--accent hire-cta" data-reveal>
          <h2 class="hire-cta__title">Start Your Engagement</h2>
          <p class="hire-cta__copy">
            Message me on LinkedIn with your scope and timeline. Book a discovery call and get a
            plan tailored to your backend, GTM, or AI eval needs.
          </p>
          <a
            :href="LINKEDIN_URL"
            class="hire-cta__btn"
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
.hire-hero {
  padding-block: clamp(2rem, 6vw, 4rem) var(--space-2xl);
}

.hire-hero__title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4.5vw, 2.75rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: var(--space-md) 0 var(--space-lg);
  max-width: 28ch;
}

.hire-hero__lead {
  font-size: clamp(1rem, 2vw, 1.125rem);
  line-height: 1.6;
  color: var(--text-muted);
  max-width: 52ch;
  margin: 0;
}

.hire-intro {
  padding: var(--space-xl);
  max-width: 52rem;
}

.hire-intro p {
  margin: 0;
  font-size: 1.0625rem;
  line-height: 1.65;
  color: var(--text-muted);
}

.hire-table-wrap {
  overflow-x: auto;
  max-width: 100%;
}

.hire-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;
  line-height: 1.55;
}

.hire-table th,
.hire-table td {
  padding: var(--space-md) var(--space-lg);
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid var(--border);
}

.hire-table thead th {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--gold-dim);
  white-space: nowrap;
}

.hire-table tbody th[scope='row'] {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
}

.hire-table tbody td {
  color: var(--text-muted);
}

.hire-table tbody tr:last-child th,
.hire-table tbody tr:last-child td {
  border-bottom: none;
}

.hire-faq {
  display: grid;
  gap: var(--space-md);
  max-width: 52rem;
}

.hire-faq__item {
  padding: 0;
}

.hire-faq__question {
  padding: var(--space-lg) var(--space-xl);
  font-family: var(--font-display);
  font-size: 0.9375rem;
  font-weight: 700;
  cursor: pointer;
  list-style: none;
}

.hire-faq__question::-webkit-details-marker {
  display: none;
}

.hire-faq__question::after {
  content: '+';
  float: right;
  color: var(--gold-dim);
  font-weight: 400;
}

.hire-faq__item[open] .hire-faq__question::after {
  content: '−';
}

.hire-faq__answer {
  margin: 0;
  padding: 0 var(--space-xl) var(--space-lg);
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text-muted);
}

.hire-cta-section {
  padding-bottom: var(--space-4xl);
}

.hire-cta {
  padding: var(--space-2xl);
  text-align: center;
  max-width: 36rem;
  margin-inline: auto;
}

.hire-cta__title {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin: 0 0 var(--space-md);
}

.hire-cta__copy {
  margin: 0 0 var(--space-xl);
  color: var(--text-muted);
  line-height: 1.6;
}

.hire-cta__btn {
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

.hire-cta__btn:hover {
  background: var(--accent-bright);
  box-shadow: 0 0 24px var(--accent-glow);
}
</style>
