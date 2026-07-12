import { Home } from 'lucide-react'
import { useAdminContent } from '../content/AdminContentContext'

type Props = {
  checked: boolean
  onChange: (next: boolean) => void
  hint?: string
}

export default function ShowOnHomeToggle({ checked, onChange, hint }: Props) {
  const { uiLocale } = useAdminContent()
  const isAr = uiLocale === 'ar'

  return (
    <div className="rounded-2xl border border-sz-border bg-sz-surface/60 p-4">
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-sz-border text-sz-interaction focus:ring-sz-interaction"
        />
        <span className="min-w-0">
          <span className="flex items-center gap-2 text-sm font-semibold text-sz-dark">
            <Home className="h-4 w-4 text-sz-interaction" />
            {isAr ? 'إظهار في الصفحة الرئيسية' : 'Show on home page'}
          </span>
          <span className="mt-1 block text-xs leading-relaxed text-sz-primary/55">
            {hint ??
              (isAr
                ? 'عند التفعيل يظهر هذا العنصر في القسم المناسب على الهوم بعد الحفظ.'
                : 'When enabled, this item appears in the matching home section after you save.')}
          </span>
        </span>
      </label>
    </div>
  )
}

export function HomeBadge({ on }: { on: boolean }) {
  const { uiLocale } = useAdminContent()
  const isAr = uiLocale === 'ar'
  if (!on) return null
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-sz-interaction-soft px-2 py-0.5 text-[10px] font-semibold text-sz-interaction">
      <Home className="h-3 w-3" />
      {isAr ? 'الهوم' : 'Home'}
    </span>
  )
}
