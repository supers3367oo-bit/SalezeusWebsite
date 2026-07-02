import type { InsightArticle } from '../types/insights'
import { SHOWCASE_ARTICLE } from './showcaseArticle'

export const INSIGHT_IMAGES = {
  brandSystem: '/images/insights/cover-brand-system.svg',
  brandMark: '/images/insights/cover-brand-mark.svg',
  colorPalette: '/images/insights/cover-color-palette.svg',
  typography: '/images/insights/cover-typography.svg',
  stationery: '/images/insights/cover-stationery.svg',
  socialGrid: '/images/insights/cover-social-grid.svg',
  socialPhone: '/images/insights/cover-social-phone.svg',
  contentFlow: '/images/insights/cover-content-flow.svg',
  teamStrategy:
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=800&fit=crop&q=80',
  brandDesign:
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop&q=80',
  strategyWorkshop:
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80',
  analyticsDashboard:
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80',
} as const

export const POPULAR_TOPICS = [
  'Brand Strategy',
  'Growth Marketing',
  'UX Design',
  'MENA Markets',
  'Digital Transformation',
  'Content Systems',
  'Product Launch',
  'Healthcare Branding',
  'E-commerce Growth',
  'Social Commerce',
]

const brandIdentityContent: InsightArticle['content'] = [
  {
    type: 'paragraph',
    text: 'Brand identity is not a logo refresh. For growth-stage companies in the MENA region, identity is the infrastructure that shapes trust, shortens sales cycles, and keeps every channel aligned. When positioning is vague, teams compensate with louder marketing. When identity is clear, marketing works harder with less spend.',
  },
  {
    type: 'heading',
    level: 2,
    id: 'why-brand-identity-matters',
    text: 'Why brand identity matters for B2B growth',
  },
  {
    type: 'paragraph',
    text: 'A coherent brand identity reduces internal decision fatigue and external recognition friction. Product, sales, and marketing ship faster when the rules are documented. Prospects trust faster when signals repeat across your website, decks, ads, and support touchpoints.',
  },
  {
    type: 'image',
    src: INSIGHT_IMAGES.teamStrategy,
    alt: 'Leadership team reviewing brand strategy during a workshop',
    caption: 'Identity work succeeds when strategy and design share the same room.',
    wide: true,
  },
  {
    type: 'pullquote',
    text: 'Brand is not what you say about yourself. It is what people remember when you are not in the room.',
    attribution: 'Salezeus Strategy Team',
  },
  {
    type: 'heading',
    level: 2,
    id: 'measurable-business-value',
    text: 'Measurable business value of a strong identity',
  },
  {
    type: 'stat',
    value: '3.2×',
    label: 'Higher unaided recall',
    description:
      'Consistent identity systems outperform fragmented visuals in brand recall studies across MENA markets.',
  },
  {
    type: 'paragraph',
    text: 'The return is rarely instant. It compounds across touchpoints: proposals that close faster, campaigns that need less explanation, and product experiences that feel intentional from the first screen. That is why identity should be treated as a revenue asset, not a design deliverable.',
  },
  {
    type: 'gallery',
    images: [
      {
        src: INSIGHT_IMAGES.brandDesign,
        alt: 'Designer building a visual identity system on screen',
        caption: 'Systems beat one-off assets every time.',
      },
      {
        src: INSIGHT_IMAGES.colorPalette,
        alt: 'Brand color palette and typography specimen',
        caption: 'Color and type carry more meaning than most teams assume.',
      },
    ],
  },
  {
    type: 'heading',
    level: 3,
    id: 'rebrand-vs-refresh',
    text: 'Rebrand vs. brand refresh: which do you need?',
  },
  {
    type: 'paragraph',
    text: 'A brand refresh refines existing equity in a few weeks with lower disruption — best when market fit is still strong. A full rebrand rebuilds the strategic foundation over months and requires deeper alignment — best when positioning has materially shifted.',
  },
  {
    type: 'note',
    variant: 'tip',
    title: 'SEO & messaging signal',
    text: 'If your homepage, LinkedIn, and sales deck describe the company differently, search engines and buyers both receive mixed signals. Align messaging before scaling content.',
  },
  {
    type: 'heading',
    level: 2,
    id: 'building-identity-system',
    text: 'How to build a brand identity system that lasts',
  },
  {
    type: 'list',
    ordered: true,
    items: [
      'Define positioning and audience with evidence, not assumptions.',
      'Translate strategy into verbal and visual principles.',
      'Design flexible components, not fixed one-off templates.',
      'Document usage rules your team will actually read.',
      'Audit touchpoints quarterly and correct drift early.',
    ],
  },
  {
    type: 'list',
    ordered: false,
    items: [
      'Clear positioning statement',
      'Documented tone of voice',
      'Component-based design library',
      'Cross-channel governance',
    ],
  },
  {
    type: 'heading',
    level: 3,
    id: 'identity-rollout-phases',
    text: 'Typical identity project phases',
  },
  {
    type: 'list',
    ordered: true,
    items: [
      'Discovery — stakeholder interviews, competitive audit, and audience mapping.',
      'Strategy — positioning, messaging architecture, and creative direction.',
      'Design — identity design, system build, and application prototypes.',
      'Launch — rollout planning, internal training, and performance tracking.',
    ],
  },
  {
    type: 'image',
    src: INSIGHT_IMAGES.strategyWorkshop,
    alt: 'Brand strategist facilitating a positioning workshop with sticky notes',
    caption: 'Workshops surface the language your market should hear.',
  },
  {
    type: 'callout',
    title: 'Start with strategic clarity',
    text: 'The most expensive identity projects fail at the briefing stage. Invest in positioning first and the visual work becomes faster, cheaper, and easier to measure.',
  },
  {
    type: 'code',
    language: 'css',
    code: `/* Example: token-based brand theming for web */
:root {
  --brand-primary: #3258A4;
  --brand-accent: #F0B80D;
  --brand-surface: #F8F7F4;
  --brand-text: #040508;
  --brand-radius: 12px;
}`,
  },
  {
    type: 'heading',
    level: 2,
    id: 'key-takeaways',
    text: 'Key takeaways for leadership teams',
  },
  {
    type: 'list',
    ordered: false,
    items: [
      'Treat brand identity as long-term infrastructure, not a one-time design project.',
      'Align verbal and visual systems before scaling paid media or content.',
      'Measure recall, conversion, and sales-cycle length — not just aesthetic preference.',
      'Govern usage with lightweight guidelines your team can follow daily.',
    ],
  },
  {
    type: 'image',
    src: INSIGHT_IMAGES.analyticsDashboard,
    alt: 'Marketing analytics dashboard showing campaign performance growth',
    caption: 'Identity improvements should connect to metrics leadership already tracks.',
    wide: true,
  },
  {
    type: 'paragraph',
    text: 'Your brand identity is not a vanity project. It is one of the few business assets that appreciates when maintained. If you are evaluating a rebrand or refresh, start with a positioning audit — then design with intent.',
  },
]

