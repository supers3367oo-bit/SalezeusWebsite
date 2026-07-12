import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplitText from '../ui/SplitText'
import Button from '../ui/Button'
import PortfolioProjectCard from '../portfolio/PortfolioProjectCard'
import { useLocale } from '../../providers/LocaleProvider'
import { useHomeVisibility } from '../../providers/HomeVisibilityProvider'
import { useAllProjects } from '../../i18n/useLocalizedData'

const EASE = [0.22, 1, 0.36, 1] as const
const PREVIEW_LIMIT = 4

export default function PortfolioPreview() {
  const { t } = useLocale()
  const { isOnHome } = useHomeVisibility()
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const projects = useAllProjects()

  const allProjects = useMemo(
    () =>
      projects
        .filter((p) => isOnHome('projects', p.slug, true))
        .map((p) => ({
          id: p.id,
          slug: p.slug,
          client: p.client,
          field: p.field,
          services: [p.serviceLabel],
          summary: p.summary,
          image: p.image,
        })),
    [projects, isOnHome],
  )

  const serviceFilters = useMemo(() => {
    const labels = [...new Set(allProjects.map((p) => p.services[0]))]
    return [t('portfolio.filterAll'), ...labels]
  }, [allProjects, t])

  const filtered = useMemo(() => {
    return allProjects
      .filter((project) => {
        if (activeFilter === 'All' || activeFilter === t('portfolio.filterAll')) return true
        return project.services[0] === activeFilter
      })
      .slice(0, PREVIEW_LIMIT)
  }, [activeFilter, allProjects, t])

  const isFilterActive = (filter: string) =>
    filter === t('portfolio.filterAll')
      ? activeFilter === 'All' || activeFilter === t('portfolio.filterAll')
      : activeFilter === filter

  return (
    <section className="section-surface pt-0 pb-10 sm:pt-2 lg:py-24" id="portfolio">
      <div className="section-container">
        <div className="section-header section-header-row max-lg:mb-5">
          <div>
            <span className="label-tag mb-1.5 block lg:mb-3">{t('portfolio.label')}</span>
            <h2 className="heading-lg text-sz-dark">
              <SplitText text={t('portfolio.previewTitle')} repeat stagger={0.1} duration={1} />
            </h2>
          </div>
          <Button href="/portfolio" size="sm" className="hidden lg:inline-flex">
            {t('portfolio.viewFull')}
          </Button>
        </div>

        <div className="mb-5 flex flex-wrap gap-1.5 lg:mb-8">
          {serviceFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter === t('portfolio.filterAll') ? 'All' : filter)}
              className="transition-all duration-200"
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                border: `1px solid ${isFilterActive(filter) ? '#3258A4' : '#E8E4DE'}`,
                background: isFilterActive(filter) ? '#3258A4' : 'transparent',
                color: isFilterActive(filter) ? '#FFFFFF' : '#303640',
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
            {t('portfolio.viewFull')}
          </Button>
        </div>
      </div>
    </section>
  )
}
