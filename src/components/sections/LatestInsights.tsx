import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SplitText from '../ui/SplitText'
import Button from '../ui/Button'
import { getArticlesForHome, formatArticleDate } from '../../data/insights'

export default function LatestInsights() {
  const articles = getArticlesForHome(3)

  return (
    <section className="section-surface section-padding" id="insights">
      <div className="section-container">

        <div className="section-header section-header-row">
          <div>
            <span className="label-tag mb-3 block">Latest Insights</span>
            <h2 className="heading-lg text-sz-dark whitespace-nowrap">
              <SplitText
                text="From Our Blog"
                repeat
                stagger={0.14}
                duration={1.2}
              />
            </h2>
          </div>
          <Button to="/insights" size="sm" className="hidden lg:inline-flex">
            View All Articles
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
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
          ))}
        </div>

        <div className="mt-8 lg:hidden text-center">
          <Button to="/insights" size="sm">
            View All Articles
          </Button>
        </div>

      </div>
    </section>
  )
}
