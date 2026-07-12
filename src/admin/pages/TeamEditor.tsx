import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import BilingualField from '../components/BilingualField'
import ImageUploadField from '../components/ImageUploadField'
import { useAdminContent } from '../content/AdminContentContext'

export default function TeamEditor() {
  const { id } = useParams<{ id: string }>()
  const { content, setContent, uiLocale } = useAdminContent()
  const isAr = uiLocale === 'ar'

  if (!content || !id) return null
  const member = content.team.find((m) => m.id === id)
  if (!member) {
    return (
      <p className="text-sm text-sz-primary/60">{isAr ? 'العضو غير موجود' : 'Member not found'}</p>
    )
  }

  const update = (patch: Partial<typeof member>) => {
    setContent((prev) => ({
      ...prev,
      team: prev.team.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    }))
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        to="/admin/team"
        className="inline-flex items-center gap-1.5 text-sm text-sz-primary/60 hover:text-sz-interaction"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        {isAr ? 'الفريق' : 'Team'}
      </Link>

      <div>
        <h2 className="font-heading text-xl font-semibold">
          {isAr ? member.name.ar : member.name.en}
        </h2>
        <p className="text-sm text-sz-primary/55">{isAr ? member.role.ar : member.role.en}</p>
      </div>

      <div className="space-y-5 rounded-2xl border border-sz-border bg-white p-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <ImageUploadField
            label={isAr ? 'الصورة ثلاثية الأبعاد' : '3D avatar'}
            value={member.src}
            onChange={(src) => update({ src })}
            aspect="square"
          />
          <ImageUploadField
            label={isAr ? 'الصورة الحقيقية' : 'Real photo'}
            value={member.realSrc}
            onChange={(realSrc) => update({ realSrc })}
            aspect="square"
          />
        </div>

        <BilingualField label={isAr ? 'الاسم' : 'Name'} value={member.name} onChange={(name) => update({ name })} />
        <BilingualField label={isAr ? 'الدور' : 'Role'} value={member.role} onChange={(role) => update({ role })} />
        <BilingualField
          label={isAr ? 'الاسم الأول' : 'First name'}
          value={member.firstName}
          onChange={(firstName) => update({ firstName })}
        />
        <BilingualField
          label={isAr ? 'اسم الوترمارك' : 'Hero watermark name'}
          value={member.heroName}
          onChange={(heroName) => update({ heroName })}
        />
        <BilingualField
          label={isAr ? 'نبذة قصيرة' : 'Short bio'}
          value={member.bio}
          multiline
          onChange={(bio) => update({ bio })}
        />
        <BilingualField
          label={isAr ? 'نبذة About' : 'About bio'}
          value={member.aboutBio}
          multiline
          rows={5}
          onChange={(aboutBio) => update({ aboutBio })}
        />
      </div>
    </div>
  )
}
