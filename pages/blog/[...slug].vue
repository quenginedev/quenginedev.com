<template>
  <div class="blog-page">
    <NuxtLink to="/blog" class="blog-back">← All posts</NuxtLink>

    <article v-if="page" class="blog-article">
      <img
        v-if="page.cover"
        :src="page.cover"
        :alt="page.title"
        class="blog-article__cover"
        width="960"
        height="540"
      />
      <div class="blog-article__meta">
        <time v-if="page.date" class="blog-article__date" :datetime="page.date">
          {{ formatDate(page.date) }}
        </time>
        <span v-for="tag in page.tags ?? []" :key="tag" class="blog-article__tag">{{ tag }}</span>
      </div>
      <h1 class="blog-article__title">{{ page.title }}</h1>
      <p v-if="page.description" class="blog-article__description">{{ page.description }}</p>
      <ContentRenderer
        :value="page"
        class="blog-prose prose prose-invert max-w-none lg:prose-lg"
      />
    </article>

    <div v-else class="blog-article">
      <h1 class="blog-article__title">Post not found</h1>
      <p class="blog-article__description">This article does not exist or has been moved.</p>
      <NuxtLink to="/blog" class="blog-back">← Back to blog</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/blog.css'

const route = useRoute()

const contentPath = computed(() => {
	const slug = route.params.slug
	const segments = Array.isArray(slug) ? slug : [slug]
	return `/blog/${segments.join('/')}`
})

const { data: page } = await useAsyncData(
	`blog-${contentPath.value}`,
	() => queryContent(contentPath.value).findOne(),
)

watch(contentPath, async (path) => {
	page.value = await queryContent(path).findOne()
})

useSeoMeta({
	title: () => (page.value?.title ? `${page.value.title} — quenginedev` : 'Blog — quenginedev'),
	description: () => page.value?.description ?? 'Blog post on quenginedev',
})

function formatDate(value: string) {
	return new Date(value).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}
</script>
