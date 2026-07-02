import type { ProjectDetail, ProjectListItem, ProjectServiceSlug, ProjectServiceLabel } from '../types/projectDetail'

export const PROJECT_DETAILS: ProjectDetail[] = [
  {
    id: 1,
    slug: 'medcare-travel',
    client: 'MedCare Travel',
    field: 'Medical Tourism',
    industry: 'Healthcare',
    service: 'branding',
    serviceLabel: 'Branding',
    summary: 'Brand identity for an international medical tourism agency.',
    image: '/images/services/branding-stationery.png',
    year: 2024,
    heroImage: '/images/services/branding-stationery.png',
    outcomeLine: 'A trusted visual identity for cross-border patient care.',
    challenge:
      'MedCare needed to stand out in a crowded medical tourism market while conveying clinical trust and premium hospitality.',
    approach:
      'We ran a positioning workshop, then built a mark system, palette, and typography tuned for both digital booking and print collateral.',
    result:
      'The new identity launched across the website, patient guides, and partner materials with a single coherent voice.',
    deliverables: [
      'Logo suite and responsive lockups',
      'Color palette and typography system',
      'Brand usage guidelines',
      'Stationery and print templates',
      'Social profile kit',
    ],
    work: {
      type: 'branding',
      title: 'Identity in practice',
      primaryLogo: {
        src: '/images/services/branding-stationery.png',
        alt: 'MedCare Travel primary logo lockup',
        aspect: '16/9',
      },
      logoVariants: [
        { src: '/images/services/branding-banners.png', alt: 'Horizontal logo application', aspect: '4/3' },
        { src: '/images/services/branding-stationery.png', alt: 'Stacked logo lockup', aspect: '4/3' },
        { src: '/images/services/social-branding.png', alt: 'Icon mark on profile', aspect: '1/1' },
      ],
      colorPalette: [
        { name: 'Deep Blue', hex: '#1A2D52' },
        { name: 'Care Blue', hex: '#3258A4' },
        { name: 'Soft White', hex: '#F8F7F4' },
        { name: 'Trust Gold', hex: '#F0B80D' },
      ],
      typography: { display: 'Heading: PP Neue Montreal', body: 'Body: Inter' },
      stationery: [
        { src: '/images/services/branding-stationery.png', alt: 'Business card and letterhead', aspect: '4/3' },
        { src: '/images/services/branding-banners.png', alt: 'Event banner stationery', aspect: '4/3' },
      ],
      inContext: {
        src: '/images/services/web-development.png',
        alt: 'Brand applied on medical tourism website',
        aspect: '16/9',
      },
    },
    relatedSlugs: ['wellness-retreat', 'annual-summit'],
  },
  {
    id: 2,
    slug: 'annual-summit',
    client: 'Annual Summit',
    field: 'Conferences',
    industry: 'Technology',
    service: 'marketing',
    serviceLabel: 'Marketing',
    summary: 'Visual identity and promotional campaign for a leadership summit.',
    image: '/images/services/branding-banners.png',
    year: 2024,
    heroImage: '/images/services/branding-banners.png',
    outcomeLine: 'A campaign that filled the room before doors opened.',
    challenge:
      'The summit team had strong speakers but weak campaign cohesion across print, digital, and on-site touchpoints.',
    approach:
      'We defined one key message, built a visual system for the event, and rolled it out across every channel in a four-week sprint.',
    result:
      'Registration momentum improved with a consistent story from first ad to venue signage.',
    deliverables: [
      'Campaign concept and key visual',
      'Digital ad set',
      'Print posters and banners',
      'Email templates',
      'On-site signage kit',
    ],
    work: {
      type: 'marketing',
      title: 'Campaign rollout',
      heroVisual: {
        src: '/images/services/branding-banners.png',
        alt: 'Annual Summit campaign hero visual',
        aspect: '16/9',
      },
      keyMessage: 'Where industry leaders define what comes next.',
      audience: 'C-suite and senior operators in tech and startups',
      channels: ['LinkedIn', 'Email', 'Print', 'On-site'],
      assets: [
        { src: '/images/services/branding-banners.png', alt: 'Event poster', aspect: '4/3' },
        { src: '/images/services/marketing-campaign.png', alt: 'Digital ad set', aspect: '4/3' },
        { src: '/images/services/social-branding.png', alt: 'Social promo tile', aspect: '1/1' },
        { src: '/images/services/web-shuaa.png', alt: 'Landing page crop', aspect: '16/9' },
      ],
    },
    relatedSlugs: ['ark-oto', 'global-forum'],
  },
  {
    id: 3,
    slug: 'global-forum',
    client: 'Global Forum',
    field: 'Conferences',
    industry: 'Technology',
    service: 'social-media',
    serviceLabel: 'Social Media',
    summary: 'Social content and event marketing for an annual business conference.',
    image: '/images/services/social-branding.png',
    year: 2023,
    heroImage: '/images/services/social-branding.png',
    outcomeLine: 'A feed that felt live before the event started.',
    challenge:
      'The forum needed social presence that could sustain daily posting without losing quality or brand consistency.',
    approach:
      'We built content pillars, template systems, and a posting rhythm aligned with speaker announcements and ticket milestones.',
    result:
      'Engagement grew through a recognizable visual language across carousels, stories, and speaker spotlights.',
    deliverables: [
      'Profile and cover refresh',
      'Post template library',
      'Carousel and story formats',
      'Caption framework',
      'Monthly content calendar',
    ],
    work: {
      type: 'social',
      title: 'Content system',
      profilePreview: {
        src: '/images/services/social-branding.png',
        alt: 'Global Forum social profile preview',
        aspect: '4/5',
      },
      feedGrid: [
        { src: '/images/services/social-branding.png', alt: 'Feed post 1', aspect: '1/1' },
        { src: '/images/services/marketing-campaign.png', alt: 'Feed post 2', aspect: '1/1' },
        { src: '/images/services/branding-banners.png', alt: 'Feed post 3', aspect: '1/1' },
        { src: '/images/cases/ark-oto.png', alt: 'Feed post 4', aspect: '1/1' },
      ],
      postFormats: [
        { src: '/images/services/social-branding.png', alt: 'Carousel format', aspect: '4/5' },
        { src: '/images/services/marketing-campaign.png', alt: 'Story format', aspect: '9/16' },
        { src: '/images/services/branding-banners.png', alt: 'Speaker spotlight', aspect: '4/5' },
      ],
      contentPillars: [
        { title: 'Speaker reveals', description: 'Short-form intros with consistent title cards.' },
        { title: 'Behind the scenes', description: 'Venue, crew, and prep content humanizing the event.' },
        { title: 'Ticket momentum', description: 'Deadline posts with clear CTAs and social proof.' },
      ],
      toneRules: 'Bold headlines, minimal copy, high-contrast photography, one accent color per post.',
    },
    relatedSlugs: ['wellness-retreat'],
  },
  {
    id: 4,
    slug: 'city-services-co',
    client: 'City Services Co.',
    field: 'Services',
    industry: 'Technology',
    service: 'web-development',
    serviceLabel: 'Web',
    summary: 'Corporate website and positioning for a regional services group.',
    image: '/images/services/web-shuaa.png',
    year: 2024,
    heroImage: '/images/services/web-shuaa.png',
    outcomeLine: 'A corporate site that explains complex services clearly.',
    challenge:
      'City Services offered many lines of business under one brand, and the old site buried key offerings behind dense navigation.',
    approach:
      'We restructured the information architecture, designed a modular page system, and built a responsive site with clear service entry points.',
    result:
      'Visitors reach the right service line faster, and the mobile experience matches desktop clarity.',
    deliverables: [
      'UX structure and wireframes',
      'UI design system',
      'Responsive website build',
      'CMS-ready page templates',
      'Launch QA and handoff',
    ],
    work: {
      type: 'web',
      title: 'Built experience',
      homepage: {
        src: '/images/services/web-shuaa.png',
        alt: 'City Services homepage in browser frame',
        aspect: '16/9',
      },
      responsivePair: {
        desktop: { src: '/images/services/web-shuaa.png', alt: 'Desktop services page', aspect: '16/9' },
        mobile: { src: '/images/services/web-development.png', alt: 'Mobile homepage', aspect: '9/16' },
      },
      keyPages: [
        { src: '/images/services/web-development.png', alt: 'About page', aspect: '4/3' },
        { src: '/images/services/web-shuaa.png', alt: 'Services listing', aspect: '4/3' },
        { src: '/images/services/branding-stationery.png', alt: 'Contact page', aspect: '4/3' },
      ],
      uxCallouts: [
        { label: 'Service finder', description: 'Sector-based entry points above the fold.' },
        { label: 'Trust strip', description: 'Certifications and partner logos without clutter.' },
        { label: 'Lead forms', description: 'Short forms tied to each service line.' },
      ],
    },
    relatedSlugs: ['edutech-institute'],
  },
  {
    id: 5,
    slug: 'summit-academy',
    client: 'Summit Academy',
    field: 'Education',
    industry: 'Education',
    service: 'business-consulting',
    serviceLabel: 'Consulting',
    summary: 'Positioning and enrollment strategy for a private education institute.',
    image: '/images/services/branding-stationery.png',
    year: 2023,
    heroImage: '/images/services/marketing-campaign.png',
    outcomeLine: 'Clear positioning that aligned academics and admissions.',
    challenge:
      'Summit Academy competed with larger institutes but lacked a differentiated story parents could remember and trust.',
    approach:
      'We audited the competitive landscape, reframed the value proposition, and built a roadmap for enrollment messaging.',
    result:
      'Admissions and marketing teams now share one narrative across open days, brochures, and digital campaigns.',
    deliverables: [
      'Market and competitor audit',
      'Positioning statement',
      'Audience messaging map',
      'Enrollment campaign roadmap',
      'Executive summary deck',
    ],
    work: {
      type: 'consulting',
      title: 'Strategic clarity',
      before:
        'A capable school with strong outcomes, presented online like a generic local college with no clear reason to choose it.',
      after:
        'A focused promise: small cohorts, industry mentors, and career-ready programs parents can explain in one sentence.',
      frameworkSteps: [
        { title: 'Discover', description: 'Stakeholder interviews and competitor scan across the region.' },
        { title: 'Define', description: 'Positioning territory and proof points validated with leadership.' },
        { title: 'Direct', description: 'Messaging hierarchy for web, print, and admissions conversations.' },
        { title: 'Deploy', description: '90-day rollout plan with owners and milestones.' },
      ],
      keyDecisions: [
        'Lead with graduate outcomes, not campus amenities.',
        'Target parents of career-focused students as the primary decision makers.',
        'Unify visual and verbal tone before the next enrollment cycle.',
      ],
    },
    relatedSlugs: ['medcare-travel'],
  },
  {
    id: 6,
    slug: 'edutech-institute',
    client: 'EduTech Institute',
    field: 'Education',
    industry: 'Education',
    service: 'mobile-apps',
    serviceLabel: 'Apps',
    summary: 'Student portal and learning platform for online programs.',
    image: '/images/services/app-rabbit-phone.png',
    year: 2024,
    heroImage: '/images/services/app-rabbit-phone.png',
    outcomeLine: 'A student app that keeps learners on track between sessions.',
    challenge:
      'EduTech needed a mobile experience for course access, deadlines, and instructor feedback without rebuilding their entire LMS.',
    approach:
      'We mapped core student journeys, designed a focused UI system, and prototyped the screens that mattered most for retention.',
    result:
      'Students complete more weekly check-ins, and support tickets around scheduling dropped after launch.',
    deliverables: [
      'UX flows for core journeys',
      'UI design system',
      'Home, courses, and profile screens',
      'Interactive prototype',
      'App store visual assets',
    ],
    work: {
      type: 'apps',
      title: 'Product screens',
      heroScreen: {
        src: '/images/services/app-rabbit-phone.png',
        alt: 'EduTech student app home screen',
        aspect: '9/16',
      },
      keyScreens: [
        { src: '/images/services/app-rabbit-phone.png', alt: 'Course overview screen', aspect: '9/16' },
        { src: '/images/services/web-development.png', alt: 'Assignments screen', aspect: '9/16' },
        { src: '/images/services/marketing-campaign.png', alt: 'Profile and settings', aspect: '9/16' },
      ],
      userFlow: [
        { step: 'Sign in and see today\'s schedule' },
        { step: 'Open a course and review materials' },
        { step: 'Submit work and get feedback' },
        { step: 'Track progress toward completion' },
      ],
      featureHighlights: [
        { title: 'Deadline clarity', description: 'One timeline for assignments across programs.' },
        { title: 'Offline-friendly', description: 'Key materials available without constant connectivity.' },
        { title: 'Instructor loop', description: 'Feedback surfaced where students already work.' },
      ],
    },
    relatedSlugs: ['city-services-co'],
  },
  {
    id: 7,
    slug: 'wellness-retreat',
    client: 'Wellness Retreat',
    field: 'Medical Tourism',
    industry: 'Healthcare',
    service: 'branding',
    serviceLabel: 'Branding',
    summary: 'Instagram-first brand rollout for a luxury wellness retreat.',
    image: '/images/services/marketing-campaign.png',
    year: 2023,
    heroImage: '/images/services/marketing-campaign.png',
    outcomeLine: 'A calm luxury identity built for social discovery.',
    challenge:
      'The retreat sold premium programs but looked inconsistent on Instagram and booking pages, weakening perceived value.',
    approach:
      'We designed a minimal identity with soft typography, a restrained palette, and templates optimized for social-first discovery.',
    result:
      'Brand recognition improved across social and booking touchpoints with one visual language.',
    deliverables: [
      'Logo and sub-mark',
      'Social template kit',
      'Photography direction',
      'Color and type guidelines',
      'Booking page art direction',
    ],
    work: {
      type: 'branding',
      title: 'Identity in practice',
      primaryLogo: {
        src: '/images/services/marketing-campaign.png',
        alt: 'Wellness Retreat primary logo',
        aspect: '16/9',
      },
      logoVariants: [
        { src: '/images/services/social-branding.png', alt: 'Horizontal lockup', aspect: '4/3' },
        { src: '/images/services/marketing-campaign.png', alt: 'Stacked lockup', aspect: '4/3' },
        { src: '/images/services/branding-stationery.png', alt: 'Monogram mark', aspect: '1/1' },
      ],
      colorPalette: [
        { name: 'Sage', hex: '#8A9A8A' },
        { name: 'Sand', hex: '#E8E4DE' },
        { name: 'Ink', hex: '#303640' },
        { name: 'Mist', hex: '#F8F7F4' },
      ],
      typography: { display: 'Heading: Editorial sans', body: 'Body: Humanist sans' },
      stationery: [
        { src: '/images/services/branding-stationery.png', alt: 'Welcome card', aspect: '4/3' },
        { src: '/images/services/marketing-campaign.png', alt: 'Program brochure', aspect: '4/3' },
      ],
      inContext: {
        src: '/images/services/social-branding.png',
        alt: 'Brand on Instagram grid',
        aspect: '16/9',
      },
    },
    relatedSlugs: ['medcare-travel', 'global-forum'],
  },
  {
    id: 8,
    slug: 'ark-oto',
    client: 'Ark Oto',
    field: 'Services',
    industry: 'Manufacturing',
    service: 'marketing',
    serviceLabel: 'Marketing',
    summary: 'Integrated marketing campaign for an automotive services brand.',
    image: '/images/cases/ark-oto.png',
    year: 2024,
    heroImage: '/images/cases/ark-oto.png',
    outcomeLine: 'A regional campaign that made a technical brand feel approachable.',
    challenge:
      'Ark Oto offered reliable automotive services but looked interchangeable next to larger chain competitors.',
    approach:
      'We developed a local-trust campaign with bold visuals, service-specific offers, and consistent messaging across outdoor and digital.',
    result:
      'The campaign gave franchise locations a recognizable toolkit for local activation.',
    deliverables: [
      'Campaign concept',
      'Outdoor and print suite',
      'Social ad templates',
      'Radio and script copy',
      'Franchise rollout kit',
    ],
    work: {
      type: 'marketing',
      title: 'Campaign rollout',
      heroVisual: {
        src: '/images/cases/ark-oto.png',
        alt: 'Ark Oto campaign key visual',
        aspect: '16/9',
      },
      keyMessage: 'Expert care for the car you depend on.',
      audience: 'Vehicle owners in urban and suburban districts',
      channels: ['Outdoor', 'Meta ads', 'Radio', 'In-store'],
      assets: [
        { src: '/images/cases/ark-oto.png', alt: 'Billboard layout', aspect: '4/3' },
        { src: '/images/services/marketing-campaign.png', alt: 'Social ad templates', aspect: '4/3' },
        { src: '/images/services/branding-banners.png', alt: 'In-store poster', aspect: '4/3' },
        { src: '/images/services/web-shuaa.png', alt: 'Landing page hero', aspect: '16/9' },
      ],
    },
    relatedSlugs: ['annual-summit'],
  },
]

