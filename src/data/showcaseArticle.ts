import type { InsightArticle } from '../types/insights'

const IMG = {
  brandSystem: '/images/insights/cover-brand-system.svg',
  brandMark: '/images/insights/cover-brand-mark.svg',
  colorPalette: '/images/insights/cover-color-palette.svg',
  typography: '/images/insights/cover-typography.svg',
  stationery: '/images/insights/cover-stationery.svg',
  contentFlow: '/images/insights/cover-content-flow.svg',
  brandDesign:
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&h=900&fit=crop&q=80',
  analyticsDashboard:
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop&q=80',
  teamCollab:
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=900&fit=crop&q=80',
  officeSpace:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=900&fit=crop&q=80',
  presentation:
    'https://images.unsplash.com/photo-1556760544-74068565f05c?w=1400&h=900&fit=crop&q=80',
  startupMeeting:
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&h=900&fit=crop&q=80',
  creativeDesk:
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&h=900&fit=crop&q=80',
  socialContent:
    'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1400&h=900&fit=crop&q=80',
  retailExperience:
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&h=900&fit=crop&q=80',
  mobileProduct:
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1400&h=900&fit=crop&q=80',
} as const

export const SHOWCASE_ARTICLE_CONTENT: InsightArticle['content'] = [
  {
    type: 'paragraph',
    text: 'Most growth teams in the MENA region do not have a marketing problem. They have a coherence problem. The website promises one thing, the sales deck another, and social content chases trends that never compound. This playbook is a long-form editorial template: how to build a brand system that scales across channels without losing clarity.',
  },
  {
    type: 'paragraph',
    text: 'We wrote it as a reference structure for Salezeus Insights — long enough to test typography, table of contents, image rhythm, and every content block your editorial team will use in production.',
  },
  {
    type: 'heading',
    level: 2,
    id: 'why-coherence-beats-creativity',
    text: 'Why coherence beats one-off creativity',
  },
  {
    type: 'paragraph',
    text: 'Creative bursts win attention for a week. Systems win markets for years. When verbal and visual rules are documented, your team spends less time debating and more time shipping. Buyers feel the difference immediately — even if they cannot articulate it.',
  },
  {
    type: 'image',
    src: IMG.teamCollab,
    alt: 'Cross-functional team collaborating around laptops in a modern office',
    caption: 'Brand systems are built with product, sales, and marketing in the same conversation.',
    wide: true,
  },
  {
    type: 'pullquote',
    text: 'Consistency is not repetition. It is trust made visible.',
    attribution: 'Salezeus Editorial',
  },
  {
    type: 'heading',
    level: 2,
    id: 'mena-market-context',
    text: 'What makes MENA markets different',
  },
  {
    type: 'paragraph',
    text: 'Regional audiences are multilingual, mobile-first, and culturally layered. Campaigns that work in one city often fail in another when localization is treated as translation only. Identity systems must flex for Arabic and Latin scripts, seasonal campaigns, and channel-specific formats without breaking the core story.',
  },
  {
    type: 'stat',
    value: '68%',
    label: 'Mobile-first discovery',
    description:
      'Most B2B and consumer research in MENA starts on mobile feeds before a prospect ever reaches your homepage.',
  },
  {
    type: 'gallery',
    images: [
      {
        src: IMG.socialContent,
        alt: 'Social media content grid displayed on a smartphone',
        caption: 'Feeds are often the first brand touchpoint — not your website.',
      },
      {
        src: IMG.mobileProduct,
        alt: 'Mobile app interface on a phone held in hand',
        caption: 'Product UI must inherit the same tokens as marketing surfaces.',
      },
    ],
  },
  {
    type: 'heading',
    level: 3,
    id: 'global-vs-local',
    text: 'Global ambition, local relevance',
  },
  {
    type: 'paragraph',
    text: 'A global playbook often relies on single-language messaging, static PDF brand books, and campaign-first thinking. A MENA-ready system adds bilingual hierarchy, living component libraries, identity-first rollout, and modular assets for weekly publishing.',
  },
  {
    type: 'note',
    variant: 'info',
    title: 'Editorial note',
    text: 'Use this info callout for methodology, research citations, or context that supports the article without interrupting the narrative flow.',
  },
  {
    type: 'heading',
    level: 2,
    id: 'five-layer-framework',
    text: 'The five-layer brand growth framework',
  },
  {
    type: 'paragraph',
    text: 'Every durable brand we work with maps to five layers. Skip a layer and you pay for it later — usually as rework, off-brand assets, or campaigns that underperform.',
  },
  {
    type: 'list',
    ordered: true,
    items: [
      'Positioning — who you serve, why you win, and what you refuse to be.',
      'Messaging — pillars, proof points, and audience-specific narratives.',
      'Visual identity — logo system, color, typography, and layout rules.',
      'Channel kits — templates for web, social, sales, and print.',
      'Governance — lightweight review rituals that prevent drift.',
    ],
  },
  {
    type: 'image',
    src: IMG.brandDesign,
    alt: 'Designer refining typography and layout on a large monitor',
    caption: 'Layer three only works when layers one and two are already clear.',
  },
  {
    type: 'list',
    ordered: false,
    items: [
      'Positioning workshop completed with leadership',
      'Messaging architecture documented',
      'Visual identity applied to core templates',
      'Channel kits published for internal teams',
      'Quarterly brand audit scheduled',
    ],
  },
  {
    type: 'heading',
    level: 3,
    id: 'rollout-phases',
    text: 'A realistic rollout path',
  },
  {
    type: 'list',
    ordered: true,
    items: [
      'Discovery — stakeholder interviews, competitive audit, audience mapping, and channel review.',
      'Strategy — positioning, messaging architecture, and creative territories.',
      'Design — identity build, component library, and application mockups.',
      'Activation — website, social kits, sales collateral, and internal training.',
      'Optimization — performance review, asset iteration, and governance cadence.',
    ],
  },
  {
    type: 'heading',
    level: 2,
    id: 'digital-touchpoints',
    text: 'Designing for every digital touchpoint',
  },
  {
    type: 'paragraph',
    text: 'A brand is experienced in milliseconds: ad thumbnail, email subject line, product empty state, invoice PDF. Each surface should feel like the same company without copying the same layout everywhere.',
  },
  {
    type: 'gallery',
    images: [
      {
        src: IMG.brandSystem,
        alt: 'Abstract brand system layout with color blocks and typography',
        caption: 'System thinking before screen thinking.',
      },
      {
        src: IMG.typography,
        alt: 'Typography specimen with hierarchy samples',
        caption: 'Type hierarchy carries voice as much as copy does.',
      },
      {
        src: IMG.contentFlow,
        alt: 'Content flow diagram for editorial planning',
        caption: 'Editorial calendars should map to content pillars.',
      },
    ],
  },
  {
    type: 'list',
    ordered: false,
    items: [
      'Homepage hero and value proposition',
      'Service or product detail pages',
      'Case studies and proof sections',
      'Social templates for static, carousel, and reels',
      'Sales deck master and one-pager variants',
    ],
  },
  {
    type: 'image',
    src: IMG.presentation,
    alt: 'Team presenting brand strategy on a large screen to stakeholders',
    caption: 'Stakeholder buy-in accelerates rollout more than any asset export.',
    wide: true,
  },
  {
    type: 'callout',
    title: 'Practical rule',
    text: 'If your team cannot produce an on-brand social post in under 20 minutes, your system is still too complex. Simplify templates before adding more guidelines.',
  },
  {
    type: 'heading',
    level: 2,
    id: 'measure-what-matters',
    text: 'Measure what leadership already cares about',
  },
  {
    type: 'paragraph',
    text: 'Brand work should connect to metrics on existing dashboards: qualified pipeline, win rate, time-to-close, CAC payback, and retention — not vanity aesthetics scores.',
  },
  {
    type: 'stat',
    value: '2.4×',
    label: 'Faster proposal cycles',
    description:
      'Teams with shared messaging architecture report shorter revision loops on sales collateral.',
  },
  {
    type: 'paragraph',
    text: 'Track operating metrics, not vanity numbers: qualified inbound rate instead of likes, sales cycle length instead of sentiment scores, proposal win rate instead of award submissions, and template adoption instead of logo variation counts.',
  },
  {
    type: 'note',
    variant: 'tip',
    title: 'SEO tip for editorial',
    text: 'Use descriptive H2 headings with natural keywords, write alt text for every image, and keep excerpts under 160 characters for clean search snippets.',
  },
  {
    type: 'heading',
    level: 3,
    id: 'token-example',
    text: 'Token-based theming example',
  },
  {
    type: 'code',
    language: 'css',
    code: `/* Salezeus-style semantic tokens */
:root {
  --color-primary: #3258A4;
  --color-accent: #F0B80D;
  --color-surface: #F8F7F4;
  --color-text: #040508;
  --font-heading: 'PP Neue Montreal', sans-serif;
  --font-body: 'Inter', sans-serif;
  --radius-card: 12px;
}`,
  },
  {
    type: 'heading',
    level: 2,
    id: 'common-mistakes',
    text: 'Seven mistakes we see on every audit',
  },
  {
    type: 'list',
    ordered: true,
    items: [
      'Starting with logo design before positioning is settled.',
      'Publishing a 80-page brand book no one opens.',
      'Letting each agency add a new visual dialect.',
      'Ignoring Arabic script requirements until launch week.',
      'Treating social as a side channel instead of a system.',
      'Skipping sales enablement in the rollout plan.',
      'Never scheduling a quarterly drift audit.',
    ],
  },
  {
    type: 'image',
    src: IMG.creativeDesk,
    alt: 'Creative director reviewing brand boards at a desk',
    caption: 'Audits surface drift early — before customers notice.',
  },
  {
    type: 'heading',
    level: 2,
    id: 'physical-and-retail',
    text: 'When the brand leaves the screen',
  },
  {
    type: 'paragraph',
    text: 'Packaging, signage, event booths, and uniforms are not “extra.” They are high-trust moments. A digital-first identity still needs print specs, spacing rules, and production-ready exports.',
  },
  {
    type: 'gallery',
    images: [
      {
        src: IMG.stationery,
        alt: 'Branded stationery mockup with cards and letterhead',
        caption: 'Stationery templates keep partners aligned.',
      },
      {
        src: IMG.retailExperience,
        alt: 'Retail interior with cohesive branded environment',
        caption: 'Physical spaces should inherit the same palette logic.',
      },
    ],
  },
  {
    type: 'image',
    src: IMG.officeSpace,
    alt: 'Minimal corporate workspace with brand accents on walls',
    wide: true,
    caption: 'Environmental branding extends identity into lived experience.',
  },
  {
    type: 'heading',
    level: 2,
    id: 'implementation-priorities',
    text: 'Implementation priorities for your next quarter',
  },
  {
    type: 'list',
    ordered: true,
    items: [
      'Run a 90-minute positioning alignment session',
      'Publish messaging pillars in a shared workspace',
      'Ship five core templates (web, deck, social, email, one-pager)',
      'Train client-facing teams on tone of voice',
      'Set a monthly analytics review for content and pipeline',
      'Book a Q3 brand drift audit',
    ],
  },
  {
    type: 'pullquote',
    text: 'The best brand systems feel obvious in hindsight. That is the point.',
  },
  {
    type: 'heading',
    level: 2,
    id: 'conclusion',
    text: 'Conclusion: build infrastructure, not decorations',
  },
  {
    type: 'paragraph',
    text: 'If you are reading this as an editorial template, you have already seen every block type we support: headings, galleries, stats, notes, code, lists, and full-bleed images. Replace the copy, swap the visuals, and keep the rhythm — intro, evidence, framework, application, measurement, pitfalls, priorities, close.',
  },
  {
    type: 'paragraph',
    text: 'When you are ready to move from playbook to execution, start with a positioning workshop. Everything downstream becomes faster, cheaper, and easier to defend in board meetings.',
  },
  {
    type: 'image',
    src: IMG.analyticsDashboard,
    alt: 'Analytics dashboard with growth charts and KPI widgets',
    caption: 'Close with proof — tie brand work to numbers leadership already tracks.',
    wide: true,
  },
  {
    type: 'callout',
    title: 'Ready to build your system?',
    text: 'Salezeus helps teams in Turkey, Syria, and across MENA ship identity, web, and growth programs from one strategic foundation. Start with a conversation — not a moodboard.',
  },
]

