import { motion, useReducedMotion } from 'framer-motion'
import type { ProjectDetail } from '../../../types/projectDetail'
import { revealProps } from './shared'

type Props = {
  project: ProjectDetail
}

const STORY_BLOCKS = [
  { key: 'challenge', title: 'Challenge' },
  { key: 'approach', title: 'Approach' },
  { key: 'result', title: 'Result' },
] as const

export default function ProjectStory({ project }: Props) {
  const reduce = useReducedMotion() ?? false

  return (
    <section className="section-surface section-padding border-t border-sz-border/60">
      <div className="section-container">
        <div className="max-w-[65ch] space-y-10 lg:space-y-12">
          {STORY_BLOCKS.map((block, i) => (
            <motion.div key={block.key} {...revealProps(reduce, i * 0.06)}>
              <h2
                className="text-sz-dark mb-3"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.35rem',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                }}
              >
                {block.title}
              </h2>
              <p
                className="text-sz-secondary"
                style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.75 }}
              >
                {project[block.key]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
