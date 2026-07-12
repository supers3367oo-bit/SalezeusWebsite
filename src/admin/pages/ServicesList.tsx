import { Link } from 'react-router-dom'
import { Pencil } from 'lucide-react'
import { HomeBadge } from '../components/ShowOnHomeToggle'
import { useAdminContent } from '../content/AdminContentContext'

export default function ServicesList() {
  const { content, setContent, uiLocale } = useAdminContent()
  const isAr = uiLocale === 'ar'
  if (!content) return null

  const onHomeCount = content.services.filter((s) => s.showOnHome).length

  return (
    <div className="space-y-4">
      <p className="text-sm text-sz-primary/65">
        {isAr
          ? `${content.services.length} خدمات · ${onHomeCount} على الهوم`
          : `${content.services.length} services · ${onHomeCount} on home`}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {content.services.map((service) => (
          <div
            key={service.slug}
            className="overflow-hidden rounded-2xl border border-sz-border bg-white"
          >
            <div className="aspect-[16/7] bg-sz-surface">
              <img src={service.image} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-heading font-semibold text-sz-dark">
                    {isAr ? service.title.ar : service.title.en}
                  </p>
                  <HomeBadge on={Boolean(service.showOnHome)} />
                </div>
                <p className="mt-0.5 truncate text-xs text-sz-primary/55">
                  {isAr ? service.tagline.ar : service.tagline.en}
                </p>
                <label className="mt-2 inline-flex cursor-pointer items-center gap-2 text-[11px] text-sz-primary/60">
                  <input
                    type="checkbox"
                    checked={Boolean(service.showOnHome)}
                    onChange={(e) => {
                      const showOnHome = e.target.checked
                      setContent((prev) => ({
                        ...prev,
                        services: prev.services.map((s) =>
                          s.slug === service.slug ? { ...s, showOnHome } : s,
                        ),
                      }))
                    }}
                    className="h-3.5 w-3.5 rounded border-sz-border text-sz-interaction"
                  />
                  {isAr ? 'على الهوم' : 'On home'}
                </label>
              </div>
              <Link
                to={`/admin/services/${service.slug}`}
                className="rounded-xl border border-sz-border p-2 text-sz-primary/60 transition hover:border-sz-interaction hover:text-sz-interaction"
              >
                <Pencil className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
