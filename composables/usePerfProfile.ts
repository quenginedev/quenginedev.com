/** Detect devices that should use reduced visual/scroll fidelity. */
export function detectMobilePerf(): boolean {
  if (import.meta.server) return false
  return (
    window.matchMedia('(pointer: coarse)').matches
    || window.matchMedia('(max-width: 767px)').matches
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Blog and mobile routes skip the heaviest GPU layers. */
export function detectBlogRoute(path = ''): boolean {
  return path.startsWith('/blog')
}

/** Lite GPU settings (Scene3D particles, FluidCanvas DPR) — always on for smoother input. */
export function shouldUseLiteGpu(): boolean {
  if (import.meta.server) return true
  return true
}

function useMediaQueryState(query: string) {
  const matches = ref(false)

  if (import.meta.client) {
    onMounted(() => {
      const media = window.matchMedia(query)
      const sync = () => {
        matches.value = media.matches
      }
      sync()
      media.addEventListener('change', sync)
      onUnmounted(() => media.removeEventListener('change', sync))
    })
  }

  return matches
}

export function usePerfProfile() {
  const route = useRoute()

  const isCoarsePointer = useMediaQueryState('(pointer: coarse)')
  const isNarrowViewport = useMediaQueryState('(max-width: 767px)')
  const prefersReducedMotion = useMediaQueryState('(prefers-reduced-motion: reduce)')

  const isMobilePerf = computed(
    () => isCoarsePointer.value || isNarrowViewport.value || prefersReducedMotion.value,
  )

  const isBlogRoute = computed(() => detectBlogRoute(route.path))
  const isHomeRoute = computed(() => route.path === '/')

  /** Skip when Scene3D (homepage) or blog — dual WebGL caused ~280ms frames in runtime logs. */
  const showFluidCanvas = computed(
    () => !isBlogRoute.value && !isHomeRoute.value && !isMobilePerf.value,
  )

  /** Native scroll is more responsive than Lenis interpolation (user priority: scroll feel). */
  const useNativeScroll = computed(() => true)

  const useLiteGpu = computed(() => shouldUseLiteGpu())

  return {
    isMobilePerf,
    isBlogRoute,
    showFluidCanvas,
    useNativeScroll,
    useLiteGpu,
    prefersReducedMotion,
  }
}
