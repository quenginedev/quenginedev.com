<template>
  <div class="page-home">
    <!-- Hero -->
    <section id="hero" class="section hero">
      <div class="hero__viewport">
        <div class="hero__globe-cluster hero__globe-cluster--fullscreen">
          <ClientOnly>
            <Scene3D :scroll-progress="scrollProgress" fullscreen />
            <TechOrbit :items="techOrbit" expanded />
          </ClientOnly>
        </div>
      </div>

      <div class="hero__content">
        <SectionReveal :stagger="0.1" scroll-start="top 82%">
          <!-- ponytail: hero ParticleReveal only; Laser secondary skipped (Scene3D already on page) -->
          <ClientOnly>
            <CanvasuiParticleReveal
              v-if="showHeroParticleReveal"
              class="hero__particle-reveal"
              background="#0a0c0f"
              :radius="420"
              :softness="0.7"
              :scatter="16"
              :drift="0.4"
              :aberration="16"
              :bend="22"
            >
              <div class="hero__particle-body">
                <div class="hero__foreground" data-reveal>
                  <h1 class="hero__name">
                    <span class="hero__name-line">ERNEST</span>
                    <span class="hero__name-line hero__name-line--accent">/ HAYFORD</span>
                  </h1>
                  <div class="hero__capabilities">
                    <span v-for="cap in capabilities.slice(0, 4)" :key="cap" class="hero__cap-tag">{{ cap }}</span>
                  </div>
                </div>

                <div class="hero__meta" data-reveal>
                  <p class="hero__title">{{ hero.headline }}</p>
                  <p class="hero__sub">{{ hero.subheadline }}</p>
                  <a :href="resumeLink" class="hero__resume-link" target="_blank" rel="noopener noreferrer">
                    View full résumé for metrics &amp; history ↗
                  </a>
                </div>
              </div>
            </CanvasuiParticleReveal>
            <div v-else class="hero__particle-body">
              <div class="hero__foreground" data-reveal>
                <h1 class="hero__name">
                  <span class="hero__name-line">ERNEST</span>
                  <span class="hero__name-line hero__name-line--accent">/ HAYFORD</span>
                </h1>
                <div class="hero__capabilities">
                  <span v-for="cap in capabilities.slice(0, 4)" :key="cap" class="hero__cap-tag">{{ cap }}</span>
                </div>
              </div>

              <div class="hero__meta" data-reveal>
                <p class="hero__title">{{ hero.headline }}</p>
                <p class="hero__sub">{{ hero.subheadline }}</p>
                <a :href="resumeLink" class="hero__resume-link" target="_blank" rel="noopener noreferrer">
                  View full résumé for metrics &amp; history ↗
                </a>
              </div>
            </div>
            <template #fallback>
              <div class="hero__particle-body">
                <div class="hero__foreground" data-reveal>
                  <h1 class="hero__name">
                    <span class="hero__name-line">ERNEST</span>
                    <span class="hero__name-line hero__name-line--accent">/ HAYFORD</span>
                  </h1>
                  <div class="hero__capabilities">
                    <span v-for="cap in capabilities.slice(0, 4)" :key="cap" class="hero__cap-tag">{{ cap }}</span>
                  </div>
                </div>

                <div class="hero__meta" data-reveal>
                  <p class="hero__title">{{ hero.headline }}</p>
                  <p class="hero__sub">{{ hero.subheadline }}</p>
                  <a :href="resumeLink" class="hero__resume-link" target="_blank" rel="noopener noreferrer">
                    View full résumé for metrics &amp; history ↗
                  </a>
                </div>
              </div>
            </template>
          </ClientOnly>

          <div class="lanes-grid" data-reveal>
            <article v-for="lane in engineeringLanes" :key="lane.layer" class="lane-card panel panel--glow">
              <div class="lane-card__header">
                <Icon :name="lane.icon" class="lane-card__icon" size="22" />
                <h3 class="lane-card__layer">{{ lane.layer }}</h3>
              </div>
              <p class="lane-card__tagline">{{ lane.tagline }}</p>
              <div class="lane-card__stack">
                <span v-for="tech in lane.stack" :key="tech" class="lane-chip">{{ tech }}</span>
              </div>
            </article>
          </div>
        </SectionReveal>
      </div>
    </section>

    <!-- Capabilities belt -->
    <div class="capabilities-belt" aria-hidden="true">
      <div class="capabilities-belt__track">
        <span v-for="(cap, i) in capabilitiesBelt" :key="`cap-a-${i}`" class="capabilities-belt__item">{{ cap }}</span>
        <span v-for="(cap, i) in capabilitiesBelt" :key="`cap-b-${i}`" class="capabilities-belt__item">{{ cap }}</span>
      </div>
    </div>

    <!-- Signal -->
    <section id="signal" class="section">
      <SectionReveal>
        <div class="section-header">
          <span class="section-index">01</span>
          <h2 class="section-title" data-reveal>Overview</h2>
        </div>
        <div class="signal-layout">
          <div class="signal-kicker" data-reveal>
            <span v-for="tag in overview.kicker" :key="tag">{{ tag }}</span>
          </div>
          <p class="signal-body" data-reveal v-html="signalHtml" />
        </div>
      </SectionReveal>
    </section>

    <!-- Latest writing -->
    <section v-if="latestPost" id="writing" class="section section--writing">
      <SectionReveal>
        <article class="writing-teaser panel panel--glow" data-reveal>
          <div class="writing-teaser__meta">
            <time v-if="latestPost.date" :datetime="latestPost.date" class="writing-teaser__date">
              {{ formatBlogDate(latestPost.date) }}
            </time>
            <span v-if="latestReadingTime" class="writing-teaser__reading">{{ latestReadingTime }}</span>
          </div>
          <h2 class="writing-teaser__title">
            <NuxtLink :to="latestPost._path">{{ latestPost.title }}</NuxtLink>
          </h2>
          <p v-if="latestPost.description" class="writing-teaser__desc">{{ latestPost.description }}</p>
          <NuxtLink :to="latestPost._path" class="writing-teaser__cta">
            Read article →
          </NuxtLink>
        </article>
      </SectionReveal>
    </section>

    <!-- Constellation -->
    <section id="constellation" class="section section--constellation">
      <SectionReveal :stagger="0.08">
        <div class="section-header">
          <h2 class="section-title" data-reveal>Architecture</h2>
        </div>
        <p class="constellation-lead" data-reveal>
          {{ architectureLead }}
        </p>
        <ArchitecturePillars :pillars="architecturePillars" />
      </SectionReveal>
    </section>

    <!-- Experience -->
    <section id="experience" class="section">
      <SectionReveal :stagger="0.06">
        <div class="section-header">
          <span class="section-index">03</span>
          <h2 class="section-title" data-reveal>Experience</h2>
        </div>
        <div class="timeline">
          <article v-for="job in experience" :key="`${job.company}-${job.startDate}`"
            class="timeline-item panel panel--glow" data-reveal>
            <img v-if="job.logo" :src="job.logo" :alt="`${job.company} logo`" class="timeline-item__logo" width="48"
              height="48">
            <div v-else class="timeline-item__logo timeline-item__logo--placeholder" aria-hidden="true">
              {{ job.company.slice(0, 2).toUpperCase() }}
            </div>
            <div>
              <header class="timeline-item__header">
                <h3 class="timeline-item__role">
                  {{ job.role }}
                  <span class="timeline-item__company">@ {{ job.company }}</span>
                </h3>
                <time class="timeline-item__period">{{ job.period }}</time>
              </header>
              <ul class="timeline-item__highlights">
                <li v-for="(highlight, i) in job.highlights" :key="i">
                  {{ highlight }}
                </li>
              </ul>
            </div>
          </article>
        </div>
      </SectionReveal>
    </section>

    <!-- Projects -->
    <section id="projects" class="section">
      <SectionReveal :stagger="0.08">
        <div class="section-header">
          <h2 class="section-title" data-reveal>Projects</h2>
        </div>
        <div class="projects-grid">
          <article v-for="project in projects" :key="project.name" class="project-card panel panel--glow" data-reveal>
            <header class="project-card__header">
              <h3 class="project-card__name">{{ project.name }}</h3>
              <img v-if="project.logo" :src="project.logo" :alt="`${project.name} logo`" class="project-card__logo"
                width="32" height="32">
            </header>
            <p class="project-card__desc">{{ project.description }}</p>
            <div class="project-card__tags">
              <span v-for="tech in project.stack" :key="tech" class="tag">
                {{ tech }}
              </span>
            </div>
            <a v-if="project.url" :href="project.url" class="project-card__link" target="_blank"
              rel="noopener noreferrer">
              Visit ↗
            </a>
            <a v-else-if="project.repo" :href="project.repo" class="project-card__link" target="_blank"
              rel="noopener noreferrer">
              Repository ↗
            </a>
          </article>
        </div>
      </SectionReveal>
    </section>

    <!-- Stack -->
    <section id="stack" class="section">
      <SectionReveal>
        <div class="section-header">
          <h2 class="section-title" data-reveal>Stack</h2>
        </div>

        <div class="skills-grid">
          <div v-for="category in skills" :key="category.category" class="skill-category panel" data-reveal>
            <h3 class="skill-category__title">{{ category.category }}</h3>
            <ul class="skill-category__list">
              <li v-for="item in category.items" :key="item">
                <span class="skill-chip">{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </SectionReveal>
    </section>

    <!-- Polyglot -->
    <section id="polyglot" class="section">
      <SectionReveal :stagger="0.08">
        <div class="section-header">
          <span class="section-index">06</span>
          <h2 class="section-title" data-reveal>Polyglot</h2>
        </div>
        <p class="section-lead" data-reveal>
          TypeScript is home base, but I reach into other languages when the problem
          demands a different shape: memory safety, numeric performance, or AI-native tooling.
        </p>
        <div class="polyglot-grid">
          <article v-for="lang in polyglotLanguages" :key="lang.name" class="polyglot-card panel panel--glow"
            data-reveal>
            <header class="polyglot-card__header">
              <Icon :name="lang.icon" class="polyglot-card__icon" size="28" />
              <div>
                <h3 class="polyglot-card__name">{{ lang.name }}</h3>
                <span class="polyglot-card__badge" :class="`polyglot-card__badge--${lang.proficiency}`">{{
                  proficiencyLabel(lang.proficiency) }}</span>
              </div>
            </header>
            <p class="polyglot-card__focus">{{ lang.focus }}</p>
          </article>
        </div>
      </SectionReveal>
    </section>

    <!-- GTM Engineering -->
    <section id="gtm" class="section section--ai">
      <SectionReveal :stagger="0.07">
        <div class="section-header">
          <h2 class="section-title" data-reveal>GTM Engineering</h2>
        </div>
        <div class="ai-depth-layout">
          <div class="ai-depth-kicker" data-reveal>
            <span>Revenue</span>
            <span>Automation</span>
            <span>Scale</span>
          </div>
          <div data-reveal>
            <h3 class="ai-depth-headline">{{ gtmEngineering.headline }}</h3>
            <p class="ai-depth-summary">{{ gtmEngineering.summary }}</p>
          </div>
        </div>
        <div class="ai-interests-grid">
          <article v-for="interest in gtmEngineering.interests" :key="interest.title"
            class="ai-interest panel panel--glow" data-reveal>
            <Icon :name="interest.icon" class="ai-interest__icon" size="26" />
            <h4 class="ai-interest__title">{{ interest.title }}</h4>
            <p class="ai-interest__desc">{{ interest.description }}</p>
          </article>
        </div>
      </SectionReveal>
    </section>

    <!-- AI Depth -->
    <section id="ai-depth" class="section section--ai">
      <SectionReveal :stagger="0.07">
        <div class="section-header">
          <h2 class="section-title" data-reveal>AI Engineering</h2>
        </div>
        <div class="ai-depth-layout">
          <div class="ai-depth-kicker" data-reveal>
            <span>Models</span>
            <span>Mechanics</span>
            <span>Mastery</span>
          </div>
          <div data-reveal>
            <h3 class="ai-depth-headline">{{ aiEngineering.headline }}</h3>
            <p class="ai-depth-summary">{{ aiEngineering.summary }}</p>
          </div>
        </div>
        <div class="ai-interests-grid">
          <article v-for="interest in aiEngineering.interests" :key="interest.title"
            class="ai-interest panel panel--glow" data-reveal>
            <Icon :name="interest.icon" class="ai-interest__icon" size="26" />
            <h4 class="ai-interest__title">{{ interest.title }}</h4>
            <p class="ai-interest__desc">{{ interest.description }}</p>
          </article>
        </div>
      </SectionReveal>
    </section>

    <!-- Life -->
    <section id="life" class="section section--life">
      <SectionReveal :stagger="0.06">
        <div class="section-header">
          <h2 class="section-title" data-reveal>Life</h2>
        </div>
        <p class="section-lead" data-reveal>
          Engineering is the craft, but balance keeps the edge sharp. Competitive games,
          pitch time, and the occasional jog keep me grounded outside the terminal.
        </p>

        <div class="hobbies-group" data-reveal>
          <h3 class="hobbies-group__title">
            <Icon name="mdi:gamepad-variant" size="18" />
            Gaming
          </h3>
          <div class="hobbies-grid">
            <article v-for="hobby in gamingHobbies" :key="hobby.name" class="hobby-card panel">
              <Icon :name="hobby.icon" class="hobby-card__icon" size="22" />
              <h4 class="hobby-card__name">{{ hobby.name }}</h4>
              <p class="hobby-card__detail">{{ hobby.detail }}</p>
            </article>
          </div>
        </div>

        <div class="hobbies-group" data-reveal>
          <h3 class="hobbies-group__title">
            <Icon name="mdi:heart-pulse" size="18" />
            Fitness &amp; Outdoors
          </h3>
          <div class="hobbies-grid">
            <article v-for="hobby in fitnessHobbies" :key="hobby.name" class="hobby-card panel">
              <Icon :name="hobby.icon" class="hobby-card__icon" size="22" />
              <h4 class="hobby-card__name">{{ hobby.name }}</h4>
              <p class="hobby-card__detail">{{ hobby.detail }}</p>
            </article>
          </div>
        </div>
      </SectionReveal>
    </section>

    <!-- Contact -->
    <section id="contact" class="section contact-section">
      <SectionReveal :stagger="0.1">
        <h2 class="contact-headline" data-reveal>
          <span>{{ contactSection.headline[0] }}</span>
          {{ contactSection.headline[1] }}
          <span>{{ contactSection.headline[2] }}</span>
        </h2>
        <p class="text-muted max-w-xl mx-auto mb-8" data-reveal>
          {{ contactSection.subline }}
        </p>
        <div class="contact-socials" data-reveal>
          <a v-for="link in socialLinks" :key="link.platform" :href="link.url" class="contact-social-link"
            target="_blank" rel="noopener noreferrer">
            {{ link.platform }}
          </a>
        </div>
        <p class="contact-footer" data-reveal>
          © {{ currentYear }} Ernest Hayford · Accra, Ghana
        </p>
      </SectionReveal>
    </section>
  </div>
</template>

<script
  setup
  lang="ts"
>
  import {
    contact,
    hero,
    overview,
    architectureLead,
    contactSection,
    experience,
    projects,
    skills,
    socialLinks,
    capabilities,
    techOrbit,
    architecturePillars,
    engineeringLanes,
    resumeLink,
    polyglotLanguages,
    aiEngineering,
    gtmEngineering,
    hobbies,
  } from '~/data/portfolio'

  const scrollProgress = useScrollProgress()
  const { isMobilePerf } = usePerfProfile()
  // Gate second WebGL vs Scene3D; ParticleReveal also self-crisps on reduced-motion.
  const showHeroParticleReveal = computed(() => !isMobilePerf.value)

  const { data: latestPosts } = await useAsyncData('home-latest-post', () => fetchPublishedBlogPosts())
  const latestPost = computed(() => latestPosts.value?.[0] ?? null)
  const latestReadingTime = computed(() => {
    if (!latestPost.value) return null
    return readingTimeLabel(estimateReadingTime(textFromPage(latestPost.value)))
  })

  function formatBlogDate(value: string) {
    return new Date(value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const currentYear = new Date().getFullYear()

  const capabilitiesBelt = computed(() => [...capabilities, ...capabilities])

  const gamingHobbies = computed(() =>
    hobbies.filter((h) => h.category === 'gaming'),
  )

  const fitnessHobbies = computed(() =>
    hobbies.filter((h) => h.category === 'fitness'),
  )

  function proficiencyLabel(level: string): string {
    const labels: Record<string, string> = {
      production: 'Production',
      active: 'Active, when needed',
      experimenting: 'Experimenting',
      exploring: 'Exploring',
    }
    return labels[level] ?? level
  }

  const signalHtml = computed(() => {
    const text = hero.summary
    return text
      .replace(
        'HustleSasa platform ($50K→$900K+/mo payments)',
        '<strong>HustleSasa platform ($50K→$900K+/mo payments)</strong>',
      )
      .replace(
        '5–10× leverage',
        '<strong>5–10× leverage</strong>',
      )
  })

  useHead({
    title: `${contact.name} — ${contact.title}`,
    meta: [
      {
        name: 'description',
        content: hero.summary,
      },
      {
        property: 'og:title',
        content: `${contact.name} — ${contact.title}`,
      },
      {
        property: 'og:description',
        content: hero.subheadline,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: contact.site,
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: `${contact.name} — ${contact.title}`,
      },
      {
        name: 'twitter:description',
        content: hero.subheadline,
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: contact.site,
      },
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          'name': contact.name,
          'jobTitle': contact.title,
          'sameAs': socialLinks.map((link) => link.url),
        })
      }
    ],
  })

</script>
