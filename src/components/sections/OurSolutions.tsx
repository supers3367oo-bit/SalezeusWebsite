import { useRef, useLayoutEffect, useState, useCallback, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ServiceCard from '../services/ServiceCard'
import { refreshLocomotiveScroll } from '../../lib/locomotive'
import { useLocale } from '../../providers/LocaleProvider'
import { useLocalizedServices } from '../../i18n/useLocalizedServices'
import { useHomeVisibility } from '../../providers/HomeVisibilityProvider'
import type { Service } from '../../types/services'

gsap.registerPlugin(ScrollTrigger)

function shouldUseStaticLayout() {
  if (typeof window === 'undefined') return true
  return (
    window.innerWidth < 1024 ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function StaticGrid({ services }: { services: Service[] }) {
  return (
    <div className="section-container pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} layout="grid" />
        ))}
      </div>
    </div>
  )
}

export default function OurSolutions() {
  const { t, dir } = useLocale()
  const isRtl = dir === 'rtl'
  const solutionsTitle = isRtl ? (
    <span className="whitespace-nowrap">{t('solutions.title')}</span>
  ) : (
    <>
      {t('solutions.titleLine1')}
      <br />
      {t('solutions.titleLine2')}
    </>
  )
  const services = useLocalizedServices()
  const { isOnHome } = useHomeVisibility()
  const orderedServices = useMemo(() => {
    const visible = services.filter((service) => isOnHome('services', service.slug, true))
    return isRtl ? [...visible].reverse() : visible
  }, [services, isRtl, isOnHome])
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const innerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [useStatic, setUseStatic] = useState(() => shouldUseStaticLayout())

  const setupHorizontal = useCallback(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const pin = pinRef.current
    if (!section || !track || !pin) return null

    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth
      const viewport = window.innerWidth
      return Math.max(0, trackWidth - viewport + 96)
    }

    const ctx = gsap.context(() => {
      const horizontalTween = gsap.to(track, {
        x: () => (isRtl ? getScrollAmount() : -getScrollAmount()),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollAmount() + window.innerHeight * 0.45}`,
          pin: pin,
          pinSpacing: true,
          scrub: 1.6,
          invalidateOnRefresh: true,
          anticipatePin: 0,
          fastScrollEnd: true,
        },
      })

      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const inner = innerRefs.current[i]
        const tilt = 3 + (i % 2) * 2
        const entryX = isRtl ? -72 : 72
        const entryEdge = isRtl ? 'left' : 'right'

        gsap.fromTo(
          card,
          { y: 48, x: entryX },
          {
            y: 0,
            x: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: `${entryEdge} 118%`,
              end: `${entryEdge} 32%`,
              scrub: 2.2,
            },
          }
        )

        if (inner) {
          if (isRtl) {
            gsap.set(inner, { rotate: 0, transformOrigin: 'center bottom' })
            gsap.fromTo(
              inner,
              { y: 20 },
              {
                y: 0,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: `${entryEdge} 112%`,
                  end: `${entryEdge} 30%`,
                  scrub: 2.4,
                },
              }
            )
          } else {
            gsap.set(inner, { transformOrigin: 'right bottom' })
            gsap.fromTo(
              inner,
              { rotate: tilt, y: 20 },
              {
                rotate: 0,
                y: 0,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: 'right 112%',
                  end: 'right 30%',
                  scrub: 2.4,
                },
              }
            )
          }
        }
      })

      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 0 },
          {
            y: -24,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '+=32%',
              scrub: 1.2,
            },
          }
        )
      }
    }, section)

    const refresh = () => ScrollTrigger.refresh()
    const images = pin.querySelectorAll('img')
    images.forEach((img) => {
      if (!(img as HTMLImageElement).complete) {
        img.addEventListener('load', refresh, { once: true })
      }
    })

    return ctx
  }, [isRtl])

  useLayoutEffect(() => {
    const syncLayoutMode = () => {
      setUseStatic(shouldUseStaticLayout())
    }

    syncLayoutMode()

    const desktopMql = window.matchMedia('(min-width: 1024px)')
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)')

    desktopMql.addEventListener('change', syncLayoutMode)
    motionMql.addEventListener('change', syncLayoutMode)

    return () => {
      desktopMql.removeEventListener('change', syncLayoutMode)
      motionMql.removeEventListener('change', syncLayoutMode)
    }
  }, [])

  useLayoutEffect(() => {
    if (useStatic) return

    const ctx = setupHorizontal()
    if (!ctx) return

    requestAnimationFrame(() => refreshLocomotiveScroll())

    return () => {
      ctx.revert()
    }
  }, [useStatic, setupHorizontal])

  if (useStatic) {
    return (
      <section className="section-surface pt-24 pb-16 lg:pt-32 lg:pb-24" id="solutions">
        <div className="section-container mb-4 lg:mb-12">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div>
              <span className="label-tag mb-3 block">{t('solutions.label')}</span>
              <h2 className="heading-lg text-sz-dark">{solutionsTitle}</h2>
            </div>
            <p
              className="text-sz-dark/75 max-w-xl"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14px, 3.8vw, 15px)',
                lineHeight: 1.7,
              }}
            >
              {t('solutions.subtitleDetailed')}
            </p>
          </div>
        </div>
        <StaticGrid services={services} />
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="section-surface relative isolate z-20" id="solutions">
      <div ref={pinRef} className="relative z-20 h-[100dvh] overflow-hidden flex flex-col bg-[#F8F7F4]">
        <div
          ref={headerRef}
          className="section-container pt-8 lg:pt-10 pb-0 shrink-0"
        >
          <div className="flex flex-col gap-3 max-w-2xl">
            <div>
              <span className="label-tag mb-2 block">{t('solutions.label')}</span>
              <h2
                className="text-sz-dark leading-[1.08]"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  fontWeight: 600,
                  letterSpacing: isRtl ? 0 : '-0.02em',
                }}
              >
                {solutionsTitle}
              </h2>
            </div>
            <p
              className="text-sz-dark/75 max-w-xl"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14px, 3.8vw, 15px)',
                lineHeight: 1.7,
              }}
            >
              {t('solutions.subtitleDetailed')}
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-start min-h-0 overflow-hidden px-6 lg:px-8 pt-1 pb-6 lg:pb-8">
          <div
            ref={trackRef}
            className={`flex items-end gap-8 lg:gap-10 will-change-transform ${
              isRtl
                ? 'pr-[max(1.5rem,calc((100vw-80rem)/2+2rem))] pl-[30vw]'
                : 'pl-[max(1.5rem,calc((100vw-80rem)/2+2rem))] pr-[30vw]'
            }`}
          >
            {orderedServices.map((service, i) => (
              <ServiceCard
                key={service.slug}
                service={service}
                layout="carousel"
                cardRef={(el) => {
                  cardRefs.current[i] = el
                }}
                innerRef={(el) => {
                  innerRefs.current[i] = el
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
