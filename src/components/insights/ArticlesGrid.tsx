import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import type { IndustryCategory, InsightArticle } from '../../types/insights'
import Button from '../ui/Button'
import { formatArticleDate } from '../../data/insights'

type ArticlesGridProps = {
  articles: InsightArticle[]
  showEmptyState?: boolean
  onClearFilters?: () => void
  suggestedIndustries?: IndustryCategory[]
  onIndustrySelect?: (industry: IndustryCategory) => void
}

function ArticleCard({ article, index }: { article: InsightArticle; index: number }) {
  const reduce = useReducedMotion() ?? false

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/insights/${article.slug}`}
        className="group flex flex-col rounded-card overflow-hidden bg-white cursor-pointer h-full border border-sz-border"
      >
        <div className="aspect-square overflow-hidden">
          <img
            src={article.coverImage}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col gap-3 p-6 lg:p-8 flex-1">
          <time
            dateTime={article.publishedAt}
            className="text-sz-secondary"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              lineHeight: 1.4,
            }}
          >
            {formatArticleDate(article.publishedAt)}
          </time>

          <h3
            className="text-sz-dark group-hover:text-sz-interaction transition-colors duration-200"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1rem, 1.15vw, 1.125rem)',
              fontWeight: 600,
              lineHeight: 1.45,
              letterSpacing: '-0.01em',
            }}
          >
            {article.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ArticlesGrid({
  articles,
  showEmptyState = false,
  onClearFilters,
  suggestedIndustries = [],
  onIndustrySelect,
}: ArticlesGridProps) {
  if (showEmptyState) {
    return (
      <section className="section-surface pb-20 lg:pb-24">
        <div className="section-container py-16 lg:py-20 text-center max-w-lg mx-auto">
          <h2
            className="text-sz-dark mb-3"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.35rem, 2.5vw, 1.75rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            No articles match
          </h2>
          <p
            className="text-sz-primary/55 mb-8"
            style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.65 }}
          >
            Try clearing your filter or pick another industry below.
          </p>

          {onClearFilters && (
            <Button type="button" size="sm" onClick={onClearFilters} className="mb-8">
              Clear filter
            </Button>
          )}

          {suggestedIndustries.length > 0 && onIndustrySelect && (
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedIndustries.map((industry) => (
                <button
                  key={industry}
                  type="button"
                  onClick={() => onIndustrySelect(industry)}
                  className="px-4 py-2.5 rounded-full text-sm border border-sz-border bg-transparent text-sz-primary/65 hover:border-sz-interaction hover:text-sz-interaction transition-all duration-200 min-h-[44px]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {industry}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  if (articles.length === 0) {
    return null
  }

  return (
    <section className="section-surface pb-16 lg:pb-20">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={article.slug} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
