import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import type { ProjectDetail } from '../../../types/projectDetail'
import { revealProps } from './shared'

type Props = {
  project: ProjectDetail
}

export default function ProjectDetailHero({ project }: Props) {
  const reduce = useReducedMotion() ?? false

  return (
    <header className="bg-white border-b border-sz-border">
      <div className="section-container py-10 lg:py-14">
        <Link
          to="/portfolio"
          className="inline-flex items-center text-sz-secondary hover:text-sz-dark text-sm mb-8 transition-colors"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          ← Portfolio
        </Link>

        <motion.div {...revealProps(reduce)}>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="inline-flex items-center rounded-full bg-sz-interaction px-3 py-1 text-[11px] font-medium text-white"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {project.field}
            </span>
            <Link
              to={`/services/${project.service}`}
              className="inline-flex items-center rounded-full border border-sz-border px-3 py-1 text-[11px] text-sz-secondary transition-colors hover:border-sz-interaction hover:text-sz-interaction"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              {project.serviceLabel}
            </Link>
            <span
              className="text-sz-secondary text-xs"
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}
            >
              {project.year}
            </span>
          </div>

          <h1
            className="text-sz-dark max-w-4xl mb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              lineHeight: 1.08,
              fontWeight: 600,
              letterSpacing: '-0.03em',
            }}
          >
            {project.client}
          </h1>

          <p
            className="text-sz-secondary max-w-2xl"
            style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7 }}
          >
            {project.summary}
          </p>
        </motion.div>
      </div>
    </header>
  )
}
