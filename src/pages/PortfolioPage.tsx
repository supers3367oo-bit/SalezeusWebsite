import { useEffect, useMemo, useState } from 'react'
import PortfolioHero from '../components/portfolio/PortfolioHero'
import PortfolioFiltersSidebar from '../components/portfolio/PortfolioFiltersSidebar'
import PortfolioProjectsGrid from '../components/portfolio/PortfolioProjectsGrid'
import ClosingFuture from '../components/sections/ClosingFuture'
import { filterProjects } from '../data/projectDetails'
import type { ProjectServiceSlug } from '../types/projectDetail'
import { refreshLocomotiveScroll } from '../lib/locomotive'
import { useLocale } from '../providers/LocaleProvider'
import { useAllProjects } from '../i18n/useLocalizedData'

export default function PortfolioPage() {
  const { locale } = useLocale()
  const [serviceFilter, setServiceFilter] = useState<ProjectServiceSlug | null>(null)
  const [fieldFilter, setFieldFilter] = useState<string | null>(null)

  const allProjects = useAllProjects()

  const filteredProjects = useMemo(
    () =>
      filterProjects(allProjects, {
        service: serviceFilter,
        field: fieldFilter,
      }),
    [allProjects, serviceFilter, fieldFilter]
  )

  const clearFilters = () => {
    setServiceFilter(null)
    setFieldFilter(null)
  }

  useEffect(() => {
    requestAnimationFrame(() => refreshLocomotiveScroll())
  }, [filteredProjects])

  return (
    <>
      <PortfolioHero />

      <section className="section-surface pb-20 lg:pb-28">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <aside className="lg:col-span-3">
              <PortfolioFiltersSidebar
                serviceFilter={serviceFilter}
                fieldFilter={fieldFilter}
                onServiceChange={setServiceFilter}
                onFieldChange={setFieldFilter}
                onClearAll={clearFilters}
                totalCount={allProjects.length}
                resultCount={filteredProjects.length}
              />
            </aside>

            <div className="lg:col-span-9">
              <PortfolioProjectsGrid
                projects={filteredProjects}
                onClearFilters={clearFilters}
              />
            </div>
          </div>
        </div>
      </section>

      <ClosingFuture />
    </>
  )
}
