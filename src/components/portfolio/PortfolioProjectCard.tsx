import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import clsx from 'clsx'

export const PORTFOLIO_OVERLAY_GRADIENT =
  'linear-gradient(180deg, transparent 0%, transparent 38%, rgba(26, 45, 82, 0.5) 70%, rgba(26, 45, 82, 0.96) 100%)'

export type PortfolioCardProject = {
  id: number
  slug?: string
  client: string
  field: string
  services: string[]
  summary: string
  image: string
}

function FieldTag({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full bg-sz-interaction px-2.5 py-1 text-[11px] font-medium text-white"
      style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.01em' }}
    >
      {label}
    </span>
  )
}

type Props = {
  project: PortfolioCardProject
  motionProps?: HTMLMotionProps<'article'>
  className?: string
}

export default function PortfolioProjectCard({ project, motionProps, className }: Props) {
  const card = (
    <motion.article
      className={clsx(
        'group relative isolate aspect-[4/3] cursor-pointer overflow-hidden rounded-card bg-sz-dark',
        className
      )}
      {...motionProps}
    >
      <img
        src={project.image}
        alt={`${project.client} — ${project.field}`}
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        loading="lazy"
      />

      <div className="absolute inset-0" style={{ background: PORTFOLIO_OVERLAY_GRADIENT }} />

      <div className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-card border border-white/0 bg-white/0 backdrop-blur-sm transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/10 sm:right-6 sm:top-6">
        <ArrowUpRight
          size={15}
          className="text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 -translate-y-0.5 translate-x-0.5"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end p-6 lg:p-7">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <FieldTag label={project.field} />
        </div>

        <h3
          className="mb-2 text-white"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}
        >
          {project.client}
        </h3>

        <p
          className="mb-3 max-w-md text-white/65 line-clamp-2"
          style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.65 }}
        >
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.services.map((service) => (
            <span
              key={service}
              className="rounded-[6px] border border-white/15 bg-white/10 px-2 py-0.5 text-[11px] text-white/90 backdrop-blur-sm"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )

  if (project.slug) {
    return (
      <Link to={`/portfolio/${project.slug}`} className="block">
        {card}
      </Link>
    )
  }

  return card
}
