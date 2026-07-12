import type { PageCopyField } from '../types/adminContent'
import type { Locale } from '../../i18n/types'

export type PageCopyRootGroup = {
  root: string
  fields: PageCopyField[]
}

const ROOT_LABELS: Record<string, { en: string; ar: string }> = {
  nav: { en: 'Navigation', ar: 'القائمة' },
  floating: { en: 'Floating actions', ar: 'الأزرار العائمة' },
  hero: { en: 'Hero', ar: 'الهيرو' },
  trustedBy: { en: 'Trusted By', ar: 'يثقون بنا' },
  impact: { en: 'Impact numbers', ar: 'أرقام الأثر' },
  solutions: { en: 'Our solutions', ar: 'حلولنا' },
  reviews: { en: 'Client reviews', ar: 'آراء العملاء' },
  featured: { en: 'Featured success', ar: 'قصص النجاح' },
  featuredSuccess: { en: 'Featured UI copy', ar: 'نصوص واجهة النجاح' },
  portfolio: { en: 'Portfolio preview', ar: 'معاينة المعرض' },
  why: { en: 'Why Salezeus', ar: 'لماذا سيلزيوس' },
  insights: { en: 'Latest insights', ar: 'أحدث المقالات' },
  faq: { en: 'FAQ', ar: 'الأسئلة الشائعة' },
  closing: { en: 'Closing CTA', ar: 'الختام' },
  experience: { en: 'About experience', ar: 'تجربة من نحن' },
  services: { en: 'Services', ar: 'الخدمات' },
  serviceDetail: { en: 'Service detail', ar: 'تفاصيل الخدمة' },
  portfolioPage: { en: 'Portfolio page', ar: 'صفحة المعرض' },
  insightsPage: { en: 'Insights page', ar: 'صفحة المقالات' },
  contact: { en: 'Contact', ar: 'التواصل' },
  footer: { en: 'Footer', ar: 'التذييل' },
  common: { en: 'Common', ar: 'عام' },
  errors: { en: 'Errors', ar: 'الأخطاء' },
}

export function getRootLabel(root: string, locale: Locale): string {
  const entry = ROOT_LABELS[root]
  if (!entry) return root
  return locale === 'ar' ? entry.ar : entry.en
}

export function groupFieldsByRoot(fields: PageCopyField[]): PageCopyRootGroup[] {
  const order: string[] = []
  const map = new Map<string, PageCopyField[]>()

  for (const field of fields) {
    const root = field.path.split('.')[0] || field.path
    if (!map.has(root)) {
      map.set(root, [])
      order.push(root)
    }
    map.get(root)!.push(field)
  }

  return order.map((root) => ({
    root,
    fields: map.get(root)!,
  }))
}

export function fieldValue(
  fields: PageCopyField[],
  path: string,
  locale: Locale,
): string {
  const field = fields.find((f) => f.path === path)
  if (!field) return ''
  return locale === 'ar' ? field.ar : field.en
}

export function fieldsStartingWith(
  fields: PageCopyField[],
  prefix: string,
): PageCopyField[] {
  return fields.filter(
    (f) => f.path === prefix || f.path.startsWith(`${prefix}.`),
  )
}
