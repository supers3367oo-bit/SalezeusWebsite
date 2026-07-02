import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import type { ServiceDetail } from '../../../types/services'
import ServiceMockupFrame from '../../ui/ServiceMockupFrame'
import Button from '../../ui/Button'
import Aurora from '../../ui/Aurora'
import DotGrid from '../../ui/backgrounds/DotGrid'
import { refreshLocomotiveScroll } from '../../../lib/locomotive'

type Props = {
  service: ServiceDetail
}

export default function ServiceDetailHero({ service }: Props) {
  const reduce = useReducedMotion() ?? false

  useLayoutEffect(() => {
    requestAnimationFrame(() => refreshLocomotiveScroll())
  }, [service.slug])

  return (
    <section className="relative min-h-[100dvh] flex items-end bg-sz-dark overflow-hidden pt-24 lg:pt-28 pb-14 lg:pb-20">
      <div className="absolute inset-0 pointer-events-none opacity-45">
        <Aurora
          colorStops={['#3258A4', '#1a2d52', '#040508']}
          amplitude={0.65}
          blend={0.32}
          speed={0.5}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {!reduce && (
          <DotGrid
            className="!h-full !w-full !p-0 opacity-70"
            dotSize={5}
            gap={32}
            baseColor="#1a2438"
            activeColor="#3258A4"
            proximity={120}
            shockRadius={180}
            shockStrength={4}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 65% at 70% 20%, rgba(50,88,164,0.18) 0%, transparent 55%), linear-gradient(180deg, rgba(4,5,8,0.1) 0%, rgba(4,5,8,0.92) 100%)',
          }}
          aria-hidden
        />
      </div>

      <div className="section-container relative z-10 w-full">
        <Link
          to="/services"
          className="inline-flex items-center text-white/45 hover:text-white text-sm mb-10 lg:mb-12 transition-colors"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          ← All services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          <motion.div
            className="lg:col-span-6 min-w-0"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-white/40 mb-4"
              style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7 }}
            >
              {service.tagline}
            </p>

            <h1
              className="text-white mb-6"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                lineHeight: 1.05,
                fontWeight: 700,
                letterSpacing: '-0.025em',
              }}
            >
              {service.title}
            </h1>

            <p
              className="text-white/50 max-w-lg mb-8"
              style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.75 }}
            >
              {service.heroSummary}
            </p>

            <Button to="/contact" size="sm">
              Start a project
            </Button>
          </motion.div>

          <motion.div
            className="lg:col-span-6 min-w-0"
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <ServiceMockupFrame
              image={service.image}
              alt={`${service.title} showcase`}
              variant={service.variant}
              className="max-w-xl lg:ml-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
