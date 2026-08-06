<script setup lang="ts">
import { getServiceBySlug } from '~/data/services'

const service = getServiceBySlug('gtm-engineering')!
</script>

<template>
  <ServicePageLayout :service="service" />
</template>
