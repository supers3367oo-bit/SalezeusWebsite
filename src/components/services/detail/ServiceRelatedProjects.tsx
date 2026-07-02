import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import clsx from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { ProjectListItem } from '../../../types/projectDetail'
import PortfolioProjectCard from '../../portfolio/PortfolioProjectCard'

const EASE = [0.22, 1, 0.36, 1] as const

type Props = {
  projects: ProjectListItem[]
  serviceTitle: string
  industries: string[]
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={clsx(
        'inline-flex items-center px-3.5 py-1.5 rounded-full text-[13px] transition-colors duration-200 border min-h-[44px]',
        active
          ? 'bg-white/15 text-white border-white/35'
          : 'bg-transparent text-white/55 border-white/15 hover:text-white hover:border-white/30'
      )}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {label}
    </button>
  )
}

export default function ServiceRelatedProjects({ projects, serviceTitle, industries }: Props) {
  const reduce = useReducedMotion() ?? false
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!activeIndustry) return projects
    return projects.filter((p) => p.industry === activeIndustry)
  }, [projects, activeIndustry])

  const visible = filtered.slice(0, 4)

  if (projects.length === 0) return null

  return (
    <section className="bg-sz-dark section-padding">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <h2
            className="text-white max-w-lg"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              lineHeight: 1.1,
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            Related projects
          </h2>
          <p
            className="text-white/45 max-w-sm"
            style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65 }}
          >
            Selected work where {serviceTitle.toLowerCase()} played a central role.
          </p>
        </div>

        {industries.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 lg:mb-10">
            <FilterChip
              label="All"
              active={activeIndustry === null}
              onClick={() => setActiveIndustry(null)}
            />
            {industries.map((industry) => (
              <FilterChip
                key={industry}
                label={industry}
                active={activeIndustry === industry}
                onClick={() =>
                  setActiveIndustry(activeIndustry === industry ? null : industry)
                }
              />
            ))}
          </div>
        )}

        {visible.length === 0 ? (
          <p
            className="text-white/40 py-12"
            style={{ fontFamily: 'var(--font-body)', fontSize: 15 }}
          >
            No projects in this industry yet. Try another filter or view all work.
          </p>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
              {visible.map((project, i) => (
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
                    initial: reduce ? false : { opacity: 0, y: 16 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, scale: 0.98 },
                    transition: { duration: 0.45, delay: i * 0.04, ease: EASE },
                  }}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        <div className="mt-10">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors min-h-[44px]"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
          >
            View all work
            <ArrowUpRight size={15} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  )
}
