import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import CountUp from '../../ui/CountUp'
import ScrollFloat from '../../ui/ScrollFloat'

const METRICS = [
  { value: 7, suffix: '+', label: 'Years', sub: 'Building since 2017' },
  { value: 250, suffix: '+', label: 'Projects', sub: 'Delivered across industries' },
  { value: 120, suffix: '+', label: 'Clients', sub: 'Long-term partnerships' },
  { value: 2, suffix: '', label: 'Countries', sub: 'Turkey and Syria' },
]

function MetricBlock({
  metric,
  index,
}: {
  metric: (typeof METRICS)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative border-t border-white/[0.1] pt-8 lg:pt-10"
    >
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className="text-white tabular-nums"
            style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(4rem, 14vw, 11rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.03em',
            }}
          >
            {inView ? (
              <CountUp to={metric.value} duration={2.2} />
            ) : (
              '0'
            )}
            <span className="text-white/50">{metric.suffix}</span>
          </span>
          <span
            className="text-white/70 pb-2 lg:pb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            {metric.label}
          </span>
        </div>
        <p
          className="text-white/40 max-w-xs lg:text-right pb-2"
          style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65 }}
        >
          {metric.sub}
        </p>
      </div>
    </motion.div>
  )
}

export default function ExperienceImpact() {
  return (
    <section className="bg-sz-dark relative overflow-hidden py-20 lg:py-28" id="impact-story">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 55%)',
        }}
      />

      <div className="section-container relative z-10">
        <div className="mb-16 lg:mb-24 max-w-4xl">
          <ScrollFloat
            containerClassName="!my-0 text-white"
            textClassName="!text-[clamp(2.5rem,6vw,5rem)] !leading-[1.05] !font-semibold"
            scrollStart="top 90%"
            scrollEnd="top 55%"
            animationDuration={1}
            stagger={0.025}
          >
            Our Impact
          </ScrollFloat>
          <p
            className="mt-6 text-white/40 max-w-md"
            style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7 }}
          >
            The numbers are not the story. They are proof the story works.
          </p>
        </div>

        <div className="space-y-4 lg:space-y-2">
          {METRICS.map((metric, i) => (
            <MetricBlock key={metric.label} metric={metric} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
