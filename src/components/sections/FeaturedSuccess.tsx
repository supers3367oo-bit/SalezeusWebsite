import { useRef, useLayoutEffect, useState, useCallback } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getLocomotiveInstance, refreshLocomotiveScroll } from '../../lib/locomotive'
import Button from '../ui/Button'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CASES = [
  {
    client: 'Panda',
    title: 'Premium Künefe',
    service: 'Branding + Packaging',
    image: '/images/cases/panda-kunefe.png',
  },
  {
    client: 'Ark Oto',
    title: 'Farklı Dokun',
    service: 'Marketing Campaign',
    image: '/images/cases/ark-oto.png',
  },
  {
    client: 'Cake Station',
    title: 'Coffee Identity',
    service: 'Brand Identity',
    image: '/images/cases/cake-station.png',
  },
]

type CaseData = (typeof CASES)[number]

function ArchiveCard({
  c,
  side,
  compact = false,
  mobileWide = false,
}: {
  c: CaseData
  index: number
  side: 'left' | 'right'
  compact?: boolean
  mobileWide?: boolean
}) {
  if (mobileWide) {
    return (
      <article className="group w-full">
        <div className="relative aspect-[16/10] w-full overflow-card bg-white shadow-sm">
          <img
            src={c.image}
            alt={`${c.client} — ${c.title}`}
            className="absolute inset-0 h-full w-full rounded-card object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p
              className="truncate font-medium text-sz-dark"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 15 }}
            >
              {c.client}
            </p>
            <p
              className="mt-0.5 truncate text-sm text-sz-secondary"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {c.service}
            </p>
          </div>
          <span
            className="inline-flex shrink-0 items-center gap-1 text-xs text-sz-primary group-hover:text-sz-interaction transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            View work
            <ArrowUpRight size={13} />
          </span>
        </div>
      </article>
    )
  }

  return (
    <article className={compact ? 'group w-[min(24vw,260px)]' : 'group w-[min(40vw,400px)]'}>
      <div className="relative aspect-[3/4] overflow-card bg-white shadow-sm">
        <img
          src={c.image}
          alt={`${c.client} — ${c.title}`}
          className="absolute inset-0 w-full h-full object-cover rounded-card transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
        <div className={`mt-4 flex items-end justify-between gap-3 ${side === 'right' ? 'flex-row-reverse text-right' : ''}`}>
        <div>
          <p className="text-sz-dark font-medium" style={{ fontFamily: 'var(--font-heading)', fontSize: 15 }}>
            {c.client}
          </p>
          <p className="text-sz-secondary text-sm mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>
            {c.service}
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1 text-xs text-sz-primary group-hover:text-sz-interaction transition-colors ${side === 'right' ? 'flex-row-reverse' : ''}`}
          style={{ fontFamily: 'var(--font-body)' }}
        >
          View work
          <ArrowUpRight size={13} />
        </span>
      </div>
    </article>
  )
}

function useScrollGalleryEnabled() {
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false
    return (
      window.innerWidth >= 1024 &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  })
  return enabled
}

function SectionCTAs({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 ${className}`}>
      <Button to="/#contact" size="sm">
        Let&apos;s Work Together
      </Button>
      <Button to="/portfolio" size="sm">
        Explore Our Work
      </Button>
    </div>
  )
}

