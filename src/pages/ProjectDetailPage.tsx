import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import ProjectDetailHero from '../components/projects/detail/ProjectDetailHero'
import ProjectBehanceGallery from '../components/projects/detail/ProjectBehanceGallery'
import ProjectMoreWork from '../components/projects/detail/ProjectMoreWork'
import { ProjectGalleryProvider } from '../components/projects/detail/ProjectGalleryContext'
import { collectProjectGalleryImages } from '../lib/collectProjectGalleryImages'
import { refreshLocomotiveScroll } from '../lib/locomotive'
import { useLocale } from '../providers/LocaleProvider'
import { useProjectDetail, useRelatedProjects } from '../i18n/useLocalizedData'

export default function ProjectDetailPage() {
  const { t } = useLocale()
  const { slug } = useParams<{ slug: string }>()
  const project = useProjectDetail(slug)
  const related = useRelatedProjects(slug)
  const galleryImages = useMemo(
    () => (project ? collectProjectGalleryImages(project) : []),
    [project]
  )

  useEffect(() => {
    requestAnimationFrame(() => refreshLocomotiveScroll())
  }, [slug])

  if (!project) {
    return (
      <section className="section-surface min-h-[60vh] flex items-center pt-28">
        <div className="section-container text-center w-full">
          <h1
            className="text-sz-dark mb-4"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 600 }}
          >
            {t('errors.projectNotFound')}
          </h1>
          <Button href="/portfolio" size="sm">
            {t('errors.backToPortfolio')}
          </Button>
        </div>
      </section>
    )
  }

  return (
    <ProjectGalleryProvider images={galleryImages}>
      <ProjectDetailHero project={project} />
      <ProjectBehanceGallery images={galleryImages} projectTitle={project.client} />
      <ProjectMoreWork project={project} related={related} />
    </ProjectGalleryProvider>
  )
}
