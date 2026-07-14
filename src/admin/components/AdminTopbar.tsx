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
    <header className="sticky top-0 z-30 border-b border-sz-border/60 bg-[#f3f5f9]/85 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl border border-sz-border bg-white p-2 text-sz-primary shadow-sm transition hover:border-sz-interaction/40 hover:text-sz-interaction lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="truncate font-heading text-[1.35rem] font-semibold tracking-tight text-sz-dark sm:text-2xl">
                {title}
              </h1>
              {dirty ? (
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-800">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                  {isAr ? 'غير محفوظ' : 'Unsaved'}
                </span>
              ) : (
                <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 sm:inline-flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {isAr ? 'متزامن' : 'Synced'}
                </span>
              )}
            </div>
            <p className="mt-0.5 truncate text-xs text-sz-primary/45">{email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-xl border border-sz-border bg-white p-0.5 shadow-sm sm:flex">
            <button
              type="button"
              onClick={() => setUiLocale('en')}
              className={`rounded-[0.65rem] px-2.5 py-1.5 text-[11px] font-semibold transition ${
                uiLocale === 'en'
                  ? 'bg-sz-dark text-white'
                  : 'text-sz-primary/55 hover:text-sz-dark'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setUiLocale('ar')}
              className={`rounded-[0.65rem] px-2.5 py-1.5 text-[11px] font-semibold transition ${
                uiLocale === 'ar'
                  ? 'bg-sz-dark text-white'
                  : 'text-sz-primary/55 hover:text-sz-dark'
              }`}
            >
              عربي
            </button>
          </div>
          <button
            type="button"
            onClick={() => setUiLocale(uiLocale === 'ar' ? 'en' : 'ar')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-sz-border bg-white px-3 py-2 text-xs font-semibold text-sz-primary shadow-sm transition hover:border-sz-interaction/40 hover:text-sz-interaction sm:hidden"
          >
            <Languages className="h-3.5 w-3.5" />
            {isAr ? 'EN' : 'عربي'}
          </button>
          <SaveBar />
        </div>
      </div>
    </header>
  )
}
