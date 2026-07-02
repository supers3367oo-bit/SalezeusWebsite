import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import type { ProjectVisual } from '../../../types/projectDetail'
import { useProjectGallery } from './ProjectGalleryContext'
import './ProjectBehanceGallery.css'

type Props = {
  images: ProjectVisual[]
  projectTitle: string
}

export default function ProjectBehanceGallery({ images, projectTitle }: Props) {
  const gallery = useProjectGallery()
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (images.length === 0) return

    const updateActive = () => {
      const center = window.innerHeight * 0.5
      let closest = 0
      let minDistance = Number.POSITIVE_INFINITY

      slideRefs.current.forEach((node, index) => {
        if (!node) return
        const rect = node.getBoundingClientRect()
        const slideCenter = rect.top + rect.height / 2
        const distance = Math.abs(slideCenter - center)
        if (distance < minDistance) {
          minDistance = distance
          closest = index
        }
      })

      setActiveIndex(closest)
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)

    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [images.length])

  if (images.length === 0) {
    return (
      <section className="bg-white py-24 text-center">
        <p className="text-sz-secondary" style={{ fontFamily: 'var(--font-body)', fontSize: 15 }}>
          Gallery images coming soon.
        </p>
      </section>
    )
  }

  return (
    <section className="project-behance-gallery bg-white" aria-label={`${projectTitle} gallery`}>
      <div className="project-behance-gallery__track">
        {images.map((visual, index) => (
          <div
            key={`${visual.src}-${visual.alt}`}
            ref={(node) => {
              slideRefs.current[index] = node
            }}
            className="project-behance-gallery__slide snap-start snap-always"
          >
            <button
              type="button"
              onClick={() => gallery?.openImage(visual)}
              disabled={!gallery}
              className={clsx(
                'project-behance-gallery__frame',
                gallery && 'cursor-zoom-in'
              )}
              aria-label={gallery ? `View larger: ${visual.alt}` : visual.alt}
            >
              <img
                src={visual.src}
                alt={visual.alt}
                className="project-behance-gallery__image"
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </button>
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <nav
          className="project-behance-gallery__nav hidden lg:flex"
          aria-label="Gallery position"
        >
          {images.map((visual, index) => (
            <button
              key={`dot-${visual.src}-${index}`}
              type="button"
              className={clsx(
                'project-behance-gallery__dot',
                activeIndex === index && 'project-behance-gallery__dot--active'
              )}
              onClick={() => {
                slideRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              aria-label={`Go to image ${index + 1}`}
              aria-current={activeIndex === index ? 'true' : undefined}
            />
          ))}
        </nav>
      )}

      <div
        className="project-behance-gallery__counter lg:hidden"
        aria-live="polite"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em' }}
      >
        {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>
    </section>
  )
}
