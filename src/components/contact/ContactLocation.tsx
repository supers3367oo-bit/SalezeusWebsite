import { MapPin, Mail, Phone } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { REGIONS } from '../about/experience/globe/locations'
import { CONTACT_EMAIL, getOfficePhone } from '../../data/contact'

export default function ContactLocation() {
  const reduce = useReducedMotion() ?? false

  return (
    <section className="relative bg-[#040508] border-t border-white/[0.08] py-16 lg:py-24">
      <div className="section-container">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 lg:mb-12"
        >
          <h2
            className="text-white mb-3"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            Our location
          </h2>
          <p
            className="text-white/45 max-w-xl"
            style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7 }}
          >
            Studios in Turkey and Syria, working with clients across the MENA region and beyond.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 mb-10">
          {REGIONS.map((region, i) => (
            <motion.article
              key={region.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-card border border-white/10 bg-white/[0.04] p-6 lg:p-8"
            >
              <div className="flex items-start gap-3 mb-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10"
                  style={{
                    backgroundColor:
                      region.accent === 'blue' ? 'rgba(50,88,164,0.25)' : 'rgba(240,184,13,0.18)',
                  }}
                >
                  <MapPin
                    size={18}
                    strokeWidth={2}
                    className={region.accent === 'blue' ? 'text-[#6B8FD4]' : 'text-[#F0B80D]'}
                  />
                </span>
                <div>
                  <h3
                    className="text-white"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {region.country}
                  </h3>
                  <p
                    className="text-white/45 mt-1"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}
                  >
                    {region.cities}
                  </p>
                </div>
              </div>

              <p
                className="text-white/50 mb-5"
                style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65 }}
              >
                {region.description}
              </p>

              {(() => {
                const office = getOfficePhone(region.id)
                if (!office) return null
                return (
                  <a
                    href={`tel:${office.phoneE164}`}
                    className="mb-5 inline-flex items-center gap-2.5 text-white/60 hover:text-white transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}
                  >
                    <Phone size={15} strokeWidth={2} className="shrink-0 opacity-70" />
                    <span>
                      <span className="block text-white/35 text-xs mb-0.5">
                        {office.label}
                      </span>
                      {office.phoneDisplay}
                    </span>
                  </a>
                )
              })()}

              <ul className="flex flex-wrap gap-2">
                {region.services.slice(0, 4).map((service) => (
                  <li
                    key={service}
                    className="px-3 py-1 rounded-full text-xs border border-white/10 text-white/55"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <motion.a
          href={`mailto:${CONTACT_EMAIL}`}
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="inline-flex items-center gap-3 text-white/55 hover:text-white transition-colors duration-200"
          style={{ fontFamily: 'var(--font-body)', fontSize: 15 }}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
            <Mail size={18} strokeWidth={2} />
          </span>
          {CONTACT_EMAIL}
        </motion.a>
      </div>
    </section>
  )
}
