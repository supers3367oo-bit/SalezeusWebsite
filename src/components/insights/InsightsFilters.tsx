import clsx from 'clsx'
import { INDUSTRY_CATEGORIES, type IndustryCategory } from '../../types/insights'

type InsightsFiltersProps = {
  activeIndustry: IndustryCategory | null
  onIndustryChange: (industry: IndustryCategory | null) => void
  onClearAll: () => void
}

function FilterChip({
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
        'inline-flex items-center px-3.5 py-1.5 rounded-full text-[13px] transition-colors duration-200 border',
        active
          ? 'bg-sz-dark text-white border-sz-dark'
          : 'bg-transparent text-sz-primary/55 border-sz-border hover:text-sz-dark hover:border-sz-primary/30'
      )}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {label}
    </button>
  )
}

export default function InsightsFilters({
  activeIndustry,
  onIndustryChange,
  onClearAll,
}: InsightsFiltersProps) {
  return (
    <section id="insights-articles" className="section-surface scroll-mt-28 pb-8 lg:pb-10">
      <div className="section-container">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-wrap gap-2 flex-1">
            {INDUSTRY_CATEGORIES.map((industry) => (
              <FilterChip
                key={industry}
                label={industry}
                active={activeIndustry === industry}
                onClick={() =>
                  onIndustryChange(activeIndustry === industry ? null : industry)
                }
              />
            ))}
          </div>

          {activeIndustry && (
            <button
              type="button"
              onClick={onClearAll}
              className="shrink-0 text-sm text-sz-interaction hover:text-sz-interaction-hover transition-colors self-start"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
