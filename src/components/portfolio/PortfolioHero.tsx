import { useLayoutEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '../ui/SplitText'
import ScrollReveal from '../ui/ScrollReveal'
import { refreshLocomotiveScroll } from '../../lib/locomotive'
import { useLocale } from '../../providers/LocaleProvider'
import { useAllProjects } from '../../i18n/useLocalizedData'

export default function PortfolioHero() {
  const { t } = useLocale()
  const projects = useAllProjects()
  const projectCount = projects.length
  const reduce = useReducedMotion() ?? false

  useLayoutEffect(() => {
    requestAnimationFrame(() => refreshLocomotiveScroll())
  }, [])

  return (
    <section className="section-surface pt-24 lg:pt-28 pb-10 lg:pb-12">
      <div className="section-container">
        <motion.div
          className="max-w-3xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="label-tag mb-4 block">{t('portfolio.label')}</span>

          <h1
            className="text-sz-dark mb-5"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
              lineHeight: 1.08,
              fontWeight: 600,
              letterSpacing: '-0.03em',
            }}
          >
            <SplitText text={t('portfolioPage.title')} repeat wrap stagger={0.1} duration={1} />
          </h1>

          <ScrollReveal
            className="max-w-xl"
            textClassName="text-sz-primary/55"
            blurStrength={4}
            baseOpacity={0.15}
            scrollStart="top bottom"
            scrollEnd="top center+=10%"
          >
            {t('portfolioPage.subtitle').replace('{count}', String(projectCount))}
          </ScrollReveal>
        </motion.div>
      </div>
    </section>
  )
}
