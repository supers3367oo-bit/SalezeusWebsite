import type { ContentBlock } from '../../types/insights'

type ArticleBodyProps = {
  blocks: ContentBlock[]
}

const proseParagraph = 'text-sz-primary/70 text-[1.0625rem] leading-[1.85] mb-8'

export default function ArticleBody({ blocks }: ArticleBodyProps) {
  return (
    <div className="article-prose">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={index} className={proseParagraph}>
                {block.text}
              </p>
            )

          case 'heading':
            if (block.level === 2) {
              return (
                <h2
                  key={index}
                  id={block.id}
                  className="text-sz-dark scroll-mt-28 mt-14 mb-6 first:mt-0"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  {block.text}
                </h2>
              )
            }
            return (
              <h3
                key={index}
                id={block.id}
                className="text-sz-dark scroll-mt-28 mt-10 mb-5"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.3,
                }}
              >
                {block.text}
              </h3>
            )

          case 'pullquote':
            return (
              <blockquote
                key={index}
                className="my-12 py-8 border-y border-sz-border"
              >
                <p
                  className="text-sz-dark text-xl lg:text-2xl leading-snug"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                  }}
                >
                  "{block.text}"
                </p>
                {block.attribution && (
                  <footer
                    className="mt-4 text-sz-primary/45 text-sm"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {block.attribution}
                  </footer>
                )}
              </blockquote>
            )

          case 'stat':
            return (
              <div
                key={index}
                className="my-12 p-8 lg:p-10 rounded-card border border-sz-border bg-white"
              >
                <p
                  className="text-sz-dark mb-2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(3rem, 8vw, 4.5rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {block.value}
                </p>
                <p
                  className="text-sz-dark font-medium mb-2"
                  style={{ fontFamily: 'var(--font-heading)', fontSize: 18 }}
                >
                  {block.label}
                </p>
                {block.description && (
                  <p
                    className="text-sz-primary/50 text-sm leading-relaxed max-w-md"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {block.description}
                  </p>
                )}
              </div>
            )

          case 'gallery':
            return (
              <div
                key={index}
                className="my-12 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
              >
                {block.images.map((image, i) => (
                  <figure key={i} className="overflow-card border border-sz-border bg-white">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full aspect-[4/3] object-cover"
                      loading="lazy"
                    />
                    {image.caption && (
                      <figcaption
                        className="px-4 py-3 text-sz-primary/45 text-xs"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {image.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )

          case 'code':
            return (
              <div key={index} className="my-10 overflow-card border border-sz-border">
                <div
                  className="px-4 py-2 border-b border-sz-border bg-sz-dark text-white/40 text-xs"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {block.language}
                </div>
                <pre className="p-5 overflow-x-auto bg-[#0e1016] text-white/85 text-sm leading-relaxed">
                  <code style={{ fontFamily: 'var(--font-mono)' }}>{block.code}</code>
                </pre>
              </div>
            )

          case 'note':
            return (
              <aside
                key={index}
                className="my-10 p-6 rounded-card border border-sz-interaction/20 bg-sz-interaction-soft"
              >
                {block.title && (
                  <p
                    className="text-sz-interaction font-medium mb-2 text-sm"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {block.title}
                  </p>
                )}
                <p
                  className="text-sz-primary/65 text-sm leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {block.text}
                </p>
              </aside>
            )

          case 'callout':
            return (
              <aside
                key={index}
                className="my-12 p-8 lg:p-10 rounded-card bg-sz-dark text-white"
              >
                <p
                  className="text-white/90 font-medium mb-3"
                  style={{ fontFamily: 'var(--font-heading)', fontSize: 18 }}
                >
                  {block.title}
                </p>
                <p
                  className="text-white/55 leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 15 }}
                >
                  {block.text}
                </p>
              </aside>
            )

          case 'list':
            if (block.ordered) {
              return (
                <ol
                  key={index}
                  className="my-8 space-y-3 list-decimal list-outside ml-5 text-sz-primary/70"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', lineHeight: 1.75 }}
                >
                  {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              )
            }
            return (
              <ul
                key={index}
                className="my-8 space-y-3 list-disc list-outside ml-5 text-sz-primary/70"
                style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', lineHeight: 1.75 }}
              >
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )

          case 'image':
            return (
              <figure
                key={index}
                className={block.wide ? 'my-12 -mx-0 lg:-mx-16' : 'my-12'}
              >
                <div className="overflow-card border border-sz-border bg-white">
                  <img
                    src={block.src}
                    alt={block.alt}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
                {block.caption && (
                  <figcaption
                    className="mt-3 text-sz-primary/45 text-sm"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
