<template>
  <nav v-if="links.length" class="blog-toc panel" aria-label="Table of contents">
    <p class="blog-toc__label label-caps">On this page</p>
    <ol class="blog-toc__list">
      <li v-for="link in links" :key="link.id" :class="`blog-toc__item blog-toc__item--depth-${link.depth}`">
        <a :href="`#${link.id}`" class="blog-toc__link">{{ link.text }}</a>
        <ol v-if="link.children?.length" class="blog-toc__list blog-toc__list--nested">
          <li
            v-for="child in link.children"
            :key="child.id"
            :class="`blog-toc__item blog-toc__item--depth-${child.depth}`"
          >
            <a :href="`#${child.id}`" class="blog-toc__link">{{ child.text }}</a>
          </li>
        </ol>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import type { BlogTocLink } from '~/composables/useBlogPosts'

defineProps<{
	links: BlogTocLink[]
}>()
</script>
