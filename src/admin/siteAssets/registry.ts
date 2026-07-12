import type { BilingualText } from '../types/adminContent'

export type SiteAssetGroup =
  | 'brand'
  | 'home'
  | 'about'
  | 'clients'
  | 'cases'

export type SiteAssetKey =
  | 'brand.logoOnDark'
  | 'brand.logoOnLight'
  | 'brand.logoOrb'
  | 'brand.adminMark'
  | 'why.strategy'
  | 'why.creative'
  | 'why.business'
  | 'about.hero'
  | 'about.philosophyLeft'
  | 'about.philosophyRight'
  | 'about.map'
  | 'clients.volkswagen'
  | 'cases.pandaKunefe'
  | 'cases.arkOto'
  | 'cases.cakeStation'

export type SiteAssetMeta = {
  key: SiteAssetKey
  group: SiteAssetGroup
  defaultSrc: string
  label: BilingualText
  hint: BilingualText
  aspect: 'square' | 'wide' | 'tall'
}

export const SITE_ASSET_GROUP_LABELS: Record<SiteAssetGroup, BilingualText> = {
  brand: { en: 'Brand & logos', ar: 'الهوية والشعارات' },
  home: { en: 'Home sections', ar: 'أقسام الرئيسية' },
  about: { en: 'About page', ar: 'صفحة من نحن' },
  clients: { en: 'Client logos', ar: 'شعارات العملاء' },
  cases: { en: 'Featured cases', ar: 'دراسات الحالة' },
}

export const SITE_ASSET_META: SiteAssetMeta[] = [
  {
    key: 'brand.logoOnDark',
    group: 'brand',
    defaultSrc: '/images/brand/logo-wordmark.png',
    label: { en: 'Logo on dark', ar: 'الشعار على خلفية داكنة' },
    hint: { en: 'Navbar / footer on dark surfaces', ar: 'النافبار والتذييل على خلفيات داكنة' },
    aspect: 'wide',
  },
  {
    key: 'brand.logoOnLight',
    group: 'brand',
    defaultSrc: '/images/brand/logo-wordmark-on-light.png',
    label: { en: 'Logo on light', ar: 'الشعار على خلفية فاتحة' },
    hint: { en: 'Used on light backgrounds', ar: 'يُستخدم على الخلفيات الفاتحة' },
    aspect: 'wide',
  },
  {
    key: 'brand.logoOrb',
    group: 'brand',
    defaultSrc: '/images/brand/logo-orb.png',
    label: { en: 'Logo orb mark', ar: 'علامة الشعار الدائرية' },
    hint: { en: 'Orb / icon mark', ar: 'أيقونة الشعار' },
    aspect: 'square',
  },
  {
    key: 'brand.adminMark',
    group: 'brand',
    defaultSrc: '/logo.png',
    label: { en: 'Admin / compact mark', ar: 'علامة الأدمن المختصرة' },
    hint: { en: 'Admin sidebar & login', ar: 'شريط الأدمن وصفحة الدخول' },
    aspect: 'square',
  },
  {
    key: 'why.strategy',
    group: 'home',
    defaultSrc: '/images/why/strategy-mobile.png',
    label: { en: 'Why — Strategy card', ar: 'لماذا — بطاقة الاستراتيجية' },
    hint: { en: 'Mobile background for Strategy First', ar: 'خلفية الموبايل لبطاقة الاستراتيجية' },
    aspect: 'tall',
  },
  {
    key: 'why.creative',
    group: 'home',
    defaultSrc: '/images/why/creative-mobile.png',
    label: { en: 'Why — Creative card', ar: 'لماذا — بطاقة الإبداع' },
    hint: { en: 'Mobile background for Creative Thinking', ar: 'خلفية الموبايل لبطاقة الإبداع' },
    aspect: 'tall',
  },
  {
    key: 'why.business',
    group: 'home',
    defaultSrc: '/images/why/business-mobile.png',
    label: { en: 'Why — Business card', ar: 'لماذا — بطاقة الأعمال' },
    hint: { en: 'Mobile background for Business Focus', ar: 'خلفية الموبايل لبطاقة الأعمال' },
    aspect: 'tall',
  },
  {
    key: 'about.hero',
    group: 'about',
    defaultSrc: '/images/about/hero-team-collab.png',
    label: { en: 'About / Services hero', ar: 'هيرو من نحن والخدمات' },
    hint: { en: 'Shared hero on About & Services', ar: 'هيرو مشترك لصفحتي من نحن والخدمات' },
    aspect: 'wide',
  },
  {
    key: 'about.philosophyLeft',
    group: 'about',
    defaultSrc: '/images/about/con1.jpeg',
    label: { en: 'Philosophy — left image', ar: 'الفلسفة — الصورة اليسرى' },
    hint: { en: 'About philosophy section', ar: 'قسم الفلسفة في من نحن' },
    aspect: 'tall',
  },
  {
    key: 'about.philosophyRight',
    group: 'about',
    defaultSrc: '/images/about/dev1.png',
    label: { en: 'Philosophy — right image', ar: 'الفلسفة — الصورة اليمنى' },
    hint: { en: 'About philosophy section', ar: 'قسم الفلسفة في من نحن' },
    aspect: 'tall',
  },
  {
    key: 'about.map',
    group: 'about',
    defaultSrc: '/images/about/map.svg',
    label: { en: 'Presence map', ar: 'خريطة التواجد' },
    hint: { en: 'About presence / map graphic', ar: 'رسم خريطة التواجد' },
    aspect: 'wide',
  },
  {
    key: 'clients.volkswagen',
    group: 'clients',
    defaultSrc: '/images/clients/volkswagen.png',
    label: { en: 'Volkswagen logo', ar: 'شعار فولكسفاغن' },
    hint: { en: 'Trusted By section', ar: 'قسم يثقون بنا' },
    aspect: 'square',
  },
  {
    key: 'cases.pandaKunefe',
    group: 'cases',
    defaultSrc: '/images/cases/panda-kunefe.png',
    label: { en: 'Case — Panda Künefe', ar: 'حالة — باندا كنافة' },
    hint: { en: 'Featured Success carousel', ar: 'كاروسيل قصص النجاح' },
    aspect: 'wide',
  },
  {
    key: 'cases.arkOto',
    group: 'cases',
    defaultSrc: '/images/cases/ark-oto.png',
    label: { en: 'Case — Ark Oto', ar: 'حالة — أرك أوتو' },
    hint: { en: 'Featured Success carousel', ar: 'كاروسيل قصص النجاح' },
    aspect: 'wide',
  },
  {
    key: 'cases.cakeStation',
    group: 'cases',
    defaultSrc: '/images/cases/cake-station.png',
    label: { en: 'Case — Cake Station', ar: 'حالة — كيك ستيشن' },
    hint: { en: 'Featured Success carousel', ar: 'كاروسيل قصص النجاح' },
    aspect: 'wide',
  },
]

export function createDefaultSiteAssets(): Record<SiteAssetKey, string> {
  const assets = {} as Record<SiteAssetKey, string>
  for (const meta of SITE_ASSET_META) {
    assets[meta.key] = meta.defaultSrc
  }
  return assets
}

export function getSiteAssetMeta(key: SiteAssetKey): SiteAssetMeta {
  const meta = SITE_ASSET_META.find((m) => m.key === key)
  if (!meta) throw new Error(`Unknown site asset: ${key}`)
  return meta
}

export function groupSiteAssets(group: SiteAssetGroup): SiteAssetMeta[] {
  return SITE_ASSET_META.filter((m) => m.group === group)
}
