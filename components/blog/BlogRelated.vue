<template>
  <section v-if="related.length" class="blog-related">
    <h2 class="blog-section-heading">Related posts</h2>
    <div class="blog-related__grid">
      <article v-for="post in related" :key="post._path" class="blog-related__card panel">
        <time v-if="post.date" class="blog-related__date" :datetime="post.date">
          {{ formatDate(post.date) }}
        </time>
        <h3 class="blog-related__title">
          <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
        </h3>
        <p v-if="post.description" class="blog-related__desc">{{ post.description }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/composables/useBlogPosts'

const props = defineProps<{
	posts: BlogPost[]
	currentPath: string
	tags: string[]
}>()

const related = computed(() => {
	const tagSet = new Set(props.tags)
	return props.posts
		.filter((post) => post._path !== props.currentPath)
		.map((post) => ({
			post,
			overlap: (post.tags ?? []).filter((tag) => tagSet.has(tag)).length,
		}))
		.filter((entry) => entry.overlap > 0)
		.sort((a, b) => b.overlap - a.overlap || Date.parse(b.post.date) - Date.parse(a.post.date))
		.slice(0, 3)
		.map((entry) => entry.post)
})

function formatDate(value: string) {
	return new Date(value).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})
}
</script>
