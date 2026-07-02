import { Link } from 'react-router-dom'
import type { InsightArticle } from '../../types/insights'
import { formatArticleDate } from '../../data/insights'
import ArticleShare from './ArticleShare'

type ArticleHeroProps = {
  article: InsightArticle
}

export default function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <header className="relative bg-sz-dark">
      <div className="relative h-[min(52vh,520px)] lg:h-[min(58vh,600px)] overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(4,5,8,0.35) 0%, rgba(4,5,8,0.75) 72%, rgba(4,5,8,1) 100%)',
          }}
        />
      </div>

      <div className="section-container relative z-10 -mt-32 lg:-mt-40 pb-12 lg:pb-16">
        <Link
          to="/insights"
          className="inline-flex items-center text-white/45 hover:text-white text-sm mb-8 transition-colors"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          ← All insights
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span
            className="px-3 py-1 rounded-full border border-white/15 text-white/70 text-xs"
            style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}
          >
            {article.service}
          </span>
          <span
            className="px-3 py-1 rounded-full border border-white/10 text-white/45 text-xs"
            style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}
          >
            {article.industry}
          </span>
        </div>

        <h1
          className="text-white max-w-4xl mb-8"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)',
            lineHeight: 1.08,
            fontWeight: 600,
            letterSpacing: '-0.03em',
          }}
        >
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-white/50 text-sm mb-8">
          <div>
            <span className="text-white/80 font-medium">{article.author.name}</span>
            <span className="mx-2 text-white/25">·</span>
            <span>{article.author.role}</span>
          </div>
          <span>{formatArticleDate(article.publishedAt)}</span>
          <span>{article.readingTimeMinutes} min read</span>
        </div>

        <ArticleShare slug={article.slug} title={article.title} variant="dark" />
      </div>
    </header>
  )
}
