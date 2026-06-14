<template>
  <div class="portfolio-root">
    <div class="grid-overlay" aria-hidden="true" />

    <ClientOnly>
      <FluidCanvas :scroll-progress="scrollProgress" />
    </ClientOnly>

    <HudNav :scroll-progress="scrollProgress" />

    <main class="portfolio-main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/portfolio.css'

const { scrollProgress } = useSmoothScroll({ useGsapTicker: true })
</script>
