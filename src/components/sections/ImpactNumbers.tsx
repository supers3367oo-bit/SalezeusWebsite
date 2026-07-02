import { useLayoutEffect } from 'react'
import CountUp from '../ui/CountUp'
import ScrollFloat from '../ui/ScrollFloat'
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack'
import { refreshLocomotiveScroll } from '../../lib/locomotive'

const STATS = [
  {
    value: 7,
    suffix: '+',
    label: 'Years of Experience',
    desc: 'Building brands since 2017',
  },
  {
    value: 250,
    suffix: '+',
    label: 'Projects Delivered',
    desc: 'Across diverse industries',
  },
  {
    value: 120,
    suffix: '+',
    label: 'Happy Clients',
    desc: 'Long-term partnerships',
  },
  {
    value: 2,
    suffix: '',
    label: 'Countries',
    desc: 'Turkey & Syria',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Satisfaction Rate',
    desc: 'Client-verified feedback',
  },
]

function StatCard({
  stat,
  index,
}: {
  stat: (typeof STATS)[number]
  index: number
}) {
  return (
    <div className="relative h-full overflow-card bg-[#0c0d11] p-8 sm:p-10 lg:p-12">
      <div className="pointer-events-none absolute inset-0 overflow-card" aria-hidden>
        <div className="absolute bottom-0 left-1/2 h-36 w-[70%] -translate-x-1/2 translate-y-1/2 rounded-full bg-white/[0.05] blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <div
            className="mb-3 font-heading font-bold tabular-nums text-white"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3.5rem, 10vw, 6.5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
            }}
          >
            <CountUp to={stat.value} duration={2} delay={0.1 + index * 0.05} className="inline" />
            {stat.suffix && <span className="text-white/55">{stat.suffix}</span>}
          </div>

          <p
            className="text-white/90 font-medium"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
          >
            {stat.label}
          </p>
        </div>

        <p
          className="max-w-xs text-white/45 sm:text-right"
          style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7 }}
        >
          {stat.desc}
        </p>
      </div>
    </div>
  )
}

export default function ImpactNumbers() {
  return (
    <section className="relative overflow-hidden bg-sz-dark" id="impact">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(255,255,255,0.07) 0%, transparent 58%), radial-gradient(ellipse 50% 40% at 85% 80%, rgba(255,255,255,0.04) 0%, transparent 55%)',
        }}
        aria-hidden
      />

      <div className="section-container relative z-10 pb-2 pt-16 text-center lg:pt-24 pb-12">
        <span className="label-tag mb-4 block text-white/45">Our Impact</span>

        <ScrollFloat
          containerClassName="!my-0 heading-lg text-white max-w-4xl mx-auto"
          textClassName="!text-[clamp(2.25rem,5.5vw,4.5rem)] !leading-[1.08] !font-semibold text-white"
          scrollStart="top 90%"
          scrollEnd="top 55%"
          animationDuration={1.1}
          ease="power3.out"
          stagger={0.025}
        >
          Numbers That Tell Our Story
        </ScrollFloat>

        <p
          className="mx-auto mt-5 max-w-md text-white/40"
          style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65 }}
        >
          Scroll to watch each milestone stack into our journey.
        </p>
      </div>

      <ScrollStack
        useWindowScroll
        className="relative z-10"
        itemDistance={36}
        itemStackDistance={16}
        stackPosition="22%"
        scaleEndPosition="12%"
        baseScale={0.9}
        itemScale={0.022}
        rotationAmount={0}
        blurAmount={0}
        contentPaddingBottom="clamp(6rem, 10vh, 7rem)"
      >
        {STATS.map((stat, i) => (
          <ScrollStackItem
            key={stat.label}
            itemClassName="!h-auto !min-h-[220px] !my-0 !p-0 !rounded-card !overflow-hidden !shadow-none max-w-3xl mx-auto border border-white/[0.1] bg-[#0c0d11] isolate"
          >
            <StatCard stat={stat} index={i} />
          </ScrollStackItem>
        ))}
      </ScrollStack>

      <ScrollStackResize />
    </section>
  )
}

function ScrollStackResize() {
  useLayoutEffect(() => {
    requestAnimationFrame(() => refreshLocomotiveScroll())
  }, [])
  return null
}