export const INSIGHT_ARTICLES: InsightArticle[] = [
  SHOWCASE_ARTICLE,
  {
    slug: 'why-brand-identity-is-your-most-valuable-asset',
    title: 'Why Your Brand Identity Is the Most Valuable Asset You Own',
    excerpt:
      'Brand identity is not a logo file. Learn how a strategic identity system drives trust, recall, and revenue for B2B brands in MENA.',
    coverImage: INSIGHT_IMAGES.brandSystem,
    cardImage: INSIGHT_IMAGES.brandMark,
    publishedAt: '2026-06-18',
    readingTimeMinutes: 11,
    author: { name: 'Lina Karim', role: 'Head of Brand Strategy' },
    service: 'Branding',
    industry: 'Technology',
    topics: ['Brand Strategy', 'Digital Transformation'],
    layout: 'large',
    metaTitle: 'Why Brand Identity Is Your Most Valuable Asset | Salezeus',
    metaDescription:
      'Discover why brand identity is a revenue asset for MENA businesses. A practical guide to systems, rebrands, rollout phases, and measurable growth outcomes.',
    keywords: [
      'brand identity',
      'brand strategy MENA',
      'rebrand vs refresh',
      'brand guidelines',
      'B2B branding',
      'visual identity system',
    ],
    content: brandIdentityContent,
  },
  {
    slug: 'hidden-roi-of-content-marketing-mena',
    title: 'The Hidden ROI of Consistent Content Marketing in the MENA Region',
    excerpt:
      'Regional audiences reward consistency more than volume. Here is how structured content compounds when localization is done with intent.',
    coverImage: INSIGHT_IMAGES.contentFlow,
    publishedAt: '2026-06-10',
    readingTimeMinutes: 8,
    author: { name: 'Omar Haddad', role: 'Marketing Director' },
    service: 'Marketing',
    industry: 'E-commerce',
    topics: ['Growth Marketing', 'MENA Markets', 'Content Systems'],
    layout: 'standard',
    content: [
      {
        type: 'paragraph',
        text: 'Content marketing in MENA fails for predictable reasons: translation without localization, inconsistent publishing, and campaigns disconnected from product truth.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'consistency-beats-volume',
        text: 'Consistency beats volume',
      },
      {
        type: 'paragraph',
        text: 'A steady publishing rhythm with clear themes outperforms sporadic bursts of high production content. Audiences learn what to expect from you.',
      },
      {
        type: 'pullquote',
        text: 'Localization is not language swap. It is cultural relevance with commercial intent.',
      },
    ],
  },
  {
    slug: 'five-signs-your-business-is-ready-for-a-rebrand',
    title: '5 Signs Your Business Is Ready to Invest in a Rebrand',
    excerpt:
      'Not every visual refresh needs a rebrand. These five signals help you decide when strategic repositioning is the right move.',
    coverImage: INSIGHT_IMAGES.typography,
    publishedAt: '2026-05-28',
    readingTimeMinutes: 6,
    author: { name: 'Lina Karim', role: 'Head of Brand Strategy' },
    service: 'Branding',
    industry: 'Startups',
    topics: ['Brand Strategy', 'Product Launch'],
    layout: 'compact',
    content: [
      {
        type: 'paragraph',
        text: 'Rebrands are expensive when they are reactive. The best ones are triggered by strategic shifts, not aesthetic boredom.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Your offering has evolved but your story has not.',
          'Sales cycles lengthen because prospects misunderstand your category.',
          'You compete on price despite having premium capabilities.',
          'Internal teams use conflicting language in decks and demos.',
          'You are entering a new market with different expectations.',
        ],
      },
    ],
  },
  {
    slug: 'designing-trust-for-healthcare-brands',
    title: 'Designing Trust for Healthcare Brands in Digital Channels',
    excerpt:
      'Patients decide in seconds. Clinical credibility and human warmth must coexist in every interface, campaign, and content surface.',
    coverImage: INSIGHT_IMAGES.brandMark,
    publishedAt: '2026-05-14',
    readingTimeMinutes: 9,
    author: { name: 'Sara Nour', role: 'UX Lead' },
    service: 'Web Development',
    industry: 'Healthcare',
    topics: ['Healthcare Branding', 'UX Design'],
    layout: 'horizontal',
    content: [
      {
        type: 'paragraph',
        text: 'Healthcare brands carry a higher burden of proof. Design must reduce anxiety, clarify next steps, and never sacrifice accessibility for aesthetics.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'trust-signals',
        text: 'Trust signals that actually work',
      },
      {
        type: 'paragraph',
        text: 'Credentials matter, but so does clarity. Patients look for plain language, visible policies, and interfaces that feel calm under stress.',
      },
    ],
  },
  {
    slug: 'social-commerce-playbook-fashion',
    title: 'A Practical Social Commerce Playbook for Fashion Brands',
    excerpt:
      'From lookbook to checkout, fashion brands win when content, community, and conversion share one coherent system.',
    coverImage: INSIGHT_IMAGES.socialGrid,
    publishedAt: '2026-05-02',
    readingTimeMinutes: 7,
    author: { name: 'Maya El-Amin', role: 'Social Media Strategist' },
    service: 'Social Media',
    industry: 'Fashion',
    topics: ['Social Commerce', 'E-commerce Growth'],
    layout: 'standard',
    content: [
      {
        type: 'paragraph',
        text: 'Fashion audiences discover on social and decide on experience. The gap between inspiration and purchase is where most brands leak revenue.',
      },
    ],
  },
  {
    slug: 'medical-tourism-websites-that-convert',
    title: 'Medical Tourism Websites That Convert Without Losing Credibility',
    excerpt:
      'International patients need confidence before they book. Structure, proof, and multilingual clarity do more than aggressive CTAs.',
    coverImage: INSIGHT_IMAGES.contentFlow,
    publishedAt: '2026-04-22',
    readingTimeMinutes: 10,
    author: { name: 'Sara Nour', role: 'UX Lead' },
    service: 'Web Development',
    industry: 'Medical Tourism',
    topics: ['Healthcare Branding', 'UX Design', 'MENA Markets'],
    layout: 'large',
    content: [
      {
        type: 'paragraph',
        text: 'Medical tourism buyers research across borders, languages, and regulations. Your website is often the first clinical impression they receive.',
      },
    ],
  },
  {
    slug: 'restaurant-branding-beyond-the-menu',
    title: 'Restaurant Branding Beyond the Menu',
    excerpt:
      'Hospitality brands that scale treat atmosphere, service language, and digital touchpoints as one experience, not separate projects.',
    coverImage: INSIGHT_IMAGES.socialGrid,
    publishedAt: '2026-04-08',
    readingTimeMinutes: 5,
    author: { name: 'Omar Haddad', role: 'Marketing Director' },
    service: 'Branding',
    industry: 'Restaurants',
    topics: ['Brand Strategy'],
    layout: 'compact',
    content: [
      {
        type: 'paragraph',
        text: 'Guests remember how you made them feel long after they forget a dish name. Brand systems help teams deliver that feeling consistently.',
      },
    ],
  },
  {
    slug: 'real-estate-digital-presence-2026',
    title: 'What a Premium Real Estate Digital Presence Looks Like in 2026',
    excerpt:
      'High-value property marketing demands editorial quality, precise data, and mobile-first experiences that respect the buyer journey.',
    coverImage: INSIGHT_IMAGES.stationery,
    publishedAt: '2026-03-25',
    readingTimeMinutes: 8,
    author: { name: 'Karim Saleh', role: 'Business Consultant' },
    service: 'Business Consulting',
    industry: 'Real Estate',
    topics: ['Digital Transformation'],
    layout: 'standard',
    content: [
      {
        type: 'paragraph',
        text: 'Real estate buyers compare developers in minutes. Your digital presence must communicate quality before the first site visit.',
      },
    ],
  },
  {
    slug: 'manufacturing-websites-b2b-clarity',
    title: 'Manufacturing Websites Need B2B Clarity, Not Corporate Noise',
    excerpt:
      'Industrial buyers want specifications, proof, and fast paths to inquiry. Strip the fluff and design for decision-makers.',
    coverImage: INSIGHT_IMAGES.stationery,
    publishedAt: '2026-03-12',
    readingTimeMinutes: 6,
    author: { name: 'Karim Saleh', role: 'Business Consultant' },
    service: 'Web Development',
    industry: 'Manufacturing',
    topics: ['Digital Transformation', 'UX Design'],
    layout: 'horizontal',
    content: [
      {
        type: 'paragraph',
        text: 'Manufacturing sites often hide the information buyers need behind generic mission statements. Lead with capability, compliance, and contact paths.',
      },
    ],
  },
  {
    slug: 'mobile-app-onboarding-patterns',
    title: 'Mobile App Onboarding Patterns That Respect User Time',
    excerpt:
      'The best onboarding feels invisible. Reduce steps, earn permissions gradually, and show value before asking for commitment.',
    coverImage: INSIGHT_IMAGES.contentFlow,
    publishedAt: '2026-02-28',
    readingTimeMinutes: 7,
    author: { name: 'Sara Nour', role: 'UX Lead' },
    service: 'Mobile Apps',
    industry: 'Technology',
    topics: ['UX Design', 'Product Launch'],
    layout: 'standard',
    content: [
      {
        type: 'paragraph',
        text: 'Users abandon apps that ask for too much too soon. Onboarding should demonstrate outcomes, not explain features.',
      },
    ],
  },
  {
    slug: 'education-brands-digital-first-enrollment',
    title: 'How Education Brands Win with Digital-First Enrollment',
    excerpt:
      'Students and parents research programs online first. Enrollment journeys should feel guided, transparent, and human.',
    coverImage: INSIGHT_IMAGES.brandMark,
    publishedAt: '2026-02-14',
    readingTimeMinutes: 6,
    author: { name: 'Maya El-Amin', role: 'Social Media Strategist' },
    service: 'Marketing',
    industry: 'Education',
    topics: ['Content Systems', 'Growth Marketing'],
    layout: 'compact',
    content: [
      {
        type: 'paragraph',
        text: 'Education marketing works when institutions treat enrollment as a service design problem, not a brochure distribution problem.',
      },
    ],
  },
  {
    slug: 'tourism-campaigns-that-feel-local',
    title: 'Tourism Campaigns That Feel Local and Scale Globally',
    excerpt:
      'Destination brands succeed when storytelling honors place, culture, and seasonality without flattening into stock imagery.',
    coverImage: INSIGHT_IMAGES.stationery,
    publishedAt: '2026-01-30',
    readingTimeMinutes: 8,
    author: { name: 'Omar Haddad', role: 'Marketing Director' },
    service: 'Marketing',
    industry: 'Tourism',
    topics: ['MENA Markets', 'Growth Marketing'],
    layout: 'large',
    content: [
      {
        type: 'paragraph',
        text: 'Tourism audiences respond to specificity. Campaigns that name real experiences outperform generic paradise messaging.',
      },
    ],
  },
]

export function getFeaturedArticle(): InsightArticle {
  return INSIGHT_ARTICLES.find((a) => a.featured) ?? INSIGHT_ARTICLES[0]
}

export function getArticleBySlug(slug: string): InsightArticle | undefined {
  return INSIGHT_ARTICLES.find((a) => a.slug === slug)
}

export function getRelatedArticles(article: InsightArticle, limit = 3): InsightArticle[] {
  return INSIGHT_ARTICLES.filter(
    (a) =>
      a.slug !== article.slug &&
      (a.service === article.service || a.industry === article.industry)
  ).slice(0, limit)
}

export function getArticlesForHome(limit = 3): InsightArticle[] {
  return INSIGHT_ARTICLES.slice(0, limit)
}

export function extractHeadings(
  content: InsightArticle['content']
): { id: string; text: string; level: 2 | 3 }[] {
  return content
    .filter((block): block is Extract<typeof block, { type: 'heading' }> => block.type === 'heading')
    .map((block) => ({ id: block.id, text: block.text, level: block.level }))
}

export function formatArticleDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso))
}
