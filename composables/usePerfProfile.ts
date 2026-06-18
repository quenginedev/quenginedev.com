/** Detect devices that should use reduced visual/scroll fidelity. */
export function detectMobilePerf(): boolean {
  if (import.meta.server) return false
  return (
    window.matchMedia('(pointer: coarse)').matches
    || window.matchMedia('(max-width: 767px)').matches
  )
}

export function usePerfProfile() {
  const isCoarsePointer = useMediaQuery('(pointer: coarse)')
  const isNarrowViewport = useMediaQuery('(max-width: 767px)')

  const isMobilePerf = computed(
    () => isCoarsePointer.value || isNarrowViewport.value,
  )

  return { isMobilePerf }
}
