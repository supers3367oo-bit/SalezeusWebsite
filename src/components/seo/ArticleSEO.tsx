import { useEffect } from 'react'
import type { InsightArticle } from '../../types/insights'

const SITE_NAME = 'Salezeus'
const DEFAULT_TITLE = `${SITE_NAME} — Brand Growth Agency`
const DEFAULT_DESCRIPTION =
  'Salezeus is a full-service brand growth agency specializing in branding, marketing, web development, and business consulting in Turkey and Syria.'

type ArticleSEOProps = {
  article: InsightArticle
}

function upsertMeta(
  key: string,
  content: string,
  attribute: 'name' | 'property' = 'name'
) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    document.head.appendChild(element)
  }
  element.href = href
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let script = document.getElementById(id) as HTMLScriptElement | null
  if (!script) {
    script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

export default function ArticleSEO({ article }: ArticleSEOProps) {
  useEffect(() => {
    const origin = window.location.origin
    const pageUrl = `${origin}/insights/${article.slug}`
    const metaTitle = article.metaTitle ?? `${article.title} | ${SITE_NAME}`
    const metaDescription = article.metaDescription ?? article.excerpt
    const coverImage = article.coverImage.startsWith('http')
      ? article.coverImage
      : `${origin}${article.coverImage}`

    document.title = metaTitle
    upsertMeta('description', metaDescription)
    upsertMeta('robots', 'index, follow')
    upsertMeta('author', article.author.name)

    if (article.keywords?.length) {
      upsertMeta('keywords', article.keywords.join(', '))
    }

    upsertMeta('og:title', metaTitle, 'property')
    upsertMeta('og:description', metaDescription, 'property')
    upsertMeta('og:type', 'article', 'property')
    upsertMeta('og:url', pageUrl, 'property')
    upsertMeta('og:image', coverImage, 'property')
    upsertMeta('og:site_name', SITE_NAME, 'property')
    upsertMeta('article:published_time', article.publishedAt, 'property')
    upsertMeta('article:author', article.author.name, 'property')
    upsertMeta('article:section', article.service, 'property')

    upsertMeta('twitter:card', 'summary_large_image')
    upsertMeta('twitter:title', metaTitle)
    upsertMeta('twitter:description', metaDescription)
    upsertMeta('twitter:image', coverImage)

    upsertLink('canonical', pageUrl)

    upsertJsonLd('article-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: metaDescription,
      image: [coverImage],
      datePublished: article.publishedAt,
      dateModified: article.publishedAt,
      author: {
        '@type': 'Person',
        name: article.author.name,
        jobTitle: article.author.role,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: origin,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl,
      },
      articleSection: article.service,
      keywords: article.keywords?.join(', '),
      inLanguage: 'en',
    })

    return () => {
      document.title = DEFAULT_TITLE
      upsertMeta('description', DEFAULT_DESCRIPTION)
      upsertLink('canonical', `${origin}/`)
      const jsonLd = document.getElementById('article-jsonld')
      jsonLd?.remove()
    }
  }, [article])

  return null
}
