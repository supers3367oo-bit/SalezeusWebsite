import { useLayoutEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '../ui/SplitText'
import BlurText from '../ui/BlurText'
import Aurora from '../ui/Aurora'
import DotGrid from '../ui/backgrounds/DotGrid'
import { refreshLocomotiveScroll } from '../../lib/locomotive'
import { useLocale } from '../../providers/LocaleProvider'
import { useSiteAsset } from '../../providers/SiteAssetsProvider'

export default function ServicesHero() {
  const { t } = useLocale()
  const reduce = useReducedMotion() ?? false
  const heroImage = useSiteAsset('about.hero')

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

      <div className="section-container relative z-10 w-full max-w-3xl">
        <motion.div
          className="mb-8 w-fit hero-float-tilt"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05 }}
        >
          <img
            src={heroImage}
            alt={t('experience.opening.heroAlt')}
            className="w-[84px] sm:w-[96px] lg:w-[108px] rounded-card border border-white/[0.12] shadow-[0_16px_40px_rgba(0,0,0,0.4)] object-cover aspect-square"
            loading="eager"
          />
        </motion.div>

        <motion.div
          className="mb-6"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span className="label-tag">{t('solutions.label')}</span>
        </motion.div>

        <h1
          className="text-white"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.85rem, 5vw, 4.25rem)',
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: '-0.025em',
          }}
        >
          <SplitText text={t('solutions.title')} wrap stagger={0.06} duration={0.75} />
        </h1>

        <div className="mt-8 max-w-md">
          <BlurText
            text={t('solutions.subtitleDetailed')}
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
