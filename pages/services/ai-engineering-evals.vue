<script setup lang="ts">
import { getServiceBySlug } from '~/data/services'

const service = getServiceBySlug('ai-engineering-evals')!
</script>

<template>
  <ServicePageLayout :service="service" />
</template>
