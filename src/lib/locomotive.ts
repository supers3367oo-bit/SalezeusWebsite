import type LocomotiveScroll from 'locomotive-scroll'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let locomotiveInstance: LocomotiveScroll | null = null

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

export function scrollPageToSection(
  target: string | HTMLElement,
  options: { duration?: number; offset?: number; immediate?: boolean } = {}
) {
  const { duration = 1.25, offset = -80, immediate = false } = options
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!(el instanceof HTMLElement)) return

  if (locomotiveInstance) {
    locomotiveInstance.scrollTo(el, { duration, offset, immediate })
    return
  }

  const top = el.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' })
}

export function scrollPageToTop(options: { duration?: number; immediate?: boolean } = {}) {
  const { duration = 1.2, immediate = false } = options

  if (locomotiveInstance) {
    locomotiveInstance.scrollTo(0, { duration, immediate })
    return
  }

  window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
}
