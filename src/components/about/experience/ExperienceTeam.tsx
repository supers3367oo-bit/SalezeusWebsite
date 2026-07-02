import { useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { TEAM } from '../../../data/team'

export default function ExperienceTeam() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const member = TEAM[active]

  const go = useCallback(
    (index: number) => {
      setActive((index + TEAM.length) % TEAM.length)
    },
    []
  )

  return (
    <section className="bg-sz-dark relative overflow-hidden min-h-[100dvh] lg:min-h-[90dvh] flex flex-col justify-center py-20 lg:py-24" id="team">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 100%, rgba(50,88,164,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="section-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <h2
              className="text-white mb-8 lg:mb-12"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                lineHeight: 1.08,
                fontWeight: 600,
                letterSpacing: '-0.02em',
              }}
            >
              The Minds Behind Salezeus
            </h2>

            <ul className="space-y-1 max-h-[45dvh] lg:max-h-none overflow-y-auto lg:overflow-visible pr-2" role="tablist" aria-label="Team members">
              {TEAM.map((person, i) => (
                <li key={person.name}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active === i}
                    onMouseEnter={() => !reduce && setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => go(i)}
                    className="group w-full text-left py-3 border-b border-white/[0.08] transition-colors duration-200"
                  >
                    <span
                      className={`block transition-colors duration-200 ${
                        active === i ? 'text-white' : 'text-white/35 group-hover:text-white/65'
                      }`}
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: active === i ? 'clamp(1.25rem, 2.5vw, 1.75rem)' : '1rem',
                        fontWeight: active === i ? 600 : 500,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {person.name}
                    </span>
                    <AnimatePresence mode="wait">
                      {active === i && (
                        <motion.span
                          initial={reduce ? false : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="block text-white/45 overflow-hidden"
                          style={{ fontFamily: 'var(--font-body)', fontSize: 13, marginTop: 4 }}
                        >
                          {person.role}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] max-h-[70dvh] mx-auto lg:mx-0 lg:ml-auto w-full max-w-lg overflow-card">
              <AnimatePresence mode="wait">
                <motion.img
                  key={member.src}
                  src={member.src}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
              </AnimatePresence>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(4,5,8,0.75) 0%, transparent 45%)',
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-10">
                <p
                  className="text-white"
                  style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600 }}
                >
                  {member.firstName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
