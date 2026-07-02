export function getArticleShareUrl(slug: string): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/insights/${slug}`
  }
  return `https://salezeus.com/insights/${slug}`
}

export function getArticleShareLinks(url: string, title: string) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
  }
}

export function openShareWindow(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer,width=600,height=640')
}
