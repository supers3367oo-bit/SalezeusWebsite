import { useState } from 'react'
import clsx from 'clsx'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import type { ProjectServiceSlug } from '../../types/projectDetail'
import {
  getProjectFieldOptions,
  getProjectServiceOptions,
} from '../../data/projectDetails'

type Panel = 'service' | 'field' | null

type Props = {
  serviceFilter: ProjectServiceSlug | null
  fieldFilter: string | null
  onServiceChange: (service: ProjectServiceSlug | null) => void
  onFieldChange: (field: string | null) => void
  onClearAll: () => void
  resultCount: number
  totalCount: number
}

function FilterOption({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={clsx(
        'w-full rounded-[8px] border px-3 py-2 text-left text-[13px] transition-colors duration-200',
        active
          ? 'border-sz-interaction bg-sz-interaction/8 text-sz-dark'
          : 'border-sz-border text-sz-primary/70 hover:border-sz-primary/25 hover:text-sz-dark'
      )}
      style={{ fontFamily: 'var(--font-body)', fontWeight: active ? 600 : 500 }}
    >
      {label}
    </button>
  )
}

export default function PortfolioFiltersSidebar({
  serviceFilter,
  fieldFilter,
  onServiceChange,
  onFieldChange,
  onClearAll,
  resultCount,
  totalCount,
}: Props) {
  const [openPanel, setOpenPanel] = useState<Panel>(null)
  const serviceOptions = getProjectServiceOptions()
  const fieldOptions = getProjectFieldOptions()
  const hasActiveFilters = Boolean(serviceFilter || fieldFilter)

  const togglePanel = (panel: Exclude<Panel, null>) => {
    setOpenPanel((current) => (current === panel ? null : panel))
  }

  const activeServiceLabel =
    serviceOptions.find((option) => option.slug === serviceFilter)?.label ?? null

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-card border border-sz-border bg-white/60 p-4 backdrop-blur-sm lg:p-5">
        <div className="mb-4 flex items-center gap-2 text-sz-dark">
          <SlidersHorizontal size={16} strokeWidth={2} />
          <p
            className="text-sm font-medium"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.02em' }}
          >
            Filters
          </p>
        </div>

        <div className="space-y-2">
          <div>
            <button
              type="button"
              onClick={() => togglePanel('service')}
              aria-expanded={openPanel === 'service'}
              className={clsx(
                'flex w-full items-center justify-between gap-3 rounded-[8px] border px-3 py-2.5 text-left transition-colors duration-200',
                openPanel === 'service' || serviceFilter
                  ? 'border-sz-interaction/40 bg-sz-interaction/6 text-sz-dark'
                  : 'border-sz-border text-sz-primary/75 hover:border-sz-primary/25 hover:text-sz-dark'
              )}
              style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600 }}
            >
              <span>Filter by service</span>
              <ChevronDown
                size={15}
                className={clsx('shrink-0 transition-transform duration-200', openPanel === 'service' && 'rotate-180')}
              />
            </button>

            {openPanel === 'service' && (
              <div className="mt-2 space-y-1.5 pl-1">
                <FilterOption
                  label="All services"
                  active={!serviceFilter}
                  onClick={() => onServiceChange(null)}
                />
                {serviceOptions.map((option) => (
                  <FilterOption
                    key={option.slug}
                    label={option.label}
                    active={serviceFilter === option.slug}
                    onClick={() =>
                      onServiceChange(serviceFilter === option.slug ? null : option.slug)
                    }
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={() => togglePanel('field')}
              aria-expanded={openPanel === 'field'}
              className={clsx(
                'flex w-full items-center justify-between gap-3 rounded-[8px] border px-3 py-2.5 text-left transition-colors duration-200',
                openPanel === 'field' || fieldFilter
                  ? 'border-sz-interaction/40 bg-sz-interaction/6 text-sz-dark'
                  : 'border-sz-border text-sz-primary/75 hover:border-sz-primary/25 hover:text-sz-dark'
              )}
              style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600 }}
            >
              <span>Filter by field</span>
              <ChevronDown
                size={15}
                className={clsx('shrink-0 transition-transform duration-200', openPanel === 'field' && 'rotate-180')}
              />
            </button>

            {openPanel === 'field' && (
              <div className="mt-2 space-y-1.5 pl-1">
                <FilterOption
                  label="All fields"
                  active={!fieldFilter}
                  onClick={() => onFieldChange(null)}
                />
                {fieldOptions.map((field) => (
                  <FilterOption
                    key={field}
                    label={field}
                    active={fieldFilter === field}
                    onClick={() => onFieldChange(fieldFilter === field ? null : field)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-4 space-y-3 border-t border-sz-border pt-4">
            <div className="flex flex-wrap gap-1.5">
              {activeServiceLabel && (
                <span className="inline-flex items-center gap-1 rounded-full bg-sz-dark px-2.5 py-1 text-[11px] text-white">
                  {activeServiceLabel}
                  <button
                    type="button"
                    onClick={() => onServiceChange(null)}
                    aria-label={`Remove ${activeServiceLabel} filter`}
                    className="opacity-70 hover:opacity-100"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {fieldFilter && (
                <span className="inline-flex items-center gap-1 rounded-full bg-sz-dark px-2.5 py-1 text-[11px] text-white">
                  {fieldFilter}
                  <button
                    type="button"
                    onClick={() => onFieldChange(null)}
                    aria-label={`Remove ${fieldFilter} filter`}
                    className="opacity-70 hover:opacity-100"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onClearAll}
              className="text-sm text-sz-interaction transition-colors hover:text-sz-interaction-hover"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              Clear all
            </button>
          </div>
        )}

        <p
          className="mt-4 text-xs text-sz-primary/45"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Showing {resultCount} of {totalCount} projects
        </p>
      </div>
    </aside>
  )
}
