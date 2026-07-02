import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { getLocomotiveInstance } from '../../lib/locomotive'

type TocItem = {
  id: string
  text: string
  level: 2 | 3
}

type ArticleTOCProps = {
  items: TocItem[]
}

export default function ArticleTOC({ items }: ArticleTOCProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '')

  useEffect(() => {
    if (items.length === 0) return

    const updateActive = () => {
      const offset = 120
      let current = items[0].id

      for (const item of items) {
        const el = document.getElementById(item.id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= offset) current = item.id
      }

      setActiveId(current)
    }

    updateActive()

    const lenis = getLocomotiveInstance()?.lenisInstance
    if (lenis) {
      lenis.on('scroll', updateActive)
      return () => lenis.off('scroll', updateActive)
    }

    window.addEventListener('scroll', updateActive, { passive: true })
    return () => window.removeEventListener('scroll', updateActive)
  }, [items])

  if (items.length === 0) return null

  return (
    <nav aria-label="Table of contents">
      <p
        className="text-sz-primary/40 mb-4"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        On this page
      </p>
      <ul className="space-y-2 border-l border-sz-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={clsx(
                'block py-1.5 text-sm transition-colors duration-200 border-l-2 -ml-px',
                item.level === 3 && 'pl-8',
                item.level === 2 && 'pl-4',
                activeId === item.id
                  ? 'border-sz-interaction text-sz-dark font-medium'
                  : 'border-transparent text-sz-primary/45 hover:text-sz-interaction'
              )}
              style={{ fontFamily: 'var(--font-body)' }}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function ArticleTOCMobile({ items }: ArticleTOCProps) {
  if (items.length === 0) return null

  return (
    <nav
      className="lg:hidden mb-10 pb-6 border-b border-sz-border overflow-x-auto"
      aria-label="Table of contents"
    >
      <div className="flex gap-2 min-w-max">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="shrink-0 px-3 py-1.5 rounded-full border border-sz-border text-sz-primary/55 text-xs hover:border-sz-interaction hover:text-sz-interaction transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {item.text}
          </a>
        ))}
      </div>
    </nav>
  )
}
