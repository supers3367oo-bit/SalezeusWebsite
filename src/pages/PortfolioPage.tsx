import { useEffect, useMemo, useState } from 'react'
import PortfolioHero from '../components/portfolio/PortfolioHero'
import PortfolioFiltersSidebar from '../components/portfolio/PortfolioFiltersSidebar'
import PortfolioProjectsGrid from '../components/portfolio/PortfolioProjectsGrid'
import ClosingFuture from '../components/sections/ClosingFuture'
import {
  filterProjects,
  getAllProjects,
} from '../data/projectDetails'
import type { ProjectServiceSlug } from '../types/projectDetail'
import { refreshLocomotiveScroll } from '../lib/locomotive'

const ALL_PROJECTS = getAllProjects()

export default function PortfolioPage() {
  const [serviceFilter, setServiceFilter] = useState<ProjectServiceSlug | null>(null)
  const [fieldFilter, setFieldFilter] = useState<string | null>(null)

  const filteredProjects = useMemo(
    () =>
      filterProjects(ALL_PROJECTS, {
        service: serviceFilter,
        field: fieldFilter,
      }),
    [serviceFilter, fieldFilter]
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

      <section className="section-surface pb-16 lg:pb-24">
        <div className="section-container">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
            <div className="order-2 min-w-0 flex-1 lg:order-1">
              <PortfolioProjectsGrid
                projects={filteredProjects}
                onClearFilters={clearFilters}
              />
            </div>

            <div className="order-1 w-full shrink-0 lg:order-2 lg:w-[17.5rem]">
              <PortfolioFiltersSidebar
                serviceFilter={serviceFilter}
                fieldFilter={fieldFilter}
                onServiceChange={setServiceFilter}
                onFieldChange={setFieldFilter}
                onClearAll={clearFilters}
                resultCount={filteredProjects.length}
                totalCount={ALL_PROJECTS.length}
              />
            </div>
          </div>
        </div>
      </section>

      <ClosingFuture sectionId="portfolio-cta" />
    </>
  )
}
