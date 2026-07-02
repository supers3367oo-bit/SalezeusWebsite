import { useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'
import type { ProjectVisual } from '../../../types/projectDetail'
import { isPortraitVisual } from '../../../lib/collectProjectGalleryImages'

type Props = {
  images: ProjectVisual[]
  activeIndex: number | null
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function ProjectImageLightbox({
  images,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}: Props) {
  const reduce = useReducedMotion() ?? false
  const open = activeIndex !== null && images.length > 0
  const current = open ? images[activeIndex] : null

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose, onNext, onPrev])

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[120]"
          role="dialog"
          aria-modal="true"
          aria-label="Project image gallery"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-[rgba(4,5,8,0.96)]"
            onClick={onClose}
            aria-label="Close gallery"
          />

          <div className="relative z-10 flex h-full min-h-[100dvh] flex-col pointer-events-none">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 pointer-events-auto">
              <p
                className="text-white/55 text-sm"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
              >
                {activeIndex + 1} / {images.length}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/35 hover:text-white"
                aria-label="Close gallery"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            <div className="relative flex flex-1 min-h-0 items-center justify-center px-14 sm:px-20 pointer-events-auto">
              <button
                type="button"
                onClick={onPrev}
                className="absolute left-3 sm:left-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-sm transition-colors hover:border-white/35 hover:text-white"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} strokeWidth={2} />
              </button>

              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={`${current.src}-${activeIndex}`}
                  className={clsx(
                    'flex max-h-full max-w-full items-center justify-center',
                    isPortraitVisual(current)
                      ? 'h-[min(88dvh,100%)] w-auto'
                      : 'w-[min(92vw,100%)] h-auto'
                  )}
                  initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={current.src}
                    alt={current.alt}
                    className={clsx(
                      'object-contain',
                      isPortraitVisual(current)
                        ? 'h-[min(88dvh,100%)] w-auto max-w-[min(92vw,100%)]'
                        : 'w-[min(92vw,100%)] h-auto max-h-[min(88dvh,100%)]'
                    )}
                  />
                </motion.figure>
              </AnimatePresence>

              <button
                type="button"
                onClick={onNext}
                className="absolute right-3 sm:right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-sm transition-colors hover:border-white/35 hover:text-white"
                aria-label="Next image"
              >
                <ChevronRight size={22} strokeWidth={2} />
              </button>
            </div>

            <div className="px-4 pb-5 sm:px-6 pointer-events-auto">
              <p
                className="text-center text-white/65 text-sm"
                style={{ fontFamily: 'var(--font-body)', lineHeight: 1.5 }}
              >
                {current.alt}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
