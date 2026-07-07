import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '../ui/Button'
import SplitText from '../ui/SplitText'
import ScrollReveal from '../ui/ScrollReveal'
import { CONTACT_EMAIL } from '../../data/contact'
import { useLocale } from '../../providers/LocaleProvider'

type ClosingFutureProps = {
  sectionId?: string
}

export default function ClosingFuture({ sectionId = 'contact' }: ClosingFutureProps) {
  const { t } = useLocale()
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center bg-sz-dark overflow-hidden py-24 lg:py-32"
      id={sectionId}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% 100%, rgba(50,88,164,0.22) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 28%, rgba(50,88,164,0.28) 0%, transparent 34%),
            radial-gradient(circle at 78% 26%, rgba(50,88,164,0.22) 0%, transparent 30%),
            radial-gradient(circle at 52% 12%, rgba(240,184,13,0.12) 0%, transparent 24%),
            radial-gradient(circle at 34% 72%, rgba(255,255,255,0.08) 0%, transparent 26%),
            radial-gradient(circle at 68% 78%, rgba(255,255,255,0.06) 0%, transparent 24%)
          `,
        }}
      />
      <div
        className="absolute -inset-[12%] pointer-events-none opacity-35"
        style={{
          background:
            'conic-gradient(from 180deg at 50% 55%, transparent 0deg, rgba(50,88,164,0.25) 110deg, transparent 220deg, rgba(240,184,13,0.12) 300deg, transparent 360deg)',
          filter: 'blur(42px)',
        }}
      />

      <div className="section-container relative z-10 w-full text-center">
        <motion.p
          className="text-white/40 mb-8"
          style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          {t('closing.label')}
        </motion.p>

        <h2
          className="text-white mx-auto max-w-5xl mb-8"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: '-0.03em',
          }}
        >
          <SplitText text={t('closing.title')} repeat stagger={0.08} duration={0.9} />
        </h2>

        <ScrollReveal
          className="max-w-xl mx-auto mb-12"
          textClassName="text-white/80 sm:text-white/60"
          blurStrength={4}
          baseOpacity={0.45}
          scrollStart="top bottom-=8%"
          scrollEnd="top center+=5%"
        >
          {t('closing.subtitle')}
        </ScrollReveal>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Button href={`mailto:${CONTACT_EMAIL}`}>
            {t('closing.startConversation')}
          </Button>
          <Button to="/portfolio">
            {t('closing.viewWork')}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
