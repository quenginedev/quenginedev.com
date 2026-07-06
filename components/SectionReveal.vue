<template>
  <div ref="rootRef" class="section-reveal">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    delay?: number
    stagger?: number
    scrollStart?: string
  }>(),
  {
    delay: 0,
    stagger: 0.08,
    scrollStart: 'top 85%',
  },
)

const rootRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!rootRef.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ])

  gsap.registerPlugin(ScrollTrigger)

  const items = rootRef.value.querySelectorAll('[data-reveal]')
  if (!items.length) return

  gsap.fromTo(
    items,
    { y: 48, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: props.stagger,
      delay: props.delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: rootRef.value,
        start: props.scrollStart,
        once: true,
      },
    },
  )
})
</script>
