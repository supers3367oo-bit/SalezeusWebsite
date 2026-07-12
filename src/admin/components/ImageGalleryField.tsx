import { useId, useRef, useState } from 'react'
import { ImagePlus, Plus, Trash2, Upload } from 'lucide-react'
import clsx from 'clsx'
import type { AdminProjectImage } from '../types/adminContent'
import BilingualField from './BilingualField'
import { IMAGE_ACCEPT, IMAGE_MAX_BYTES, readFileAsDataUrl } from './ImageUploadField'
import { useAdminContent } from '../content/AdminContentContext'

type Props = {
  label: string
  images: AdminProjectImage[]
  onChange: (next: AdminProjectImage[]) => void
}

export default function ImageGalleryField({ label, images, onChange }: Props) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const { uiLocale, pushToast } = useAdminContent()
  const isAr = uiLocale === 'ar'
  const [busy, setBusy] = useState(false)

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return
    setBusy(true)
    try {
      const added: AdminProjectImage[] = []
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          pushToast(isAr ? 'تجاهل ملف غير صورة' : 'Skipped non-image file', 'error')
          continue
        }
        if (file.size > IMAGE_MAX_BYTES) {
          pushToast(
            isAr ? `${file.name}: أكبر من 12 ميجابايت` : `${file.name}: exceeds 12MB`,
            'error',
          )
          continue
        }
        const src = await readFileAsDataUrl(file)
        const baseName = file.name.replace(/\.[^.]+$/, '')
        added.push({
          id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          src,
          alt: { en: baseName, ar: baseName },
        })
      }
      if (added.length) onChange([...images, ...added])
    } catch {
      pushToast(isAr ? 'فشل رفع الصور' : 'Failed to upload images', 'error')
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-sz-dark">{label}</p>
          <p className="text-xs text-sz-primary/55">
            {images.length} {isAr ? 'صورة' : 'images'}
          </p>
        </div>
        <div>
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={IMAGE_ACCEPT}
            multiple
            className="sr-only"
            onChange={(e) => void handleFiles(e.target.files)}
          />
          <label
            htmlFor={inputId}
            className={clsx(
              'inline-flex cursor-pointer items-center gap-2 rounded-btn bg-sz-accent px-3.5 py-2 text-sm font-semibold text-sz-dark transition hover:brightness-105',
              busy && 'pointer-events-none opacity-60',
            )}
          >
            {busy ? (
              <Upload className="h-4 w-4 animate-pulse" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {busy
              ? isAr
                ? 'جاري الضغط…'
                : 'Compressing…'
              : isAr
                ? 'إضافة صور'
                : 'Add images'}
          </label>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="flex min-h-[9rem] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-sz-border bg-sz-surface/70 text-sz-primary/45">
          <ImagePlus className="h-8 w-8" />
          <p className="text-xs">
            {isAr ? 'أضيفي صور المشروع من زر الإضافة' : 'Add project gallery images above'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-2xl border border-sz-border bg-white"
            >
              <div className="relative aspect-[16/9] bg-sz-surface">
                <img src={image.src} alt="" className="h-full w-full object-contain" />
                <button
                  type="button"
                  onClick={() => onChange(images.filter((img) => img.id !== image.id))}
                  className="absolute end-3 top-3 inline-flex items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1.5 text-xs font-semibold text-red-600 shadow-sm transition hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {isAr ? 'حذف' : 'Delete'}
                </button>
                <span className="absolute start-3 top-3 rounded-lg bg-sz-dark/70 px-2 py-1 text-[11px] font-semibold text-white">
                  #{index + 1}
                </span>
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <input
                    type="file"
                    accept={IMAGE_ACCEPT}
                    className="sr-only"
                    id={`replace-${image.id}`}
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      if (!file.type.startsWith('image/') || file.size > IMAGE_MAX_BYTES) {
                        pushToast(
                          isAr ? 'صورة غير صالحة أو كبيرة جداً' : 'Invalid or oversized image',
                          'error',
                        )
                        return
                      }
                      try {
                        const src = await readFileAsDataUrl(file)
                        onChange(
                          images.map((img) => (img.id === image.id ? { ...img, src } : img)),
                        )
                      } catch {
                        pushToast(isAr ? 'فشل استبدال الصورة' : 'Replace failed', 'error')
                      }
                      e.target.value = ''
                    }}
                  />
                  <label
                    htmlFor={`replace-${image.id}`}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-btn border border-sz-border px-3 py-1.5 text-xs font-semibold text-sz-primary transition hover:border-sz-interaction hover:text-sz-interaction"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    {isAr ? 'استبدال' : 'Replace'}
                  </label>
                </div>
                <BilingualField
                  label={isAr ? 'النص البديل' : 'Alt text'}
                  value={image.alt}
                  onChange={(alt) =>
                    onChange(images.map((img) => (img.id === image.id ? { ...img, alt } : img)))
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
