import type { InlineSpan } from '../../types/insights'
import type { BilingualRichText, BilingualText } from '../types/adminContent'

export function plainToSpans(text: string): InlineSpan[] {
  if (!text) return []
  return [{ type: 'text', text }]
}

export function spansToPlain(spans: InlineSpan[]): string {
  return spans.map((span) => span.text).join('')
}

export function rich(en: string, ar: string): BilingualRichText {
  return { en: plainToSpans(en), ar: plainToSpans(ar) }
}

export function bi(en: string, ar: string): BilingualText {
  return { en, ar }
}

export function emptyRich(): BilingualRichText {
  return { en: [], ar: [] }
}

export function slugifyHeading(text: string): string {
  const ascii = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  if (ascii) return ascii
  return `section-${Date.now().toString(36)}`
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeAttr(text: string): string {
  return escapeHtml(text).replace(/'/g, '&#39;')
}

export function spansToHtml(spans: InlineSpan[]): string {
  return spans
    .map((span) => {
      if (span.type === 'link') {
        const rel = span.rel ? ` rel="${escapeAttr(span.rel)}"` : ' rel="noopener noreferrer"'
        return `<a href="${escapeAttr(span.href)}"${rel}>${escapeHtml(span.text)}</a>`
      }
      return escapeHtml(span.text).replace(/\n/g, '<br>')
    })
    .join('')
}

function mergeAdjacentText(spans: InlineSpan[]): InlineSpan[] {
  const merged: InlineSpan[] = []
  for (const span of spans) {
    if (!span.text) continue
    const last = merged[merged.length - 1]
    if (span.type === 'text' && last?.type === 'text') {
      last.text += span.text
    } else {
      merged.push({ ...span })
    }
  }
  return merged
}

export function htmlToSpans(root: HTMLElement): InlineSpan[] {
  const spans: InlineSpan[] = []

  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? ''
      if (text) spans.push({ type: 'text', text })
      return
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return
    const el = node as HTMLElement
    const tag = el.tagName
    if (tag === 'A') {
      const href = el.getAttribute('href')?.trim() || '#'
      const rel = el.getAttribute('rel')?.trim() || undefined
      const text = el.textContent ?? ''
      if (text) spans.push({ type: 'link', text, href, rel })
      return
    }
    if (tag === 'BR') {
      spans.push({ type: 'text', text: '\n' })
      return
    }
    el.childNodes.forEach(walk)
  }

  root.childNodes.forEach(walk)
  return mergeAdjacentText(spans)
}

export function defaultLinkRel(href: string): string {
  if (href.startsWith('/') || href.startsWith('#')) return ''
  return 'noopener noreferrer'
}
