import type { InlineSpan } from '../../types/insights'

type Props = {
  spans?: InlineSpan[]
  fallback?: string
  className?: string
}

/** Renders plain text or linked spans for article prose / SEO links */
export default function InlineProse({ spans, fallback = '', className }: Props) {
  if (spans?.length) {
    return (
      <span className={className}>
        {spans.map((span, i) => {
          if (span.type === 'link') {
            const external = /^https?:\/\//i.test(span.href)
            return (
              <a
                key={i}
                href={span.href}
                className="text-sz-interaction underline underline-offset-[3px] transition hover:text-sz-dark"
                rel={span.rel || (external ? 'noopener noreferrer' : undefined)}
                target={external ? '_blank' : undefined}
              >
                {span.text}
              </a>
            )
          }
          return <span key={i}>{span.text}</span>
        })}
      </span>
    )
  }
  return <span className={className}>{fallback}</span>
}
