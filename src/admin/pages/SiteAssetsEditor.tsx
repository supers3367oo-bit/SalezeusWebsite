import { useMemo, useState } from 'react'
import { Eye, RotateCcw } from 'lucide-react'
import ImageUploadField from '../components/ImageUploadField'
import { useAdminContent } from '../content/AdminContentContext'
import {
  SITE_ASSET_GROUP_LABELS,
  SITE_ASSET_META,
  type SiteAssetGroup,
  type SiteAssetKey,
  groupSiteAssets,
} from '../siteAssets/registry'

const GROUPS: SiteAssetGroup[] = ['brand', 'home', 'about', 'clients', 'cases']

function GroupPreview({
  group,
  assets,
  isAr,
}: {
  group: SiteAssetGroup
  assets: Record<string, string>
  isAr: boolean
}) {
  const src = (key: SiteAssetKey) => assets[key] || ''

  if (group === 'brand') {
    return (
      <div className="space-y-3 p-4">
        <div className="rounded-xl bg-sz-dark px-4 py-6">
          <img
            src={src('brand.logoOnDark')}
            alt=""
            className="mx-auto h-8 w-auto object-contain"
          />
          <p className="mt-3 text-center text-[10px] text-white/40">
            {isAr ? 'على خلفية داكنة' : 'On dark'}
          </p>
        </div>
        <div className="rounded-xl border border-sz-border bg-[#f7f5f1] px-4 py-6">
          <img
            src={src('brand.logoOnLight')}
            alt=""
            className="mx-auto h-8 w-auto object-contain"
          />
          <p className="mt-3 text-center text-[10px] text-sz-primary/40">
            {isAr ? 'على خلفية فاتحة' : 'On light'}
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <img src={src('brand.logoOrb')} alt="" className="h-14 w-14 object-contain" />
          <img src={src('brand.adminMark')} alt="" className="h-14 w-14 object-contain" />
        </div>
      </div>
    )
  }

  if (group === 'home') {
    return (
      <div className="grid grid-cols-3 gap-2 p-4">
        {(['why.strategy', 'why.creative', 'why.business'] as const).map((key) => (
          <div key={key} className="overflow-hidden rounded-xl bg-sz-dark">
            <img src={src(key)} alt="" className="aspect-[3/4] w-full object-cover" />
          </div>
        ))}
      </div>
    )
  }

  if (group === 'about') {
    return (
      <div className="space-y-3 p-4">
        <img
          src={src('about.hero')}
          alt=""
          className="aspect-[16/9] w-full rounded-xl object-cover"
        />
        <div className="grid grid-cols-2 gap-2">
          <img
            src={src('about.philosophyLeft')}
            alt=""
            className="aspect-[3/4] w-full rounded-xl object-cover"
          />
          <img
            src={src('about.philosophyRight')}
            alt=""
            className="aspect-[3/4] w-full rounded-xl object-cover"
          />
        </div>
        <img
          src={src('about.map')}
          alt=""
          className="aspect-[16/9] w-full rounded-xl border border-sz-border bg-white object-contain p-2"
        />
      </div>
    )
  }

  if (group === 'clients') {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="rounded-2xl border border-sz-border bg-white p-6 shadow-sm">
          <img
            src={src('clients.volkswagen')}
            alt="Volkswagen"
            className="h-16 w-16 object-contain"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-2 p-4 sm:grid-cols-3">
      {(['cases.pandaKunefe', 'cases.arkOto', 'cases.cakeStation'] as const).map((key) => (
        <img
          key={key}
          src={src(key)}
          alt=""
          className="aspect-[16/10] w-full rounded-xl object-cover"
        />
      ))}
    </div>
  )
}

