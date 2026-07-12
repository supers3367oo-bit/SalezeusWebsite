import { Link } from 'react-router-dom'
import { Pencil } from 'lucide-react'
import { HomeBadge } from '../components/ShowOnHomeToggle'
import { useAdminContent } from '../content/AdminContentContext'

export default function ProjectsList() {
  const { content, setContent, uiLocale } = useAdminContent()
  const isAr = uiLocale === 'ar'
  if (!content) return null

  const onHomeCount = content.projects.filter((p) => p.showOnHome).length

  return (
    <div className="space-y-4">
      <p className="text-sm text-sz-primary/65">
        {isAr
          ? `${content.projects.length} مشاريع · ${onHomeCount} على الهوم`
          : `${content.projects.length} projects · ${onHomeCount} on home`}
      </p>
      <div className="overflow-hidden rounded-2xl border border-sz-border bg-white">
        <div className="divide-y divide-sz-border">
          {content.projects.map((project) => (
            <div key={project.slug} className="flex items-center gap-4 px-4 py-3 sm:px-5">
              <img
                src={project.image}
                alt=""
                className="hidden h-12 w-16 rounded-lg object-cover sm:block"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate font-medium text-sz-dark">
                    {isAr ? project.client.ar : project.client.en}
                  </p>
                  <HomeBadge on={Boolean(project.showOnHome)} />
                </div>
                <p className="truncate text-xs text-sz-primary/55">
                  {isAr ? project.summary.ar : project.summary.en}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-sz-interaction-soft px-2 py-0.5 text-[10px] font-semibold text-sz-interaction">
                    {isAr ? project.serviceLabel.ar : project.serviceLabel.en}
                  </span>
                  <span className="rounded-full bg-sz-surface px-2 py-0.5 text-[10px] font-medium text-sz-primary/70">
                    {isAr ? project.field.ar : project.field.en}
                  </span>
                  <label className="inline-flex cursor-pointer items-center gap-1.5 text-[10px] text-sz-primary/60">
                    <input
                      type="checkbox"
                      checked={Boolean(project.showOnHome)}
                      onChange={(e) => {
                        const showOnHome = e.target.checked
                        setContent((prev) => ({
                          ...prev,
                          projects: prev.projects.map((p) =>
                            p.slug === project.slug ? { ...p, showOnHome } : p,
                          ),
                        }))
                      }}
                      className="h-3.5 w-3.5 rounded border-sz-border text-sz-interaction"
                    />
                    {isAr ? 'على الهوم' : 'On home'}
                  </label>
                </div>
              </div>
              <span className="hidden shrink-0 rounded-full bg-sz-surface px-2.5 py-1 text-[11px] font-medium text-sz-primary/70 md:inline">
                {project.year}
              </span>
              <Link
                to={`/admin/projects/${project.slug}`}
                className="rounded-xl border border-sz-border p-2 text-sz-primary/60 transition hover:border-sz-interaction hover:text-sz-interaction"
              >
                <Pencil className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