export const SHOWCASE_ARTICLE: InsightArticle = {
  slug: 'brand-growth-playbook-mena',
  title: 'The Brand Growth Playbook for MENA Teams (Editorial Template)',
  excerpt:
    'A long-form reference article with images, stats, galleries, and every content block — use it as the master structure for Salezeus Insights.',
  coverImage: IMG.brandSystem,
  cardImage: IMG.brandMark,
  publishedAt: '2026-07-01',
  readingTimeMinutes: 19,
  author: { name: 'Lina Karim', role: 'Head of Brand Strategy' },
  service: 'Branding',
  industry: 'Technology',
  topics: ['Brand Strategy', 'MENA Markets', 'Content Systems', 'Digital Transformation'],
  featured: true,
  layout: 'large',
  metaTitle: 'Brand Growth Playbook for MENA Teams | Salezeus Insights',
  metaDescription:
    'Long-form editorial template for brand growth in MENA: framework, rollout phases, digital touchpoints, metrics, and image-rich sections for SEO.',
  keywords: [
    'brand growth playbook',
    'MENA branding strategy',
    'brand identity system',
    'editorial template',
    'B2B marketing MENA',
    'brand governance',
    'content pillars',
  ],
  content: SHOWCASE_ARTICLE_CONTENT,
}
