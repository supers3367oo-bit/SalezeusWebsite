import { motion, useReducedMotion } from 'framer-motion'
import type { ProjectWork } from '../../../types/projectDetail'
import { ProjectSectionHeading, ProjectVisualFrame, revealProps } from './shared'

type Props = {
  work: ProjectWork
}

export default function ProjectWorkSection({ work }: Props) {
  const reduce = useReducedMotion() ?? false

  return (
    <section className="section-surface section-padding border-t border-sz-border/60">
      <div className="section-container">
        <motion.div {...revealProps(reduce)}>
          <ProjectSectionHeading title={work.title} />
        </motion.div>

        {work.type === 'branding' && <BrandingWork work={work} reduce={reduce} />}
        {work.type === 'marketing' && <MarketingWork work={work} reduce={reduce} />}
        {work.type === 'social' && <SocialWork work={work} reduce={reduce} />}
        {work.type === 'consulting' && <ConsultingWork work={work} reduce={reduce} />}
        {work.type === 'web' && <WebWork work={work} reduce={reduce} />}
        {work.type === 'apps' && <AppsWork work={work} reduce={reduce} />}
      </div>
    </section>
  )
}

function BrandingWork({
  work,
  reduce,
}: {
  work: Extract<ProjectWork, { type: 'branding' }>
  reduce: boolean
}) {
  return (
    <div className="space-y-8 lg:space-y-10">
      <motion.div {...revealProps(reduce, 0.04)}>
        <ProjectVisualFrame visual={work.primaryLogo} className="max-w-4xl mx-auto" />
      </motion.div>
      <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-5" {...revealProps(reduce, 0.08)}>
        {work.logoVariants.map((v) => (
          <ProjectVisualFrame key={v.alt} visual={v} />
        ))}
      </motion.div>
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-8 items-start"
        {...revealProps(reduce, 0.1)}
      >
        <div className="rounded-card border border-sz-border bg-white p-6">
          <p className="text-sz-secondary mb-4" style={{ fontFamily: 'var(--font-body)', fontSize: 13 }}>
            Color palette
          </p>
          <div className="grid grid-cols-2 gap-3">
            {work.colorPalette.map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <span
                  className="h-10 w-10 shrink-0 rounded-lg border border-sz-border"
                  style={{ background: c.hex }}
                />
                <div>
                  <p className="text-sz-dark text-sm font-medium">{c.name}</p>
                  <p className="text-sz-secondary text-xs">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-card border border-sz-border bg-white p-6">
          <p className="text-sz-secondary mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 13 }}>
            Typography
          </p>
          <p className="text-sz-dark mb-1" style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600 }}>
            {work.typography.display}
          </p>
          <p className="text-sz-secondary" style={{ fontFamily: 'var(--font-body)', fontSize: 15 }}>
            {work.typography.body}
          </p>
        </div>
      </motion.div>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-5" {...revealProps(reduce, 0.12)}>
        {work.stationery.map((v) => (
          <ProjectVisualFrame key={v.alt} visual={v} />
        ))}
      </motion.div>
      <motion.div {...revealProps(reduce, 0.14)}>
        <ProjectVisualFrame visual={work.inContext} />
      </motion.div>
    </div>
  )
}

function MarketingWork({
  work,
  reduce,
}: {
  work: Extract<ProjectWork, { type: 'marketing' }>
  reduce: boolean
}) {
  return (
    <div className="space-y-8 lg:space-y-10">
      <motion.div {...revealProps(reduce, 0.04)}>
        <ProjectVisualFrame visual={work.heroVisual} />
      </motion.div>
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 max-w-4xl"
        {...revealProps(reduce, 0.08)}
      >
        <div>
          <p className="text-sz-secondary mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 13 }}>
            Key message
          </p>
          <p
            className="text-sz-dark"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 600, lineHeight: 1.3 }}
          >
            {work.keyMessage}
          </p>
        </div>
        <div>
          <p className="text-sz-secondary mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 13 }}>
            Audience
          </p>
          <p className="text-sz-secondary" style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65 }}>
            {work.audience}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {work.channels.map((ch) => (
              <span
                key={ch}
                className="rounded-full border border-sz-border px-3 py-1 text-sz-dark text-xs"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
              >
                {ch}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-5" {...revealProps(reduce, 0.12)}>
        {work.assets.map((v) => (
          <ProjectVisualFrame key={v.alt} visual={v} />
        ))}
      </motion.div>
    </div>
  )
}

function SocialWork({
  work,
  reduce,
}: {
  work: Extract<ProjectWork, { type: 'social' }>
  reduce: boolean
}) {
  return (
    <div className="space-y-8 lg:space-y-10">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-8"
        {...revealProps(reduce, 0.04)}
      >
        <ProjectVisualFrame visual={work.profilePreview} className="max-w-sm mx-auto lg:mx-0" />
        <div className="grid grid-cols-2 gap-3">
          {work.feedGrid.map((v) => (
            <ProjectVisualFrame key={v.alt} visual={{ ...v, aspect: '1/1' }} framed={false} />
          ))}
        </div>
      </motion.div>
      <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-5" {...revealProps(reduce, 0.08)}>
        {work.postFormats.map((v) => (
          <ProjectVisualFrame key={v.alt} visual={v} />
        ))}
      </motion.div>
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-5" {...revealProps(reduce, 0.1)}>
        {work.contentPillars.map((pillar) => (
          <div key={pillar.title} className="rounded-card border border-sz-border bg-white p-5">
            <h3
              className="text-sz-dark mb-2"
              style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 600 }}
            >
              {pillar.title}
            </h3>
            <p className="text-sz-secondary" style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6 }}>
              {pillar.description}
            </p>
          </div>
        ))}
      </motion.div>
      <motion.div
        className="text-sz-secondary max-w-3xl"
        {...revealProps(reduce, 0.12)}
      >
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65 }}>{work.toneRules}</p>
      </motion.div>
    </div>
  )
}

