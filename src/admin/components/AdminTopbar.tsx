import { Menu, Languages } from 'lucide-react'
import SaveBar from './SaveBar'
import { useAdminContent } from '../content/AdminContentContext'
import { useAdminAuth } from '../auth/AdminAuthContext'

type Props = {
  title: string
  onMenuClick: () => void
}

export default function AdminTopbar({ title, onMenuClick }: Props) {
  const { uiLocale, setUiLocale, dirty } = useAdminContent()
  const { email } = useAdminAuth()
  const isAr = uiLocale === 'ar'

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-sz-border bg-sz-surface/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl border border-sz-border bg-white p-2 text-sz-primary lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="truncate font-heading text-lg font-semibold text-sz-dark sm:text-xl">
              {title}
            </h1>
            {dirty ? (
              <span className="shrink-0 rounded-full bg-sz-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sz-dark">
                {isAr ? 'غير محفوظ' : 'Unsaved'}
              </span>
            ) : null}
          </div>
          <p className="truncate text-xs text-sz-primary/55">{email}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setUiLocale(uiLocale === 'ar' ? 'en' : 'ar')}
          className="inline-flex items-center gap-1.5 rounded-btn border border-sz-border bg-white px-3 py-2 text-xs font-semibold text-sz-primary transition hover:border-sz-interaction hover:text-sz-interaction"
        >
          <Languages className="h-3.5 w-3.5" />
          {isAr ? 'EN' : 'عربي'}
        </button>
        <SaveBar />
      </div>
    </header>
  )
}
