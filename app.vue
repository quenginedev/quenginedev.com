<template>
  <VApp class="portfolio-app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </VApp>
</template>
<script setup lang="ts">
import { useTheme } from 'vuetify'

const colorMode = useColorMode()
const theme = useTheme()

watch(
  () => colorMode.value,
  (mode) => {
    theme.global.name.value = mode === 'light' ? 'light' : 'dark'
  },
  { immediate: true },
)
</script>