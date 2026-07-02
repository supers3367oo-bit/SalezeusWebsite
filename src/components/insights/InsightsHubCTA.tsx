import { motion, useReducedMotion } from 'framer-motion'
import Button from '../ui/Button'
import ScrollReveal from '../ui/ScrollReveal'

export default function InsightsHubCTA() {
  const reduce = useReducedMotion() ?? false

  return (
    <section className="section-surface section-padding border-t border-sz-border">
      <div className="section-container">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="text-sz-dark mb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
            }}
          >
            Ready to put these ideas to work?
          </h2>

          <ScrollReveal
            className="mb-10"
            textClassName="text-sz-primary/50"
            blurStrength={3}
            baseOpacity={0.12}
          >
            Strategy only matters when it ships. When you are ready to build, we are here to help you
            move from insight to impact.
          </ScrollReveal>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button to="/#contact">Start a conversation</Button>
            <Button to="/portfolio" size="sm">
              View our work
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
