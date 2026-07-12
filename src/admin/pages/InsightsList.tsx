import { Link } from 'react-router-dom'
import { Pencil, Star } from 'lucide-react'
import { HomeBadge } from '../components/ShowOnHomeToggle'
import { useAdminContent } from '../content/AdminContentContext'

export default function InsightsList() {
  const { content, setContent, uiLocale } = useAdminContent()
  const isAr = uiLocale === 'ar'
  if (!content) return null

  const onHomeCount = content.insights.filter((a) => a.showOnHome).length

  return (
    <div className="space-y-4">
      <p className="text-sm text-sz-primary/65">
        {isAr
          ? `${content.insights.length} مقالات · ${onHomeCount} على الهوم`
          : `${content.insights.length} articles · ${onHomeCount} on home`}
      </p>
      <div className="grid gap-3 lg:grid-cols-2">
        {content.insights.map((article) => (
          <div
            key={article.slug}
            className="flex gap-4 rounded-2xl border border-sz-border bg-white p-4"
          >
            <img
              src={article.cardImage || article.coverImage}
              alt=""
              className="h-20 w-24 shrink-0 rounded-xl object-cover bg-sz-surface"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="line-clamp-2 font-medium text-sz-dark">
                      {isAr ? article.title.ar : article.title.en}
                    </p>
                    <HomeBadge on={Boolean(article.showOnHome)} />
                  </div>
                </div>
                <Link
                  to={`/admin/insights/${article.slug}`}
                  className="shrink-0 rounded-xl border border-sz-border p-2 text-sz-primary/60 transition hover:border-sz-interaction hover:text-sz-interaction"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-sz-primary/55">
                {isAr ? article.excerpt.ar : article.excerpt.en}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-sz-primary/50">
                <span>{article.publishedAt}</span>
                <span>·</span>
                <span>
                  {article.readingTimeMinutes} {isAr ? 'د' : 'min'}
                </span>
                {article.featured ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-sz-accent-soft px-2 py-0.5 font-medium text-sz-dark">
                    <Star className="h-3 w-3" />
                    Featured
                  </span>
                ) : null}
                <label className="inline-flex cursor-pointer items-center gap-1.5 text-[11px] text-sz-primary/60">
                  <input
                    type="checkbox"
                    checked={Boolean(article.showOnHome)}
                    onChange={(e) => {
                      const showOnHome = e.target.checked
                      setContent((prev) => ({
                        ...prev,
                        insights: prev.insights.map((a) =>
                          a.slug === article.slug ? { ...a, showOnHome } : a,
                        ),
                      }))
                    }}
                    className="h-3.5 w-3.5 rounded border-sz-border text-sz-interaction"
                  />
                  {isAr ? 'على الهوم' : 'On home'}
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
