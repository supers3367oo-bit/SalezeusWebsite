import { Link } from 'react-router-dom'
import { Pencil } from 'lucide-react'
import { useAdminContent } from '../content/AdminContentContext'

export default function TeamList() {
  const { content, uiLocale } = useAdminContent()
  const isAr = uiLocale === 'ar'
  if (!content) return null

  return (
    <div className="space-y-4">
      <p className="text-sm text-sz-primary/65">
        {isAr ? `${content.team.length} أعضاء` : `${content.team.length} members`}
      </p>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {content.team.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-4 rounded-2xl border border-sz-border bg-white p-4"
          >
            <img
              src={member.src}
              alt={member.name.en}
              className="h-14 w-14 rounded-xl object-cover bg-sz-surface"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-sz-dark">
                {isAr ? member.name.ar : member.name.en}
              </p>
              <p className="truncate text-xs text-sz-primary/55">
                {isAr ? member.role.ar : member.role.en}
              </p>
            </div>
            <Link
              to={`/admin/team/${member.id}`}
              className="rounded-xl border border-sz-border p-2 text-sz-primary/60 transition hover:border-sz-interaction hover:text-sz-interaction"
              aria-label="Edit"
            >
              <Pencil className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
