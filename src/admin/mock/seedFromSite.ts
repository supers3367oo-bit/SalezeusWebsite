import { TEAM } from '../../data/team'
import { TEAM_AR } from '../../data/localized/team.ar'
import { SERVICE_DETAILS } from '../../data/serviceDetails'
import { SERVICE_DETAILS_AR } from '../../data/localized/serviceDetails.ar'
import { PROJECT_DETAILS } from '../../data/projectDetails'
import { PROJECT_DETAILS_AR } from '../../data/localized/projectDetails.ar'
import { INSIGHT_ARTICLES } from '../../data/insights'
import { INSIGHT_ARTICLES_AR } from '../../data/localized/insights.ar'
import { CONTACT_EMAIL, CONTACT_OFFICES } from '../../data/contact'
import { en } from '../../i18n/en'
import { ar } from '../../i18n/ar'
import type {
  AdminContentBlock,
  AdminContentState,
  AdminInsight,
  AdminProject,
  AdminProjectImage,
  AdminService,
  AdminTeamMember,
  BilingualText,
  PageCopyField,
  PageCopySection,
} from '../types/adminContent'
import type { ContentBlock } from '../../types/insights'
import type { ProjectDetail, ProjectVisual } from '../../types/projectDetail'
import { bi, rich } from '../utils/richText'
import { createDefaultSiteAssets } from '../siteAssets/registry'

function pushVisual(list: ProjectVisual[], visual: ProjectVisual | undefined) {
  if (visual?.src) list.push(visual)
}

function collectProjectVisuals(project: ProjectDetail): ProjectVisual[] {
  const visuals: ProjectVisual[] = []
  const { work } = project

  if (work.type === 'branding') {
    pushVisual(visuals, work.primaryLogo)
    work.logoVariants.forEach((v) => pushVisual(visuals, v))
    work.stationery.forEach((v) => pushVisual(visuals, v))
    pushVisual(visuals, work.inContext)
  } else if (work.type === 'marketing') {
    pushVisual(visuals, work.heroVisual)
    work.assets.forEach((v) => pushVisual(visuals, v))
  } else if (work.type === 'social') {
    pushVisual(visuals, work.profilePreview)
    work.feedGrid.forEach((v) => pushVisual(visuals, v))
    work.postFormats.forEach((v) => pushVisual(visuals, v))
  } else if (work.type === 'web') {
    pushVisual(visuals, work.homepage)
    pushVisual(visuals, work.responsivePair.desktop)
    pushVisual(visuals, work.responsivePair.mobile)
    work.keyPages.forEach((v) => pushVisual(visuals, v))
  } else if (work.type === 'apps') {
    pushVisual(visuals, work.heroScreen)
    work.keyScreens.forEach((v) => pushVisual(visuals, v))
  }

  const seen = new Set<string>()
  return visuals.filter((v) => {
    if (seen.has(v.src)) return false
    seen.add(v.src)
    return true
  })
}

function seedProjectImages(project: ProjectDetail, arProject: ProjectDetail): AdminProjectImage[] {
  const enVisuals = collectProjectVisuals(project)
  const arVisuals = collectProjectVisuals(arProject)
  const fallback: ProjectVisual[] =
    enVisuals.length > 0
      ? enVisuals
      : [{ src: project.image, alt: project.client }]

  return fallback.map((visual, index) => {
    const arVisual = arVisuals[index]
    return {
      id: `${project.slug}-img-${index}`,
      src: visual.src,
      alt: bi(visual.alt || project.client, arVisual?.alt || arProject.client),
    }
  })
}

function seedTeam(): AdminTeamMember[] {
  return TEAM.map((member, index) => {
    const arMember = TEAM_AR[index] ?? member
    return {
      id: `member-${index}`,
      src: member.src,
      realSrc: member.realSrc,
      heroNameSize: member.heroNameSize,
      name: bi(member.name, arMember.name),
      role: bi(member.role, arMember.role),
      firstName: bi(member.firstName, arMember.firstName),
      heroName: bi(member.heroName, arMember.heroName),
      bio: bi(member.bio, arMember.bio),
      aboutBio: bi(member.aboutBio, arMember.aboutBio),
    }
  })
}

function seedServices(): AdminService[] {
  return SERVICE_DETAILS.map((service) => {
    const arService = SERVICE_DETAILS_AR.find((s) => s.slug === service.slug) ?? service
    const paragraphs = service.about.paragraphs.map((p, i) =>
      bi(p, arService.about.paragraphs[i] ?? p),
    )
    return {
      slug: service.slug,
      image: service.image,
      variant: service.variant,
      float: service.float,
      showOnHome: true,
      title: bi(service.title, arService.title),
      tagline: bi(service.tagline, arService.tagline),
      desc: bi(service.desc, arService.desc),
      heroSummary: bi(service.heroSummary, arService.heroSummary),
      aboutHeadline: bi(service.about.headline, arService.about.headline),
      aboutParagraphs: paragraphs,
    }
  })
}