export default function FeaturedSuccess() {
  const [active, setActive] = useState(0)
  const total = CASES.length
  const galleryEnabled = useScrollGalleryEnabled()

  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  const scrollToIndex = useCallback(
    (index: number) => {
      const st = scrollTriggerRef.current
      if (!st) return
      const progress = total <= 1 ? 0 : index / (total - 1)
      const top = st.start + (st.end - st.start) * progress
      const locomotive = getLocomotiveInstance()
      if (locomotive) {
        locomotive.scrollTo(top, { duration: 1.2 })
      } else {
        window.scrollTo({ top, behavior: 'smooth' })
      }
    },
    [total]
  )

  useLayoutEffect(() => {
    if (!galleryEnabled) return

    const section = sectionRef.current
    const pin = pinRef.current
    if (!section || !pin) return

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
    if (cards.length === 0) return

    const getScrollLength = () => window.innerHeight * (CASES.length * 0.85 + 0.6)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollLength()}`,
          pin: pin,
          scrub: 1.4,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index =
              total <= 1 ? 0 : Math.min(total - 1, Math.round(self.progress * (total - 1)))
            setActive(index)
          },
        },
      })

      cards.forEach((card, i) => {
        const vh = window.innerHeight
        gsap.set(card, { yPercent: -50, force3D: true, y: vh * (0.55 + i * 0.18) })

        tl.to(
          card,
          {
            y: -vh * 0.62,
            ease: 'none',
            duration: 1,
          },
          i * 0.28
        )
      })

      scrollTriggerRef.current = tl.scrollTrigger ?? null
    }, section)

    const refresh = () => ScrollTrigger.refresh()
    const images = pin.querySelectorAll('img')
    images.forEach((img) => {
      if (!(img as HTMLImageElement).complete) {
        img.addEventListener('load', refresh, { once: true })
      }
    })

    window.addEventListener('resize', refresh)

    requestAnimationFrame(() => refreshLocomotiveScroll())

    return () => {
      window.removeEventListener('resize', refresh)
      scrollTriggerRef.current = null
      ctx.revert()
    }
  }, [galleryEnabled, total])

  const prev = () => {
    const nextIndex = (active - 1 + total) % total
    setActive(nextIndex)
    if (galleryEnabled) scrollToIndex(nextIndex)
  }

  const next = () => {
    const nextIndex = (active + 1) % total
    setActive(nextIndex)
    if (galleryEnabled) scrollToIndex(nextIndex)
  }

  const goTo = (index: number) => {
    setActive(index)
    if (galleryEnabled) scrollToIndex(index)
  }

  return (
    <section
      ref={sectionRef}
      className="section-surface relative"
      id="success"
      aria-label="Featured client success stories"
    >
      <div
        ref={pinRef}
        className={`relative h-screen w-full overflow-hidden ${galleryEnabled ? 'hidden lg:block' : 'hidden'}`}
      >
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-[min(30vw,280px)]">
          <div className="text-center max-w-md">
            <p className="label-tag mb-4 block" style={{ letterSpacing: '0.2em' }}>
              Case Studies
            </p>
            <h2
              className="text-sz-dark uppercase leading-[1.08] tracking-[-0.02em]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(22px, 2.6vw, 40px)',
                fontWeight: 600,
              }}
            >
              Archive of the
              <br />
              Selected Works
              <br />
              <span className="text-sz-primary/60">by Salezeus</span>
            </h2>
            <p
              className="mt-5 text-sz-secondary text-sm max-w-md mx-auto"
              style={{ fontFamily: 'var(--font-body)', lineHeight: 1.7 }}
            >
              Where brand stories take visual form
            </p>
            <SectionCTAs className="mt-8 pointer-events-auto" />
          </div>
        </div>

        <div className="absolute top-8 right-8 z-30 flex gap-2">
          <button
            onClick={prev}
            aria-label="Previous project"
            className="w-10 h-10 rounded-full border border-sz-border bg-white/80 backdrop-blur-sm flex items-center justify-center text-sz-primary hover:border-sz-interaction hover:text-sz-interaction transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            aria-label="Next project"
            className="w-10 h-10 rounded-full border border-sz-border bg-white/80 backdrop-blur-sm flex items-center justify-center text-sz-primary hover:border-sz-interaction hover:text-sz-interaction transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {CASES.map((caseData, i) => {
          const side = i % 2 === 0 ? 'left' : 'right'
          return (
            <div
              key={caseData.client}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              className={`absolute top-1/2 will-change-transform ${
                side === 'left' ? 'left-[8%]' : 'right-[8%]'
              }`}
              style={{ zIndex: 10 + i }}
            >
              <ArchiveCard c={caseData} index={i} side={side} compact />
            </div>
          )
        })}

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span className="text-[10px] uppercase tracking-[0.22em] text-sz-secondary">Scroll</span>
          <span className="w-px h-8 bg-gradient-to-b from-sz-secondary/50 to-transparent" />
        </div>
      </div>

      {!galleryEnabled && (
        <div className="hidden lg:block section-padding">
          <div className="section-container">
            <div className="text-center section-header">
              <span className="label-tag mb-3 block">Case Studies</span>
              <h2 className="heading-lg text-sz-dark">Archive of the Selected Works</h2>
              <p
                className="mx-auto mt-4 max-w-md text-sz-secondary"
                style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65 }}
              >
                Where brand stories take visual form
              </p>
              <SectionCTAs className="mt-8" />
            </div>
            <div className="space-y-16 max-w-lg mx-auto">
              {CASES.map((caseData, i) => (
                <div key={caseData.client} className={i % 2 === 1 ? 'ml-auto' : ''}>
                  <ArchiveCard c={caseData} index={i} side={i % 2 === 0 ? 'left' : 'right'} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="lg:hidden section-padding">
        <div className="section-container">
          <div className="text-center section-header">
            <span className="label-tag mb-3 block">Case Studies</span>
            <h2 className="heading-lg text-sz-dark">
              Archive of the
              <br />
              Selected Works
            </h2>
            <p
              className="mx-auto mt-4 max-w-md text-sz-secondary"
              style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65 }}
            >
              Where brand stories take visual form
            </p>
            <SectionCTAs className="mt-8" />
          </div>

          <div className="space-y-8">
            {CASES.map((caseData, i) => (
              <ArchiveCard
                key={caseData.client}
                c={caseData}
                index={i}
                side={i % 2 === 0 ? 'left' : 'right'}
                mobileWide
              />
            ))}
          </div>
        </div>
      </div>

      {galleryEnabled && (
        <div className="hidden lg:flex justify-center gap-2 pb-10 pt-2">
          {CASES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to project ${i + 1}`}
              style={{
                width: i === active ? 24 : 7,
                height: 7,
                borderRadius: 99,
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                backgroundColor: i === active ? '#3258A4' : '#E8E4DE',
                transition: 'all 300ms ease',
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}
