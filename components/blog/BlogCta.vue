<template>
  <aside class="blog-cta panel">
    <h2 class="blog-section-heading">{{ headline }}</h2>
    <p class="blog-cta__body">{{ body }}</p>
    <a
      :href="linkedInUrl"
      class="blog-cta__btn"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="mdi:linkedin" size="18" />
      <span>{{ label }}</span>
    </a>
  </aside>
</template>

<script setup lang="ts">
import { socialLinks } from '~/data/portfolio'

const props = defineProps<{
	headline?: string
	body?: string
	label?: string
}>()

// ponytail: flat optional fields; nested cta: unused
const DEFAULT_HEADLINE =
	'Need a custom payment rail or GTM automation built for your platform?'
const DEFAULT_BODY =
	'Message me on LinkedIn for an Architectural Discovery Call. I scope backend architecture, payment infrastructure, and GTM pipeline work for your stack.'
const DEFAULT_LABEL = 'Message me on LinkedIn'

const linkedInUrl =
	socialLinks.find((link) => link.platform === 'LinkedIn')?.url ??
	'https://www.linkedin.com/in/ernest-hayford/'

const headline = computed(() => props.headline?.trim() || DEFAULT_HEADLINE)
const body = computed(() => props.body?.trim() || DEFAULT_BODY)
const label = computed(() => props.label?.trim() || DEFAULT_LABEL)
</script>