function seedProjects(): AdminProject[] {
  return PROJECT_DETAILS.map((project, index) => {
    const arProject = PROJECT_DETAILS_AR.find((p) => p.slug === project.slug) ?? project
    return {
      id: project.id,
      slug: project.slug,
      image: project.image,
      heroImage: project.heroImage,
      images: seedProjectImages(project, arProject),
      year: project.year,
      service: project.service,
      showOnHome: index < 4,
      client: bi(project.client, arProject.client),
      field: bi(project.field, arProject.field),
      industry: bi(project.industry, arProject.industry),
      serviceLabel: bi(project.serviceLabel, arProject.serviceLabel),
      summary: bi(project.summary, arProject.summary),
      outcomeLine: bi(project.outcomeLine, arProject.outcomeLine),
      challenge: bi(project.challenge, arProject.challenge),
      approach: bi(project.approach, arProject.approach),
      result: bi(project.result, arProject.result),
    }
  })
}

function seedContentBlocks(
  enBlocks: ContentBlock[],
  arBlocks: ContentBlock[],
): AdminContentBlock[] {
  const length = Math.max(enBlocks.length, arBlocks.length)
  const result: AdminContentBlock[] = []

  for (let i = 0; i < length; i++) {
    const en = enBlocks[i]
    const ar = arBlocks[i] ?? en
    if (!en) continue

    switch (en.type) {
      case 'paragraph': {
        const arText = ar.type === 'paragraph' ? ar.text : en.text
        result.push({ type: 'paragraph', text: rich(en.text, arText) })
        break
      }
      case 'heading': {
        const arText = ar.type === 'heading' ? ar.text : en.text
        result.push({
          type: 'heading',
          level: en.level,
          id: en.id,
          text: bi(en.text, arText),
        })
        break
      }
      case 'pullquote': {
        const arBlock = ar.type === 'pullquote' ? ar : en
        result.push({
          type: 'pullquote',
          text: bi(en.text, arBlock.text),
          attribution:
            en.attribution || arBlock.attribution
              ? bi(en.attribution ?? '', arBlock.attribution ?? en.attribution ?? '')
              : undefined,
        })
        break
      }
      case 'stat': {
        const arBlock = ar.type === 'stat' ? ar : en
        result.push({
          type: 'stat',
          value: en.value,
          label: bi(en.label, arBlock.label),
          description:
            en.description || arBlock.description
              ? bi(en.description ?? '', arBlock.description ?? en.description ?? '')
              : undefined,
        })
        break
      }
      case 'gallery': {
        const arBlock = ar.type === 'gallery' ? ar : en
        result.push({
          type: 'gallery',
          images: en.images.map((image, imgIndex) => {
            const arImage = arBlock.images[imgIndex]
            return {
              src: image.src,
              alt: bi(image.alt, arImage?.alt ?? image.alt),
              caption:
                image.caption || arImage?.caption
                  ? bi(image.caption ?? '', arImage?.caption ?? image.caption ?? '')
                  : undefined,
            }
          }),
        })
        break
      }
      case 'code':
        result.push({ type: 'code', language: en.language, code: en.code })
        break
      case 'note': {
        const arBlock = ar.type === 'note' ? ar : en
        result.push({
          type: 'note',
          variant: en.variant,
          title:
            en.title || arBlock.title
              ? bi(en.title ?? '', arBlock.title ?? en.title ?? '')
              : undefined,
          text: rich(en.text, arBlock.text),
        })
        break
      }
      case 'callout': {
        const arBlock = ar.type === 'callout' ? ar : en
        result.push({
          type: 'callout',
          title: bi(en.title, arBlock.title),
          text: rich(en.text, arBlock.text),
        })
        break
      }
      case 'list': {
        const arBlock = ar.type === 'list' ? ar : en
        const itemCount = Math.max(en.items.length, arBlock.items.length)
        result.push({
          type: 'list',
          ordered: en.ordered,
          items: Array.from({ length: itemCount }, (_, itemIndex) =>
            rich(
              en.items[itemIndex] ?? '',
              arBlock.items[itemIndex] ?? en.items[itemIndex] ?? '',
            ),
          ),
        })
        break
      }
      case 'image': {
        const arBlock = ar.type === 'image' ? ar : en
        result.push({
          type: 'image',
          src: en.src,
          alt: bi(en.alt, arBlock.alt),
          caption:
            en.caption || arBlock.caption
              ? bi(en.caption ?? '', arBlock.caption ?? en.caption ?? '')
              : undefined,
          wide: en.wide,
        })
        break
      }
      default:
        break
    }
  }

  return result
}

