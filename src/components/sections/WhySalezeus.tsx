import { motion } from 'framer-motion'
import SplitText from '../ui/SplitText'
import Button from '../ui/Button'
import Aurora from '../ui/Aurora'
import Particles from '../ui/backgrounds/Particles'
import Threads from '../ui/backgrounds/Threads'

const CARDS = [
  {
    variant: 'dark' as const,
    title: ['Strategy', 'First'] as const,
    footnote: 'Every decision grounded in research, data, and your business objectives.',
  },
  {
    variant: 'light' as const,
    title: ['Creative', 'Thinking'] as const,
    footnote: 'Original ideas that cut through the noise, beautiful and effective in equal measure.',
  },
  {
    variant: 'dark' as const,
    title: ['Business', 'Focus'] as const,
    footnote: 'Success measured in revenue, retention, and growth, not just aesthetics.',
  },
]

const EASE = [0.22, 1, 0.36, 1] as const

function CardBackground({ variant, index }: { variant: 'dark' | 'light'; index: number }) {
  if (index === 0) {
    return (
      <Aurora
        colorStops={['#3258A4', '#1e3460', '#040508']}
        amplitude={0.85}
        blend={0.42}
        speed={0.8}
      />
    )
  }

  if (index === 1) {
    return (
      <Particles
        className="h-full w-full"
        particleCount={180}
        particleSpread={9}
        speed={0.08}
        particleColors={['#3258A4', '#F0B80D', '#303640']}
        moveParticlesOnHover
        particleHoverFactor={0.6}
        alphaParticles
        particleBaseSize={90}
        sizeRandomness={0.8}
        cameraDistance={22}
      />
    )
  }

  if (index === 2) {
    return (
      <Threads
        color={[0.88, 0.92, 1]}
        amplitude={0.85}
        distance={0.28}
        enableMouseInteraction
      />
    )
  }

  return (
    <Threads
      color={variant === 'dark' ? [0.75, 0.78, 0.85] : [0.2, 0.35, 0.64]}
      amplitude={1.1}
      distance={0.35}
      enableMouseInteraction
    />
  )
}

function CardTitle({
  lines,
  variant,
}: {
  lines: readonly [string, string]
  variant: 'dark' | 'light'
}) {
  return (
    <h3
      className={`text-left leading-[1.05] ${
        variant === 'dark' ? 'text-white' : 'text-sz-dark'
      }`}
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(2rem, 4.2vw, 2.85rem)',
        fontWeight: 700,
        letterSpacing: '-0.03em',
      }}
    >
      {lines[0]}
      <br />
      {lines[1]}
    </h3>
  )
}

function DarkFactCard({
  card,
  index,
}: {
  card: (typeof CARDS)[number]
  index: number
}) {
  const isBrandBlue = index === 2

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      className={`relative flex min-h-[360px] flex-col overflow-hidden rounded-card sm:min-h-[400px] lg:min-h-[440px] ${
        isBrandBlue ? 'bg-[#3258A4]' : 'bg-[#111216]'
      }`}
    >
      <div className="absolute inset-0">
        <CardBackground variant="dark" index={index} />
        <div
          className={`absolute inset-0 ${
            isBrandBlue
              ? 'bg-gradient-to-b from-white/10 via-transparent to-[#274A8F]/25'
              : 'bg-gradient-to-b from-[#040508]/30 via-[#040508]/10 to-[#040508]/85'
          }`}
        />
      </div>

      <div className="relative z-10 flex h-full min-h-[inherit] flex-col p-5 sm:p-6">
        <div className="flex flex-1 w-full items-center justify-start px-1 py-6">
          <CardTitle lines={card.title} variant="dark" />
        </div>

        <p
          className="text-left text-white/70"
          style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.65 }}
        >
          {card.footnote}
        </p>
      </div>
    </motion.article>
  )
}

function LightFactCard({
  card,
  index,
}: {
  card: (typeof CARDS)[number]
  index: number
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      className="relative flex min-h-[360px] flex-col overflow-hidden rounded-card bg-[#ECE8E2] sm:min-h-[400px] lg:min-h-[440px]"
    >
      <div className="absolute inset-0 opacity-70">
        <CardBackground variant="light" index={index} />
      </div>

      <div className="relative z-10 flex h-full min-h-[inherit] flex-col p-5 sm:p-6">
        <div className="flex flex-1 w-full items-center justify-start px-1 py-6">
          <CardTitle lines={card.title} variant="light" />
        </div>

        <p
          className="text-left text-sz-primary/75"
          style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.65 }}
        >
          {card.footnote}
        </p>
      </div>
    </motion.article>
  )
}

type WhySalezeusProps = {
  sectionId?: string
}

export default function WhySalezeus({ sectionId = 'about' }: WhySalezeusProps) {
  return (
    <section className="bg-sz-dark section-padding" id={sectionId}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header mx-auto mb-10 max-w-3xl text-center lg:mb-12"
        >
          <span className="label-tag mb-3 block text-white/45">
            Why Salezeus
          </span>
          <h2 className="heading-lg mb-4 overflow-visible text-center text-white">
            <SplitText
              text="What Makes Us Different"
              wrap
              repeat
              stagger={0.1}
              duration={1}
            />
          </h2>
          <p
            className="mx-auto max-w-md text-white/50"
            style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65 }}
          >
            A snapshot of how we think, create, and deliver: strategy, creativity, and business impact in one
            partnership.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
          <DarkFactCard card={CARDS[0]} index={0} />
          <LightFactCard card={CARDS[1]} index={1} />
          <DarkFactCard card={CARDS[2]} index={2} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 lg:mt-14 flex flex-col items-center text-center"
        >
          <p
            className="text-white/45 mb-6 max-w-lg"
            style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65 }}
          >
            Ready to turn strategy, creativity, and focus into real growth? Let&apos;s build something
            remarkable together.
          </p>
          <Button to="/#contact">
            Get A Consultation Now!
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
