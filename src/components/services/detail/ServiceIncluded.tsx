import { motion, useReducedMotion } from 'framer-motion'
import type { ServiceDetail } from '../../../types/services'

type Props = {
  service: ServiceDetail
}

export default function ServiceIncluded({ service }: Props) {
  const reduce = useReducedMotion() ?? false

  return (
    <section className="section-surface section-padding">
      <div className="section-container">
        <motion.div
          className="mb-10 lg:mb-14 max-w-2xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="label-tag mb-3 block">Deliverables</span>
          <h2
            className="text-sz-dark"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              lineHeight: 1.1,
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            What&apos;s included
          </h2>
          <p
            className="text-sz-secondary mt-4"
            style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7 }}
          >
            {service.included.length} scoped deliverables for {service.title.toLowerCase()}{' '}
            engagements — from kickoff through handoff.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {service.included.map((item, i) => (
            <motion.div
              key={item.title}
              className="group rounded-card border border-sz-border bg-white p-6 lg:p-7 flex flex-col min-h-[180px] transition-colors duration-300 hover:border-sz-interaction/30 hover:bg-sz-interaction-soft/40"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-6%' }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sz-interaction-soft text-sz-interaction mb-5"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500 }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3
                className="text-sz-dark mb-3 group-hover:text-sz-interaction transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                }}
              >
                {item.title}
              </h3>
              <p
                className="text-sz-secondary flex-1"
                style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7 }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