function seedInsights(): AdminInsight[] {
  return INSIGHT_ARTICLES.map((article, index) => {
    const arArticle = INSIGHT_ARTICLES_AR.find((a) => a.slug === article.slug) ?? article
    const topicCount = Math.max(article.topics.length, arArticle.topics.length)
    return {
      slug: article.slug,
      coverImage: article.coverImage,
      cardImage: article.cardImage,
      publishedAt: article.publishedAt,
      readingTimeMinutes: article.readingTimeMinutes,
      featured: article.featured,
      showOnHome: index < 3,
      layout: article.layout,
      title: bi(article.title, arArticle.title),
      excerpt: bi(article.excerpt, arArticle.excerpt),
      authorName: bi(article.author.name, arArticle.author.name),
      authorRole: bi(article.author.role, arArticle.author.role),
      service: bi(article.service, arArticle.service),
      industry: bi(article.industry, arArticle.industry),
      topics: Array.from({ length: topicCount }, (_, i) =>
        bi(article.topics[i] ?? '', arArticle.topics[i] ?? article.topics[i] ?? ''),
      ).filter((t) => t.en || t.ar),
      content: seedContentBlocks(article.content, arArticle.content),
      metaTitle:
        article.metaTitle || arArticle.metaTitle
          ? bi(article.metaTitle ?? article.title, arArticle.metaTitle ?? arArticle.title)
          : undefined,
      metaDescription:
        article.metaDescription || arArticle.metaDescription
          ? bi(
              article.metaDescription ?? article.excerpt,
              arArticle.metaDescription ?? arArticle.excerpt,
            )
          : undefined,
      keywords:
        article.keywords?.length || arArticle.keywords?.length
          ? bi(
              (article.keywords ?? []).join(', '),
              (arArticle.keywords ?? article.keywords ?? []).join(', '),
            )
          : undefined,
    }
  })
}

const PAGE_SECTION_META: { key: string; label: string; roots: string[] }[] = [
  { key: 'nav', label: 'Navigation', roots: ['nav', 'floating'] },
  { key: 'home', label: 'Home', roots: ['hero', 'trustedBy', 'impact', 'solutions', 'reviews', 'featured', 'featuredSuccess', 'portfolio', 'why', 'insights', 'faq', 'closing'] },
  { key: 'about', label: 'About', roots: ['experience'] },
  { key: 'services', label: 'Services', roots: ['services', 'serviceDetail'] },
  { key: 'portfolio', label: 'Portfolio', roots: ['portfolioPage'] },
  { key: 'insights', label: 'Insights', roots: ['insightsPage'] },
  { key: 'contact', label: 'Contact', roots: ['contact'] },
  { key: 'footer', label: 'Footer & Common', roots: ['footer', 'common', 'errors'] },
]

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function collectLeaves(
  enNode: unknown,
  arNode: unknown,
  path: string,
  fields: PageCopyField[],
) {
  if (typeof enNode === 'string') {
    const arVal = typeof arNode === 'string' ? arNode : enNode
    fields.push({
      path,
      label: path.split('.').slice(1).join(' › ') || path,
      en: enNode,
      ar: arVal,
      multiline: enNode.length > 60 || enNode.includes('\n'),
    })
    return
  }

  if (isPlainObject(enNode)) {
    for (const key of Object.keys(enNode)) {
      const nextPath = path ? `${path}.${key}` : key
      collectLeaves(
        enNode[key],
        isPlainObject(arNode) ? arNode[key] : undefined,
        nextPath,
        fields,
      )
    }
  }
}

function seedPageSections(): PageCopySection[] {
  const enTree = en as Record<string, unknown>
  const arTree = ar as Record<string, unknown>

  return PAGE_SECTION_META.map((section) => {
    const fields: PageCopyField[] = []
    for (const root of section.roots) {
      collectLeaves(enTree[root], arTree[root], root, fields)
    }
    return {
      key: section.key,
      label: section.label,
      fields,
    }
  })
}

export function createSeedContent(): AdminContentState {
  return {
    team: seedTeam(),
    services: seedServices(),
    projects: seedProjects(),
    insights: seedInsights(),
    contact: {
      email: CONTACT_EMAIL,
      whatsappPhone: CONTACT_OFFICES[0].phoneE164,
      offices: [
        {
          id: 'istanbul',
          label: bi('Istanbul', 'إسطنبول'),
          phoneE164: CONTACT_OFFICES[0].phoneE164,
          phoneDisplay: CONTACT_OFFICES[0].phoneDisplay,
        },
        {
          id: 'syria',
          label: bi('Syria', 'سوريا'),
          phoneE164: CONTACT_OFFICES[1].phoneE164,
          phoneDisplay: CONTACT_OFFICES[1].phoneDisplay,
        },
      ],
    },
    pageSections: seedPageSections(),
    siteAssets: createDefaultSiteAssets(),
  }
}
