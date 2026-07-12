export const SERVICE_CATEGORIES = [
  'Branding',
  'Marketing',
  'Social Media',
  'Business Consulting',
  'Web Development',
  'Mobile Apps',
] as const

export const INDUSTRY_CATEGORIES = [
  'Healthcare',
  'Medical Tourism',
  'Education',
  'Tourism',
  'Restaurants',
  'Real Estate',
  'Manufacturing',
  'Technology',
  'E-commerce',
  'Fashion',
  'Startups',
] as const

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number]
export type IndustryCategory = (typeof INDUSTRY_CATEGORIES)[number]

export type ArticleLayout = 'large' | 'standard' | 'compact' | 'horizontal'

/** Inline rich text for SEO-friendly internal/external links inside prose */
export type InlineSpan =
  | { type: 'text'; text: string }
  | { type: 'link'; text: string; href: string; rel?: string }

export type ContentBlock =
  | { type: 'paragraph'; text: string; spans?: InlineSpan[] }
  | { type: 'heading'; level: 2 | 3; text: string; id: string }
  | { type: 'pullquote'; text: string; attribution?: string }
  | { type: 'stat'; value: string; label: string; description?: string }
  | {
      type: 'gallery'
      images: { src: string; alt: string; caption?: string }[]
    }
  | { type: 'code'; language: string; code: string }
  | { type: 'note'; variant: 'info' | 'tip'; title?: string; text: string; spans?: InlineSpan[] }
  | { type: 'callout'; title: string; text: string; spans?: InlineSpan[] }
  | { type: 'list'; ordered: boolean; items: string[]; itemSpans?: (InlineSpan[] | undefined)[] }
  | { type: 'image'; src: string; alt: string; caption?: string; wide?: boolean }

export type InsightArticle = {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  cardImage?: string
  publishedAt: string
  readingTimeMinutes: number
  author: { name: string; role: string }
  service: string
  industry: string
  topics: string[]
  featured?: boolean
  layout: ArticleLayout
  content: ContentBlock[]
  /** SEO: custom document title (falls back to article title) */
  metaTitle?: string
  /** SEO: meta description (falls back to excerpt) */
  metaDescription?: string
  /** SEO: target keywords for meta + schema */
  keywords?: string[]
}
