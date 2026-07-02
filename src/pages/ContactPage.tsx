import { useLayoutEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '../components/ui/SplitText'
import ContactBackground from '../components/contact/ContactBackground'
import ContactForm from '../components/contact/ContactForm'
import ContactLocation from '../components/contact/ContactLocation'
import ContactPhones from '../components/contact/ContactPhones'
import { CONTACT_EMAIL } from '../data/contact'
import { refreshLocomotiveScroll } from '../lib/locomotive'

export default function ContactPage() {
  const reduce = useReducedMotion() ?? false

  useLayoutEffect(() => {
    requestAnimationFrame(() => refreshLocomotiveScroll())
  }, [])

  return (
    <>
      <section className="relative min-h-[100dvh] bg-sz-dark overflow-hidden pt-24 lg:pt-28 pb-16 lg:pb-20">
        <ContactBackground />

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div
              className="lg:col-span-5 min-w-0 lg:sticky lg:top-28"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1
                className="text-white mb-5 max-w-full"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.75rem, 4.5vw, 3.75rem)',
                  lineHeight: 1.08,
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                }}
              >
                <SplitText text="Let's start a conversation." wrap stagger={0.08} duration={0.7} />
              </h1>

              <p
                className="text-white/45 max-w-md mb-8"
                style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.75 }}
              >
                Tell us what you are building, or how you would like to work with Salezeus. We
                respond within one business day.
              </p>

              <div className="mb-8 space-y-8 lg:mb-0">
                <div>
                  <p
                    className="text-white/30 text-xs mb-2 uppercase tracking-[0.12em]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Email
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-white/60 hover:text-white transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 15 }}
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>

                <ContactPhones
                  className="space-y-5"
                  labelClassName="text-white/30 text-xs mb-1.5 uppercase tracking-[0.12em]"
                  phoneClassName="text-white/60 hover:text-white transition-colors duration-200"
                />

                <div className="space-y-3 text-sm text-white/40 lg:pt-2" style={{ fontFamily: 'var(--font-body)' }}>
                  <p>Service requests and project inquiries welcome.</p>
                  <p>Talent applications reviewed on a rolling basis.</p>
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-7 min-w-0">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <ContactLocation />
    </>
  )
}
