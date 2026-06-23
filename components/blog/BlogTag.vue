<template>
  <NuxtLink :to="`/blog/tags/${slug}`" class="blog-tag">
    {{ tag }}
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
	tag: string
}>()

const slug = computed(() => tagToSlug(props.tag))
</script>
