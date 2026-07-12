import type { Locale, TranslationTree } from '../i18n/types'
import type {
  AdminContentBlock,
  AdminContentState,
  AdminInsight,
  AdminProject,
  AdminService,
  AdminTeamMember,
  BilingualRichText,
  BilingualText,
  PageCopyField,
} from '../admin/types/adminContent'
import type { TeamMember } from '../data/team'
import type { Service, ServiceDetail } from '../types/services'
import type { ContentBlock, InsightArticle, InlineSpan } from '../types/insights'
import type { ProjectDetail, ProjectListItem } from '../types/projectDetail'
import { getServiceBySlug } from '../data/serviceDetails'
import { getProjectBySlug } from '../data/projectDetails'
import type { HomeVisibilityState } from '../lib/homeVisibility'
import { createDefaultSiteAssets } from '../admin/siteAssets/registry'

function pickBi(value: BilingualText, locale: Locale): string {
  return locale === 'ar' ? value.ar || value.en : value.en || value.ar
}

function pickRich(value: BilingualRichText, locale: Locale): InlineSpan[] {
  const spans = locale === 'ar' ? value.ar : value.en
  return spans?.length ? spans : locale === 'ar' ? value.en : value.ar
}

function spansToPlain(spans: InlineSpan[]): string {
  return spans.map((s) => s.text).join('')
}

function setPath(tree: TranslationTree, path: string, value: string) {
  const parts = path.split('.')
  let current: TranslationTree = tree
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i]
    const next = current[key]
    if (!next || typeof next === 'string') {
      current[key] = {}
    }
    current = current[key] as TranslationTree
  }
  current[parts[parts.length - 1]] = value
}

export function pageFieldsToTree(fields: PageCopyField[], locale: Locale): TranslationTree {
  const tree: TranslationTree = {}
  for (const field of fields) {
    setPath(tree, field.path, locale === 'ar' ? field.ar : field.en)
  }
  return tree
}

export function deepMergeMessages(
  base: TranslationTree,
  overlay: TranslationTree,
): TranslationTree {
  const out: TranslationTree = { ...base }
  for (const [key, value] of Object.entries(overlay)) {
    if (typeof value === 'string') {
      out[key] = value
    } else if (value && typeof value === 'object') {
      const existing = out[key]
      out[key] = deepMergeMessages(
        existing && typeof existing === 'object' ? (existing as TranslationTree) : {},
        value,
      )
    }
  }
  return out
}

export function buildMessagesOverlay(
  content: AdminContentState,
  locale: Locale,
): TranslationTree {
  const fields = content.pageSections.flatMap((section) => section.fields)
  return pageFieldsToTree(fields, locale)
}

export function teamFromCms(members: AdminTeamMember[], locale: Locale): TeamMember[] {
  return members.map((member) => ({
    src: member.src,
    realSrc: member.realSrc,
    heroNameSize: member.heroNameSize,
    name: pickBi(member.name, locale),
    role: pickBi(member.role, locale),
    firstName: pickBi(member.firstName, locale),
    /** Hero watermark stays English in both locales */
    heroName: member.heroName.en || member.heroName.ar,
    bio: pickBi(member.bio, locale),
    aboutBio: pickBi(member.aboutBio, locale),
  }))
}

export function servicesFromCms(services: AdminService[], locale: Locale): Service[] {
  return services.map((service) => ({
    slug: service.slug,
    title: pickBi(service.title, locale),
    desc: pickBi(service.desc, locale),
    image: service.image,
    variant: service.variant,
    float: service.float,
  }))
}

export function serviceDetailFromCms(
  service: AdminService,
  locale: Locale,
): ServiceDetail {
  const fallback = getServiceBySlug(service.slug, locale)
  return {
    slug: service.slug,
    title: pickBi(service.title, locale),
    desc: pickBi(service.desc, locale),
    image: service.image,
    variant: service.variant,
    float: service.float,
    tagline: pickBi(service.tagline, locale),
    heroSummary: pickBi(service.heroSummary, locale),
    about: {
      headline: pickBi(service.aboutHeadline, locale),
      paragraphs: service.aboutParagraphs.map((p) => pickBi(p, locale)),
      outcomes: fallback?.about.outcomes ?? [],
    },
    included: fallback?.included ?? [],
    industries: fallback?.industries ?? [],
    process: fallback?.process ?? [],
    faqs: fallback?.faqs ?? [],
  }
}

export function projectListFromCms(
  projects: AdminProject[],
  locale: Locale,
): ProjectListItem[] {
  return projects.map((project) => ({
    id: project.id,
    slug: project.slug,
    client: pickBi(project.client, locale),
    field: pickBi(project.field, locale),
    industry: pickBi(project.industry, locale),
    service: project.service,
    serviceLabel: pickBi(project.serviceLabel, locale),
    summary: pickBi(project.summary, locale),
    image: project.image,
  }))
}