function ConsultingWork({
  work,
  reduce,
}: {
  work: Extract<ProjectWork, { type: 'consulting' }>
  reduce: boolean
}) {
  return (
    <div className="space-y-8 lg:space-y-10 max-w-4xl">
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5" {...revealProps(reduce, 0.04)}>
        <div className="rounded-card border border-sz-border bg-white p-6">
          <p className="text-sz-secondary mb-2 text-sm">Before</p>
          <p className="text-sz-dark" style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7 }}>
            {work.before}
          </p>
        </div>
        <div className="rounded-card border border-sz-interaction/25 bg-sz-interaction-soft/40 p-6">
          <p className="text-sz-interaction mb-2 text-sm font-medium">After</p>
          <p className="text-sz-dark" style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7 }}>
            {work.after}
          </p>
        </div>
      </motion.div>
      <motion.div {...revealProps(reduce, 0.08)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {work.frameworkSteps.map((step, i) => (
            <div key={step.title} className="rounded-card border border-sz-border bg-white p-5">
              <span className="text-sz-interaction text-xs font-medium">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-sz-dark mt-2 mb-1 font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                {step.title}
              </h3>
              <p className="text-sz-secondary text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.ul className="space-y-3" {...revealProps(reduce, 0.12)}>
        {work.keyDecisions.map((d, i) => (
          <li
            key={d}
            className="flex gap-3 text-sz-secondary"
            style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65 }}
          >
            <span className="text-sz-interaction shrink-0 font-medium">{i + 1}.</span>
            <span>{d}</span>
          </li>
        ))}
      </motion.ul>
    </div>
  )
}

function WebWork({
  work,
  reduce,
}: {
  work: Extract<ProjectWork, { type: 'web' }>
  reduce: boolean
}) {
  return (
    <div className="space-y-8 lg:space-y-10">
      <motion.div {...revealProps(reduce, 0.04)}>
        <div className="rounded-card border border-sz-border bg-[#0c0d11] p-3 lg:p-4">
          <div className="flex gap-1.5 mb-3 px-1">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <ProjectVisualFrame visual={work.homepage} framed={false} />
        </div>
      </motion.div>
      <motion.div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5" {...revealProps(reduce, 0.08)}>
        <ProjectVisualFrame visual={work.responsivePair.desktop} />
        <ProjectVisualFrame visual={work.responsivePair.mobile} className="max-w-xs mx-auto lg:mx-0" />
      </motion.div>
      <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-5" {...revealProps(reduce, 0.1)}>
        {work.keyPages.map((v) => (
          <ProjectVisualFrame key={v.alt} visual={v} />
        ))}
      </motion.div>
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl" {...revealProps(reduce, 0.12)}>
        {work.uxCallouts.map((c) => (
          <div key={c.label} className="border-l-2 border-sz-interaction pl-4">
            <p className="text-sz-dark font-semibold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {c.label}
            </p>
            <p className="text-sz-secondary text-sm leading-relaxed">{c.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function AppsWork({
  work,
  reduce,
}: {
  work: Extract<ProjectWork, { type: 'apps' }>
  reduce: boolean
}) {
  return (
    <div className="space-y-8 lg:space-y-10">
      <motion.div className="max-w-xs mx-auto" {...revealProps(reduce, 0.04)}>
        <div className="rounded-[2rem] border-[6px] border-sz-dark bg-sz-dark p-2">
          <ProjectVisualFrame visual={work.heroScreen} framed={false} />
        </div>
      </motion.div>
      <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-5" {...revealProps(reduce, 0.08)}>
        {work.keyScreens.map((v) => (
          <div key={v.alt} className="rounded-[1.5rem] border-4 border-sz-dark bg-sz-dark p-1.5 max-w-[220px] mx-auto w-full">
            <ProjectVisualFrame visual={v} framed={false} />
          </div>
        ))}
      </motion.div>
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start max-w-4xl"
        {...revealProps(reduce, 0.1)}
      >
        <ol className="space-y-3">
          {work.userFlow.map((step, i) => (
            <li key={step.step} className="flex gap-3 text-sz-secondary text-sm leading-relaxed">
              <span className="text-sz-interaction font-medium">{i + 1}</span>
              <span>{step.step}</span>
            </li>
          ))}
        </ol>
        <div className="grid gap-4">
          {work.featureHighlights.map((f) => (
            <div key={f.title} className="rounded-card border border-sz-border bg-white p-5">
              <h3 className="text-sz-dark font-semibold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                {f.title}
              </h3>
              <p className="text-sz-secondary text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
