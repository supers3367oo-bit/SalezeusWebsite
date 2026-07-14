import { Loader2, Save } from 'lucide-react'
import { useAdminContent } from '../content/AdminContentContext'
import clsx from 'clsx'

export default function SaveBar() {
  const { dirty, saving, save, uiLocale } = useAdminContent()

  return (
    <button
      type="button"
      onClick={() => void save()}
      disabled={!dirty || saving}
      className={clsx(
        'inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition',
        dirty
          ? 'bg-sz-interaction text-white shadow-[0_12px_28px_-14px_rgba(50,88,164,0.9)] hover:brightness-110'
          : 'cursor-not-allowed border border-sz-border bg-white text-sz-primary/35',
      )}
    >
      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      {uiLocale === 'ar' ? (saving ? 'جاري الحفظ…' : 'حفظ') : saving ? 'Saving…' : 'Save'}
    </button>
  )
}
