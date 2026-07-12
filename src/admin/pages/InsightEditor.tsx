import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import ArticleBlocksEditor from '../components/ArticleBlocksEditor'
import BilingualField from '../components/BilingualField'
import ImageUploadField from '../components/ImageUploadField'
import ShowOnHomeToggle from '../components/ShowOnHomeToggle'
import { useAdminContent } from '../content/AdminContentContext'
import type { BilingualText } from '../types/adminContent'
import { bi } from '../utils/richText'

export default function InsightEditor() {
  const { slug } = useParams<{ slug: string }>()
  const { content, setContent, uiLocale } = useAdminContent()
  const isAr = uiLocale === 'ar'

  if (!content || !slug) return null
  const article = content.insights.find((a) => a.slug === slug)
  if (!article) {
    return (
      <p className="text-sm text-sz-primary/60">{isAr ? 'المقال غير موجود' : 'Article not found'}</p>
    )
  }

  const update = (patch: Partial<typeof article>) => {
    setContent((prev) => ({
      ...prev,
      insights: prev.insights.map((a) => (a.slug === slug ? { ...a, ...patch } : a)),
    }))
  }

  const inputClass =
    'w-full rounded-xl border border-sz-border bg-white px-3.5 py-2.5 text-sm outline-none focus:border-sz-interaction focus:ring-2 focus:ring-sz-interaction/20'

  const updateTopics = (topics: BilingualText[]) => update({ topics })

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        to="/admin/insights"
        className="inline-flex items-center gap-1.5 text-sm text-sz-primary/60 hover:text-sz-interaction"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        {isAr ? 'المقالات' : 'Insights'}
      </Link>

      <h2 className="font-heading text-xl font-semibold">
        {isAr ? article.title.ar : article.title.en}
      </h2>

      <div className="space-y-5 rounded-2xl border border-sz-border bg-white p-5">
        <h3 className="font-heading text-base font-semibold text-sz-dark">
          {isAr ? 'البيانات الأساسية' : 'Basics'}
        </h3>

        <ShowOnHomeToggle
          checked={Boolean(article.showOnHome)}
          onChange={(showOnHome) => update({ showOnHome })}
          hint={
            isAr
              ? 'يظهر في أحدث المقالات على الصفحة الرئيسية (حتى 3 مقالات).'
              : 'Appears in Latest Insights on the home page (up to 3 articles).'
          }
        />

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Slug</span>
          <input className={inputClass} value={article.slug} disabled dir="ltr" />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">{isAr ? 'تاريخ النشر' : 'Published at'}</span>
            <input
              className={inputClass}
              value={article.publishedAt}
              onChange={(e) => update({ publishedAt: e.target.value })}
              dir="ltr"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">{isAr ? 'دقائق القراءة' : 'Reading minutes'}</span>
            <input
              type="number"
              className={inputClass}
              value={article.readingTimeMinutes}
              onChange={(e) =>
                update({ readingTimeMinutes: Number(e.target.value) || article.readingTimeMinutes })
              }
              dir="ltr"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">{isAr ? 'التخطيط' : 'Layout'}</span>
            <select
              className={inputClass}
              value={article.layout}
              onChange={(e) =>
                update({
                  layout: e.target.value as typeof article.layout,
                })
              }
            >
              <option value="large">large</option>
              <option value="standard">standard</option>
              <option value="compact">compact</option>
              <option value="horizontal">horizontal</option>
            </select>
          </label>
          <label className="flex items-end gap-2 pb-2.5 text-sm">
            <input
              type="checkbox"
              checked={Boolean(article.featured)}
              onChange={(e) => update({ featured: e.target.checked })}
              className="h-4 w-4 rounded border-sz-border text-sz-interaction focus:ring-sz-interaction"
            />
            {isAr ? 'مقال مميز' : 'Featured article'}
          </label>
        </div>

        <ImageUploadField
          label={isAr ? 'صورة الغلاف' : 'Cover image'}
          value={article.coverImage}
          onChange={(coverImage) => update({ coverImage })}
          aspect="wide"
        />
        <ImageUploadField
          label={isAr ? 'الصورة المصغرة (اختياري)' : 'Card image (optional)'}
          value={article.cardImage ?? ''}
          onChange={(cardImage) => update({ cardImage: cardImage || undefined })}
          aspect="wide"
          optional
        />

        <BilingualField
          label={isAr ? 'العنوان' : 'Title'}
          value={article.title}
          multiline
          onChange={(title) => update({ title })}
        />
        <BilingualField
          label={isAr ? 'المقتطف' : 'Excerpt'}
          value={article.excerpt}
          multiline
          rows={4}
          onChange={(excerpt) => update({ excerpt })}
        />
        <BilingualField
          label={isAr ? 'اسم الكاتب' : 'Author name'}
          value={article.authorName}
          onChange={(authorName) => update({ authorName })}
        />
        <BilingualField
          label={isAr ? 'دور الكاتب' : 'Author role'}
          value={article.authorRole}
          onChange={(authorRole) => update({ authorRole })}
        />
        <BilingualField
          label={isAr ? 'الخدمة' : 'Service'}
          value={article.service}
          onChange={(service) => update({ service })}
        />
        <BilingualField
          label={isAr ? 'الصناعة' : 'Industry'}
          value={article.industry}
          onChange={(industry) => update({ industry })}
        />

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-sz-dark">{isAr ? 'المواضيع' : 'Topics'}</p>
            <button
              type="button"
              onClick={() => updateTopics([...(article.topics ?? []), bi('', '')])}
              className="inline-flex items-center gap-1 rounded-lg border border-sz-border px-2.5 py-1.5 text-xs font-medium text-sz-primary/70 hover:border-sz-interaction hover:text-sz-interaction"
            >
              <Plus className="h-3.5 w-3.5" />
              {isAr ? 'إضافة' : 'Add'}
            </button>
          </div>
          {(article.topics ?? []).map((topic, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <BilingualField
                  label={`${isAr ? 'موضوع' : 'Topic'} ${index + 1}`}
                  value={topic}
                  onChange={(next) =>
                    updateTopics(
                      (article.topics ?? []).map((t, i) => (i === index ? next : t)),
                    )
                  }
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  updateTopics((article.topics ?? []).filter((_, i) => i !== index))
                }
                className="mt-8 rounded-lg p-2 text-sz-primary/45 hover:bg-sz-surface hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-5 rounded-2xl border border-sz-border bg-white p-5">
        <div>
          <h3 className="font-heading text-base font-semibold text-sz-dark">SEO</h3>
          <p className="mt-1 text-xs text-sz-primary/55">
            {isAr
              ? 'عنوان ووصف وكلمات مفتاحية لصفحة المقال (Meta / Schema)'
              : 'Meta title, description, and keywords for the article page'}
          </p>
        </div>
        <BilingualField
          label={isAr ? 'عنوان Meta' : 'Meta title'}
          value={article.metaTitle ?? bi('', '')}
          hint={isAr ? 'اختياري — الافتراضي عنوان المقال' : 'Optional — falls back to title'}
          onChange={(metaTitle) => update({ metaTitle })}
        />
        <BilingualField
          label={isAr ? 'وصف Meta' : 'Meta description'}
          value={article.metaDescription ?? bi('', '')}
          multiline
          rows={3}
          hint={isAr ? 'اختياري — الافتراضي المقتطف' : 'Optional — falls back to excerpt'}
          onChange={(metaDescription) => update({ metaDescription })}
        />
        <BilingualField
          label={isAr ? 'كلمات مفتاحية' : 'Keywords'}
          value={article.keywords ?? bi('', '')}
          hint={isAr ? 'افصل بفاصلة' : 'Comma-separated'}
          onChange={(keywords) => update({ keywords })}
        />
      </div>

      <div className="rounded-2xl border border-sz-border bg-white p-5">
        <ArticleBlocksEditor
          blocks={article.content ?? []}
          onChange={(blocks) => update({ content: blocks })}
        />
      </div>
    </div>
  )
}
