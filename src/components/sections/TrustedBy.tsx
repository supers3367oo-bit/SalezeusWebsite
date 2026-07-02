import { useLayoutEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import DotGrid from '../ui/backgrounds/DotGrid'
import Button from '../ui/Button'
import { refreshLocomotiveScroll } from '../../lib/locomotive'

type Client = {
  name: string
  abbr: string
  industry: string
  logo?: string
}

const CLIENTS: Client[] = [
  { name: 'Volkswagen', abbr: 'VW', industry: 'Automotive', logo: '/images/clients/volkswagen.png' },
  { name: 'TechVenture ME', abbr: 'TV', industry: 'Technology' },
  { name: 'Bloom Retail', abbr: 'BR', industry: 'E-commerce' },
  { name: 'Ankara Digital', abbr: 'AD', industry: 'SaaS' },
  { name: 'Luxe Events', abbr: 'LE', industry: 'Events' },
  { name: 'FoodHub Group', abbr: 'FH', industry: 'F&B' },
  { name: 'Metro Corp', abbr: 'MC', industry: 'Logistics' },
  { name: 'Nova Brands', abbr: 'NB', industry: 'Fashion' },
  { name: 'Summit Co.', abbr: 'SC', industry: 'Finance' },
]

const INDUSTRIES = [
  'Medical Tourism',
  'Education',
  'Food & Beverage',
  'Beauty',
  'Conferences',
  'Automotive',
  'Technology',
  'E-commerce',
  'Fashion',
  'Hospitality',
  'Healthcare',
  'Finance',
]

const EASE = [0.22, 1, 0.36, 1] as const

function ClientMark({ client }: { client: Client }) {
  if (client.logo) {
    return (
      <img
        src={client.logo}
        alt={client.name}
        draggable={false}
        className="h-9 w-auto object-contain opacity-35 grayscale transition-all duration-500 select-none group-hover:opacity-100 group-hover:grayscale-0 sm:h-11"
      />
    )
  }

  return (
    <span
      className="font-heading font-bold text-sz-dark/20 transition-colors duration-500 select-none group-hover:text-sz-dark"
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
        letterSpacing: '-0.03em',
        lineHeight: 1,
      }}
    >
      {client.abbr}
    </span>
  )
}

function MarqueeRow({
  direction = 'left',
  speed = 38,
  paused,
  variant,
  clients,
  industries,
}: {
  direction?: 'left' | 'right'
  speed?: number
  paused: boolean
  variant: 'logo' | 'industry'
  clients?: Client[]
  industries?: string[]
}) {
  const items =
    variant === 'logo'
      ? [...(clients ?? []), ...(clients ?? [])]
      : [...(industries ?? []), ...(industries ?? [])]

  return (
    <div className="overflow-hidden py-3">
      <motion.div
        className="flex w-max"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          duration: paused ? 9999 : speed,
          ease: 'linear',
        }}
      >
        {items.map((item, i) => {
          const sourceLength = variant === 'logo' ? (clients?.length ?? 0) : (industries?.length ?? 0)

          if (variant === 'logo' && typeof item !== 'string') {
            const client = item as Client
            return (
              <div
                key={`logo-${i}-${client.name}`}
                className="group flex shrink-0 items-center px-4 sm:px-6"
                aria-hidden={i >= sourceLength}
              >
                <ClientMark client={client} />
                <span
                  className="ml-4 sm:ml-6 text-sz-accent/40 group-hover:text-sz-accent transition-colors duration-500 text-lg select-none"
                  aria-hidden
                >
                  ·
                </span>
              </div>
            )
          }

          const label = item as string
          return (
            <div
              key={`industry-${i}-${label}`}
              className="group flex shrink-0 items-center px-4 sm:px-6"
              aria-hidden={i >= sourceLength}
            >
              <span
                className="font-heading font-bold text-sz-dark/20 group-hover:text-sz-dark transition-colors duration-500 select-none whitespace-nowrap"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                }}
              >
                {label}
              </span>
              <span
                className="ml-4 sm:ml-6 text-sz-accent/40 group-hover:text-sz-accent transition-colors duration-500 text-lg select-none"
                aria-hidden
              >
                ·
              </span>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

function StaticFallback() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
        {CLIENTS.map((client, i) => (
          <motion.div
            key={client.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
            className="group text-center"
          >
            <div className="mb-2 flex justify-center">
              <ClientMark client={client} />
            </div>
            <p className="mt-1 font-body text-[10px] uppercase tracking-[0.18em] text-sz-secondary">
              {client.name}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        {INDUSTRIES.map((industry) => (
          <span
            key={industry}
            className="font-body text-[11px] uppercase tracking-[0.18em] text-sz-secondary"
          >
            {industry}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function TrustedBy() {
  const prefersReducedMotion = useReducedMotion()
  const [paused, setPaused] = useState(false)

  useLayoutEffect(() => {
    requestAnimationFrame(() => refreshLocomotiveScroll())
  }, [])

  return (
    <section
      id="partnerships"
      className="relative isolate overflow-x-clip bg-sz-surface py-14 sm:py-16 lg:flex lg:min-h-[min(88vh,820px)] lg:flex-col lg:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {!prefersReducedMotion && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <DotGrid
            className="!h-full !w-full !p-0"
            dotSize={10}
            gap={30}
            baseColor="#E8E4DE"
            activeColor="#3258A4"
            proximity={120}
            shockRadius={200}
            shockStrength={4}
          />
        </div>
      )}

      <div className="section-container relative z-20 flex flex-col gap-10 lg:min-h-0 lg:flex-1">
        <div className="flex flex-col items-center px-1 text-center sm:px-2 lg:flex-1 lg:justify-center">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
            <span className="mb-4 block font-body text-xs font-medium uppercase tracking-widest text-sz-primary/75">
              Partnerships
            </span>
            <h2
              className="mb-5 text-sz-dark leading-[1.08]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                fontWeight: 600,
                letterSpacing: '-0.025em',
              }}
            >
              Leading brands
              <br />
              across the region
            </h2>
            <p
              className="mx-auto mb-8 max-w-lg text-sz-dark/75"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14px, 3.8vw, 15px)',
                lineHeight: 1.7,
              }}
            >
              From startups to established enterprises — we build lasting partnerships that drive measurable growth.
            </p>

            <div className="mb-8 flex flex-wrap items-center justify-center gap-10 sm:gap-14">
              {[
                { value: '120+', label: 'Clients' },
                { value: '08', label: 'Industries' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="font-heading font-bold text-sz-dark"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1 font-body text-[10px] uppercase tracking-[0.2em] text-sz-primary/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Button href="#contact" data-scroll-to>
              Start a Project
            </Button>
          </div>
        </div>

        <div className="w-full shrink-0 lg:mt-auto">
          {prefersReducedMotion ? (
            <StaticFallback />
          ) : (
            <div className="relative -mx-6 lg:-mx-8">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-sz-surface to-transparent sm:w-24" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-sz-surface to-transparent sm:w-24" />

              <MarqueeRow variant="logo" clients={CLIENTS} direction="left" speed={36} paused={paused} />
              <MarqueeRow variant="industry" industries={INDUSTRIES} direction="right" speed={48} paused={paused} />

              <p className="mt-4 hidden text-center font-body text-[10px] uppercase tracking-[0.25em] text-sz-secondary/40 lg:block">
                Hover to explore
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
