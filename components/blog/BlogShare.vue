<template>
  <div class="blog-share">
    <h2 class="blog-section-heading">Share</h2>
    <div class="blog-share__actions">
      <button type="button" class="blog-share__btn" @click="copyLink">
        <Icon :name="copied ? 'mdi:check' : 'mdi:link-variant'" size="16" />
        {{ copied ? 'Copied' : 'Copy link' }}
      </button>
      <a
        :href="twitterUrl"
        class="blog-share__btn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
      >
        <Icon name="mdi:twitter" size="16" />
        X
      </a>
      <a
        :href="linkedInUrl"
        class="blog-share__btn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        <Icon name="mdi:linkedin" size="16" />
        LinkedIn
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
	title: string
	url: string
}>()

const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

const twitterUrl = computed(
	() =>
		`https://twitter.com/intent/tweet?text=${encodeURIComponent(props.title)}&url=${encodeURIComponent(props.url)}`,
)

const linkedInUrl = computed(
	() => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(props.url)}`,
)

async function copyLink() {
	if (!import.meta.client) return
	try {
		await navigator.clipboard.writeText(props.url)
		copied.value = true
		if (resetTimer) clearTimeout(resetTimer)
		resetTimer = setTimeout(() => {
			copied.value = false
		}, 2000)
	} catch {
		copied.value = false
	}
}

onUnmounted(() => {
	if (resetTimer) clearTimeout(resetTimer)
})
</script>
