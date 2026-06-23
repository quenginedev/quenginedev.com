<template>
  <nav v-if="prev || next" class="blog-post-nav" aria-label="Post navigation">
    <NuxtLink v-if="prev" :to="prev._path" class="blog-post-nav__link blog-post-nav__link--prev panel">
      <span class="blog-post-nav__eyebrow">← Previous</span>
      <span class="blog-post-nav__title">{{ prev.title }}</span>
    </NuxtLink>
    <NuxtLink v-if="next" :to="next._path" class="blog-post-nav__link blog-post-nav__link--next panel">
      <span class="blog-post-nav__eyebrow">Next →</span>
      <span class="blog-post-nav__title">{{ next.title }}</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/composables/useBlogPosts'

const props = defineProps<{
	posts: BlogPost[]
	currentPath: string
}>()

const currentIndex = computed(() =>
	props.posts.findIndex((post) => post._path === props.currentPath),
)

const prev = computed(() => {
	const index = currentIndex.value
	return index > 0 ? props.posts[index - 1] : undefined
})

const next = computed(() => {
	const index = currentIndex.value
	return index >= 0 && index < props.posts.length - 1 ? props.posts[index + 1] : undefined
})
</script>
