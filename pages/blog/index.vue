<template>
  <div class="blog-page">
    <header class="blog-header">
      <span class="label-caps">Writing / Field notes</span>
      <h1 class="blog-header__title">Blog</h1>
      <p class="blog-header__lead">
        Tutorials and architecture notes on systems, agents, and the tooling I use to ship them.
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
            <span v-for="tag in post.tags ?? []" :key="tag" class="blog-card__tag">{{ tag }}</span>
          </div>
          <h2 class="blog-card__title">
            <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
          </h2>
          <p v-if="post.description" class="blog-card__desc">{{ post.description }}</p>
        </div>
      </article>
    </div>

    <p v-else class="blog-header__lead">No posts yet.</p>
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/blog.css'

const { data: posts } = await useAsyncData('blog-index', () =>
	queryContent('blog').sort({ date: -1 }).find(),
)

useSeoMeta({
	title: 'Blog — quenginedev',
	description: 'Tutorials and architecture notes on multi-agent systems, Nuxt, and full-stack engineering.',
})

function formatDate(value: string) {
	return new Date(value).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}
</script>
