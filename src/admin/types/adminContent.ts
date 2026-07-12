import type { ServiceDetail } from '../../types/services'
import type { ProjectDetail } from '../../types/projectDetail'
import type { InlineSpan, InsightArticle } from '../../types/insights'
import type { TeamMember } from '../../data/team'

export type AdminLocale = 'en' | 'ar'

export type BilingualText = {
  en: string
  ar: string
}

/** Bilingual rich prose (paragraphs, notes, list items) with optional links */
export type BilingualRichText = {
  en: InlineSpan[]
  ar: InlineSpan[]
}

export type AdminGalleryImage = {
  src: string
  alt: BilingualText
  caption?: BilingualText
}

export type AdminContentBlock =
  | { type: 'paragraph'; text: BilingualRichText }
  | { type: 'heading'; level: 2 | 3; id: string; text: BilingualText }
  | { type: 'pullquote'; text: BilingualText; attribution?: BilingualText }
  | { type: 'stat'; value: string; label: BilingualText; description?: BilingualText }
  | { type: 'gallery'; images: AdminGalleryImage[] }
  | { type: 'code'; language: string; code: string }
  | {
      type: 'note'
      variant: 'info' | 'tip'
      title?: BilingualText
      text: BilingualRichText
    }
  | { type: 'callout'; title: BilingualText; text: BilingualRichText }
  | { type: 'list'; ordered: boolean; items: BilingualRichText[] }
  | {
      type: 'image'
      src: string
      alt: BilingualText
      caption?: BilingualText
      wide?: boolean
    }

export type AdminTeamMember = {
  id: string
  src: string
  realSrc: string
  heroNameSize?: 'compact'
  name: BilingualText
  role: BilingualText
  firstName: BilingualText
  heroName: BilingualText
  bio: BilingualText
  aboutBio: BilingualText
}

export type AdminService = {
  slug: string
  image: string
  variant: ServiceDetail['variant']
  float: number
  /** When true, appears in home Our Solutions */
  showOnHome: boolean
  title: BilingualText
  tagline: BilingualText
  desc: BilingualText
  heroSummary: BilingualText
  aboutHeadline: BilingualText
  aboutParagraphs: BilingualText[]
}

export type AdminProjectImage = {
  id: string
  src: string
  alt: BilingualText
}

export type AdminProject = {
  id: number
  slug: string
  image: string
  heroImage: string
  /** Gallery images for the project case study */
  images: AdminProjectImage[]
  year: number
  service: ProjectDetail['service']
  /** When true, eligible for home Portfolio Preview */
  showOnHome: boolean
  client: BilingualText
  field: BilingualText
  industry: BilingualText
  serviceLabel: BilingualText
  summary: BilingualText
  outcomeLine: BilingualText
  challenge: BilingualText
  approach: BilingualText
  result: BilingualText
}

export type AdminInsight = {
  slug: string
  coverImage: string
  cardImage?: string
  publishedAt: string
  readingTimeMinutes: number
  featured?: boolean
  /** When true, eligible for home Latest Insights */
  showOnHome: boolean
  layout: InsightArticle['layout']
  title: BilingualText
  excerpt: BilingualText
  authorName: BilingualText
  authorRole: BilingualText
  service: BilingualText
  industry: BilingualText
  topics: BilingualText[]
  content: AdminContentBlock[]
  metaTitle?: BilingualText
  metaDescription?: BilingualText
  keywords?: BilingualText
}

export type AdminContact = {
  email: string
  whatsappPhone: string
  offices: {
    id: string
    label: BilingualText
    phoneE164: string
    phoneDisplay: string
  }[]
}

/** Flat editable string leaves from i18n trees */
export type PageCopyField = {
  path: string
  label: string
  en: string
  ar: string
  multiline?: boolean
}

export type PageCopySection = {
  key: string
  label: string
  fields: PageCopyField[]
}

/** Static chrome images editable in admin (paths or data URLs) */
export type AdminSiteAssets = Record<string, string>

export type AdminContentState = {
  team: AdminTeamMember[]
  services: AdminService[]
  projects: AdminProject[]
  insights: AdminInsight[]
  contact: AdminContact
  pageSections: PageCopySection[]
  siteAssets: AdminSiteAssets
}

export type { TeamMember, ServiceDetail, ProjectDetail, InsightArticle }
