import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, FileText } from 'lucide-react'
import { useAdminContent } from '../content/AdminContentContext'

export default function PagesIndex() {
  const { content, uiLocale } = useAdminContent()
  const isAr = uiLocale === 'ar'
  if (!content) return null

  const sections = content.pageSections.filter((section) => section.key !== 'caseStudies')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-lg font-semibold text-sz-dark">
          {isAr ? 'نصوص الصفحات' : 'Page copy'}
        </h2>
        <p className="mt-1 text-sm text-sz-primary/55">
          {isAr
            ? 'اختر قسماً لتعديل العناوين والنصوص باللغتين.'
            : 'Pick a section to edit titles and copy in both languages.'}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {sections.map((section, i) => (
          <motion.div
            key={section.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.03 * i, duration: 0.28 }}
          >
            <Link
              to={`/admin/pages/${section.key}`}
              className="group flex h-full items-center justify-between gap-3 rounded-[1.35rem] border border-white bg-white p-5 shadow-[0_12px_36px_-28px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-28px_rgba(50,88,164,0.35)]"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-sz-interaction/10 p-2.5 text-sz-interaction ring-1 ring-sz-interaction/10 transition group-hover:bg-sz-interaction group-hover:text-white">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-sz-dark">{section.label}</p>
                  <p className="mt-1 text-xs text-sz-primary/50">
                    {section.fields.length} {isAr ? 'حقل' : 'fields'}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-sz-primary/25 transition group-hover:text-sz-interaction rtl:-scale-x-100" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
