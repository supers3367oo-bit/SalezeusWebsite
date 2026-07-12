import clsx from 'clsx'
import type { BilingualText } from '../types/adminContent'
import { useAdminContent } from '../content/AdminContentContext'

type Props = {
  label: string
  value: BilingualText
  onChange: (next: BilingualText) => void
  multiline?: boolean
  rows?: number
  hint?: string
}

export default function BilingualField({
  label,
  value,
  onChange,
  multiline = false,
  rows = 3,
  hint,
}: Props) {
  const { uiLocale } = useAdminContent()
  const InputTag = multiline ? 'textarea' : 'input'
  const sharedClass =
    'w-full rounded-xl border border-sz-border bg-white px-3.5 py-2.5 text-sm text-sz-dark outline-none transition focus:border-sz-interaction focus:ring-2 focus:ring-sz-interaction/20'

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-sm font-medium text-sz-dark">{label}</label>
        {hint ? <span className="text-xs text-sz-primary/60">{hint}</span> : null}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-sz-interaction">
            English
          </span>
          <InputTag
            className={clsx(sharedClass, 'font-body')}
            value={value.en}
            rows={multiline ? rows : undefined}
            onChange={(e) => onChange({ ...value, en: e.target.value })}
            dir="ltr"
          />
        </div>
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-sz-accent">
            العربية
          </span>
          <InputTag
            className={clsx(sharedClass, 'font-arabic')}
            value={value.ar}
            rows={multiline ? rows : undefined}
            onChange={(e) => onChange({ ...value, ar: e.target.value })}
            dir="rtl"
          />
        </div>
      </div>
      {uiLocale === 'ar' ? (
        <p className="text-xs text-sz-primary/50">عدّل النسختين معاً لضمان اتساق الترجمة</p>
      ) : (
        <p className="text-xs text-sz-primary/50">Edit both locales to keep translations in sync</p>
      )}
    </div>
  )
}
