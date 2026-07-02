export type TeamMember = {
  src: string
  name: string
  role: string
  firstName: string
  /** Hero watermark — first + last name when first name is too short */
  heroName: string
  /** Slightly smaller hero text when the full label is long */
  heroNameSize?: 'compact'
  /** Short credibility line — max 8 words */
  bio: string
}

export const TEAM: TeamMember[] = [
  {
    src: '/team/t1.png',
    name: 'Abdulkader Assani',
    role: 'Backend Developer',
    firstName: 'Abdulkader',
    heroName: 'Abdulkader',
    bio: 'Seven years building scalable, reliable backend systems.',
  },
  {
    src: '/team/t2.png',
    name: 'Heba Ghabab',
    role: 'Marketing',
    firstName: 'Heba',
    heroName: 'Heba Ghabab',
    bio: 'Six years driving growth through strategic marketing campaigns.',
  },
  {
    src: '/team/t3.png',
    name: 'Muhammed Darwish',
    role: 'CEO · Graphic Designer',
    firstName: 'Muhammed',
    heroName: 'Muhammed',
    bio: 'Eight years leading brands with design and strategy.',
  },
  {
    src: '/team/t4.png',
    name: 'Aya Alkayali',
    role: 'Graphic Designer',
    firstName: 'Aya',
    heroName: 'Aya Alkayali',
    bio: 'Five years crafting distinctive visual identities for brands.',
  },
  {
    src: '/team/t5.png',
    name: 'Esraa Elnajjar',
    role: 'Frontend Developer',
    firstName: 'Esraa',
    heroName: 'Esraa Elnajjar',
    heroNameSize: 'compact',
    bio: 'Six years building polished, high-performance web interfaces.',
  },
  {
    src: '/team/t6.png',
    name: 'Haidy Tarek',
    role: 'Graphic Designer',
    firstName: 'Haidy',
    heroName: 'Haidy Tarek',
    bio: 'Five years designing bold visuals that convert audiences.',
  },
  {
    src: '/team/t7.png',
    name: 'Alaa Elsayed',
    role: 'Content Creator',
    firstName: 'Alaa',
    heroName: 'Alaa Elsayed',
    bio: 'Seven years creating content that builds loyal audiences.',
  },
  {
    src: '/team/t8.png',
    name: 'Lora Taki Aldeen',
    role: 'Content Creator',
    firstName: 'Lora',
    heroName: 'Lora Taki Aldeen',
    heroNameSize: 'compact',
    bio: 'Six years shaping stories that drive real engagement.',
  },
  {
    src: '/team/t9.png',
    name: 'Ibrahim Naser',
    role: 'SEO',
    firstName: 'Ibrahim',
    heroName: 'Ibrahim',
    bio: 'Five years ranking brands with proven SEO strategies.',
  },
  {
    src: '/team/t10.png',
    name: 'Aya Khairbek',
    role: 'Backend Developer',
    firstName: 'Aya',
    heroName: 'Aya Khairbek',
    bio: 'Five years engineering robust APIs and database systems.',
  },
  {
    src: '/team/t11.png',
    name: 'Ola Masoud',
    role: 'UI/UX Designer',
    firstName: 'Ola',
    heroName: 'Ola Masoud',
    bio: 'Six years designing intuitive experiences users truly trust.',
  },
]
