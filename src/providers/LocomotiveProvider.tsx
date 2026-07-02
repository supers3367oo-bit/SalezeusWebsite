import { useEffect, useRef, type ReactNode } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { refreshLocomotiveScroll, setLocomotiveInstance } from '../lib/locomotive'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  children: ReactNode
}

export default function LocomotiveProvider({ children }: Props) {
  const locomotiveRef = useRef<LocomotiveScroll | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      },
      scrollCallback: () => {
        ScrollTrigger.update()
      },
      initCustomTicker: (render) => {
        gsap.ticker.add(render)
      },
      destroyCustomTicker: (render) => {
        gsap.ticker.remove(render)
      },
    })

    locomotiveRef.current = locomotiveScroll
    setLocomotiveInstance(locomotiveScroll)
    gsap.ticker.lagSmoothing(0)

    const lenis = locomotiveScroll.lenisInstance
    let onRefresh: (() => void) | null = null

    if (lenis) {
      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length && typeof value === 'number') {
            lenis.scrollTo(value, { immediate: true })
          }
          return lenis.scroll
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          }
        },
        pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
      })

      ScrollTrigger.defaults({ scroller: document.documentElement })

      onRefresh = () => locomotiveScroll.resize()
      ScrollTrigger.addEventListener('refresh', onRefresh)
    }

    const onResize = () => refreshLocomotiveScroll()
    window.addEventListener('resize', onResize)

    requestAnimationFrame(() => {
      refreshLocomotiveScroll()
    })

    return () => {
      window.removeEventListener('resize', onResize)
      if (onRefresh) {
        ScrollTrigger.removeEventListener('refresh', onRefresh)
      }
      ScrollTrigger.scrollerProxy(document.documentElement, {})
      locomotiveScroll.destroy()
      locomotiveRef.current = null
      setLocomotiveInstance(null)
    }
  }, [])

  return <>{children}</>
}
