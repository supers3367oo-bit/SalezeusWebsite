import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import type { ServiceDetail } from '../../../types/services'

type Props = {
  service: ServiceDetail
}

export default function ServiceProcess({ service }: Props) {
  const reduce = useReducedMotion() ?? false
  const steps = service.process

  return (
    <section className="bg-[#F0EFEC] section-padding">
      <div className="section-container">
        <motion.div
          className="mb-12 lg:mb-16 max-w-2xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="label-tag mb-3 block">Our process</span>
          <h2
            className="text-sz-dark"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              lineHeight: 1.12,
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            How we work
          </h2>
          <p
            className="text-sz-secondary mt-4"
            style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7 }}
          >
            A clear path from first conversation to delivery — with milestones you can track at
            every stage.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div
            className="absolute left-[19px] top-3 bottom-3 w-px bg-sz-border hidden md:block"
            aria-hidden
          />

          <ol className="space-y-0">
            {steps.map((step, i) => {
              const isLast = i === steps.length - 1
              return (
                <motion.li
                  key={step.title}
                  className={clsx('relative flex gap-6 md:gap-10', !isLast && 'pb-10 md:pb-14')}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative z-10 flex flex-col items-center shrink-0">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-sz-interaction text-white shadow-sm"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {!isLast && (
                      <span
                        className="mt-2 h-full min-h-[40px] w-px bg-sz-border md:hidden"
                        aria-hidden
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 pt-1">
                    <div className="rounded-card border border-sz-border bg-white p-5 lg:p-6 shadow-sm">
                      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                        <h3
                          className="text-sz-dark"
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 18,
                            fontWeight: 600,
                          }}
                        >
                          {step.title}
                        </h3>
                        <span
                          className="text-sz-interaction shrink-0"
                          style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.05em' }}
                        >
                          {step.duration}
                        </span>
                      </div>
                      <p
                        className="text-sz-secondary"
                        style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7 }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
