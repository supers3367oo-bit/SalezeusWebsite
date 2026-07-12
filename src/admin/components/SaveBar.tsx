import { Loader2, Save } from 'lucide-react'
import { useAdminContent } from '../content/AdminContentContext'

export default function SaveBar() {
  const { dirty, saving, save, uiLocale } = useAdminContent()

  return (
    <button
      type="button"
      onClick={() => void save()}
      disabled={!dirty || saving}
      className="inline-flex items-center gap-2 rounded-btn bg-sz-accent px-4 py-2 text-sm font-semibold text-sz-dark shadow-sm transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      {uiLocale === 'ar' ? (saving ? 'جاري الحفظ…' : 'حفظ') : saving ? 'Saving…' : 'Save'}
    </button>
  )
}
