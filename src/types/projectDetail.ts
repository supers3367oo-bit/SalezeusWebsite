export type ProjectServiceSlug =
  | 'branding'
  | 'marketing'
  | 'social-media'
  | 'business-consulting'
  | 'web-development'
  | 'mobile-apps'

export type ProjectServiceLabel = string

export type ProjectVisual = {
  src: string
  alt: string
  aspect?: '1/1' | '4/3' | '4/5' | '9/16' | '16/9'
  caption?: string
}

export type BrandingWork = {
  type: 'branding'
  title: string
  primaryLogo: ProjectVisual
  logoVariants: ProjectVisual[]
  colorPalette: { name: string; hex: string }[]
  typography: { display: string; body: string }
  stationery: ProjectVisual[]
  inContext: ProjectVisual
}

export type MarketingWork = {
  type: 'marketing'
  title: string
  heroVisual: ProjectVisual
  keyMessage: string
  audience: string
  channels: string[]
  assets: ProjectVisual[]
}

export type SocialWork = {
  type: 'social'
  title: string
  profilePreview: ProjectVisual
  feedGrid: ProjectVisual[]
  postFormats: ProjectVisual[]
  contentPillars: { title: string; description: string }[]
  toneRules: string
}

export type ConsultingWork = {
  type: 'consulting'
  title: string
  before: string
  after: string
  frameworkSteps: { title: string; description: string }[]
  keyDecisions: string[]
}

export type WebWork = {
  type: 'web'
  title: string
  homepage: ProjectVisual
  responsivePair: { desktop: ProjectVisual; mobile: ProjectVisual }
  keyPages: ProjectVisual[]
  uxCallouts: { label: string; description: string }[]
}

export type AppsWork = {
  type: 'apps'
  title: string
  heroScreen: ProjectVisual
  keyScreens: ProjectVisual[]
  userFlow: { step: string }[]
  featureHighlights: { title: string; description: string }[]
}

export type ProjectWork =
  | BrandingWork
  | MarketingWork
  | SocialWork
  | ConsultingWork
  | WebWork
  | AppsWork

export type ProjectListItem = {
  id: number
  slug: string
  client: string
  field: string
  industry: string
  service: ProjectServiceSlug
  serviceLabel: ProjectServiceLabel
  summary: string
  image: string
}

export type ProjectDetail = ProjectListItem & {
  year: number
  heroImage: string
  outcomeLine: string
  challenge: string
  approach: string
  result: string
  deliverables: string[]
  work: ProjectWork
  relatedSlugs: string[]
  /** When set (CMS), Behance gallery uses these images as the source of truth */
  galleryImages?: ProjectVisual[]
}

export const SERVICE_SLUG_LABEL: Record<ProjectServiceSlug, ProjectServiceLabel> = {
  branding: 'Branding',
  marketing: 'Marketing',
  'social-media': 'Social Media',
  'business-consulting': 'Consulting',
  'web-development': 'Web',
  'mobile-apps': 'Apps',
}
