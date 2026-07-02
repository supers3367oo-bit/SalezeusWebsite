import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'
import ScrollReveal from '../../ui/ScrollReveal'
import PresenceMap from './PresenceMap'
import { refreshLocomotiveScroll } from '../../../lib/locomotive'

gsap.registerPlugin(ScrollTrigger)

export default function ExperienceBorders() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const mapWrapRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const reduce = reduceMotion ?? false

  useEffect(() => {
    if (reduce) return

    const section = sectionRef.current
    const header = headerRef.current
    const mapWrap = mapWrapRef.current
    if (!section || !header || !mapWrap) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            end: 'top 58%',
            scrub: 1,
          },
        }
      )

      gsap.fromTo(
        mapWrap,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            end: 'top 48%',
            scrub: 1.2,
          },
        }
      )
    }, section)

    requestAnimationFrame(() => refreshLocomotiveScroll())

    return () => ctx.revert()
  }, [reduce])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#040508] min-h-[100dvh] flex flex-col"
      aria-labelledby="location-heading"
    >
      <div
        ref={headerRef}
        className="relative z-10 shrink-0 pt-24 sm:pt-28 lg:pt-32 pb-6 lg:pb-10 px-6 text-center"
      >
        <h2
          id="location-heading"
          className="text-white mb-5 sm:mb-6"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)',
            lineHeight: 1.08,
            fontWeight: 600,
            letterSpacing: '-0.02em',
          }}
        >
          We are located in
        </h2>

        <ScrollReveal
          className="mx-auto max-w-xl"
          textClassName="text-white/45"
          blurStrength={4}
          baseOpacity={0.12}
          scrollStart="top bottom-=8%"
          scrollEnd="top center"
        >
          Connecting Turkey and Syria through design, development and digital experiences.
        </ScrollReveal>
      </div>

      <div ref={mapWrapRef} className="relative z-0 mt-auto w-full pb-4 sm:pb-8">
        <PresenceMap />
      </div>
    </section>
  )
}
