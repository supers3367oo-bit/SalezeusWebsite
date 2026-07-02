export type MockupVariant = 'browser' | 'phone' | 'showcase'

export type Service = {
  slug: string
  title: string
  desc: string
  image: string
  variant: MockupVariant
  float: number
}

export type ServiceProcessStep = {
  title: string
  description: string
  duration: string
}

export type ServiceFAQ = {
  question: string
  answer: string
}

export type ServiceReview = {
  author: string
  company: string
  role: string
  rating: number
  avatar: string
  type: 'text' | 'voice'
  quote?: string
  voiceNoteUrl?: string
  voiceDuration?: string
}

export type ServiceIndustryNote = {
  industry: string
  headline: string
  body: string
}

export type ServiceDetail = Service & {
  tagline: string
  heroSummary: string
  about: {
    headline: string
    paragraphs: string[]
    outcomes: { label: string; value: string }[]
  }
  included: {
    title: string
    description: string
  }[]
  industries: ServiceIndustryNote[]
  process: ServiceProcessStep[]
  faqs: ServiceFAQ[]
}
