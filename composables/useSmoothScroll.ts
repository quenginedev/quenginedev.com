import type Lenis from 'lenis'
import type { LenisOptions } from 'lenis'

export interface UseSmoothScrollOptions extends LenisOptions {
  /** Drive Lenis from GSAP's ticker instead of requestAnimationFrame. */
  useGsapTicker?: boolean
}

export function useScrollProgress() {
  return useState<number>('portfolio-scroll-progress', () => 0)
}

export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const { useGsapTicker = false, ...lenisOptions } = options

  const lenis = shallowRef<Lenis | null>(null)
  const scrollProgress = useScrollProgress()

  let rafId = 0
  let gsapTickerHandler: ((time: number) => void) | null = null
  let gsapTicker: { remove: (fn: (time: number) => void) => void } | null = null

  const updateScrollProgress = (instance: Lenis) => {
    const limit = instance.limit
    scrollProgress.value = limit > 0 ? instance.scroll / limit : 0
  }

  let nativeScrollCleanup: (() => void) | null = null

  onMounted(async () => {
    const { useNativeScroll } = usePerfProfile()

    if (useNativeScroll.value) {
      const onNativeScroll = () => {
        const limit = document.documentElement.scrollHeight - window.innerHeight
        scrollProgress.value = limit > 0 ? window.scrollY / limit : 0
      }

      window.addEventListener('scroll', onNativeScroll, { passive: true })
      onNativeScroll()
      nativeScrollCleanup = () => window.removeEventListener('scroll', onNativeScroll)

      return
    }

    const [{ default: LenisConstructor }, gsapModule] = await Promise.all([
      import('lenis'),
      useGsapTicker ? import('gsap') : Promise.resolve(null),
    ])

    const instance = new LenisConstructor({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      ...lenisOptions,
    })

    lenis.value = instance

    instance.on('scroll', () => {
      updateScrollProgress(instance)
    })

    updateScrollProgress(instance)

    if (useGsapTicker && gsapModule) {
      const { gsap } = gsapModule
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      instance.on('scroll', ScrollTrigger.update)

      gsapTicker = gsap.ticker
      gsapTickerHandler = (time: number) => {
        instance.raf(time * 1000)
      }
      gsap.ticker.add(gsapTickerHandler)
      gsap.ticker.lagSmoothing(0)

      ScrollTrigger.refresh()
    } else {
      const raf = (time: number) => {
        instance.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }
  })

  onUnmounted(() => {
    if (gsapTickerHandler && gsapTicker) {
      gsapTicker.remove(gsapTickerHandler)
    }
    gsapTickerHandler = null
    gsapTicker = null

    cancelAnimationFrame(rafId)

    nativeScrollCleanup?.()
    nativeScrollCleanup = null

    lenis.value?.destroy()
    lenis.value = null
  })

  return {
    lenis,
    scrollProgress,
  }
}
