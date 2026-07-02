import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '../../ui/Button'
import PortfolioProjectCard from '../../portfolio/PortfolioProjectCard'
import type { ProjectDetail } from '../../../types/projectDetail'
import { SERVICE_SLUG_LABEL } from '../../../types/projectDetail'
import { revealProps } from './shared'

type Props = {
  project: ProjectDetail
  related: ProjectDetail[]
}

export default function ProjectMoreWork({ project, related }: Props) {
  const reduce = useReducedMotion() ?? false
  const serviceTitle = SERVICE_SLUG_LABEL[project.service]

  return (
    <section className="bg-sz-dark section-padding">
      <div className="section-container">
        <motion.div className="mb-8 lg:mb-10" {...revealProps(reduce)}>
          <h2
            className="text-white mb-3"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              lineHeight: 1.1,
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            More {serviceTitle.toLowerCase()} work
          </h2>
          <p
            className="text-white/45 max-w-lg"
            style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65 }}
          >
            Other projects from the same service line.
          </p>
        </motion.div>

        {related.length > 0 && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 mb-10 lg:mb-12"
            {...revealProps(reduce, 0.06)}
          >
            {related.slice(0, 4).map((item, i) => (
              <PortfolioProjectCard
                key={item.slug}
                project={{
                  id: item.id,
                  slug: item.slug,
                  client: item.client,
                  field: item.field,
                  services: [item.serviceLabel],
                  summary: item.summary,
                  image: item.image,
                }}
                motionProps={{
                  initial: reduce ? false : { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, margin: '-8%' },
                  transition: { duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] },
                }}
              />
            ))}
          </motion.div>
        )}

        <motion.div className="flex flex-wrap gap-4" {...revealProps(reduce, 0.1)}>
          <Button to={`/services/${project.service}`} size="sm">
            Explore {serviceTitle}
          </Button>
          <Link
            to="/contact"
            className="inline-flex items-center text-sm text-white/55 hover:text-white transition-colors min-h-[44px] px-2"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
          >
            Start a project
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
