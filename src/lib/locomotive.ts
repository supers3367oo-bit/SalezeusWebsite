import type LocomotiveScroll from 'locomotive-scroll'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let locomotiveInstance: LocomotiveScroll | null = null
let scrollGeneration = 0

export function setLocomotiveInstance(instance: LocomotiveScroll | null) {
  locomotiveInstance = instance
}

export function getLocomotiveInstance() {
  return locomotiveInstance
}

export function getScrollTop() {
  return locomotiveInstance?.lenisInstance?.scroll ?? window.scrollY
}

export function refreshLocomotiveScroll() {
  locomotiveInstance?.resize()
  ScrollTrigger.refresh()
}

function resolveSectionScrollTop(el: HTMLElement, navbarClearance: number) {
  refreshLocomotiveScroll()

  const marker = ScrollTrigger.create({
    trigger: el,
    start: `top ${navbarClearance}px`,
  })
  const top = marker.start
  marker.kill(false)
  return top
}

export function scrollPageToSection(
  target: string | HTMLElement,
  options: { duration?: number; offset?: number; immediate?: boolean; retries?: number } = {}
): () => void {
  const { duration = 1.25, offset = -88, immediate = false, retries = 3 } = options
  const generation = ++scrollGeneration
  const timeouts: number[] = []
  const navbarClearance = Math.abs(offset)

  const run = (useImmediate: boolean) => {
    if (generation !== scrollGeneration) return

    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (!(el instanceof HTMLElement)) return

    const top = resolveSectionScrollTop(el, navbarClearance)
    const instant = useImmediate || immediate

    if (locomotiveInstance) {
      locomotiveInstance.scrollTo(top, { duration, immediate: instant })
      return
    }

    window.scrollTo({ top, behavior: instant ? 'auto' : 'smooth' })
  }

  const retryDelays = [0, 180, 450, 900, 1400]
  const attempts = Math.min(retryDelays.length, retries + 1)

  for (let i = 0; i < attempts; i++) {
    const delay = retryDelays[i] ?? 0
    const isLast = i === attempts - 1
    timeouts.push(
      window.setTimeout(() => {
        run(!isLast)
      }, delay)
    )
  }

  return () => {
    if (generation === scrollGeneration) scrollGeneration++
    timeouts.forEach((id) => window.clearTimeout(id))
  }
}

export function scrollPageToTop(options: { duration?: number; immediate?: boolean } = {}) {
  const { duration = 1.2, immediate = false } = options

  if (locomotiveInstance) {
    locomotiveInstance.scrollTo(0, { duration, immediate })
    return
  }

  window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
}
