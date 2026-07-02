import type { ServiceDetail } from '../types/services'

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: 'branding',
    title: 'Branding',
    tagline: 'Identity systems built to be remembered.',
    desc: 'Distinctive visual identities, brand systems, and print materials that make your business impossible to forget.',
    image: '/images/services/branding-stationery.png',
    variant: 'showcase',
    float: 0,
    heroSummary: 'We build visual identities that hold together across every touchpoint, from first impression to long-term loyalty.',
    about: {
      headline: 'A brand is more than a logo. It is the story people repeat about you.',
      paragraphs: [
        'Our branding work starts with strategic clarity: who you serve, what you stand for, and how you should sound in the market. From there we design systems that scale across digital, print, and physical environments.',
        'Every identity we ship includes practical guidelines and production-ready assets so your team can execute with confidence long after launch.',
      ],
      outcomes: [
        { label: 'Engagement model', value: 'Strategy-led identity build' },
        { label: 'Deliverable depth', value: 'Full identity system' },
        { label: 'Best for', value: 'New launches and repositioning' },
      ],
    },
    included: [
      { title: 'Brand strategy workshop', description: 'Positioning, audience mapping, and competitive framing to anchor creative decisions.' },
      { title: 'Logo and mark system', description: 'Primary, secondary, and responsive lockups with clear usage rules.' },
      { title: 'Color and typography', description: 'Accessible palettes and type pairings with hierarchy for web and print.' },
      { title: 'Brand guidelines', description: 'A practical playbook your team can follow without guesswork.' },
      { title: 'Stationery and print', description: 'Business cards, letterheads, and collateral templates ready for production.' },
      { title: 'Social and digital kits', description: 'Profile assets, templates, and export specs for consistent rollout.' },
    ],
    industries: [
      { industry: 'Healthcare', headline: 'Trust-first identity for regulated markets', body: 'Clear visual language that communicates credibility without feeling clinical or cold.' },
      { industry: 'E-commerce', headline: 'Shelf-ready brand systems', body: 'Packaging, storefront, and campaign assets that stay cohesive at speed.' },
      { industry: 'Technology', headline: 'Product-led brands with personality', body: 'Identities that feel modern and human while supporting rapid product iteration.' },
      { industry: 'Fashion', headline: 'Editorial-grade visual worlds', body: 'Lookbooks, campaigns, and digital presence with a consistent point of view.' },
    ],
    process: [
      { title: 'Discover', description: 'Stakeholder interviews, market review, and creative direction alignment.', duration: '1 week' },
      { title: 'Define', description: 'Moodboards, naming support if needed, and strategic brand territories.', duration: '1 week' },
      { title: 'Design', description: 'Logo exploration, system build, and application mockups.', duration: '2 weeks' },
      { title: 'Document', description: 'Guidelines, asset exports, and handoff for your team.', duration: '1 week' },
      { title: 'Launch', description: 'Rollout support and quality review across first live touchpoints.', duration: 'Ongoing' },
    ],
    faqs: [
      { question: 'Do you only design logos?', answer: 'No. We deliver full identity systems: strategy, visual language, guidelines, and launch assets. The logo is one part of a larger toolkit.' },
      { question: 'Can you refresh an existing brand instead of starting over?', answer: 'Yes. Many clients come to us for a strategic refresh that keeps equity while modernizing how the brand shows up.' },
      { question: 'Will we own the final files?', answer: 'You receive full ownership of approved deliverables, source files, and export packages at project completion.' },
      { question: 'Do you handle print production?', answer: 'We prepare print-ready files and can coordinate with vendors. Production is quoted separately when needed.' },
    ],
  },
  {
    slug: 'marketing',
    title: 'Marketing',
    tagline: 'Campaigns engineered for attention and conversion.',
    desc: 'Campaigns and creative assets engineered to capture attention and turn it into measurable growth.',
    image: '/images/services/marketing-campaign.png',
    variant: 'showcase',
    float: 28,
    heroSummary: 'From concept to channel rollout, we build campaigns that look premium and perform under real market pressure.',
    about: {
      headline: 'Creative that earns its place in the feed and its seat at the table.',
      paragraphs: [
        'We pair sharp messaging with production-quality visuals across paid, owned, and earned channels. Every asset is built with the funnel in mind: awareness, consideration, and action.',
        'Our team works fast without sacrificing craft, so you can test, learn, and scale what works.',
      ],
      outcomes: [
        { label: 'Campaign cadence', value: 'Sprint or monthly retainer' },
        { label: 'Channels', value: 'Paid, email, OOH, digital' },
        { label: 'Best for', value: 'Launches and growth pushes' },
      ],
    },
    included: [
      { title: 'Campaign strategy', description: 'Audience, offer framing, channel mix, and success metrics defined up front.' },
      { title: 'Creative direction', description: 'Visual and verbal concept that ties every asset together.' },
      { title: 'Ad creative suites', description: 'Static and motion assets sized for major platforms.' },
      { title: 'Landing page creative', description: 'Hero visuals and section art aligned with campaign messaging.' },
      { title: 'Email and nurture kits', description: 'Templates and sequences that match the campaign look and tone.' },
      { title: 'Performance iteration', description: 'Variant sets for testing headlines, visuals, and CTAs.' },
    ],
    industries: [
      { industry: 'E-commerce', headline: 'Seasonal pushes that convert', body: 'Offer-led creative with clear product storytelling and urgency without cheap tricks.' },
      { industry: 'Automotive', headline: 'High-impact launch campaigns', body: 'Bold visuals and dealer-ready asset kits for multi-market rollouts.' },
      { industry: 'Tourism', headline: 'Destination campaigns with pull', body: 'Emotive photography direction and channel packs built for discovery.' },
      { industry: 'Startups', headline: 'Launch campaigns on lean budgets', body: 'Modular creative systems you can extend as channels scale.' },
    ],
    process: [
      { title: 'Brief', description: 'Goals, audience, offer, and channel requirements locked in.', duration: '3-5 days' },
      { title: 'Concept', description: 'Territories, messaging routes, and visual directions presented.', duration: '1 week' },
      { title: 'Produce', description: 'Asset production across formats with brand consistency.', duration: '2-4 weeks' },
      { title: 'Deploy', description: 'Handoff, trafficking support, and launch QA.', duration: '3-5 days' },
      { title: 'Optimize', description: 'Review performance data and ship iterative variants.', duration: 'Ongoing' },
    ],
    faqs: [
      { question: 'Do you manage ad spend?', answer: 'We focus on creative and strategy. Media buying can be coordinated with your in-house team or partner agencies.' },
      { question: 'Can you work within our existing brand guidelines?', answer: 'Absolutely. We often extend established systems with campaign-specific expressions.' },
      { question: 'How many creative variants do we get?', answer: 'Scope defines volume. We typically plan primary concepts plus test variants for key channels.' },
      { question: 'Do you create video?', answer: 'Yes. Short-form motion for social and ads is part of many marketing engagements.' },
    ],
  },
  {
    slug: 'social-media',
    title: 'Social Media',
    tagline: 'Content systems that build community and drive action.',
    desc: 'Scroll-stopping content and cohesive social presence that builds community and drives engagement.',
    image: '/images/services/social-branding.png',
    variant: 'showcase',
    float: 12,
    heroSummary: 'We design social presence as a brand channel, not an afterthought: consistent, on-voice, and built to perform.',
    about: {
      headline: 'Your feed should feel unmistakably yours within three seconds.',
      paragraphs: [
        'We build content frameworks, templates, and production rhythms that keep quality high without burning out your team. Strategy and execution stay connected.',
        'From reels to carousels to story systems, every format serves a role in how your audience discovers and trusts you.',
      ],
      outcomes: [
        { label: 'Content rhythm', value: 'Weekly kits + monthly review' },
        { label: 'Formats', value: 'Reels, static, stories, carousels' },
        { label: 'Best for', value: 'Brands scaling content output' },
      ],
    },
    included: [
      { title: 'Channel audit', description: 'Review of current presence, competitors, and content gaps.' },
      { title: 'Content pillars', description: 'Themes and messaging lanes that make planning predictable.' },
      { title: 'Template library', description: 'Reusable layouts for posts, stories, and campaigns.' },
      { title: 'Monthly content kits', description: 'Ready-to-publish assets with captions and hashtags.' },
      { title: 'Community tone guide', description: 'Voice rules for replies, DMs, and crisis moments.' },
      { title: 'Analytics review', description: 'Monthly read on what is working and what to change.' },
    ],
    industries: [
      { industry: 'Restaurants', headline: 'Food content that drives visits', body: 'Menu highlights, atmosphere, and promo content tuned for local discovery.' },
      { industry: 'Fashion', headline: 'Editorial social with commerce intent', body: 'Look-driven content that supports launches and always-on storytelling.' },
      { industry: 'Real Estate', headline: 'Listings that stand out in the scroll', body: 'Property showcases and agent personal brands with a premium feel.' },
      { industry: 'Medical Tourism', headline: 'Trust-building social for high-consideration choices', body: 'Patient stories, facility tours, and educational content with care.' },
    ],
    process: [
      { title: 'Audit', description: 'Channels, audience, and content performance baseline.', duration: '1 week' },
      { title: 'Plan', description: 'Pillars, calendar architecture, and template direction.', duration: '1 week' },
      { title: 'Create', description: 'Template build and first month of content production.', duration: '2 weeks' },
      { title: 'Publish', description: 'Scheduling support and launch of the new system.', duration: '3-5 days' },
      { title: 'Refine', description: 'Monthly optimization based on engagement data.', duration: 'Ongoing' },
    ],
    faqs: [
      { question: 'Do you post on our behalf?', answer: 'We can provide ready-to-publish kits or manage posting through agreed workflows and approvals.' },
      { question: 'How many posts per month?', answer: 'Volume is scoped per engagement. Most retainers cover 12-20 pieces plus stories support.' },
      { question: 'Can you shoot content?', answer: 'We plan shoots and work with photographers or your in-house team depending on location and budget.' },
      { question: 'Do you handle influencer collaborations?', answer: 'We can brief creators and review deliverables as part of a broader campaign scope.' },
    ],
  },
  {
    slug: 'business-consulting',
    title: 'Business Consulting',
    tagline: 'Strategic clarity before creative execution.',
    desc: 'Strategic clarity for positioning, messaging, and go-to-market decisions that accelerate results.',
    image: '/images/services/consulting-brand.png',
    variant: 'showcase',
    float: 36,
    heroSummary: 'We help leadership teams make sharper decisions about positioning, messaging, and growth before a single pixel is designed.',
    about: {
      headline: 'Strategy is not a deck. It is the filter for every decision that follows.',
      paragraphs: [
        'Our consulting work bridges market reality and creative ambition. We facilitate workshops, build messaging frameworks, and define go-to-market priorities your whole organization can align around.',
        'Clients often engage us upstream of branding or marketing projects so execution moves faster and stays on strategy.',
      ],
      outcomes: [
        { label: 'Workshop depth', value: 'Half-day to multi-day' },
        { label: 'Format', value: 'Workshops and playbooks' },
        { label: 'Best for', value: 'Leadership alignment' },
      ],
    },
    included: [
      { title: 'Stakeholder workshops', description: 'Facilitated sessions to surface goals, tensions, and opportunities.' },
      { title: 'Market and competitor review', description: 'Structured analysis of category dynamics and white space.' },
      { title: 'Positioning framework', description: 'Clear statement of who you serve, why you win, and how you differ.' },
      { title: 'Messaging architecture', description: 'Pillars, proof points, and elevator narratives for every audience.' },
      { title: 'Go-to-market priorities', description: 'Channel and initiative sequencing tied to business goals.' },
      { title: 'Executive summary', description: 'A concise playbook leadership can share internally.' },
    ],
    industries: [
      { industry: 'Technology', headline: 'Positioning for crowded categories', body: 'Differentiation narratives that survive technical depth and investor scrutiny.' },
      { industry: 'Manufacturing', headline: 'B2B messaging that closes', body: 'Value props translated for procurement, operations, and leadership buyers.' },
      { industry: 'Startups', headline: 'Foundation before fundraise or launch', body: 'Story and GTM clarity for pitch decks, sales, and first campaigns.' },
      { industry: 'Healthcare', headline: 'Compliance-aware positioning', body: 'Messaging that builds trust while respecting regulatory boundaries.' },
    ],
    process: [
      { title: 'Listen', description: 'Interviews with leadership, sales, and customer-facing teams.', duration: '1 week' },
      { title: 'Analyze', description: 'Market mapping and opportunity framing.', duration: '1 week' },
      { title: 'Workshop', description: 'On-site or remote sessions to align on direction.', duration: '2-3 days' },
      { title: 'Document', description: 'Playbooks, frameworks, and recommendation decks.', duration: '1 week' },
      { title: 'Activate', description: 'Handoff to branding, marketing, or internal rollout.', duration: 'Ongoing' },
    ],
    faqs: [
      { question: 'Is this separate from branding work?', answer: 'It can be standalone or the first phase of a larger engagement. Many clients start here, then move into identity or campaigns.' },
      { question: 'Who should attend workshops?', answer: 'We recommend a mix of leadership, marketing, sales, and product voices for the best alignment.' },
      { question: 'Do you implement the strategy?', answer: 'Yes. Salezeus can carry strategy directly into creative execution without handoff friction.' },
      { question: 'How confidential is the work?', answer: 'All engagements are covered by mutual NDA. Your data and insights stay private.' },
    ],
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    tagline: 'Fast, polished websites built to convert.',
    desc: 'High-performance websites with polished interfaces, built to convert visitors into loyal customers.',
    image: '/images/services/web-development.png',
    variant: 'browser',
    float: 8,
    heroSummary: 'We ship websites that look premium, load fast, and guide visitors toward action with intentional UX.',
    about: {
      headline: 'Your website is your hardest-working salesperson. It should perform like one.',
      paragraphs: [
        'We design and build marketing sites, product landing pages, and multi-page experiences with modern stacks, accessible markup, and performance budgets that respect your audience.',
        'Every project includes responsive QA, analytics setup, and a CMS or handoff approach your team can maintain.',
      ],
      outcomes: [
        { label: 'Post-launch support', value: 'Included for 30 days' },
        { label: 'Stack', value: 'React, Next.js, headless CMS' },
        { label: 'Best for', value: 'Marketing and product sites' },
      ],
    },
    included: [
      { title: 'UX and wireframes', description: 'User flows and page structure before visual design.' },
      { title: 'UI design', description: 'High-fidelity screens aligned with your brand system.' },
      { title: 'Front-end development', description: 'Responsive, accessible implementation with motion where it helps.' },
      { title: 'CMS integration', description: 'Editable content areas for your marketing team.' },
      { title: 'SEO foundation', description: 'Semantic structure, meta templates, and performance basics.' },
      { title: 'Launch support', description: 'DNS, hosting coordination, and post-launch fixes.' },
    ],
    industries: [
      { industry: 'E-commerce', headline: 'Storefronts that support the sale', body: 'Product storytelling, collection pages, and checkout-adjacent experiences.' },
      { industry: 'Education', headline: 'Enrollment-focused web experiences', body: 'Program pages, application flows, and content hubs for institutions.' },
      { industry: 'Real Estate', headline: 'Property and developer sites', body: 'Listing showcases, lead capture, and bilingual experiences when needed.' },
      { industry: 'Tourism', headline: 'Booking-ready destination sites', body: 'Immersive visuals with clear paths to inquiry or reservation.' },
    ],
    process: [
      { title: 'Scope', description: 'Sitemap, features, integrations, and timeline agreed.', duration: '1 week' },
      { title: 'Design', description: 'Wireframes through UI sign-off.', duration: '2-3 weeks' },
      { title: 'Build', description: 'Development sprints with weekly reviews.', duration: '3-5 weeks' },
      { title: 'Test', description: 'Cross-browser, accessibility, and performance passes.', duration: '1 week' },
      { title: 'Ship', description: 'Deploy, train your team, and monitor early traffic.', duration: '3-5 days' },
    ],
    faqs: [
      { question: 'Do you build e-commerce stores?', answer: 'Yes. We work with Shopify and custom storefronts depending on catalog complexity and integrations.' },
      { question: 'Can you redesign our existing site?', answer: 'Yes. We audit what to keep, migrate content, and improve UX without unnecessary rebuilds.' },
      { question: 'Who maintains the site after launch?', answer: 'We offer retainers for updates, or train your team to manage content through the CMS.' },
      { question: 'Is hosting included?', answer: 'Hosting is client-owned or arranged through our partners. We recommend setups based on traffic and region.' },
    ],
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile Apps',
    tagline: 'Native-feel experiences users actually keep.',
    desc: 'Native-feel mobile experiences with intuitive UI, smooth flows, and the polish users expect.',
    image: '/images/services/app-rabbit-phone.png',
    variant: 'phone',
    float: 20,
    heroSummary: 'From onboarding to retention, we design and build mobile products that feel intentional on every screen.',
    about: {
      headline: 'Users forgive slow features less than they forgive confusing ones.',
      paragraphs: [
        'We craft mobile UI with clear hierarchy, thoughtful motion, and flows that respect platform conventions while staying on brand.',
        'Whether you need an MVP or a redesign of an existing app, we balance speed to market with the polish that earns reviews and retention.',
      ],
      outcomes: [
        { label: 'Release scope', value: 'MVP through full product' },
        { label: 'Platforms', value: 'iOS, Android, cross-platform' },
        { label: 'Best for', value: 'Consumer and B2B apps' },
      ],
    },
    included: [
      { title: 'Product discovery', description: 'User journeys, feature prioritization, and technical feasibility.' },
      { title: 'UI and interaction design', description: 'Screen flows, components, and motion specs.' },
      { title: 'Prototype', description: 'Clickable prototype for testing before build.' },
      { title: 'Development', description: 'React Native or native builds with clean architecture.' },
      { title: 'QA and device testing', description: 'Real-device passes across target OS versions.' },
      { title: 'Store submission support', description: 'Assets, listings, and review guidance for App Store and Play.' },
    ],
    industries: [
      { industry: 'Healthcare', headline: 'Patient and provider apps with care', body: 'Accessible UI and privacy-conscious flows for sensitive data.' },
      { industry: 'Education', headline: 'Learning apps that keep students engaged', body: 'Progress tracking, content delivery, and offline-friendly patterns.' },
      { industry: 'E-commerce', headline: 'Shopping apps that convert', body: 'Browse, wishlist, and checkout flows optimized for mobile habits.' },
      { industry: 'Startups', headline: 'MVPs that validate fast', body: 'Focused feature sets and scalable foundations for iteration.' },
    ],
    process: [
      { title: 'Define', description: 'Requirements, personas, and success metrics.', duration: '1-2 weeks' },
      { title: 'Design', description: 'Flows, UI kit, and prototype validation.', duration: '2-3 weeks' },
      { title: 'Develop', description: 'Sprint-based build with demo cadence.', duration: '4-8 weeks' },
      { title: 'Test', description: 'QA, beta feedback, and polish pass.', duration: '1-2 weeks' },
      { title: 'Release', description: 'Store launch and post-release monitoring.', duration: '1 week' },
    ],
    faqs: [
      { question: 'Do you build for both iOS and Android?', answer: 'Yes. We often use React Native for shared codebases, or native when platform-specific features demand it.' },
      { question: 'Can you work with our existing backend?', answer: 'Yes. We integrate with your APIs or recommend backend partners when needed.' },
      { question: 'Do you only design, or also develop?', answer: 'Both. Design-only engagements are available, but most clients engage us end to end.' },
      { question: 'What happens after launch?', answer: 'We offer maintenance retainers for updates, OS compatibility, and feature roadmaps.' },
    ],
  },
]

export function getServiceBySlug(slug: string | undefined): ServiceDetail | undefined {
  if (!slug) return undefined
  return SERVICE_DETAILS.find((s) => s.slug === slug)
}

export function getOtherServices(currentSlug: string): ServiceDetail[] {
  return SERVICE_DETAILS.filter((s) => s.slug !== currentSlug)
}
