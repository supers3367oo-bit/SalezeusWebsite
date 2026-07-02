import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import ServiceMockupFrame from '../ui/ServiceMockupFrame'
import type { Service } from '../../types/services'

type ServiceCardProps = {
  service: Service
  layout?: 'carousel' | 'grid'
  cardRef?: (el: HTMLDivElement | null) => void
  innerRef?: (el: HTMLDivElement | null) => void
}

export default function ServiceCard({
  service,
  layout = 'grid',
  cardRef,
  innerRef,
}: ServiceCardProps) {
  return (
    <div
      ref={cardRef}
      className={clsx(
        'solution-card',
        layout === 'carousel' && 'shrink-0 w-[min(86vw,480px)] lg:w-[520px]'
      )}
      style={layout === 'carousel' ? { marginBottom: service.float } : undefined}
    >
      <Link
        to={`/services/${service.slug}`}
        ref={(el) => {
          if (layout === 'carousel' && innerRef) {
            innerRef(el as HTMLDivElement | null)
          }
        }}
        aria-label={`Explore ${service.title} service`}
        className={clsx(
          'group block cursor-pointer',
          layout === 'carousel' && 'solution-card-inner'
        )}
      >
        <ServiceMockupFrame
          image={service.image}
          alt={`${service.title} showcase`}
          variant={service.variant}
          compact
          className="transition-transform duration-500 group-hover:-translate-y-1"
        />

        <div className="mt-5 lg:mt-6">
          <h3
            className="text-sz-dark group-hover:text-sz-interaction transition-colors duration-300"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(20px, 2.2vw, 26px)',
              fontWeight: 600,
            }}
          >
            {service.title}
          </h3>

          <div className="mt-3 flex items-end justify-between gap-4">
            <p
              className="text-sz-secondary flex-1 max-w-[68%]"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              {service.desc}
            </p>

            <span className="group/cta shrink-0 inline-flex flex-col items-end gap-1.5 pb-0.5 text-sz-primary group-hover:text-sz-interaction transition-colors duration-200">
              <span
                className="inline-flex items-center gap-2 text-[10px] lg:text-[11px] font-medium uppercase tracking-[0.16em]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Explore Service
                <ArrowRight
                  size={13}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
              <span className="h-px w-full bg-current origin-right transition-transform duration-300 group-hover:scale-x-105" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
