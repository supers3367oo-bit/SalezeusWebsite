import type { ReactNode } from 'react'
import { Eye, Languages } from 'lucide-react'
import type { PageCopyField } from '../types/adminContent'
import type { Locale } from '../../i18n/types'
import { fieldValue, getRootLabel } from '../utils/pageCopy'

type Props = {
  root: string
  fields: PageCopyField[]
  previewLocale: Locale
  onPreviewLocaleChange: (locale: Locale) => void
  isArUi: boolean
}

function v(fields: PageCopyField[], path: string, locale: Locale) {
  return fieldValue(fields, path, locale)
}

function PreviewChrome({
  root,
  previewLocale,
  onPreviewLocaleChange,
  isArUi,
  children,
  dark = false,
}: {
  root: string
  previewLocale: Locale
  onPreviewLocaleChange: (locale: Locale) => void
  isArUi: boolean
  children: ReactNode
  dark?: boolean
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-sz-border bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-sz-border bg-sz-surface/80 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <Eye className="h-4 w-4 shrink-0 text-sz-interaction" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-sz-dark">
              {isArUi ? 'معاينة القسم' : 'Section preview'}
            </p>
            <p className="truncate text-[11px] text-sz-primary/50">
              {getRootLabel(root, isArUi ? 'ar' : 'en')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-sz-border bg-white p-0.5">
          <button
            type="button"
            onClick={() => onPreviewLocaleChange('en')}
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
              previewLocale === 'en'
                ? 'bg-sz-interaction text-white'
                : 'text-sz-primary/55 hover:text-sz-dark'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => onPreviewLocaleChange('ar')}
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
              previewLocale === 'ar'
                ? 'bg-sz-accent text-sz-dark'
                : 'text-sz-primary/55 hover:text-sz-dark'
            }`}
          >
            AR
          </button>
        </div>
      </div>
      <div
        className={`relative max-h-[min(70vh,640px)] overflow-y-auto ${dark ? 'bg-sz-dark' : 'bg-[#f7f5f1]'}`}
        dir={previewLocale === 'ar' ? 'rtl' : 'ltr'}
        lang={previewLocale}
      >
        {children}
      </div>
      <div className="flex items-center gap-2 border-t border-sz-border bg-sz-surface/60 px-4 py-2 text-[11px] text-sz-primary/45">
        <Languages className="h-3.5 w-3.5" />
        {isArUi
          ? 'تتحدّث المعاينة مباشرة مع تعديل الحقول'
          : 'Preview updates live as you edit fields'}
      </div>
    </div>
  )
}

function LabelTag({ children }: { children: ReactNode }) {
  return (
    <span className="mb-2 inline-block text-[10px] font-semibold uppercase tracking-[0.18em] text-sz-interaction">
      {children}
    </span>
  )
}

function CtaPill({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-[11px] font-semibold ${
        light
          ? 'border border-white/25 bg-white/10 text-white'
          : 'bg-sz-interaction text-white'
      }`}
    >
      {children}
    </span>
  )
}

function HeroPreview({ fields, locale }: { fields: PageCopyField[]; locale: Locale }) {
  return (
    <div className="relative flex min-h-[280px] flex-col justify-end overflow-hidden bg-gradient-to-br from-[#eef1f7] via-[#f7f5f1] to-[#e8e4de] p-6">
      <div className="pointer-events-none absolute inset-x-8 bottom-0 top-10 rounded-t-2xl bg-gradient-to-t from-sz-dark/10 to-transparent" />
      <div className="relative z-10 space-y-3">
        <p className="font-heading text-2xl font-bold tracking-tight text-sz-dark sm:text-3xl">
          {v(fields, 'hero.ourTeam', locale) || '—'}
        </p>
        <CtaPill>{v(fields, 'hero.explore', locale) || '—'}</CtaPill>
      </div>
    </div>
  )
}

