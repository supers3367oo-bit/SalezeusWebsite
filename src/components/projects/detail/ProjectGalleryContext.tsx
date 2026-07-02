import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ProjectVisual } from '../../../types/projectDetail'
import ProjectImageLightbox from './ProjectImageLightbox'

type ProjectGalleryContextValue = {
  images: ProjectVisual[]
  openImage: (visual: ProjectVisual) => void
}

const ProjectGalleryContext = createContext<ProjectGalleryContextValue | null>(null)

type ProviderProps = {
  images: ProjectVisual[]
  children: ReactNode
}

export function ProjectGalleryProvider({ images, children }: ProviderProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const openImage = useCallback(
    (visual: ProjectVisual) => {
      const index = images.findIndex((img) => img.src === visual.src && img.alt === visual.alt)
      if (index >= 0) setActiveIndex(index)
    },
    [images]
  )

  const close = useCallback(() => setActiveIndex(null), [])

  const goNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || images.length === 0) return current
      return (current + 1) % images.length
    })
  }, [images.length])

  const goPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || images.length === 0) return current
      return (current - 1 + images.length) % images.length
    })
  }, [images.length])

  const value = useMemo(() => ({ images, openImage }), [images, openImage])

  return (
    <ProjectGalleryContext.Provider value={value}>
      {children}
      <ProjectImageLightbox
        images={images}
        activeIndex={activeIndex}
        onClose={close}
        onNext={goNext}
        onPrev={goPrev}
      />
    </ProjectGalleryContext.Provider>
  )
}

export function useProjectGallery() {
  return useContext(ProjectGalleryContext)
}
