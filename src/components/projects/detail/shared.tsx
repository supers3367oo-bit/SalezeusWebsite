import clsx from 'clsx'
import { ZoomIn } from 'lucide-react'
import type { ProjectVisual } from '../../../types/projectDetail'
import { useProjectGallery } from './ProjectGalleryContext'

const ASPECT_CLASS: Record<NonNullable<ProjectVisual['aspect']>, string> = {
  '1/1': 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '4/5': 'aspect-[4/5]',
  '9/16': 'aspect-[9/16]',
  '16/9': 'aspect-video',
}

type Props = {
  visual: ProjectVisual
  className?: string
  framed?: boolean
}

export function ProjectVisualFrame({ visual, className, framed = true }: Props) {
  const aspect = visual.aspect ?? '4/3'
  const gallery = useProjectGallery()

  const handleOpen = () => {
    gallery?.openImage(visual)
  }

  return (
    <figure className={clsx('min-w-0', className)}>
      <button
        type="button"
        onClick={handleOpen}
        disabled={!gallery}
        className={clsx(
          'group relative block w-full overflow-hidden rounded-card bg-sz-dark/5 text-left transition-transform duration-300 hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sz-interaction',
          ASPECT_CLASS[aspect],
          framed && 'border border-sz-border',
          gallery ? 'cursor-zoom-in' : 'cursor-default'
        )}
        aria-label={gallery ? `View larger: ${visual.alt}` : visual.alt}
      >
        <img
          src={visual.src}
          alt={visual.alt}
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
        {gallery && (
          <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <ZoomIn size={16} strokeWidth={2} />
          </span>
        )}
      </button>
      {visual.caption && (
        <figcaption
          className="mt-2 text-sz-secondary"
          style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.5 }}
        >
          {visual.caption}
        </figcaption>
      )}
    </figure>
  )
}

type HeadingProps = {
  title: string
  className?: string
}

export function ProjectSectionHeading({ title, className }: HeadingProps) {
  return (
    <h2
      className={clsx('text-sz-dark mb-8 lg:mb-10', className)}
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
        lineHeight: 1.12,
        fontWeight: 600,
        letterSpacing: '-0.02em',
      }}
    >
      {title}
    </h2>
  )
}

export function revealProps(reduce: boolean, delay = 0) {
  return {
    initial: reduce ? false : ({ opacity: 0, y: 20 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-8%' },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
  }
}
