import { useState } from 'react'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import SplitText from '../ui/SplitText'
import Button from '../ui/Button'

const REVIEWS = [
  {
    quote: 'Salezeus completely transformed our brand identity. Our revenue grew 3× within six months of the rebrand launch.',
    author: 'Mohammed Al-Rashid',
    company: 'TechVenture ME',
    role: 'CEO',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80',
  },
  {
    quote: 'Their data-driven marketing strategy delivered a 240% increase in qualified leads within the first quarter.',
    author: 'Nour Khalil',
    company: 'Bloom Retail',
    role: 'Marketing Director',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&q=80',
  },
  {
    quote: 'The web platform they built handles 50,000+ daily active users with zero downtime. Exceptional technical quality.',
    author: 'Kerem Yilmaz',
    company: 'Ankara Digital',
    role: 'CTO',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&q=80',
  },
  {
    quote: 'Working with Salezeus felt like having an elite in-house team. They genuinely care about our business outcomes.',
    author: 'Dina Asaad',
    company: 'Luxe Events',
    role: 'Founder',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&q=80',
  },
  {
    quote: 'Their social media management tripled our engagement in 60 days. The content quality is consistently outstanding.',
    author: 'Tariq Mansour',
    company: 'FoodHub Group',
    role: 'Brand Manager',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&q=80',
  },
  {
    quote: 'From strategy to execution, every deliverable was on brand and on time. Our product launch exceeded every KPI we set.',
    author: 'Sara Haddad',
    company: 'Nova Health',
    role: 'Product Lead',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&q=80',
  },
  {
    quote: 'The UI/UX redesign cut our checkout abandonment in half. Clear communication and sharp design thinking throughout.',
    author: 'Omar Faisal',
    company: 'Cartly',
    role: 'COO',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&q=80',
  },
  {
    quote: 'Salezeus helped us reposition in a crowded market. The new messaging resonated immediately with our audience.',
    author: 'Layla Mansour',
    company: 'Verde Cosmetics',
    role: 'Founder',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&q=80',
  },
  {
    quote: 'Reliable partners for complex builds. They anticipated issues early and kept stakeholders aligned every sprint.',
    author: 'James Okonkwo',
    company: 'Stackline',
    role: 'Engineering Manager',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&q=80',
  },
]

const INITIAL_COUNT = 3
const MORE_COUNT = 6

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'fill-sz-accent text-sz-accent' : 'text-sz-border'}
        />
      ))}
    </div>
  )
}

export default function ClientReviews() {
  const [expanded, setExpanded] = useState(false)

  const visibleReviews = expanded
    ? REVIEWS.slice(0, INITIAL_COUNT + MORE_COUNT)
    : REVIEWS.slice(0, INITIAL_COUNT)

  const canShowMore = REVIEWS.length > INITIAL_COUNT && !expanded

  return (
    <section className="bg-white section-padding" id="reviews">
      <div className="section-container">
        <div className="section-header section-header-row">
          <div>
            <span className="label-tag mb-3 block">Client Reviews</span>
            <h2 className="heading-lg text-sz-dark whitespace-nowrap">
              <SplitText
                text="What Our Clients Say"
                repeat
                stagger={0.14}
                duration={1.2}
              />
            </h2>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} size={13} className="fill-sz-accent text-sz-accent" />
            ))}
            <span className="text-sz-secondary text-xs ml-2">5.0 average</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleReviews.map((review, i) => (
            <motion.div
              key={review.author}
              className="bg-sz-surface rounded-card overflow-hidden p-8 shadow-sm flex flex-col"
              initial={i >= INITIAL_COUNT ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i >= INITIAL_COUNT ? (i - INITIAL_COUNT) * 0.06 : 0, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <p
                    className="font-heading font-bold text-sz-dark truncate"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: 16 }}
                  >
                    {review.author}
                  </p>
                  <p className="text-sz-secondary text-xs truncate">
                    {review.role}, {review.company}
                  </p>
                </div>
              </div>

              <StarRating rating={review.rating} />

              <p
                className="text-sz-primary font-body leading-relaxed flex-1 mt-4"
                style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7 }}
              >
                {review.quote}
              </p>
            </motion.div>
          ))}
        </div>

        {canShowMore && (
          <div className="flex justify-center mt-10">
            <Button size="sm" showIcon={false} onClick={() => setExpanded(true)}>
              More
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
