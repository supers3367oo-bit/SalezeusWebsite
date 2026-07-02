import { motion, useReducedMotion } from 'framer-motion'
import type { ProjectDetail } from '../../../types/projectDetail'
import { revealProps } from './shared'

type Props = {
  project: ProjectDetail
}

export default function ProjectSnapshot({ project }: Props) {
  const reduce = useReducedMotion() ?? false

  const items = [
    { label: 'Client', value: project.client },
    { label: 'Industry', value: project.industry },
    { label: 'Service', value: project.serviceLabel },
    { label: 'Year', value: String(project.year) },
  ]

  return (
    <section className="section-surface section-padding">
      <div className="section-container">
        <motion.div {...revealProps(reduce)}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8 lg:mb-10">
            {items.map((item) => (
              <div key={item.label}>
                <p
                  className="text-sz-secondary mb-1"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500 }}
                >
                  {item.label}
                </p>
                <p
                  className="text-sz-dark"
                  style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 600 }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <p
            className="text-sz-dark max-w-3xl"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.25rem, 2.5vw, 1.65rem)',
              lineHeight: 1.35,
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            {project.outcomeLine}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
