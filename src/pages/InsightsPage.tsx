import { useEffect, useMemo, useState } from 'react'
import InsightsHero from '../components/insights/InsightsHero'
import FeaturedInsight from '../components/insights/FeaturedInsight'
import InsightsFilters from '../components/insights/InsightsFilters'
import ArticlesGrid from '../components/insights/ArticlesGrid'
import InsightsHubCTA from '../components/insights/InsightsHubCTA'
import { INSIGHT_ARTICLES, getFeaturedArticle } from '../data/insights'
import type { IndustryCategory } from '../types/insights'
import { refreshLocomotiveScroll } from '../lib/locomotive'

const SUGGESTED_INDUSTRIES: IndustryCategory[] = [
  'Technology',
  'Healthcare',
  'E-commerce',
  'Tourism',
]

export default function InsightsPage() {
  const [activeIndustry, setActiveIndustry] = useState<IndustryCategory | null>(null)

  const filteredArticles = useMemo(() => {
    if (!activeIndustry) return INSIGHT_ARTICLES
    return INSIGHT_ARTICLES.filter((article) => article.industry === activeIndustry)
  }, [activeIndustry])

  const spotlightArticle = useMemo(() => {
    if (filteredArticles.length === 0) return null
    if (!activeIndustry) return getFeaturedArticle()
    return filteredArticles.find((a) => a.featured) ?? filteredArticles[0]
  }, [filteredArticles, activeIndustry])

  const gridArticles = useMemo(() => {
    if (!spotlightArticle) return []
    return filteredArticles.filter((a) => a.slug !== spotlightArticle.slug)
  }, [filteredArticles, spotlightArticle])

  const clearFilter = () => setActiveIndustry(null)

  useEffect(() => {
    requestAnimationFrame(() => refreshLocomotiveScroll())
  }, [filteredArticles, spotlightArticle])

  return (
    <>
      <InsightsHero />

      {spotlightArticle && (
        <FeaturedInsight
          article={spotlightArticle}
          label={activeIndustry ? 'Selected for you' : "Editor's pick"}
        />
      )}

      <InsightsFilters
        activeIndustry={activeIndustry}
        onIndustryChange={setActiveIndustry}
        onClearAll={clearFilter}
      />

      <ArticlesGrid
        articles={gridArticles}
        showEmptyState={filteredArticles.length === 0}
        onClearFilters={clearFilter}
        suggestedIndustries={SUGGESTED_INDUSTRIES}
        onIndustrySelect={setActiveIndustry}
      />

      <InsightsHubCTA />
    </>
  )
}
