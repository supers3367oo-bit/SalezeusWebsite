import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import BilingualField from '../components/BilingualField'
import ImageUploadField from '../components/ImageUploadField'
import ShowOnHomeToggle from '../components/ShowOnHomeToggle'
import { useAdminContent } from '../content/AdminContentContext'

export default function ServiceEditor() {
  const { slug } = useParams<{ slug: string }>()
  const { content, setContent, uiLocale } = useAdminContent()
  const isAr = uiLocale === 'ar'

  if (!content || !slug) return null
  const service = content.services.find((s) => s.slug === slug)
  if (!service) {
    return (
      <p className="text-sm text-sz-primary/60">{isAr ? 'الخدمة غير موجودة' : 'Service not found'}</p>
    )
  }

  const update = (patch: Partial<typeof service>) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.slug === slug ? { ...s, ...patch } : s)),
    }))
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        to="/admin/services"
        className="inline-flex items-center gap-1.5 text-sm text-sz-primary/60 hover:text-sz-interaction"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        {isAr ? 'الخدمات' : 'Services'}
      </Link>

      <h2 className="font-heading text-xl font-semibold">
        {isAr ? service.title.ar : service.title.en}
      </h2>

      <div className="space-y-5 rounded-2xl border border-sz-border bg-white p-5">
        <ShowOnHomeToggle
          checked={Boolean(service.showOnHome)}
          onChange={(showOnHome) => update({ showOnHome })}
          hint={
            isAr
              ? 'يظهر في قسم الحلول على الصفحة الرئيسية.'
              : 'Appears in the Our Solutions section on the home page.'
          }
        />

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Slug</span>
          <input
            className="w-full rounded-xl border border-sz-border bg-sz-surface px-3.5 py-2.5 text-sm text-sz-primary/60 outline-none"
            value={service.slug}
            disabled
            dir="ltr"
          />
        </label>

        <ImageUploadField
          label={isAr ? 'صورة الخدمة' : 'Service image'}
          value={service.image}
          onChange={(image) => update({ image })}
          aspect="wide"
        />

        <BilingualField label={isAr ? 'العنوان' : 'Title'} value={service.title} onChange={(title) => update({ title })} />
        <BilingualField
          label={isAr ? 'الشعار' : 'Tagline'}
          value={service.tagline}
          onChange={(tagline) => update({ tagline })}
        />
        <BilingualField
          label={isAr ? 'الوصف' : 'Description'}
          value={service.desc}
          multiline
          onChange={(desc) => update({ desc })}
        />
        <BilingualField
          label={isAr ? 'ملخص الهيرو' : 'Hero summary'}
          value={service.heroSummary}
          multiline
          onChange={(heroSummary) => update({ heroSummary })}
        />
        <BilingualField
          label={isAr ? 'عنوان About' : 'About headline'}
          value={service.aboutHeadline}
          multiline
          onChange={(aboutHeadline) => update({ aboutHeadline })}
        />

        {service.aboutParagraphs.map((para, index) => (
          <BilingualField
            key={index}
            label={`${isAr ? 'فقرة' : 'Paragraph'} ${index + 1}`}
            value={para}
            multiline
            rows={4}
            onChange={(next) => {
              const aboutParagraphs = service.aboutParagraphs.map((p, i) => (i === index ? next : p))
              update({ aboutParagraphs })
            }}
          />
        ))}
      </div>
    </div>
  )
}
