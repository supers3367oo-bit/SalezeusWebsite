export type TeamMember = {
  /** 3D avatar shown by default */
  src: string
  /** Real photo shown on hover in About team section */
  realSrc: string
  name: string
  role: string
  firstName: string
  /** Hero watermark — first + last name when first name is too short */
  heroName: string
  /** Slightly smaller hero text when the full label is long */
  heroNameSize?: 'compact'
  /** Short credibility line — max 8 words */
  bio: string
  /** Longer copy for About page hover card */
  aboutBio: string
}

export const TEAM: TeamMember[] = [
  {
    src: '/team/t1.png',
    realSrc: '/team/real/tt1.png',
    name: 'Abdulkader Assani',
    role: 'Backend Developer',
    firstName: 'Abdulkader',
    heroName: 'Abdulkader',
    bio: 'Seven years building scalable, reliable backend systems.',
    aboutBio:
      'Meet Abd Alkader, our skilled Back-End Developer. He builds secure, scalable, and high-performance server-side systems, manages databases, and ensures smooth front-end to back-end integration. With a strong focus on clean architecture and security, Abd Alkader delivers reliable solutions that support business growth and long-term client success.',
  },
  {
    src: '/team/t10.png',
    realSrc: '/team/real/tt10.png',
    name: 'Aya Khairbek',
    role: 'Backend Developer',
    firstName: 'Aya',
    heroName: 'Aya Khairbek',
    bio: 'Five years engineering robust APIs and database systems.',
    aboutBio:
      'Meet Aya, our talented Back-End Developer and Software Engineer specializing in Laravel. She builds powerful back-end systems, designs efficient databases, ensures seamless server-UI integration, and develops custom admin panels with strong security and optimal performance. Aya delivers scalable, reliable solutions for long-term client success.',
  },
  {
    src: '/team/t11.png',
    realSrc: '/team/real/tt11.png',
    name: 'Ola Masoud',
    role: 'UI/UX Designer',
    firstName: 'Ola',
    heroName: 'Ola Masoud',
    bio: 'Six years designing intuitive experiences users truly trust.',
    aboutBio:
      'Meet Ola, our talented UI/UX Designer with expertise in Figma. She creates intuitive, user-centered digital experiences through user research, wireframes, and high-fidelity designs that blend functionality with visual appeal. Ola collaborates with teams to build scalable design systems and delivers seamless, engaging interfaces aligned with user needs and business goals.',
  },
  {
    src: '/team/t5.png',
    realSrc: '/team/real/tt5.png',
    name: 'Esraa Elnajjar',
    role: 'Frontend Developer',
    firstName: 'Esraa',
    heroName: 'Esraa Elnajjar',
    heroNameSize: 'compact',
    bio: 'Six years building polished, high-performance web interfaces.',
    aboutBio:
      'Meet Esraa, our skilled Front-End Developer. She transforms designs into responsive, interactive, and user-friendly interfaces using clean, efficient code. Specializing in modern web experiences, Esraa ensures websites are fast, accessible, and visually consistent across all devices, delivering seamless user experiences through close collaboration with designers and back-end teams.',
  },
  {
    src: '/team/t2.png',
    realSrc: '/team/real/t2.png',
    name: 'Heba Ghabab',
    role: 'Marketing / Media buyer',
    firstName: 'Heba',
    heroName: 'Heba Ghabab',
    bio: 'Six years driving growth through strategic marketing campaigns.',
    aboutBio:
      'Meet Heba, our Media Buyer specialized in planning and managing high-performing paid advertising campaigns across Facebook, Google, TikTok, and other platforms. She focuses on budget optimization, audience targeting, campaign analysis, and delivering strong ROI through data-driven strategies and continuous performance improvement.',
  },
  {
    src: '/team/t3.png',
    realSrc: '/team/real/t3.png',
    name: 'Muhammed Darwish',
    role: 'CEO · Graphic Designer',
    firstName: 'Muhammed',
    heroName: 'Muhammed',
    bio: 'Eight years leading brands with design and strategy.',
    aboutBio:
      'Meet Mohammad, our visionary CEO. He leads the agency with a strong focus on innovation, growth, and excellence. Mohammad oversees strategic direction, builds lasting client relationships, and ensures every project delivers exceptional quality. Passionate about digital transformation, he empowers the team to create impactful solutions that drive long-term brand success.',
  },
  {
    src: '/team/t4.png',
    realSrc: '/team/real/tt4.png',
    name: 'Aya Alkayali',
    role: 'Graphic Designer',
    firstName: 'Aya',
    heroName: 'Aya Alkayali',
    bio: 'Five years crafting distinctive visual identities for brands.',
    aboutBio:
      'Meet Aya, our passionate Graphic Designer. She transforms ideas into visually compelling designs that strengthen brand identity and boost audience engagement. With expertise in social media creatives, logos, branding, and marketing materials, Aya combines creativity with strategy to deliver clear, memorable, and impactful designs.',
  },
  
  {
    src: '/team/t6.png',
    realSrc: '/team/real/tt6.png',
    name: 'Haidy Tarek',
    role: 'Graphic Designer',
    firstName: 'Haidy',
    heroName: 'Haidy Tarek',
    bio: 'Five years designing bold visuals that convert audiences.',
    aboutBio:
      'Meet Haidy, our creative Graphic Designer. With a strong foundation in design principles, she transforms ideas into impactful visuals across print and digital media. Haidy specializes in logos, branding, social media content, marketing materials, and UI designs that effectively communicate messages and leave a lasting impression.',
  },
  {
    src: '/team/t7.png',
    realSrc: '/team/real/tt7.png',
    name: 'Alaa Elsayed',
    role: 'Content Creator',
    firstName: 'Alaa',
    heroName: 'Alaa Elsayed',
    bio: 'Seven years creating content that builds loyal audiences.',
    aboutBio:
      'Meet Alaa, our creative Content Writer. She transforms ideas into compelling stories and strategic content that strengthen brand identity and connect with audiences. Specializing in social media, website copy, campaigns, and marketing materials, Alaa crafts engaging messages that inspire action, build trust, and deliver real value.',
  },
  {
    src: '/team/t8.png',
    realSrc: '/team/real/tt8.png',
    name: 'Lora Taki Aldeen',
    role: 'Content Creator',
    firstName: 'Lora',
    heroName: 'Lora Taki Aldeen',
    heroNameSize: 'compact',
    bio: 'Six years shaping stories that drive real engagement.',
    aboutBio:
      'Meet Lora, our strategic Content Writer. With a deep understanding of digital trends and audience behavior, she creates compelling content that builds trust and strengthens brand connection. Lora develops engaging social media posts and content strategies that boost visibility, increase engagement, and drive long-term digital growth.',
  },
  {
    src: '/team/t9.png',
    realSrc: '/team/real/tt9.png',
    name: 'Ibrahim Nasser',
    role: 'SEO',
    firstName: 'Ibrahim',
    heroName: 'Ibrahim',
    bio: 'Five years ranking brands with proven SEO strategies.',
    aboutBio:
      'Meet Ibrahim, our experienced SEO Expert. He helps brands boost online visibility through effective keyword research, on-page and technical SEO, content optimization, and performance analysis. Combining data-driven insights with best practices, Ibrahim drives higher rankings, qualified traffic, and sustainable organic growth.',
  },
  
]

export const CITY_MARKERS = [
  { id: 'istanbul', lat: 41.0082, lng: 28.9784, parent: 'turkey' },
  { id: 'konya', lat: 37.8746, lng: 32.4932, parent: 'turkey' },
  { id: 'damascus', lat: 33.5138, lng: 36.2765, parent: 'syria' },
  { id: 'aleppo', lat: 36.2021, lng: 37.1343, parent: 'syria' },
] as const
