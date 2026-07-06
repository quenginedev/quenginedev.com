<template>
  <div class="portfolio-root">
    <div class="grid-overlay" aria-hidden="true" />

    <ClientOnly>
      <FluidCanvas v-if="showFluidCanvas" :scroll-progress="scrollProgress" />
    </ClientOnly>

    <HudNav :scroll-progress="scrollProgress" />

    <main class="portfolio-main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/portfolio.css'

const { showFluidCanvas } = usePerfProfile()
const { scrollProgress } = useSmoothScroll()
</script>