export function projectDetailFromCms(
  project: AdminProject,
  locale: Locale,
): ProjectDetail {
  const fallback = getProjectBySlug(project.slug, locale)
  const galleryImages =
    project.images.length > 0
      ? project.images.map((img) => ({
          src: img.src,
          alt: pickBi(img.alt, locale) || pickBi(project.client, locale),
        }))
      : undefined

  const syntheticWork = {
    type: 'branding' as const,
    title: pickBi(project.client, locale),
    primaryLogo: {
      src: project.images[0]?.src ?? project.image,
      alt: project.images[0]
        ? pickBi(project.images[0].alt, locale)
        : pickBi(project.client, locale),
    },
    logoVariants: [],
    colorPalette: [],
    typography: { display: 'Heading', body: 'Body' },
    stationery: project.images.slice(1).map((img) => ({
      src: img.src,
      alt: pickBi(img.alt, locale),
    })),
    inContext: {
      src: project.heroImage || project.image,
      alt: pickBi(project.client, locale),
    },
  } satisfies ProjectDetail['work']

  return {
    id: project.id,
    slug: project.slug,
    client: pickBi(project.client, locale),
    field: pickBi(project.field, locale),
    industry: pickBi(project.industry, locale),
    service: project.service,
    serviceLabel: pickBi(project.serviceLabel, locale) as ProjectDetail['serviceLabel'],
    summary: pickBi(project.summary, locale),
    image: project.image,
    heroImage: project.heroImage,
    year: project.year,
    outcomeLine: pickBi(project.outcomeLine, locale),
    challenge: pickBi(project.challenge, locale),
    approach: pickBi(project.approach, locale),
    result: pickBi(project.result, locale),
    deliverables: fallback?.deliverables ?? [],
    work: fallback?.work ?? syntheticWork,
    relatedSlugs: fallback?.relatedSlugs ?? [],
    galleryImages,
  }
}

function blockFromCms(block: AdminContentBlock, locale: Locale): ContentBlock {
  switch (block.type) {
    case 'paragraph': {
      const spans = pickRich(block.text, locale)
      return { type: 'paragraph', text: spansToPlain(spans), spans }
    }
    case 'heading':
      return {
        type: 'heading',
        level: block.level,
        id: block.id,
        text: pickBi(block.text, locale),
      }
    case 'pullquote':
      return {
        type: 'pullquote',
        text: pickBi(block.text, locale),
        attribution: block.attribution ? pickBi(block.attribution, locale) : undefined,
      }
    case 'stat':
      return {
        type: 'stat',
        value: block.value,
        label: pickBi(block.label, locale),
        description: block.description ? pickBi(block.description, locale) : undefined,
      }
    case 'gallery':
      return {
        type: 'gallery',
        images: block.images.map((img) => ({
          src: img.src,
          alt: pickBi(img.alt, locale),
          caption: img.caption ? pickBi(img.caption, locale) : undefined,
        })),
      }
    case 'code':
      return { type: 'code', language: block.language, code: block.code }
    case 'note': {
      const spans = pickRich(block.text, locale)
      return {
        type: 'note',
        variant: block.variant,
        title: block.title ? pickBi(block.title, locale) : undefined,
        text: spansToPlain(spans),
        spans,
      }
    }
    case 'callout': {
      const spans = pickRich(block.text, locale)
      return {
        type: 'callout',
        title: pickBi(block.title, locale),
        text: spansToPlain(spans),
        spans,
      }
    }
    case 'list': {
      const itemSpans = block.items.map((item) => pickRich(item, locale))
      return {
        type: 'list',
        ordered: block.ordered,
        items: itemSpans.map(spansToPlain),
        itemSpans,
      }
    }
    case 'image':
      return {
        type: 'image',
        src: block.src,
        alt: pickBi(block.alt, locale),
        caption: block.caption ? pickBi(block.caption, locale) : undefined,
        wide: block.wide,
      }
  }
}

export function insightFromCms(article: AdminInsight, locale: Locale): InsightArticle {
  const keywordsRaw = article.keywords ? pickBi(article.keywords, locale) : ''
  return {
    slug: article.slug,
    title: pickBi(article.title, locale),
    excerpt: pickBi(article.excerpt, locale),
    coverImage: article.coverImage,
    cardImage: article.cardImage,
    publishedAt: article.publishedAt,
    readingTimeMinutes: article.readingTimeMinutes,
    featured: article.featured,
    layout: article.layout,
    author: {
      name: pickBi(article.authorName, locale),
      role: pickBi(article.authorRole, locale),
    },
    service: pickBi(article.service, locale),
    industry: pickBi(article.industry, locale),
    topics: article.topics.map((t) => pickBi(t, locale)).filter(Boolean),
    content: article.content.map((block) => blockFromCms(block, locale)),
    metaTitle: article.metaTitle ? pickBi(article.metaTitle, locale) : undefined,
    metaDescription: article.metaDescription
      ? pickBi(article.metaDescription, locale)
      : undefined,
    keywords: keywordsRaw
      ? keywordsRaw.split(',').map((k) => k.trim()).filter(Boolean)
      : undefined,
  }
}

export function homeVisibilityFromCms(content: AdminContentState): HomeVisibilityState {
  return {
    services: Object.fromEntries(content.services.map((s) => [s.slug, Boolean(s.showOnHome)])),
    projects: Object.fromEntries(content.projects.map((p) => [p.slug, Boolean(p.showOnHome)])),
    insights: Object.fromEntries(content.insights.map((a) => [a.slug, Boolean(a.showOnHome)])),
  }
}

export function siteAssetsFromCms(content: AdminContentState): Record<string, string> {
  return {
    ...createDefaultSiteAssets(),
    ...(content.siteAssets ?? {}),
  }
}
