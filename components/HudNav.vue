<template>
  <nav class="hud-nav" aria-label="Site navigation">
    <div class="hud-nav__corner hud-nav__corner--tl">
      <a href="#hero" class="hud-panel hud-wordmark" @click.prevent="scrollTo('#hero')">
        quenginedev
      </a>
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
        <a
          :href="resumeLink"
          class="hud-contact__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume ↗
        </a>
        <a :href="`mailto:${email}`" class="hud-contact__email">
          {{ email }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { socialLinks, contact, resumeLink } from '~/data/portfolio'

const props = defineProps<{
  scrollProgress?: number
}>()

const email = contact.email

const navSocialLinks = socialLinks.filter((link) => link.platform !== 'Email')

const scrollPercent = computed(() =>
  Math.round((props.scrollProgress ?? 0) * 100),
)

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

function scrollTo(selector: string) {
  const el = document.querySelector(selector)
  el?.scrollIntoView({ behavior: 'smooth' })
}
</script>
