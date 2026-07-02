import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '../ui/Button'
import SplitText from '../ui/SplitText'
import ScrollReveal from '../ui/ScrollReveal'
import Particles from '../ui/backgrounds/Particles'
import { CONTACT_EMAIL } from '../../data/contact'

type ClosingFutureProps = {
  sectionId?: string
}

export default function ClosingFuture({ sectionId = 'contact' }: ClosingFutureProps) {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center bg-sz-dark overflow-hidden py-24 lg:py-32"
      id={sectionId}
    >
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <Particles
          particleColors={['#3258A4', '#F0B80D', '#ffffff']}
          particleCount={80}
          particleSpread={8}
          speed={0.08}
          particleBaseSize={80}
          moveParticlesOnHover={!reduce}
          alphaParticles
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% 100%, rgba(50,88,164,0.22) 0%, transparent 65%)',
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
          The Future
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
          <SplitText text="Let's build what comes next." repeat stagger={0.08} duration={0.9} />
        </h2>

        <ScrollReveal
          className="max-w-xl mx-auto mb-12"
          textClassName="text-white/50"
          blurStrength={4}
          baseOpacity={0.12}
          scrollStart="top bottom-=8%"
          scrollEnd="top center+=5%"
        >
          The brands that win tomorrow are being shaped today. We want to shape them with you.
        </ScrollReveal>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Button href={`mailto:${CONTACT_EMAIL}`}>
            Start a Conversation
          </Button>
          <Button to="/portfolio">
            View Our Work
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
