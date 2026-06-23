<template>
  <nav class="hud-nav" aria-label="Site navigation">
    <div class="hud-nav__corner hud-nav__corner--tl">
      <NuxtLink to="/" class="hud-panel hud-wordmark">
        quenginedev
      </NuxtLink>
    </div>

    <div class="hud-nav__corner hud-nav__corner--tr">
      <div class="hud-panel hud-socials">
        <button
          type="button"
          class="hud-theme-toggle"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        >
          <Icon :name="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" size="16" />
        </button>
        <a
          v-for="link in navSocialLinks"
          :key="link.platform"
          :href="link.url"
          :aria-label="link.platform"
          class="hud-social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon :name="link.icon" size="16" />
        </a>
      </div>
    </div>

    <div class="hud-nav__corner hud-nav__corner--bl">
      <div class="hud-panel hud-progress">
        <span class="hud-progress__label">Scroll {{ scrollPercent }}%</span>
        <div class="hud-progress__track" aria-hidden="true">
          <div class="hud-progress__fill" :style="{ width: `${scrollPercent}%` }" />
        </div>
      </div>
    </div>

    <div class="hud-nav__corner hud-nav__corner--br">
      <div class="hud-panel hud-contact">
        <NuxtLink to="/blog" class="hud-contact__link">
          Blog
        </NuxtLink>
        <a
          :href="resumeLink"
          class="hud-contact__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume ↗
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { socialLinks, resumeLink } from '~/data/portfolio'

const props = defineProps<{
  scrollProgress?: number
}>()

const navSocialLinks = socialLinks

const scrollPercent = computed(() =>
  Math.round((props.scrollProgress ?? 0) * 100),
)

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
