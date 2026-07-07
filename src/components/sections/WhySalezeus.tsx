import { motion } from 'framer-motion'
import SplitText from '../ui/SplitText'
import Button from '../ui/Button'
import Aurora from '../ui/Aurora'
import Particles from '../ui/backgrounds/Particles'
import Threads from '../ui/backgrounds/Threads'
import { useLocale } from '../../providers/LocaleProvider'
import { useLightMotion } from '../../lib/useLightMotion'

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

const MOBILE_CARD_BACKGROUNDS = [
  '/images/why/strategy-mobile.png',
  '/images/why/creative-mobile.png',
  '/images/why/business-mobile.png',
] as const

type WhyCard = {
  variant: 'dark' | 'light'
  title: readonly [string, string]
  footnote: string
}

function CardBackground({
  index,
  useImageFallback,
}: {
  variant: 'dark' | 'light'
  index: number
  useImageFallback: boolean
}) {
  const fallbackClass =
    index === 0
      ? 'bg-gradient-to-br from-[#1a2d52] via-[#243d6e] to-[#0a0b0f]'
      : index === 1
        ? 'bg-gradient-to-br from-[#e8e4de] via-[#f2efe9] to-[#ddd8d0]'
        : 'bg-gradient-to-br from-[#2d4f96] via-[#3258A4] to-[#1e3460]'

  return (
    <>
      <div className={`absolute inset-0 ${fallbackClass}`} aria-hidden />
      {useImageFallback ? (
        <img
          src={MOBILE_CARD_BACKGROUNDS[index]}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0">
          {index === 0 && (
            <Aurora
              colorStops={['#3258A4', '#1e3460', '#040508']}
              amplitude={0.85}
              blend={0.42}
              speed={0.8}
            />
          )}
          {index === 1 && (
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
          )}
          {index === 2 && (
            <Threads
              color={[0.88, 0.92, 1]}
              amplitude={0.85}
              distance={0.28}
              enableMouseInteraction
            />
          )}
        </div>
      )}
    </>
  )
}

function CardTitle({
  lines,
  variant,
  isRtl,
}: {
  lines: readonly [string, string]
  variant: 'dark' | 'light'
  isRtl: boolean
}) {
  return (
    <h3
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`text-start leading-[1.05] ${
        variant === 'dark' ? 'text-white' : 'text-sz-dark'
      }`}
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(2rem, 4.2vw, 2.85rem)',
        fontWeight: 700,
        letterSpacing: '-0.03em',
      }}
    >
      <span className="lg:hidden whitespace-nowrap">
        {lines[0]} {lines[1]}
      </span>
      <span className="hidden lg:inline">
        {lines[0]}
        <br />
        {lines[1]}
      </span>
    </h3>
  )
}

function DarkFactCard({
  card,
  index,
  isRtl,
  useImageFallback,
}: {
  card: WhyCard
  index: number
  isRtl: boolean
  useImageFallback: boolean
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
      <div className="absolute inset-0 min-h-[200px]">
        <CardBackground variant="dark" index={index} useImageFallback={useImageFallback} />
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
          <CardTitle lines={card.title} variant="dark" isRtl={isRtl} />
        </div>

        <p
          className="text-start text-white/70"
          dir={isRtl ? 'rtl' : 'ltr'}
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
  isRtl,
  useImageFallback,
}: {
  card: WhyCard
  index: number
  isRtl: boolean
  useImageFallback: boolean
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      className="relative flex min-h-[360px] flex-col overflow-hidden rounded-card bg-[#ECE8E2] sm:min-h-[400px] lg:min-h-[440px]"
    >
      <div className="absolute inset-0 min-h-[200px] opacity-70">
        <CardBackground variant="light" index={index} useImageFallback={useImageFallback} />
      </div>

      <div className="relative z-10 flex h-full min-h-[inherit] flex-col p-5 sm:p-6">
        <div className="flex flex-1 w-full items-center justify-start px-1 py-6">
          <CardTitle lines={card.title} variant="light" isRtl={isRtl} />
        </div>

        <p
          className="text-start text-sz-primary/75"
          dir={isRtl ? 'rtl' : 'ltr'}
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
  const { t, locale } = useLocale()
  const lightMotion = useLightMotion()
  const isRtl = locale === 'ar'
  const cards = [
    {
      ...CARDS[0],
      title: [t('why.cards.strategy.title1'), t('why.cards.strategy.title2')] as const,
      footnote: t('why.cards.strategy.footnote'),
    },
    {
      ...CARDS[1],
      title: [t('why.cards.creative.title1'), t('why.cards.creative.title2')] as const,
      footnote: t('why.cards.creative.footnote'),
    },
    {
      ...CARDS[2],
      title: [t('why.cards.business.title1'), t('why.cards.business.title2')] as const,
      footnote: t('why.cards.business.footnote'),
    },
  ] as const

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
            {t('why.label')}
          </span>
          <h2 className="heading-lg mb-4 overflow-visible text-center text-white">
            <SplitText
              text={t('why.title')}
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
            {t('why.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
          <DarkFactCard card={cards[0]} index={0} isRtl={isRtl} useImageFallback={lightMotion} />
          <LightFactCard card={cards[1]} index={1} isRtl={isRtl} useImageFallback={lightMotion} />
          <DarkFactCard card={cards[2]} index={2} isRtl={isRtl} useImageFallback={lightMotion} />
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
            {t('why.closing')}
          </p>
          <Button to="/about#team-heading">
            {t('why.cta')}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