export function getAllProjects(): ProjectListItem[] {
  return PROJECT_DETAILS.map(
    ({ work: _work, relatedSlugs: _related, deliverables: _d, challenge: _c, approach: _a, result: _r, outcomeLine: _o, heroImage: _h, year: _y, ...list }) => list
  )
}

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return PROJECT_DETAILS.find((p) => p.slug === slug)
}

export function getRelatedProjects(project: ProjectDetail): ProjectDetail[] {
  return project.relatedSlugs
    .map((s) => getProjectBySlug(s))
    .filter((p): p is ProjectDetail => Boolean(p))
}

const SERVICE_MATCH: Record<string, ProjectServiceSlug> = {
  branding: 'branding',
  marketing: 'marketing',
  'social-media': 'social-media',
  'business-consulting': 'business-consulting',
  'web-development': 'web-development',
  'mobile-apps': 'mobile-apps',
}

export function getProjectsForService(slug: string): ProjectListItem[] {
  const service = SERVICE_MATCH[slug]
  if (!service) return getAllProjects().slice(0, 4)
  return getAllProjects().filter((p) => p.service === service)
}

export function getProjectsByService(service: ProjectServiceSlug): ProjectListItem[] {
  return getAllProjects().filter((p) => p.service === service)
}

export function getProjectServiceOptions(): { slug: ProjectServiceSlug; label: ProjectServiceLabel }[] {
  const seen = new Set<ProjectServiceSlug>()
  const options: { slug: ProjectServiceSlug; label: ProjectServiceLabel }[] = []

  for (const project of getAllProjects()) {
    if (seen.has(project.service)) continue
    seen.add(project.service)
    options.push({ slug: project.service, label: project.serviceLabel })
  }

  return options.sort((a, b) => a.label.localeCompare(b.label))
}

export function getProjectFieldOptions(): string[] {
  const fields = new Set(getAllProjects().map((p) => p.field))
  return [...fields].sort((a, b) => a.localeCompare(b))
}

export function filterProjects(
  projects: ProjectListItem[],
  filters: { service?: ProjectServiceSlug | null; field?: string | null }
): ProjectListItem[] {
  return projects.filter((project) => {
    if (filters.service && project.service !== filters.service) return false
    if (filters.field && project.field !== filters.field) return false
    return true
  })
}
