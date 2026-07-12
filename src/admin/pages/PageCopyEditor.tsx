import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import BilingualField from '../components/BilingualField'
import PageSectionPreview from '../components/PageSectionPreview'
import { useAdminContent } from '../content/AdminContentContext'
import type { Locale } from '../../i18n/types'
import { getRootLabel, groupFieldsByRoot } from '../utils/pageCopy'

export default function PageCopyEditor() {
  const { pageKey } = useParams<{ pageKey: string }>()
  const { content, setContent, uiLocale } = useAdminContent()
  const isAr = uiLocale === 'ar'
  const [previewLocale, setPreviewLocale] = useState<Locale>('en')
  const [activeRoot, setActiveRoot] = useState<string | null>(null)

  const section = content && pageKey ? content.pageSections.find((s) => s.key === pageKey) : null
  const groups = useMemo(
    () => (section ? groupFieldsByRoot(section.fields) : []),
    [section],
  )

  useEffect(() => {
    if (!groups.length) {
      setActiveRoot(null)
      return
    }
    setActiveRoot((current) =>
      current && groups.some((g) => g.root === current) ? current : groups[0].root,
    )
  }, [groups, pageKey])

  if (!content || !pageKey) return null

  if (!section) {
    return (
      <div className="rounded-2xl border border-sz-border bg-white p-8 text-center">
        <p className="text-sm text-sz-primary/60">{isAr ? 'القسم غير موجود' : 'Section not found'}</p>
        <Link to="/admin/pages" className="mt-3 inline-block text-sm font-medium text-sz-interaction">
          {isAr ? 'العودة' : 'Back'}
        </Link>
      </div>
    )
  }

  const activeGroup = groups.find((g) => g.root === activeRoot) ?? groups[0]
  const activeFields = activeGroup?.fields ?? []

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <Link
        to="/admin/pages"
        className="inline-flex items-center gap-1.5 text-sm text-sz-primary/60 transition hover:text-sz-interaction"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        {isAr ? 'كل الأقسام' : 'All sections'}
      </Link>

      <div>
        <h2 className="font-heading text-xl font-semibold">{section.label}</h2>
        <p className="mt-1 text-sm text-sz-primary/55">
          {isAr
            ? `${groups.length} أقسام · اختر قسماً وعدّل نصوصه مع معاينة مباشرة`
            : `${groups.length} sections · pick a section and edit with a live preview`}
        </p>
      </div>

      {groups.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5">
          {groups.map((group) => {
            const selected = group.root === activeGroup?.root
            return (
              <button
                key={group.root}
                type="button"
                onClick={() => setActiveRoot(group.root)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                  selected
                    ? 'border-sz-interaction bg-sz-interaction text-white'
                    : 'border-sz-border bg-white text-sz-primary/70 hover:border-sz-interaction/40 hover:text-sz-dark'
                }`}
              >
                {getRootLabel(group.root, isAr ? 'ar' : 'en')}
                <span className={`ms-1.5 text-[11px] ${selected ? 'text-white/70' : 'text-sz-primary/40'}`}>
                  {group.fields.length}
                </span>
              </button>
            )
          })}
        </div>
      ) : null}

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <div className="space-y-4">
          {activeGroup ? (
            <div className="rounded-2xl border border-sz-border bg-white px-4 py-3 sm:px-5">
              <p className="text-sm font-semibold text-sz-dark">
                {getRootLabel(activeGroup.root, isAr ? 'ar' : 'en')}
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-sz-primary/40">{activeGroup.root}</p>
            </div>
          ) : null}

          <div className="space-y-5">
            {activeFields.map((field) => (
              <div key={field.path} className="rounded-2xl border border-sz-border bg-white p-4 sm:p-5">
                <BilingualField
                  label={field.label}
                  value={{ en: field.en, ar: field.ar }}
                  multiline={field.multiline}
                  rows={field.multiline ? 4 : 2}
                  onChange={(next) => {
                    setContent((prev) => ({
                      ...prev,
                      pageSections: prev.pageSections.map((s) =>
                        s.key !== section.key
                          ? s
                          : {
                              ...s,
                              fields: s.fields.map((f) =>
                                f.path === field.path ? { ...f, en: next.en, ar: next.ar } : f,
                              ),
                            },
                      ),
                    }))
                  }}
                />
                <p className="mt-2 font-mono text-[10px] text-sz-primary/35">{field.path}</p>
              </div>
            ))}
          </div>
        </div>

        {activeGroup ? (
          <div className="xl:sticky xl:top-24">
            <PageSectionPreview
              root={activeGroup.root}
              fields={section.fields}
              previewLocale={previewLocale}
              onPreviewLocaleChange={setPreviewLocale}
              isArUi={isAr}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
