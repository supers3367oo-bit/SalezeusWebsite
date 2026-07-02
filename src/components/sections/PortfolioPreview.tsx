import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplitText from '../ui/SplitText'
import Button from '../ui/Button'
import PortfolioProjectCard from '../portfolio/PortfolioProjectCard'
import { getAllProjects } from '../../data/projectDetails'
import type { ProjectServiceLabel } from '../../types/projectDetail'

const SERVICE_FILTERS = ['All', 'Branding', 'Marketing', 'Social Media', 'Consulting', 'Web', 'Apps'] as const

const EASE = [0.22, 1, 0.36, 1] as const

const ALL_PROJECTS = getAllProjects().map((p) => ({
  id: p.id,
  slug: p.slug,
  client: p.client,
  field: p.field,
  services: [p.serviceLabel],
  summary: p.summary,
  image: p.image,
}))

function matchesServiceFilter(serviceLabel: ProjectServiceLabel, filter: string) {
  if (filter === 'All') return true
  return serviceLabel === filter
}

const PREVIEW_LIMIT = 4

export default function PortfolioPreview() {
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const filtered = useMemo(() => {
    return ALL_PROJECTS.filter((project) => {
      const label = project.services[0] as ProjectServiceLabel
      return matchesServiceFilter(label, activeFilter)
    }).slice(0, PREVIEW_LIMIT)
  }, [activeFilter])

  return (
    <section className="section-surface section-padding" id="portfolio">
      <div className="section-container">
        <div className="section-header section-header-row">
          <div>
            <span className="label-tag mb-3 block">Portfolio</span>
            <h2 className="heading-lg text-sz-dark">
              <SplitText text="Portfolio Preview" repeat stagger={0.1} duration={1} />
            </h2>
          </div>
          <Button href="/portfolio" size="sm" className="hidden lg:inline-flex">
            View Full Portfolio
          </Button>
        </div>

        <div className="mb-8 flex flex-wrap gap-1.5">
          {SERVICE_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className="transition-all duration-200"
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                border: `1px solid ${activeFilter === filter ? '#3258A4' : '#E8E4DE'}`,
                background: activeFilter === filter ? '#3258A4' : 'transparent',
                color: activeFilter === filter ? '#FFFFFF' : '#303640',
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.02em',
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {filtered.map((project, i) => (
              <PortfolioProjectCard
                key={project.id}
                project={project}
                motionProps={{
                  layout: true,
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, scale: 0.98 },
                  transition: { duration: 0.45, delay: i * 0.04, ease: EASE },
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 text-center lg:hidden">
          <Button href="/portfolio" size="sm">
            View Full Portfolio
          </Button>
        </div>
      </div>
    </section>
  )
}
