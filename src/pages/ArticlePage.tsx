import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import ArticleHero from '../components/insights/ArticleHero'
import ArticleTOC, { ArticleTOCMobile } from '../components/insights/ArticleTOC'
import ArticleBody from '../components/insights/ArticleBody'
import RelatedArticles from '../components/insights/RelatedArticles'
import ArticleEndCTA from '../components/insights/ArticleEndCTA'
import ArticleShare from '../components/insights/ArticleShare'
import ArticleSEO from '../components/seo/ArticleSEO'
import { extractHeadings, getRelatedArticles } from '../data/insights'
import { refreshLocomotiveScroll } from '../lib/locomotive'
import { useLocale } from '../providers/LocaleProvider'
import { useArticle, useInsightArticles } from '../i18n/useLocalizedData'

export default function ArticlePage() {
  const { locale, t } = useLocale()
  const { slug } = useParams<{ slug: string }>()
  const article = useArticle(slug)
  const allArticles = useInsightArticles()

  useEffect(() => {
    requestAnimationFrame(() => refreshLocomotiveScroll())
  }, [slug])

  if (!article) {
    return (
      <section className="section-surface min-h-[60vh] flex items-center pt-28">
        <div className="section-container text-center w-full">
          <h1
            className="text-sz-dark mb-4"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 600 }}
          >
            {t('errors.articleNotFound')}
          </h1>
          <Button to="/insights" size="sm">
            {t('errors.backToInsights')}
          </Button>
        </div>
      </section>
    )
  }

  const headings = extractHeadings(article.content)
  const related = allArticles
    .filter((item) => item.slug !== article.slug)
    .filter(
      (item) =>
        item.service === article.service ||
        item.industry === article.industry ||
        item.topics.some((topic) => article.topics.includes(topic)),
    )
    .slice(0, 3)
  const relatedFallback =
    related.length > 0
      ? related
      : getRelatedArticles(article, 3, locale)

  return (
    <>
      <ArticleSEO article={article} />
      <ArticleHero article={article} />

      <section className="section-surface py-14 lg:py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-32 space-y-10">
                <ArticleTOC items={headings} />
                <ArticleShare slug={article.slug} title={article.title} />
              </div>
            </aside>

            <article className="lg:col-span-7 lg:col-start-5 max-w-[65ch] lg:max-w-none">
              <ArticleTOCMobile items={headings} />
              <div className="mb-10 lg:hidden">
                <ArticleShare slug={article.slug} title={article.title} />
              </div>
              <ArticleBody blocks={article.content} />
            </article>
          </div>
        </div>
      </section>

      <RelatedArticles articles={relatedFallback} />
      <ArticleEndCTA />
    </>
  )
}
