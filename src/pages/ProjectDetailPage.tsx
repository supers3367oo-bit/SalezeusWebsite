import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import ProjectDetailHero from '../components/projects/detail/ProjectDetailHero'
import ProjectBehanceGallery from '../components/projects/detail/ProjectBehanceGallery'
import ProjectMoreWork from '../components/projects/detail/ProjectMoreWork'
import { ProjectGalleryProvider } from '../components/projects/detail/ProjectGalleryContext'
import { getProjectBySlug, getRelatedProjects } from '../data/projectDetails'
import { collectProjectGalleryImages } from '../lib/collectProjectGalleryImages'
import { refreshLocomotiveScroll } from '../lib/locomotive'

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  const related = project ? getRelatedProjects(project) : []
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
            Project not found
          </h1>
          <Button href="/portfolio" size="sm">
            Back to portfolio
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
