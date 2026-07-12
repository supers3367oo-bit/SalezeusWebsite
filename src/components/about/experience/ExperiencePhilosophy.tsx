import { motion, useReducedMotion } from 'framer-motion'
import { useLocale } from '../../../providers/LocaleProvider'
import { useSiteAsset } from '../../../providers/SiteAssetsProvider'

function PhilosophyImage({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div
      className={`overflow-hidden rounded-[20px] bg-sz-dark/5 shadow-[0_12px_40px_rgba(4,5,8,0.08)] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-center"
        loading="lazy"
      />
    </div>
  )
}

function PhilosophyParagraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-5">
      {paragraphs.map((text) => (
        <p
          key={text.slice(0, 32)}
          className="text-sz-primary/55"
          style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8 }}
        >
          {text}
        </p>
      ))}
    </div>
  )
}

export default function ExperiencePhilosophy() {
  const { t } = useLocale()
  const reduce = useReducedMotion()
  const philosophyLeft = useSiteAsset('about.philosophyLeft')
  const philosophyRight = useSiteAsset('about.philosophyRight')
  const rowOneCopy = [
    t('experience.philosophy.rowOne.p1'),
    t('experience.philosophy.rowOne.p2'),
  ]
  const rowTwoCopy = [
    t('experience.philosophy.rowTwo.p1'),
    t('experience.philosophy.rowTwo.p2'),
  ]

  return (
    <section className="section-surface relative overflow-hidden">
      <div className="section-container relative z-10 pt-12 pb-8 lg:pt-28 lg:pb-10">
        <div className="flex flex-col gap-16 lg:gap-24">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55 }}
            >
              <PhilosophyImage
                src={philosophyLeft}
                alt={t('experience.philosophy.imageLeftAlt')}
                className="aspect-[4/3] w-full max-w-xl"
              />
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="lg:py-4"
            >
              <h2
                className="text-sz-dark uppercase tracking-[0.02em]"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  lineHeight: 1.08,
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                }}
              >
                {t('experience.philosophy.title')}
              </h2>
              <p
                className="mt-5 max-w-md text-sz-primary/55"
                style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.75 }}
              >
                {t('experience.philosophy.subtitle')}
              </p>
              <div className="mt-8 max-w-lg">
                <PhilosophyParagraphs paragraphs={rowOneCopy} />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55 }}
              className="order-2 lg:order-1 lg:py-4"
            >
              <div className="max-w-lg lg:ml-auto lg:mr-0">
                <PhilosophyParagraphs paragraphs={rowTwoCopy} />
              </div>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="order-1 lg:order-2 lg:ml-auto"
            >
              <PhilosophyImage
                src={philosophyRight}
                alt={t('experience.philosophy.imageRightAlt')}
                className="aspect-[4/3] w-full max-w-xl lg:ml-auto"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
