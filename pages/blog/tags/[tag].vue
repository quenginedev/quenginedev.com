<template>
  <div class="blog-page">
    <header class="blog-header">
      <NuxtLink to="/blog" class="blog-back">← All posts</NuxtLink>
      <h1 class="blog-header__title">{{ tagLabel }}</h1>
      <p class="blog-header__lead">
        {{ posts?.length ?? 0 }} {{ posts?.length === 1 ? 'post' : 'posts' }} tagged
        <BlogTag v-if="tagLabel" :tag="tagLabel" />
      </p>
    </header>

    <div v-if="posts?.length" class="blog-index__grid">
      <article v-for="post in posts" :key="post._path" class="blog-card panel">
        <NuxtLink :to="post._path">
          <img
            :src="post.cover || '/blog/cover-placeholder.svg'"
            :alt="post.title"
            class="blog-card__cover"
            width="560"
            height="315"
          />
        </NuxtLink>
        <div>
          <div class="blog-card__meta">
            <time v-if="post.date" class="blog-card__date" :datetime="post.date">
              {{ formatDate(post.date) }}
            </time>
            <BlogTag v-for="item in post.tags ?? []" :key="item" :tag="item" />
          </div>
          <h2 class="blog-card__title">
            <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
          </h2>
          <p v-if="post.description" class="blog-card__desc">{{ post.description }}</p>
        </div>
      </article>
    </div>

    <p v-else class="blog-header__lead">No posts with this tag.</p>
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/blog.css'

const route = useRoute()
const tagSlug = computed(() => String(route.params.tag ?? ''))

const { data: allPosts } = await useAsyncData('blog-tags-all', () => fetchPublishedBlogPosts())

const allTags = computed(() => {
  const tags = new Set<string>()
  for (const post of allPosts.value ?? []) {
    for (const tag of post.tags ?? []) tags.add(tag)
  }
  return [...tags]
})

const tagLabel = computed(() => slugToTag(tagSlug.value, allTags.value) ?? tagSlug.value)

const posts = computed(() =>
  (allPosts.value ?? []).filter((post) =>
    (post.tags ?? []).some((tag) => tagToSlug(tag) === tagSlug.value.toLowerCase()),
  ),
)

useSeoMeta({
  title: () => `${tagLabel.value} — Blog — quenginedev`,
  description: () => `Posts tagged ${tagLabel.value} on quenginedev.`,
})

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
