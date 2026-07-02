import { useRef, useLayoutEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ServiceCard from '../services/ServiceCard'
import { SERVICES } from '../../data/services'
import { refreshLocomotiveScroll } from '../../lib/locomotive'

gsap.registerPlugin(ScrollTrigger)

function shouldUseStaticLayout() {
  if (typeof window === 'undefined') return true
  return (
    window.innerWidth < 1024 ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function StaticGrid() {
  return (
    <div className="section-container pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
        {SERVICES.map((service) => (
          <ServiceCard key={service.title} service={service} layout="grid" />
        ))}
      </div>
    </div>
  )
}

export default function OurSolutions() {
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
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollAmount() + window.innerHeight * 0.45}`,
          pin: pin,
          pinSpacing: true,
          scrub: 1.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const inner = innerRefs.current[i]

        gsap.set(card, { transformOrigin: 'right bottom' })

        gsap.fromTo(
          card,
          { y: 48, x: 72, opacity: 0.2 },
          {
            y: 0,
            x: 0,
            opacity: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: 'right 118%',
              end: 'right 32%',
              scrub: 2.2,
            },
          }
        )

        if (inner) {
          gsap.fromTo(
            inner,
            { rotate: 3 + (i % 2) * 2, y: 20 },
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
      })

      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 1, y: 0 },
          {
            opacity: 0.28,
            y: -40,
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
  }, [])

  useLayoutEffect(() => {
    if (shouldUseStaticLayout()) {
      setUseStatic(true)
      return
    }

    setUseStatic(false)

    const ctx = setupHorizontal()
    if (!ctx) return

    const handleResize = () => {
      if (shouldUseStaticLayout()) {
        ctx.revert()
        setUseStatic(true)
        return
      }
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)
    requestAnimationFrame(() => refreshLocomotiveScroll())

    return () => {
      window.removeEventListener('resize', handleResize)
      ctx.revert()
    }
  }, [setupHorizontal])

  if (useStatic) {
    return (
      <section className="section-surface pt-24 pb-16 lg:pt-32 lg:pb-24" id="solutions">
        <div className="section-container section-header">
          <div className="section-header-row">
            <div>
              <span className="label-tag mb-3 block">Our Services</span>
              <h2 className="heading-lg text-sz-dark">
                End-to-End<br />Solutions
              </h2>
            </div>
            <p
              className="text-sz-secondary max-w-xs"
              style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65 }}
            >
              From strategy to execution, we cover every aspect of brand growth under one roof.
            </p>
          </div>
        </div>
        <StaticGrid />
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="section-surface relative isolate" id="solutions">
      <div ref={pinRef} className="h-[100dvh] overflow-hidden flex flex-col bg-[#F8F7F4]">
        <div
          ref={headerRef}
          className="section-container pt-8 lg:pt-10 pb-2 shrink-0"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
            <div>
              <span className="label-tag mb-2 block">Our Services</span>
              <h2
                className="text-sz-dark leading-[1.08]"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                }}
              >
                End-to-End<br />Solutions
              </h2>
            </div>
            <p
              className="text-sz-secondary max-w-xs lg:text-right"
              style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65 }}
            >
              From strategy to execution, we cover every aspect of brand growth under one roof.
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-end min-h-0 overflow-hidden px-6 lg:px-8 pb-10 lg:pb-14">
          <div
            ref={trackRef}
            className="flex items-end gap-8 lg:gap-10 will-change-transform pl-[max(1.5rem,calc((100vw-80rem)/2+2rem))] pr-[30vw]"
          >
            {SERVICES.map((service, i) => (
              <ServiceCard
                key={service.title}
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
