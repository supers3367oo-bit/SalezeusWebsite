import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'
import { refreshLocomotiveScroll } from '../../../lib/locomotive'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    title: 'Research',
    desc: 'We listen before we lead. Markets, audiences, and ambition mapped with precision.',
    tone: 'dark' as const,
  },
  {
    title: 'Strategy',
    desc: 'Positioning sharp enough to cut through noise. A roadmap your team can rally behind.',
    tone: 'surface' as const,
  },
  {
    title: 'Design',
    desc: 'Identity systems that feel inevitable. Visual language built to scale.',
    tone: 'dark' as const,
  },
  {
    title: 'Build',
    desc: 'Websites, products, and platforms engineered for performance and polish.',
    tone: 'surface' as const,
  },
  {
    title: 'Launch',
    desc: 'Campaigns, content, and go-to-market moments that land with intent.',
    tone: 'dark' as const,
  },
  {
    title: 'Grow',
    desc: 'Measure, refine, repeat. Growth is a loop, not a finish line.',
    tone: 'surface' as const,
  },
]

function StepPanel({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const isDark = step.tone === 'dark'

  return (
    <div
      className={`create-step relative min-h-[100dvh] flex items-center ${
        isDark ? 'bg-sz-dark' : 'section-surface'
      }`}
      data-step={index}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 60% 50% at 20% 80%, rgba(50,88,164,0.2) 0%, transparent 65%)'
            : 'radial-gradient(ellipse 55% 45% at 85% 15%, rgba(240,184,13,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="section-container relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-7">
          <h3
            className={isDark ? 'text-white' : 'text-sz-dark'}
            style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(3.5rem, 12vw, 9rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}
          >
            {step.title}
          </h3>
        </div>
        <div className="lg:col-span-5 lg:pb-6">
          <p
            className={`max-w-md ${isDark ? 'text-white/50' : 'text-sz-primary/55'}`}
            style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.75 }}
          >
            {step.desc}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ExperienceCreate() {
  const rootRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || !rootRef.current) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.create-step')

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return

        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: cards[cards.length - 1],
          end: 'top top',
          pin: true,
          pinSpacing: false,
        })

        gsap.to(card, {
          scale: 0.92,
          opacity: 0.45,
          filter: 'blur(4px)',
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        })
      })

      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        refreshLocomotiveScroll()
      })
    }, rootRef)

    return () => ctx.revert()
  }, [reduce])

  return (
    <section id="create" className="relative">
      <div className="section-surface py-16 lg:py-20 border-b border-sz-border">
        <div className="section-container">
          <h2 className="heading-lg text-sz-dark max-w-3xl">
            The Way We Create
          </h2>
          <p
            className="mt-5 text-sz-primary/55 max-w-xl"
            style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7 }}
          >
            Ideas do not arrive finished. They evolve through six deliberate passes.
          </p>
        </div>
      </div>

      <div ref={rootRef} className="relative">
        {STEPS.map((step, i) => (
          <StepPanel key={step.title} step={step} index={i} />
        ))}
      </div>
    </section>
  )
}
