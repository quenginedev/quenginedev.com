<template>
  <div class="blog-page">
    <NuxtLink to="/blog" class="blog-back">← All posts</NuxtLink>

    <article v-if="page" class="blog-article">
      <img v-if="page.cover" :src="page.cover" :alt="page.title" class="blog-article__cover" width="960" height="540" />

      <div class="blog-article__meta">
        <time v-if="page.date" class="blog-article__date" :datetime="page.date">
          {{ formatDate(page.date) }}
        </time>
        <span v-if="page.updated && page.updated !== page.date" class="blog-article__updated">
          Updated {{ formatDate(page.updated) }}
        </span>
        <span v-if="readingTime" class="blog-article__reading-time">{{ readingTime }}</span>
        <BlogTag v-for="tag in page.tags ?? []" :key="tag" :tag="tag" />
      </div>

      <h1 class="blog-article__title">{{ page.title }}</h1>
      <p v-if="page.description" class="blog-article__description">{{ page.description }}</p>

      <aside v-if="page.tldr" class="blog-tldr">
        <p class="blog-tldr__label">TL;DR</p>
        <p class="blog-tldr__text">{{ page.tldr }}</p>
      </aside>

      <div class="blog-article__layout">
        <BlogToc v-if="tocLinks.length" :links="tocLinks" class="blog-article__toc" />
        <ContentRenderer :value="page" class="blog-prose prose max-w-none lg:prose-lg" />
      </div>

      <footer class="blog-article__footer">
        <BlogShare :title="page.title" :url="postUrl" />
        <BlogAuthor />
        <BlogRelated :posts="allPosts ?? []" :current-path="contentPath" :tags="page.tags ?? []" />
        <BlogPostNav :posts="allPosts ?? []" :current-path="contentPath" />
      </footer>
    </article>

    <div v-else class="blog-article">
      <h1 class="blog-article__title">Post not found</h1>
      <p class="blog-article__description">This article does not exist or has been moved.</p>
      <NuxtLink to="/blog" class="blog-back">← Back to blog</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/composables/useBlogPosts'
import { contact } from '~/data/portfolio'

import '~/assets/css/blog.css'

const route = useRoute()

const contentPath = computed(() => {
  const slug = route.params.slug
  const segments = Array.isArray(slug) ? slug : [slug]
  return `/blog/${segments.join('/')}`
})

const { data: page } = await useAsyncData(`blog-${contentPath.value}`, () =>
  queryContent<BlogPost>(contentPath.value).findOne(),
)

const { data: allPosts } = await useAsyncData('blog-all-published', () => fetchPublishedBlogPosts())

watch(contentPath, async (path) => {
  page.value = await queryContent<BlogPost>(path).findOne()
})

const isPublished = computed(() => page.value && page.value.draft !== true)

const postUrl = computed(() => {
  const canonical = page.value?.canonical
  if (canonical?.startsWith('http')) return canonical
  const base = contact.site.replace(/\/$/, '')
  return `${base}${contentPath.value}`
})

const ogImage = computed(() => (page.value ? postOgImage(page.value, contact.site) : undefined))

const readingTime = computed(() => {
  if (!page.value) return null
  return readingTimeLabel(estimateReadingTime(textFromPage(page.value)))
})

const tocLinks = computed(() => extractTocFromPage(page.value))

const jsonLd = computed(() => {
  if (!page.value || !isPublished.value) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: page.value.title,
    description: page.value.description,
    datePublished: page.value.date,
    dateModified: page.value.updated ?? page.value.date,
    author: {
      '@type': 'Person',
      name: contact.name,
      url: contact.site,
    },
    image: ogImage.value,
    mainEntityOfPage: postUrl.value,
  }
})

useSeoMeta({
  title: () => (page.value?.title ? `${page.value.title} — quenginedev` : 'Blog — quenginedev'),
  description: () => page.value?.description ?? 'Blog post on quenginedev',
  ogTitle: () => page.value?.title ?? 'Blog — quenginedev',
  ogDescription: () => page.value?.description ?? 'Blog post on quenginedev',
  ogType: 'article',
  ogUrl: () => postUrl.value,
  ogImage: () => ogImage.value,
  twitterCard: 'summary_large_image',
  twitterTitle: () => page.value?.title,
  twitterDescription: () => page.value?.description,
  twitterImage: () => ogImage.value,
})

useHead({
  link: () =>
    page.value?.canonical
      ? [{ rel: 'canonical', href: page.value.canonical.startsWith('http') ? page.value.canonical : postUrl.value }]
      : [{ rel: 'canonical', href: postUrl.value }],
  script: () =>
    jsonLd.value
      ? [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(jsonLd.value),
          },
        ]
      : [],
})

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
