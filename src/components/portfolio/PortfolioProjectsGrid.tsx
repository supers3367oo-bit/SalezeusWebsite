import { AnimatePresence, motion } from 'framer-motion'
import PortfolioProjectCard from './PortfolioProjectCard'
import type { ProjectListItem } from '../../types/projectDetail'

const EASE = [0.22, 1, 0.36, 1] as const

type Props = {
  projects: ProjectListItem[]
  onClearFilters?: () => void
}

export default function PortfolioProjectsGrid({ projects, onClearFilters }: Props) {
  if (projects.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-sz-border bg-white/40 px-6 py-16 text-center">
        <p
          className="mb-2 text-sz-dark"
          style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600 }}
        >
          No projects match these filters
        </p>
        <p
          className="mb-6 text-sz-primary/55"
          style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7 }}
        >
          Try another service or field, or view the full archive.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-sm text-sz-interaction transition-colors hover:text-sz-interaction-hover"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
          >
            Clear filters
          </button>
        )}
      </div>
    )
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-2">
        {projects.map((project, index) => (
          <PortfolioProjectCard
            key={project.id}
            project={{
              id: project.id,
              slug: project.slug,
              client: project.client,
              field: project.field,
              services: [project.serviceLabel],
              summary: project.summary,
              image: project.image,
            }}
            motionProps={{
              layout: true,
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, scale: 0.98 },
              transition: { duration: 0.45, delay: index * 0.04, ease: EASE },
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
