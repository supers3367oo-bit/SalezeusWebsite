import { motion, useReducedMotion } from 'framer-motion'
import type { ServiceDetail } from '../../../types/services'

type Props = {
  service: ServiceDetail
}

export default function ServiceAbout({ service }: Props) {
  const reduce = useReducedMotion() ?? false
  const { about } = service

  return (
    <section className="section-surface section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div
            className="lg:col-span-7 min-w-0"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="text-sz-dark mb-6"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                lineHeight: 1.12,
                fontWeight: 600,
                letterSpacing: '-0.02em',
              }}
            >
              {about.headline}
            </h2>

            <div className="space-y-4 max-w-2xl">
              {about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-sz-secondary"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.75 }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 min-w-0"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-card bg-white border border-sz-border p-6 lg:p-8 space-y-6">
              {about.outcomes.map((item) => (
                <div key={item.label} className="border-b border-sz-border last:border-0 pb-5 last:pb-0">
                  <p
                    className="text-sz-secondary mb-1"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 13 }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-sz-dark"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
