import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import type { InsightArticle } from '../../types/insights'
import Button from '../ui/Button'
import { formatArticleDate } from '../../data/insights'

type FeaturedInsightProps = {
  article: InsightArticle
  label?: string
}

export default function FeaturedInsight({
  article,
  label = "Editor's pick",
}: FeaturedInsightProps) {
  const reduce = useReducedMotion() ?? false

  return (
    <section className="section-surface pb-12 lg:pb-16">
      <div className="section-container">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-sz-interaction mb-6 text-sm font-medium"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {label}
          </p>

          <Link
            to={`/insights/${article.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
          >
            <div className="lg:col-span-7 overflow-card border border-sz-border bg-white shadow-sm aspect-[16/10]">
              <img
                src={article.coverImage}
                alt=""
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center py-2 lg:py-6">
              <div className="flex flex-wrap items-center gap-2 mb-5 text-xs">
                <span
                  className="text-sz-interaction"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {article.service}
                </span>
                <span className="text-sz-secondary">/</span>
                <span
                  className="text-sz-primary/45"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {article.industry}
                </span>
              </div>

              <h2
                className="text-sz-dark mb-5 group-hover:text-sz-interaction transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)',
                  lineHeight: 1.12,
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                }}
              >
                {article.title}
              </h2>

              <p
                className="text-sz-primary/55 mb-8 max-w-md"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 16,
                  lineHeight: 1.75,
                }}
              >
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between gap-4 mt-auto pt-4 border-t border-sz-border">
                <div>
                  <p
                    className="text-sz-dark"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500 }}
                  >
                    {article.author.name}
                  </p>
                  <p
                    className="text-sz-primary/45"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 13 }}
                  >
                    {formatArticleDate(article.publishedAt)} · {article.readingTimeMinutes} min read
                  </p>
                </div>
                <Button as="span" size="sm" className="shrink-0 pointer-events-none">
                  Read
                </Button>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
