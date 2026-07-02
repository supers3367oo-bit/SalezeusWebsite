import { motion, useReducedMotion } from 'framer-motion'
import Button from '../ui/Button'
import ScrollReveal from '../ui/ScrollReveal'

export default function ArticleEndCTA() {
  const reduce = useReducedMotion() ?? false

  return (
    <section className="bg-sz-dark border-t border-white/[0.08] py-16 lg:py-24">
      <div className="section-container">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Keep exploring, or start a conversation.
          </h2>

          <ScrollReveal
            className="mb-10"
            textClassName="text-white/45"
            blurStrength={3}
            baseOpacity={0.12}
          >
            More perspectives on brand, product, and growth. When you are ready to apply them, we are
            here.
          </ScrollReveal>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button to="/insights" size="sm">
              More insights
            </Button>
            <Button to="/#contact" size="sm">
              Start a conversation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
