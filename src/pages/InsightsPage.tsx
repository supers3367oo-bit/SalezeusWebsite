import { useEffect, useMemo, useState } from 'react'
import InsightsHero from '../components/insights/InsightsHero'
import FeaturedInsight from '../components/insights/FeaturedInsight'
import InsightsFilters from '../components/insights/InsightsFilters'
import ArticlesGrid from '../components/insights/ArticlesGrid'
import InsightsEmptyState from '../components/insights/InsightsEmptyState'
import InsightsHubCTA from '../components/insights/InsightsHubCTA'
import { refreshLocomotiveScroll } from '../lib/locomotive'
import { useLocale } from '../providers/LocaleProvider'
import { useFeaturedArticle, useInsightArticles } from '../i18n/useLocalizedData'

export default function InsightsPage() {
  const { locale, t } = useLocale()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const allArticles = useInsightArticles()
  const featuredFallback = useFeaturedArticle()

  useEffect(() => {
    setActiveCategory(null)
  }, [locale])

  const filteredArticles = useMemo(() => {
    if (!activeCategory) return allArticles
    return allArticles.filter((article) => article.industry === activeCategory)
  }, [activeCategory, allArticles])

  const suggestedCategories = useMemo(() => {
    const counts = new Map<string, number>()
    for (const article of allArticles) {
      counts.set(article.industry, (counts.get(article.industry) ?? 0) + 1)
    }
    return [...counts.entries()]
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([industry]) => industry)
  }, [allArticles])

  const spotlightArticle = useMemo(() => {
    if (activeCategory) return null
    return featuredFallback
  }, [activeCategory, featuredFallback])

  const gridArticles = useMemo(() => {
    if (activeCategory) return filteredArticles
    if (!spotlightArticle) return filteredArticles
    return filteredArticles.filter((article) => article.slug !== spotlightArticle.slug)
  }, [activeCategory, filteredArticles, spotlightArticle])

  const showEmptyState = Boolean(activeCategory && filteredArticles.length === 0)

  const clearFilter = () => setActiveCategory(null)

  useEffect(() => {
    requestAnimationFrame(() => refreshLocomotiveScroll())
  }, [filteredArticles, spotlightArticle, showEmptyState, activeCategory])

  return (
    <>
      <InsightsHero />

      {spotlightArticle && (
        <FeaturedInsight
          article={spotlightArticle}
          label={t('insightsPage.editorsPick')}
        />
      )}

      <InsightsFilters
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onClearAll={clearFilter}
      />

      {showEmptyState ? (
        <InsightsEmptyState
          onClearFilters={clearFilter}
          suggestedIndustries={suggestedCategories}
          onIndustrySelect={setActiveCategory}
        />
      ) : (
        <ArticlesGrid articles={gridArticles} />
      )}

      <InsightsHubCTA />
    </>
  )
}
