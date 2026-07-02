import { useLayoutEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '../../ui/SplitText'
import BlurText from '../../ui/BlurText'
import Aurora from '../../ui/Aurora'
import DotGrid from '../../ui/backgrounds/DotGrid'
import { refreshLocomotiveScroll } from '../../../lib/locomotive'

const HERO_IMAGE = '/images/about/hero-team-collab.png'

export default function ExperienceOpening() {
  const reduceMotion = useReducedMotion()
  const reduce = reduceMotion ?? false

  useLayoutEffect(() => {
    requestAnimationFrame(() => refreshLocomotiveScroll())
  }, [])

  return (
    <section className="relative min-h-[100dvh] flex items-end bg-sz-dark overflow-hidden pt-24 lg:pt-28 pb-14 lg:pb-20">
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <Aurora
          colorStops={['#3258A4', '#1a2d52', '#040508']}
          amplitude={0.65}
          blend={0.32}
          speed={0.55}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {!reduce && (
          <DotGrid
            className="!h-full !w-full !p-0"
            dotSize={5}
            gap={32}
            baseColor="#1a2438"
            activeColor="#3258A4"
            proximity={130}
            shockRadius={200}
            shockStrength={5}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 85% 70% at 50% 45%, transparent 20%, rgba(4,5,8,0.5) 72%), linear-gradient(180deg, rgba(4,5,8,0.15) 0%, rgba(4,5,8,0.88) 100%)',
          }}
          aria-hidden
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 45% at 80% 20%, rgba(240,184,13,0.07) 0%, transparent 55%)',
        }}
      />

      <div className="section-container relative z-10 w-full max-w-3xl">
        <motion.div
          className="mb-8 w-fit hero-float-tilt"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05 }}
        >
          <img
            src={HERO_IMAGE}
            alt="Salezeus team collaborating"
            className="w-[84px] sm:w-[96px] lg:w-[108px] rounded-card border border-white/[0.12] shadow-[0_16px_40px_rgba(0,0,0,0.4)] object-cover aspect-square"
            loading="eager"
          />
        </motion.div>

        <motion.p
          className="text-white/35 mb-6 max-w-sm"
          style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7 }}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Where creativity meets commercial instinct.
        </motion.p>

        <h1
          className="text-white"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5.5vw, 4.25rem)',
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: '-0.025em',
          }}
        >
          <SplitText text="We don't decorate brands." stagger={0.06} duration={0.75} />
          <span className="block mt-1 text-white/75">
            <SplitText text="We grow them." stagger={0.06} duration={0.75} delay={0.3} />
          </span>
        </h1>

        <div className="mt-8 max-w-md">
          <BlurText
            text="Salezeus is a growth studio for ambitious businesses across Turkey, Syria, and beyond."
            className="text-white/45"
            animateBy="words"
            delay={35}
            stepDuration={0.28}
          />
        </div>
      </div>

      <style>{`
        .hero-float-tilt {
          transform: rotate(-9deg);
          transform-origin: center bottom;
        }
        @media (prefers-reduced-motion: no-preference) {
          .hero-float-tilt {
            animation: heroFloatTilt 5s ease-in-out infinite;
          }
        }
        @keyframes heroFloatTilt {
          0%, 100% { transform: rotate(-9deg) translateY(0); }
          50% { transform: rotate(-9deg) translateY(-7px); }
        }
      `}</style>
    </section>
  )
}
