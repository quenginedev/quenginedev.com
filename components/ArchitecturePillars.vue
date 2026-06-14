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
  background: rgba(232, 240, 237, 0.12);
  border: 1px solid rgba(232, 240, 237, 0.12);
}

.pillar {
  display: flex;
  flex-direction: column;
  gap: var(--space-md, 1rem);
  padding: var(--space-xl, 2rem) var(--space-lg, 1.5rem);
  min-height: 100%;
  background: rgba(15, 18, 22, 0.72);
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
  border-color: #1a6b5c;
  box-shadow:
    0 0 0 1px rgba(26, 107, 92, 0.45),
    inset 0 0 32px rgba(26, 107, 92, 0.06),
    0 12px 40px rgba(10, 12, 15, 0.45);
  background: rgba(15, 18, 22, 0.88);
}

.pillar__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 3.5rem;
  height: 3.5rem;
  border: 1px solid rgba(232, 240, 237, 0.12);
  background: rgba(10, 12, 15, 0.55);
  transition:
    border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.35s ease;
}

.pillar:hover .pillar__icon-wrap {
  border-color: rgba(34, 160, 136, 0.45);
  color: #22a088;
}

.pillar__icon {
  margin: auto;
  color: #1a6b5c;
  transition: color 0.35s ease;
}

.pillar:hover .pillar__icon {
  color: #22a088;
}

.pillar__title {
  margin: 0;
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(0.9375rem, 1.6vw, 1.125rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.15;
  text-transform: uppercase;
  color: #e8f0ed;
}

.pillar__desc {
  margin: 0;
  font-family: var(--font-body, 'Instrument Sans', system-ui, sans-serif);
  font-size: clamp(0.8125rem, 1.2vw, 0.9375rem);
  line-height: 1.6;
  color: rgba(232, 240, 237, 0.55);
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
