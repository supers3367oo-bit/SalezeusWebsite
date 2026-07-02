import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ScrollReveal from '../../ui/ScrollReveal'
import ScrollFloat from '../../ui/ScrollFloat'

const PHILOSOPHY_IMAGE_TOP_LEFT = '/images/about/philosophy-top-left.png'
const PHILOSOPHY_IMAGE_RIGHT = '/images/about/philosophy-right.png'

const BELIEFS = [
  {
    quote: 'Strategy without soul is a spreadsheet. Creativity without strategy is decoration.',
    body: 'We refuse both extremes. Every brand decision must earn its place in the market.',
  },
  {
    quote: 'Growth is not a campaign. It is a system.',
    body: 'We build ecosystems: identity, messaging, channels, and products that compound over time.',
  },
  {
    quote: 'Local insight, global standards.',
    body: 'We understand the region because we live here. We execute at a level the world notices.',
  },
]

function PhilosophyImage({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div
      className={`overflow-hidden rounded-card bg-sz-dark/5 shadow-[0_12px_40px_rgba(4,5,8,0.08)] ${className ?? ''}`}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover object-center" loading="lazy" />
    </div>
  )
}

export default function ExperiencePhilosophy() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} className="section-surface relative overflow-hidden">
      <div className="section-container relative z-10 py-20 lg:py-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-14">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
            className="order-2 lg:order-none lg:col-span-4 lg:col-start-1 lg:row-start-1"
          >
            <PhilosophyImage
              src={PHILOSOPHY_IMAGE_TOP_LEFT}
              alt="Salezeus creative process"
              className="aspect-[4/5] max-w-[min(100%,280px)]"
            />
          </motion.div>

          <div className="order-1 lg:order-none lg:col-span-5 lg:col-start-5 lg:row-start-1 lg:self-end">
            <ScrollFloat
              containerClassName="!my-0 heading-lg text-sz-dark"
              textClassName="!text-[clamp(2rem,4.5vw,3.5rem)] !leading-[1.08]"
              scrollStart="top 88%"
              scrollEnd="top 50%"
              animationDuration={1}
              stagger={0.03}
            >
              Our Philosophy
            </ScrollFloat>
            <p
              className="mt-6 max-w-md text-sz-primary/55"
              style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.75 }}
            >
              How we think before we touch a single pixel.
            </p>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="order-3 lg:order-none lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-28 lg:self-start"
          >
            <PhilosophyImage
              src={PHILOSOPHY_IMAGE_RIGHT}
              alt="The Salezeus team at work"
              className="aspect-[3/4] lg:aspect-[4/5]"
            />
          </motion.div>

          <div className="order-4 lg:order-none lg:col-span-8 lg:col-start-1 lg:row-start-2 space-y-16 lg:space-y-20 lg:pr-6">
            {BELIEFS.map((item, i) => (
              <motion.div
                key={item.quote}
                initial={reduce ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
                className="max-w-2xl border-t border-sz-border pt-10"
              >
                <blockquote
                  className="mb-6 text-sz-dark"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.35rem, 2.8vw, 2rem)',
                    lineHeight: 1.22,
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                  }}
                >
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <ScrollReveal
                  className="max-w-lg"
                  textClassName="text-sz-primary/55"
                  blurStrength={3}
                  baseOpacity={0.18}
                  baseRotation={0.5}
                  scrollStart="top bottom-=8%"
                  scrollEnd="top center+=5%"
                >
                  {item.body}
                </ScrollReveal>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
