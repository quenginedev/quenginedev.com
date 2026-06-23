<template>
  <div class="code-block">
    <button
      type="button"
      class="code-block__copy"
      :aria-label="copied ? 'Copied' : 'Copy code'"
      @click="copyCode"
    >
      <Icon :name="copied ? 'mdi:check' : 'mdi:content-copy'" size="14" />
      <span>{{ copied ? 'Copied' : 'Copy' }}</span>
    </button>
    <pre :class="props.class"><slot /></pre>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
	code?: string
	language?: string
	meta?: string
	class?: string
}>()

const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copyCode() {
	const text = props.code ?? ''
	if (!text || !import.meta.client) return

	try {
		await navigator.clipboard.writeText(text)
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
