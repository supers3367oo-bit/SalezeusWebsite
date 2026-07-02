import type { ServiceReview } from '../types/services'

/** Short CC0 speech sample for voice-note review demos */
const VOICE_SAMPLE =
  'https://upload.wikimedia.org/wikipedia/commons/transcoded/6/6c/En-us-do_you_speak_english.ogg/En-us-do_you_speak_english.ogg.mp3'

export const SERVICE_REVIEWS: Record<string, ServiceReview[]> = {
  branding: [
    {
      type: 'text',
      quote:
        'The identity system they built finally made our brand feel premium everywhere — from packaging to Instagram. Our team uses the guidelines daily.',
      author: 'Layla Mansour',
      company: 'Verde Cosmetics',
      role: 'Founder',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&q=80',
    },
    {
      type: 'voice',
      voiceNoteUrl: VOICE_SAMPLE,
      voiceDuration: '0:38',
      author: 'Dina Asaad',
      company: 'Luxe Events',
      role: 'Creative Director',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&q=80',
    },
    {
      type: 'text',
      quote:
        'We came in for a logo refresh and left with a full system our franchise partners can actually follow. Clear, practical, and beautiful.',
      author: 'Mohammed Al-Rashid',
      company: 'TechVenture ME',
      role: 'CEO',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80',
    },
  ],
  marketing: [
    {
      type: 'text',
      quote:
        'Their campaign creative doubled our click-through rate in the first month. Every asset felt on-brand and ready for the channels we run.',
      author: 'Nour Khalil',
      company: 'Bloom Retail',
      role: 'Marketing Director',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&q=80',
    },
    {
      type: 'voice',
      voiceNoteUrl: VOICE_SAMPLE,
      voiceDuration: '0:42',
      author: 'Tariq Mansour',
      company: 'FoodHub Group',
      role: 'Brand Manager',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&q=80',
    },
    {
      type: 'text',
      quote:
        'Launch week was smooth because the creative kits were modular — we could adapt for email, paid, and in-store without redesigning from scratch.',
      author: 'Sara Haddad',
      company: 'Nova Health',
      role: 'Product Lead',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&q=80',
    },
  ],
  'social-media': [
    {
      type: 'text',
      quote:
        'Our engagement tripled after they rebuilt our content pillars and templates. Posting finally feels consistent instead of chaotic.',
      author: 'Tariq Mansour',
      company: 'FoodHub Group',
      role: 'Brand Manager',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&q=80',
    },
    {
      type: 'voice',
      voiceNoteUrl: VOICE_SAMPLE,
      voiceDuration: '0:35',
      author: 'Dina Asaad',
      company: 'Luxe Events',
      role: 'Founder',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&q=80',
    },
    {
      type: 'text',
      quote:
        'The monthly kits save our team hours every week. Captions, visuals, and story frames all feel unmistakably ours.',
      author: 'Layla Mansour',
      company: 'Verde Cosmetics',
      role: 'Founder',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&q=80',
    },
  ],
  'business-consulting': [
    {
      type: 'text',
      quote:
        'The positioning workshop aligned our leadership team in two days. Messaging that used to take months of debate became a shared language.',
      author: 'James Okonkwo',
      company: 'Stackline',
      role: 'CEO',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&q=80',
    },
    {
      type: 'voice',
      voiceNoteUrl: VOICE_SAMPLE,
      voiceDuration: '0:48',
      author: 'Mohammed Al-Rashid',
      company: 'TechVenture ME',
      role: 'CEO',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80',
    },
    {
      type: 'text',
      quote:
        'We engaged them before a rebrand and it was the right call. Strategy clarity made every creative decision faster downstream.',
      author: 'Kerem Yilmaz',
      company: 'Ankara Digital',
      role: 'CTO',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&q=80',
    },
  ],
  'web-development': [
    {
      type: 'text',
      quote:
        'The new site loads fast, reads clearly on mobile, and our inquiry form conversions jumped within the first two weeks after launch.',
      author: 'Kerem Yilmaz',
      company: 'Ankara Digital',
      role: 'CTO',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&q=80',
    },
    {
      type: 'voice',
      voiceNoteUrl: VOICE_SAMPLE,
      voiceDuration: '0:40',
      author: 'Omar Faisal',
      company: 'Cartly',
      role: 'COO',
      rating: 4,
      avatar:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&q=80',
    },
    {
      type: 'text',
      quote:
        'CMS handoff was painless — our marketing team updates pages without touching code. Performance scores stayed green after launch.',
      author: 'Nour Khalil',
      company: 'Bloom Retail',
      role: 'Marketing Director',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&q=80',
    },
  ],
  'mobile-apps': [
    {
      type: 'text',
      quote:
        'The app feels native on both iOS and Android. Onboarding flows are clear and our App Store rating climbed after the redesign.',
      author: 'Sara Haddad',
      company: 'Nova Health',
      role: 'Product Lead',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&q=80',
    },
    {
      type: 'voice',
      voiceNoteUrl: VOICE_SAMPLE,
      voiceDuration: '0:44',
      author: 'James Okonkwo',
      company: 'Stackline',
      role: 'Engineering Manager',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&q=80',
    },
    {
      type: 'text',
      quote:
        'They shipped our MVP in ten weeks with a codebase we could extend. Store submission support alone saved us a lot of back-and-forth.',
      author: 'Omar Faisal',
      company: 'Cartly',
      role: 'COO',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&q=80',
    },
  ],
}

export function getReviewsForService(slug: string): ServiceReview[] {
  return SERVICE_REVIEWS[slug] ?? []
}
