import { Link } from 'react-router-dom'
import { ArrowUpRight, FileText } from 'lucide-react'
import { useAdminContent } from '../content/AdminContentContext'

export default function PagesIndex() {
  const { content, uiLocale } = useAdminContent()
  const isAr = uiLocale === 'ar'
  if (!content) return null

  return (
    <div className="space-y-6">
      <p className="text-sm text-sz-primary/65">
        {isAr
          ? 'اختر قسماً لتعديل العناوين والنصوص باللغتين.'
          : 'Pick a section to edit titles and copy in both languages.'}
      </p>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {content.pageSections.map((section) => (
          <Link
            key={section.key}
            to={`/admin/pages/${section.key}`}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-sz-border bg-white p-5 transition hover:border-sz-interaction/40 hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-sz-interaction-soft p-2 text-sz-interaction">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <p className="font-heading font-semibold text-sz-dark">{section.label}</p>
                <p className="mt-1 text-xs text-sz-primary/55">
                  {section.fields.length} {isAr ? 'حقل' : 'fields'}
                </p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-sz-primary/30 transition group-hover:text-sz-interaction" />
          </Link>
        ))}
      </div>
    </div>
  )
}
