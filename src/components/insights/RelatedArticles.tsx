import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import type { InsightArticle } from '../../types/insights'
import { formatArticleDate } from '../../data/insights'

type RelatedArticlesProps = {
  articles: InsightArticle[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  const reduce = useReducedMotion() ?? false

  if (articles.length === 0) return null

  return (
    <section className="section-surface border-t border-sz-border py-16 lg:py-24">
      <div className="section-container">
        <h2
          className="text-sz-dark mb-10"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
          }}
        >
          Related reading
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={`/insights/${article.slug}`}
                className="group flex flex-col h-full overflow-card border border-sz-border bg-white shadow-sm"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={article.coverImage}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p
                    className="text-sz-interaction text-xs mb-2"
                    style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}
                  >
                    {article.service}
                  </p>
                  <h3
                    className="text-sz-dark group-hover:text-sz-interaction transition-colors duration-200 mb-3"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 17,
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    {article.title}
                  </h3>
                  <p
                    className="text-sz-primary/40 text-xs mt-auto pt-4 border-t border-sz-border"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {formatArticleDate(article.publishedAt)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