function TrustedByPreview({ fields, locale }: { fields: PageCopyField[]; locale: Locale }) {
  const industries = fields
    .filter((f) => f.path.startsWith('trustedBy.industries.'))
    .slice(0, 6)
    .map((f) => (locale === 'ar' ? f.ar : f.en))

  return (
    <div className="space-y-4 p-6">
      <LabelTag>{v(fields, 'trustedBy.label', locale)}</LabelTag>
      <h3 className="font-heading text-xl font-semibold leading-snug text-sz-dark">
        {v(fields, 'trustedBy.title', locale)}
      </h3>
      <p className="text-sm leading-relaxed text-sz-secondary">
        {v(fields, 'trustedBy.subtitle', locale)}
      </p>
      <div className="flex flex-wrap gap-2 pt-1">
        {industries.map((label) => (
          <span
            key={label}
            className="rounded-lg border border-sz-border bg-white px-2.5 py-1 text-[11px] text-sz-primary/70"
          >
            {label}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-sz-border/70 pt-4 text-xs text-sz-primary/55">
        <span>
          {v(fields, 'trustedBy.stats.clients', locale)} · {v(fields, 'trustedBy.stats.industries', locale)}
        </span>
        <CtaPill>{v(fields, 'trustedBy.cta', locale)}</CtaPill>
      </div>
    </div>
  )
}

function ImpactPreview({ fields, locale }: { fields: PageCopyField[]; locale: Locale }) {
  const keys = ['experience', 'projects', 'clients', 'countries'] as const
  return (
    <div className="space-y-4 bg-sz-dark p-6 text-white">
      <LabelTag>
        <span className="text-white/50">{v(fields, 'impact.label', locale)}</span>
      </LabelTag>
      <h3 className="font-heading text-xl font-semibold">{v(fields, 'impact.title', locale)}</h3>
      <p className="text-sm text-white/55">{v(fields, 'impact.subtitle', locale)}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {keys.map((key) => (
          <div key={key} className="rounded-xl bg-white/[0.06] p-3">
            <p className="font-heading text-2xl font-bold tabular-nums">—</p>
            <p className="mt-1 text-sm font-medium text-white/90">
              {v(fields, `impact.stats.${key}.label`, locale)}
            </p>
            <p className="mt-0.5 text-[11px] text-white/45">
              {v(fields, `impact.stats.${key}.desc`, locale)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SolutionsPreview({ fields, locale }: { fields: PageCopyField[]; locale: Locale }) {
  return (
    <div className="space-y-3 p-6">
      <LabelTag>{v(fields, 'solutions.label', locale)}</LabelTag>
      <h3 className="font-heading text-2xl font-semibold leading-tight text-sz-dark">
        <span className="block">{v(fields, 'solutions.titleLine1', locale)}</span>
        <span className="block text-sz-interaction">{v(fields, 'solutions.titleLine2', locale)}</span>
      </h3>
      <p className="text-sm leading-relaxed text-sz-secondary">
        {v(fields, 'solutions.subtitle', locale)}
      </p>
      <div className="grid grid-cols-3 gap-2 pt-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="aspect-[4/3] rounded-xl border border-sz-border bg-gradient-to-br from-white to-[#ebe7e0]"
          />
        ))}
      </div>
    </div>
  )
}

function ReviewsPreview({ fields, locale }: { fields: PageCopyField[]; locale: Locale }) {
  const quotes = fields
    .filter((f) => f.path.startsWith('reviews.items.') && f.path.endsWith('.quote'))
    .slice(0, 3)

  return (
    <div className="space-y-4 p-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <LabelTag>{v(fields, 'reviews.label', locale)}</LabelTag>
          <h3 className="font-heading text-xl font-semibold text-sz-dark">
            {v(fields, 'reviews.title', locale)}
          </h3>
        </div>
        <span className="text-xs font-medium text-sz-accent">{v(fields, 'reviews.average', locale)}</span>
      </div>
      <div className="space-y-2">
        {quotes.map((q) => (
          <blockquote
            key={q.path}
            className="rounded-xl border border-sz-border bg-white p-3 text-sm leading-relaxed text-sz-secondary"
          >
            “{locale === 'ar' ? q.ar : q.en}”
          </blockquote>
        ))}
      </div>
    </div>
  )
}

function FeaturedPreview({ fields, locale }: { fields: PageCopyField[]; locale: Locale }) {
  return (
    <div className="space-y-3 p-6">
      <LabelTag>{v(fields, 'featured.label', locale)}</LabelTag>
      <h3 className="font-heading text-xl font-semibold text-sz-dark">
        {v(fields, 'featured.title', locale)}
      </h3>
      <p className="text-sm text-sz-secondary">{v(fields, 'featured.subtitle', locale)}</p>
      <div className="mt-2 overflow-hidden rounded-xl bg-sz-dark p-4 text-white">
        <p className="text-[10px] uppercase tracking-widest text-white/40">
          {v(fields, 'featuredSuccess.caseStudies', locale)}
        </p>
        <p className="mt-2 font-heading text-lg font-semibold leading-snug">
          {v(fields, 'featuredSuccess.archiveLine1', locale)}{' '}
          {v(fields, 'featuredSuccess.archiveLine2', locale)}
        </p>
        <p className="mt-1 text-xs text-white/50">{v(fields, 'featuredSuccess.archiveByline', locale)}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <CtaPill light>{v(fields, 'featuredSuccess.ctaWorkTogether', locale)}</CtaPill>
          <CtaPill light>{v(fields, 'featured.viewCase', locale)}</CtaPill>
        </div>
      </div>
    </div>
  )
}

function FeaturedSuccessPreview({ fields, locale }: { fields: PageCopyField[]; locale: Locale }) {
  return (
    <div className="space-y-4 bg-sz-dark p-6 text-white">
      <p className="text-[10px] uppercase tracking-widest text-white/40">
        {v(fields, 'featuredSuccess.caseStudies', locale)}
      </p>
      <h3 className="font-heading text-2xl font-semibold leading-tight">
        {v(fields, 'featuredSuccess.archiveHeading', locale) || (
          <>
            {v(fields, 'featuredSuccess.archiveLine1', locale)}
            <br />
            {v(fields, 'featuredSuccess.archiveLine2', locale)}
          </>
        )}
      </h3>
      <p className="text-sm text-white/55">{v(fields, 'featuredSuccess.archiveSubtitle', locale)}</p>
      <div className="flex flex-wrap gap-2 pt-2">
        <CtaPill light>{v(fields, 'featuredSuccess.ctaExploreWork', locale)}</CtaPill>
        <CtaPill light>{v(fields, 'featuredSuccess.viewWork', locale)}</CtaPill>
      </div>
    </div>
  )
}

function PortfolioPreviewMock({ fields, locale }: { fields: PageCopyField[]; locale: Locale }) {
  return (
    <div className="space-y-3 p-6">
      <LabelTag>{v(fields, 'portfolio.label', locale)}</LabelTag>
      <h3 className="font-heading text-xl font-semibold text-sz-dark">
        {v(fields, 'portfolio.previewTitle', locale) || v(fields, 'portfolio.title', locale)}
      </h3>
      <p className="text-sm text-sz-secondary">{v(fields, 'portfolio.subtitle', locale)}</p>
      <div className="grid grid-cols-2 gap-2 pt-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="aspect-[4/3] rounded-xl bg-gradient-to-br from-[#d9d4cb] to-[#c5bfb4]"
          />
        ))}
      </div>
      <CtaPill>{v(fields, 'portfolio.viewAll', locale)}</CtaPill>
    </div>
  )
}

function WhyPreview({ fields, locale }: { fields: PageCopyField[]; locale: Locale }) {
  const cards = [
    { key: 'strategy', dark: true },
    { key: 'creative', dark: false },
    { key: 'business', dark: true },
  ] as const

  return (
    <div className="space-y-4 p-6">
      <LabelTag>{v(fields, 'why.label', locale)}</LabelTag>
      <h3 className="font-heading text-xl font-semibold text-sz-dark">
        {v(fields, 'why.title', locale)}
      </h3>
      <p className="text-sm text-sz-secondary">{v(fields, 'why.subtitle', locale)}</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.key}
            className={`rounded-xl p-3 ${card.dark ? 'bg-sz-dark text-white' : 'bg-[#ece8e1] text-sz-dark'}`}
          >
            <p className="font-heading text-sm font-semibold leading-tight">
              {v(fields, `why.cards.${card.key}.title1`, locale)}
              <br />
              {v(fields, `why.cards.${card.key}.title2`, locale)}
            </p>
            <p className={`mt-2 text-[11px] leading-relaxed ${card.dark ? 'text-white/55' : 'text-sz-secondary'}`}>
              {v(fields, `why.cards.${card.key}.footnote`, locale)}
            </p>
          </div>
        ))}
      </div>
      <p className="text-xs leading-relaxed text-sz-secondary">{v(fields, 'why.closing', locale)}</p>
      <CtaPill>{v(fields, 'why.cta', locale)}</CtaPill>
    </div>
  )
}

function InsightsPreview({ fields, locale }: { fields: PageCopyField[]; locale: Locale }) {
  return (
    <div className="space-y-3 p-6">
      <LabelTag>{v(fields, 'insights.label', locale)}</LabelTag>
      <h3 className="font-heading text-xl font-semibold text-sz-dark">
        {v(fields, 'insights.title', locale)}
      </h3>
      <p className="text-sm text-sz-secondary">{v(fields, 'insights.subtitle', locale)}</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-sz-border bg-white">
            <div className="aspect-[16/10] bg-gradient-to-br from-[#dfe3ec] to-[#cfd6e4]" />
            <div className="p-2.5">
              <div className="h-2 w-[75%] rounded bg-sz-border" />
              <p className="mt-2 text-[10px] font-medium text-sz-interaction">
                {v(fields, 'insights.readMore', locale)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <CtaPill>{v(fields, 'insights.viewAll', locale)}</CtaPill>
    </div>
  )
}

function FaqPreview({ fields, locale }: { fields: PageCopyField[]; locale: Locale }) {
  const items = [1, 2, 3].map((n) => ({
    q: v(fields, `faq.items.q${n}.q`, locale),
    a: v(fields, `faq.items.q${n}.a`, locale),
  }))

  return (
    <div className="grid gap-4 p-6 sm:grid-cols-5">
      <div className="sm:col-span-2">
        <LabelTag>{v(fields, 'faq.label', locale)}</LabelTag>
        <h3 className="font-heading text-xl font-semibold leading-tight text-sz-dark">
          {v(fields, 'faq.titleLine1', locale)}
          <br />
          {v(fields, 'faq.titleLine2', locale)}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-sz-secondary">
          {v(fields, 'faq.subtitle', locale)}
        </p>
        <div className="mt-3">
          <CtaPill>{v(fields, 'faq.cta', locale)}</CtaPill>
        </div>
      </div>
      <div className="divide-y divide-sz-border sm:col-span-3">
        {items.map((item) => (
          <div key={item.q} className="py-2.5">
            <p className="text-sm font-medium text-sz-dark">{item.q}</p>
            <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-sz-secondary">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ClosingPreview({ fields, locale }: { fields: PageCopyField[]; locale: Locale }) {
  return (
    <div className="relative flex min-h-[260px] flex-col items-center justify-center bg-sz-dark px-6 py-10 text-center text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(50,88,164,0.35) 0%, transparent 65%)',
        }}
      />
      <div className="relative z-10 space-y-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
          {v(fields, 'closing.label', locale)}
        </p>
        <h3 className="font-heading text-2xl font-bold leading-tight sm:text-3xl">
          {v(fields, 'closing.title', locale)}
        </h3>
        <p className="mx-auto max-w-sm text-sm text-white/60">{v(fields, 'closing.subtitle', locale)}</p>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <CtaPill>{v(fields, 'closing.startConversation', locale)}</CtaPill>
          <CtaPill light>{v(fields, 'closing.viewWork', locale)}</CtaPill>
        </div>
      </div>
    </div>
  )
}

function GenericPreview({
  root,
  fields,
  locale,
}: {
  root: string
  fields: PageCopyField[]
  locale: Locale
}) {
  const rootFields = fields.filter(
    (f) => f.path === root || f.path.startsWith(`${root}.`),
  )
  const highlight = rootFields.slice(0, 8)

  return (
    <div className="space-y-3 p-6">
      <LabelTag>{getRootLabel(root, locale)}</LabelTag>
      <div className="space-y-2.5">
        {highlight.map((field) => {
          const text = locale === 'ar' ? field.ar : field.en
          const shortLabel = field.path.replace(`${root}.`, '')
          return (
            <div key={field.path} className="rounded-xl border border-sz-border bg-white px-3 py-2.5">
              <p className="mb-1 font-mono text-[10px] text-sz-primary/35">{shortLabel}</p>
              <p
                className={`text-sm leading-relaxed text-sz-dark ${field.multiline ? 'line-clamp-3' : 'line-clamp-2'}`}
              >
                {text || '—'}
              </p>
            </div>
          )
        })}
      </div>
      {rootFields.length > highlight.length ? (
        <p className="text-[11px] text-sz-primary/45">
          +{rootFields.length - highlight.length} more fields in this section
        </p>
      ) : null}
    </div>
  )
}

function PreviewBody({
  root,
  fields,
  locale,
}: {
  root: string
  fields: PageCopyField[]
  locale: Locale
}) {
  switch (root) {
    case 'hero':
      return <HeroPreview fields={fields} locale={locale} />
    case 'trustedBy':
      return <TrustedByPreview fields={fields} locale={locale} />
    case 'impact':
      return <ImpactPreview fields={fields} locale={locale} />
    case 'solutions':
      return <SolutionsPreview fields={fields} locale={locale} />
    case 'reviews':
      return <ReviewsPreview fields={fields} locale={locale} />
    case 'featured':
      return <FeaturedPreview fields={fields} locale={locale} />
    case 'featuredSuccess':
      return <FeaturedSuccessPreview fields={fields} locale={locale} />
    case 'portfolio':
      return <PortfolioPreviewMock fields={fields} locale={locale} />
    case 'why':
      return <WhyPreview fields={fields} locale={locale} />
    case 'insights':
      return <InsightsPreview fields={fields} locale={locale} />
    case 'faq':
      return <FaqPreview fields={fields} locale={locale} />
    case 'closing':
      return <ClosingPreview fields={fields} locale={locale} />
    default:
      return <GenericPreview root={root} fields={fields} locale={locale} />
  }
}

export default function PageSectionPreview({
  root,
  fields,
  previewLocale,
  onPreviewLocaleChange,
  isArUi,
}: Props) {
  const dark = root === 'impact' || root === 'closing' || root === 'featuredSuccess'

  return (
    <PreviewChrome
      root={root}
      previewLocale={previewLocale}
      onPreviewLocaleChange={onPreviewLocaleChange}
      isArUi={isArUi}
      dark={dark}
    >
      <PreviewBody root={root} fields={fields} locale={previewLocale} />
    </PreviewChrome>
  )
}
