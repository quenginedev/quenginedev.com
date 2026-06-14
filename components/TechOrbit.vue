<template>
  <div class="tech-orbit-wrap">
  <div class="tech-orbit" aria-hidden="true">
    <div class="tech-orbit__scene">
      <div
        v-for="(ring, ringIndex) in rings"
        :key="ringIndex"
        class="tech-orbit__ring"
        :class="{ 'tech-orbit__ring--reverse': ring.reverse }"
        :style="{
          '--tilt': `${ring.tilt}deg`,
          '--radius': ring.radius,
          '--duration': `${ring.duration}s`,
        }"
      >
        <div
          v-for="(item, itemIndex) in ring.items"
          :key="`${item.name}-${itemIndex}`"
          class="tech-orbit__item"
          :style="{ '--angle': `${item.angle}deg` }"
        >
          <span
            class="tech-orbit__pill"
            :class="`tech-orbit__pill--${normalizeCategory(item.category)}`"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>

    <div class="tech-orbit__core" aria-hidden="true">
      <span class="tech-orbit__core-ring" />
      <span class="tech-orbit__core-dot" />
    </div>
  </div>

  <ul class="sr-only">
    <li v-for="item in items" :key="item.name">
      {{ item.name }} ({{ item.category }})
    </li>
  </ul>
  </div>
</template>

<script setup lang="ts">
export interface TechOrbitItem {
  name: string
  category: string
}

const props = withDefaults(
  defineProps<{
    items: TechOrbitItem[]
    expanded?: boolean
  }>(),
  {
    expanded: false,
  },
)

type CategoryKey = 'frontend' | 'backend' | 'infra' | 'platform'

interface RingConfig {
  tilt: number
  radius: string
  duration: number
  reverse: boolean
}

interface RingItem extends TechOrbitItem {
  angle: number
}

interface ComputedRing extends RingConfig {
  items: RingItem[]
}

const RING_CONFIGS_NORMAL: RingConfig[] = [
  {
    tilt: 72,
    radius: 'clamp(130px, 20vw, 220px)',
    duration: 48,
    reverse: false,
  },
  {
    tilt: 58,
    radius: 'clamp(165px, 24vw, 260px)',
    duration: 58,
    reverse: true,
  },
]

const RING_CONFIGS_EXPANDED: RingConfig[] = [
  {
    tilt: 72,
    radius: 'clamp(200px, 34vw, 440px)',
    duration: 52,
    reverse: false,
  },
  {
    tilt: 58,
    radius: 'clamp(260px, 42vw, 540px)',
    duration: 62,
    reverse: true,
  },
]

const ringConfigs = computed(() =>
  props.expanded ? RING_CONFIGS_EXPANDED : RING_CONFIGS_NORMAL,
)

function normalizeCategory(category: string): CategoryKey {
  const key = category.toLowerCase().trim()
  if (key === 'frontend' || key === 'backend' || key === 'infra' || key === 'platform') {
    return key
  }
  if (key.includes('front') || key.includes('ui') || key.includes('client')) return 'frontend'
  if (key.includes('back') || key.includes('api') || key.includes('server')) return 'backend'
  if (key.includes('infra') || key.includes('cloud') || key.includes('devops')) return 'infra'
  return 'platform'
}

const rings = computed<ComputedRing[]>(() => {
  if (!props.items.length) return []

  const buckets: RingItem[][] = ringConfigs.value.map(() => [])

  props.items.forEach((item, index) => {
    const bucket = buckets[index % ringConfigs.value.length]
    bucket.push({ ...item, angle: 0 })
  })

  return ringConfigs.value.map((config, ringIndex) => {
    const ringItems = buckets[ringIndex]
    const count = ringItems.length
    const step = count > 0 ? 360 / count : 0

    return {
      ...config,
      items: ringItems.map((item, itemIndex) => ({
        ...item,
        angle: step * itemIndex,
      })),
    }
  }).filter((ring) => ring.items.length > 0)
})
</script>

<style scoped>
.tech-orbit-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: inherit;
  overflow: visible;
}

.tech-orbit {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
  perspective-origin: 50% 50%;
  overflow: visible;
  pointer-events: none;
}

.tech-orbit__scene {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: inherit;
  transform-style: preserve-3d;
}

.tech-orbit__ring {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
  animation: orbit-spin var(--duration) linear infinite;
}

.tech-orbit__ring--reverse {
  animation-direction: reverse;
}

.tech-orbit:hover .tech-orbit__ring {
  animation-play-state: paused;
}

.tech-orbit:hover .tech-orbit__pill {
  animation-play-state: paused;
}

.tech-orbit__item {
  position: absolute;
  top: 0;
  left: 0;
  transform-style: preserve-3d;
  transform: rotateY(var(--angle)) translateZ(var(--radius));
}

.tech-orbit__pill {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  font-family: var(--font-body, 'Instrument Sans', system-ui, sans-serif);
  font-size: clamp(0.625rem, 1.4vw, 0.75rem);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  color: #e8f0ed;
  background: rgba(10, 12, 15, 0.82);
  border: 1px solid rgba(232, 240, 237, 0.18);
  backdrop-filter: blur(8px);
  transform: translate(-50%, -50%) rotateY(calc(-1 * var(--angle))) rotateX(calc(-1 * var(--tilt)));
  animation: counter-spin var(--duration) linear infinite;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.tech-orbit__ring--reverse .tech-orbit__pill {
  animation-direction: reverse;
}

.tech-orbit__pill--frontend {
  border-color: rgba(34, 160, 136, 0.55);
  box-shadow: 0 0 12px rgba(34, 160, 136, 0.15);
}

.tech-orbit__pill--backend {
  border-color: rgba(26, 107, 92, 0.65);
  box-shadow: 0 0 12px rgba(26, 107, 92, 0.18);
}

.tech-orbit__pill--infra {
  border-color: rgba(74, 158, 255, 0.55);
  box-shadow: 0 0 12px rgba(74, 158, 255, 0.15);
}

.tech-orbit__pill--platform {
  border-color: rgba(196, 163, 90, 0.55);
  box-shadow: 0 0 12px rgba(196, 163, 90, 0.15);
}

.tech-orbit__core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
  pointer-events: none;
}

.tech-orbit__core-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(28px, 5vw, 44px);
  height: clamp(28px, 5vw, 44px);
  margin: -22px 0 0 -22px;
  border: 1px solid rgba(26, 107, 92, 0.45);
  border-radius: 50%;
  box-shadow:
    0 0 24px rgba(26, 107, 92, 0.2),
    inset 0 0 12px rgba(26, 107, 92, 0.08);
}

.tech-orbit__core-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  background: #22a088;
  border-radius: 50%;
  box-shadow: 0 0 16px rgba(34, 160, 136, 0.65);
}

@keyframes orbit-spin {
  from {
    transform: rotateX(var(--tilt)) rotateY(0deg);
  }
  to {
    transform: rotateX(var(--tilt)) rotateY(360deg);
  }
}

@keyframes counter-spin {
  from {
    transform: translate(-50%, -50%) rotateY(calc(-1 * var(--angle))) rotateX(calc(-1 * var(--tilt)));
  }
  to {
    transform: translate(-50%, -50%) rotateY(calc(-360deg - var(--angle))) rotateX(calc(-1 * var(--tilt)));
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 640px) {
  .tech-orbit {
    min-height: 360px;
    perspective: 900px;
  }

  .tech-orbit__scene {
    height: clamp(280px, 68vw, 360px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .tech-orbit__ring,
  .tech-orbit__pill {
    animation: none;
  }
}
</style>
