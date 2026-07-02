import { motion, useReducedMotion } from 'framer-motion'
import { Star } from 'lucide-react'
import VoiceNotePlayer from '../../ui/VoiceNotePlayer'
import type { ServiceReview } from '../../../types/services'

type Props = {
  serviceTitle: string
  reviews: ServiceReview[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? 'fill-sz-accent text-sz-accent' : 'text-sz-border'}
        />
      ))}
    </div>
  )
}

export default function ServiceReviews({ serviceTitle, reviews }: Props) {
  const reduce = useReducedMotion() ?? false

  if (reviews.length === 0) return null

  return (
    <section className="bg-white section-padding" id="service-reviews">
      <div className="section-container">
        <motion.div
          className="mb-10 lg:mb-14 max-w-2xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="label-tag mb-3 block">Client feedback</span>
          <h2
            className="text-sz-dark"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              lineHeight: 1.12,
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            Reviews for {serviceTitle.toLowerCase()}
          </h2>
          <p
            className="text-sz-secondary mt-4"
            style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7 }}
          >
            Real outcomes from clients who engaged us for this service — including written
            testimonials and voice notes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.article
              key={`${review.author}-${review.type}`}
              className="rounded-card border border-sz-border bg-sz-surface p-6 lg:p-7 flex flex-col min-h-[220px]"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-6%' }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-11 h-11 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p
                    className="text-sz-dark truncate"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600 }}
                  >
                    {review.author}
                  </p>
                  <p className="text-sz-secondary text-xs truncate">
                    {review.role}, {review.company}
                  </p>
                </div>
              </div>

              <StarRating rating={review.rating} />

              <div className="mt-4 flex-1">
                {review.type === 'text' && review.quote && (
                  <p
                    className="text-sz-primary"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7 }}
                  >
                    &ldquo;{review.quote}&rdquo;
                  </p>
                )}

                {review.type === 'voice' && review.voiceNoteUrl && (
                  <div className="space-y-3">
                    <p
                      className="text-sz-secondary text-sm"
                      style={{ fontFamily: 'var(--font-body)', lineHeight: 1.6 }}
                    >
                      Voice note from {review.author.split(' ')[0]}
                    </p>
                    <VoiceNotePlayer
                      src={review.voiceNoteUrl}
                      durationLabel={review.voiceDuration}
                    />
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
