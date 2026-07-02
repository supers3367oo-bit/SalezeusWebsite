import clsx from 'clsx'
import { Facebook, Linkedin } from 'lucide-react'
import {
  getArticleShareLinks,
  getArticleShareUrl,
  openShareWindow,
} from '../../lib/shareArticle'

type Props = {
  slug: string
  title: string
  variant?: 'dark' | 'light'
  className?: string
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const PLATFORMS = [
  { id: 'facebook' as const, label: 'Facebook', Icon: Facebook },
  { id: 'linkedin' as const, label: 'LinkedIn', Icon: Linkedin },
  { id: 'x' as const, label: 'X', Icon: XIcon, isCustom: true },
]

export default function ArticleShare({ slug, title, variant = 'light', className }: Props) {
  const shareUrl = getArticleShareUrl(slug)
  const links = getArticleShareLinks(shareUrl, title)

  const isDark = variant === 'dark'

  return (
    <div className={clsx('min-w-0', className)}>
      <p
        className={clsx(
          'mb-3 text-xs uppercase tracking-[0.12em]',
          isDark ? 'text-white/40' : 'text-sz-secondary'
        )}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        Share article
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {PLATFORMS.map(({ id, label, Icon, isCustom }) => (
          <button
            key={id}
            type="button"
            onClick={() => openShareWindow(links[id])}
            className={clsx(
              'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-200',
              isDark
                ? 'border-white/15 bg-white/5 text-white/75 hover:border-white/30 hover:bg-white/10 hover:text-white'
                : 'border-sz-border bg-white text-sz-secondary hover:border-sz-interaction hover:text-sz-interaction'
            )}
            aria-label={`Share on ${label}`}
            title={`Share on ${label}`}
          >
            {isCustom ? (
              <Icon className="h-4 w-4" />
            ) : (
              <Icon size={18} strokeWidth={2} />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
