<template>
  <div class="pillars-grid">
    <article
      v-for="pillar in pillars"
      :key="pillar.title"
      class="pillar panel"
      :data-reveal="reveal || undefined"
    >
      <div class="pillar__icon-wrap" aria-hidden="true">
        <Icon :name="pillar.icon" class="pillar__icon" size="36" />
      </div>
      <h3 class="pillar__title">{{ pillar.title }}</h3>
      <p class="pillar__desc">{{ pillar.description }}</p>
    </article>

    <slot />
  </div>
</template>

<script setup lang="ts">
export interface ArchitecturePillar {
  title: string
  description: string
  icon: string
}

withDefaults(
  defineProps<{
    pillars: ArchitecturePillar[]
    /** When false, omit data-reveal so a parent SectionReveal can target slotted children */
    reveal?: boolean
  }>(),
  {
    reveal: true,
  },
)
</script>

<style scoped>
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--pillar-grid-bg);
  border: 1px solid var(--pillar-grid-border);
}

.pillar {
  display: flex;
  flex-direction: column;
  gap: var(--space-md, 1rem);
  padding: var(--space-xl, 2rem) var(--space-lg, 1.5rem);
  min-height: 100%;
  background: var(--pillar-bg);
  border: none;
  border-radius: 0;
  transition:
    border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    background 0.35s ease;
}

.pillar:hover {
  transform: translateY(-4px);
  border-color: var(--gold);
  box-shadow:
    0 0 0 1px var(--gold-glow),
    inset 0 0 32px rgba(201, 162, 39, 0.05),
    0 12px 40px var(--pillar-hover-shadow);
  background: var(--pillar-hover-bg);
}

.pillar__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 3.5rem;
  height: 3.5rem;
  border: 1px solid var(--pillar-icon-border);
  background: var(--pillar-icon-bg);
  transition:
    border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.35s ease;
}

.pillar:hover .pillar__icon-wrap {
  border-color: rgba(201, 162, 39, 0.45);
  color: var(--gold-bright);
}

.pillar__icon {
  margin: auto;
  color: var(--accent);
  transition: color 0.35s ease;
}

.pillar:hover .pillar__icon {
  color: var(--accent-bright);
}

.pillar__title {
  margin: 0;
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(0.9375rem, 1.6vw, 1.125rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.15;
  text-transform: uppercase;
  color: var(--pillar-title);
}

.pillar__desc {
  margin: 0;
  font-family: var(--font-body, 'Instrument Sans', system-ui, sans-serif);
  font-size: clamp(0.8125rem, 1.2vw, 0.9375rem);
  line-height: 1.6;
  color: var(--pillar-desc);
}

@media (max-width: 1024px) {
  .pillars-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .pillars-grid {
    grid-template-columns: 1fr;
  }

  .pillar {
    padding: var(--space-lg, 1.5rem) var(--space-md, 1rem);
  }

  .pillar:hover {
    transform: translateY(-2px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pillar {
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }

  .pillar:hover {
    transform: none;
  }
}
</style>
