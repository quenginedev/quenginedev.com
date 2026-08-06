<script setup lang="ts">
import { getServiceBySlug } from '~/data/services'

const service = getServiceBySlug('backend-architecture')!
</script>

<template>
  <ServicePageLayout :service="service" />
</template>
