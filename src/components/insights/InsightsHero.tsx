import { useLayoutEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '../ui/SplitText'
import ScrollReveal from '../ui/ScrollReveal'
import Button from '../ui/Button'
import { INSIGHT_ARTICLES } from '../../data/insights'
import { refreshLocomotiveScroll } from '../../lib/locomotive'

const COLLAGE = INSIGHT_ARTICLES.slice(0, 3).map((a) => ({
  src: a.cardImage ?? a.coverImage,
  alt: a.title,
}))

export default function InsightsHero() {
  const reduce = useReducedMotion() ?? false

  useLayoutEffect(() => {
    requestAnimationFrame(() => refreshLocomotiveScroll())
  }, [])

  return (
    <section className="section-surface pt-24 lg:pt-28 pb-12 lg:pb-16">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <motion.div
            className="lg:col-span-6 min-w-0"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="label-tag mb-4 block">Insights</span>

            <h1
              className="text-sz-dark mb-5 max-w-full"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
                lineHeight: 1.08,
                fontWeight: 600,
                letterSpacing: '-0.03em',
              }}
            >
              <SplitText
                text="Ideas worth building on."
                repeat
                wrap
                stagger={0.1}
                duration={1}
              />
            </h1>

            <ScrollReveal
              className="max-w-lg mb-8"
              textClassName="text-sz-primary/55"
              blurStrength={4}
              baseOpacity={0.15}
              scrollStart="top bottom"
              scrollEnd="top center+=10%"
            >
              Strategy, design, and growth thinking from the Salezeus team. Written for leaders who
              care about craft and commercial impact.
            </ScrollReveal>

            <div className="flex flex-wrap gap-3">
              <Button href="#insights-articles" size="sm">
                Browse articles
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-6 min-w-0"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-12 gap-3 lg:gap-4">
              <div className="col-span-7 overflow-card border border-sz-border bg-white shadow-sm">
                <img
                  src={COLLAGE[0].src}
                  alt={COLLAGE[0].alt}
                  className="w-full aspect-[4/5] object-cover"
                  loading="eager"
                />
              </div>
              <div className="col-span-5 flex flex-col gap-3 lg:gap-4">
                <div className="overflow-card border border-sz-border bg-white shadow-sm flex-1">
                  <img
                    src={COLLAGE[1].src}
                    alt={COLLAGE[1].alt}
                    className="w-full h-full min-h-[120px] object-cover aspect-square"
                    loading="eager"
                  />
                </div>
                <div className="overflow-card border border-sz-border bg-white shadow-sm">
                  <img
                    src={COLLAGE[2].src}
                    alt={COLLAGE[2].alt}
                    className="w-full aspect-[5/4] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