export default function SiteAssetsEditor() {
  const { content, setContent, uiLocale } = useAdminContent()
  const isAr = uiLocale === 'ar'
  const [activeGroup, setActiveGroup] = useState<SiteAssetGroup>('brand')

  const assets = content?.siteAssets ?? {}
  const groupItems = useMemo(() => groupSiteAssets(activeGroup), [activeGroup])

  if (!content) return null

  const updateAsset = (key: SiteAssetKey, next: string) => {
    setContent((prev) => ({
      ...prev,
      siteAssets: {
        ...prev.siteAssets,
        [key]: next,
      },
    }))
  }

  const resetAsset = (key: SiteAssetKey) => {
    const meta = SITE_ASSET_META.find((m) => m.key === key)
    if (!meta) return
    updateAsset(key, meta.defaultSrc)
  }

  const isCustom = (key: SiteAssetKey) => {
    const meta = SITE_ASSET_META.find((m) => m.key === key)
    const value = assets[key]
    return Boolean(meta && value && value !== meta.defaultSrc)
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h2 className="font-heading text-xl font-semibold">
          {isAr ? 'صور الموقع' : 'Site images'}
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-sz-primary/55">
          {isAr
            ? 'استبدل الصور الثابتة في الهوية والرئيسية ومن نحن مع معاينة مباشرة. احفظ لتظهر على الموقع.'
            : 'Replace static brand, home, and about images with a live preview. Save to apply on the public site.'}
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {GROUPS.map((group) => {
          const selected = group === activeGroup
          const count = groupSiteAssets(group).length
          return (
            <button
              key={group}
              type="button"
              onClick={() => setActiveGroup(group)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                selected
                  ? 'border-sz-interaction bg-sz-interaction text-white'
                  : 'border-sz-border bg-white text-sz-primary/70 hover:border-sz-interaction/40 hover:text-sz-dark'
              }`}
            >
              {isAr ? SITE_ASSET_GROUP_LABELS[group].ar : SITE_ASSET_GROUP_LABELS[group].en}
              <span className={`ms-1.5 text-[11px] ${selected ? 'text-white/70' : 'text-sz-primary/40'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(300px,400px)]">
        <div className="space-y-5">
          {groupItems.map((meta) => (
            <div
              key={meta.key}
              className="rounded-2xl border border-sz-border bg-white p-4 sm:p-5"
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-sz-dark">
                    {isAr ? meta.label.ar : meta.label.en}
                  </p>
                  <p className="mt-0.5 text-xs text-sz-primary/50">
                    {isAr ? meta.hint.ar : meta.hint.en}
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-sz-primary/35">{meta.key}</p>
                </div>
                {isCustom(meta.key) ? (
                  <button
                    type="button"
                    onClick={() => resetAsset(meta.key)}
                    className="inline-flex items-center gap-1 rounded-full border border-sz-border px-2.5 py-1 text-[11px] font-medium text-sz-primary/65 transition hover:border-sz-interaction hover:text-sz-interaction"
                  >
                    <RotateCcw className="h-3 w-3" />
                    {isAr ? 'الأصل' : 'Reset'}
                  </button>
                ) : (
                  <span className="rounded-full bg-sz-surface px-2.5 py-1 text-[11px] text-sz-primary/45">
                    {isAr ? 'افتراضي' : 'Default'}
                  </span>
                )}
              </div>
              <ImageUploadField
                label={isAr ? 'الصورة' : 'Image'}
                value={assets[meta.key] || meta.defaultSrc}
                onChange={(next) => updateAsset(meta.key, next)}
                aspect={meta.aspect}
              />
            </div>
          ))}
        </div>

        <div className="xl:sticky xl:top-24">
          <div className="overflow-hidden rounded-2xl border border-sz-border bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-sz-border bg-sz-surface/80 px-4 py-3">
              <Eye className="h-4 w-4 text-sz-interaction" />
              <div>
                <p className="text-sm font-medium text-sz-dark">
                  {isAr ? 'معاينة المجموعة' : 'Group preview'}
                </p>
                <p className="text-[11px] text-sz-primary/50">
                  {isAr
                    ? SITE_ASSET_GROUP_LABELS[activeGroup].ar
                    : SITE_ASSET_GROUP_LABELS[activeGroup].en}
                </p>
              </div>
            </div>
            <div className="bg-[#f7f5f1]">
              <GroupPreview group={activeGroup} assets={assets} isAr={isAr} />
            </div>
            <p className="border-t border-sz-border px-4 py-2 text-[11px] text-sz-primary/45">
              {isAr
                ? 'المعاينة تتحدّث فور تغيير أي صورة في هذه المجموعة'
                : 'Preview updates as soon as you change any image in this group'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
