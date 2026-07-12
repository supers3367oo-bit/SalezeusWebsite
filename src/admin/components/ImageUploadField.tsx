import { useId, useRef, useState } from 'react'
import { ImagePlus, Trash2, Upload } from 'lucide-react'
import clsx from 'clsx'
import { useAdminContent } from '../content/AdminContentContext'
import { compressImageFile, readFileAsDataUrl } from '../utils/compressImage'

const ACCEPT = 'image/png,image/jpeg,image/webp,image/gif,image/svg+xml'
/** Original pick limit — file is compressed before save/send */
const MAX_BYTES = 12 * 1024 * 1024

type Props = {
  label: string
  value: string
  onChange: (next: string) => void
  aspect?: 'square' | 'wide' | 'tall'
  optional?: boolean
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  aspect = 'wide',
  optional = false,
}: Props) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const { uiLocale, pushToast } = useAdminContent()
  const isAr = uiLocale === 'ar'
  const [busy, setBusy] = useState(false)

  const handleFiles = async (files: FileList | null) => {
    const file = files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      pushToast(isAr ? 'الملف يجب أن يكون صورة' : 'File must be an image', 'error')
      return
    }
    if (file.size > MAX_BYTES) {
      pushToast(isAr ? 'الحد الأقصى للصورة الأصلية 12 ميجابايت' : 'Original image max is 12MB', 'error')
      return
    }
    setBusy(true)
    try {
      const dataUrl = await compressImageFile(file)
      onChange(dataUrl)
    } catch {
      pushToast(isAr ? 'فشل ضغط/رفع الصورة' : 'Failed to compress image', 'error')
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-sz-dark">{label}</span>
        {optional && value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {isAr ? 'إزالة' : 'Remove'}
          </button>
        ) : null}
      </div>

      <div
        className={clsx(
          'relative overflow-hidden rounded-2xl border border-dashed border-sz-border bg-sz-surface/80',
          aspect === 'square' && 'aspect-square max-w-[14rem]',
          aspect === 'wide' && 'aspect-[16/9]',
          aspect === 'tall' && 'aspect-[4/5] max-w-[12rem]',
        )}
      >
        {value ? (
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full min-h-[8rem] flex-col items-center justify-center gap-2 text-sz-primary/45">
            <ImagePlus className="h-8 w-8" />
            <span className="text-xs">{isAr ? 'لا توجد صورة' : 'No image'}</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={ACCEPT}
          className="sr-only"
          onChange={(e) => void handleFiles(e.target.files)}
        />
        <label
          htmlFor={inputId}
          className={clsx(
            'inline-flex cursor-pointer items-center gap-2 rounded-btn bg-sz-interaction px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-sz-interaction-hover',
            busy && 'pointer-events-none opacity-60',
          )}
        >
          <Upload className="h-4 w-4" />
          {busy
            ? isAr
              ? 'جاري الضغط…'
              : 'Compressing…'
            : value
              ? isAr
                ? 'تغيير الصورة'
                : 'Replace image'
              : isAr
                ? 'رفع صورة'
                : 'Upload image'}
        </label>
        <span className="text-[11px] text-sz-primary/45">
          {isAr
            ? 'تُضغط الصورة تلقائياً قبل الحفظ مع الحفاظ على الوضوح'
            : 'Images are compressed before save while keeping clarity'}
        </span>
      </div>
    </div>
  )
}

export { readFileAsDataUrl, ACCEPT as IMAGE_ACCEPT, MAX_BYTES as IMAGE_MAX_BYTES }
