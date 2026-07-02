import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../../ui/Button'
import type { ServiceFAQ } from '../../../types/services'

type Props = {
  faqs: ServiceFAQ[]
  serviceTitle: string
}

export default function ServiceFAQ({ faqs, serviceTitle }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-[#F0EFEC] section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          <div className="lg:col-span-2">
            <h2
              className="text-sz-dark mb-5"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                lineHeight: 1.12,
                fontWeight: 600,
                letterSpacing: '-0.02em',
              }}
            >
              Questions about {serviceTitle.toLowerCase()}
            </h2>
            <p
              className="text-sz-secondary mb-8"
              style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7 }}
            >
              Straight answers before you reach out. Still unsure? We respond within one business day.
            </p>
            <Button to="/contact" size="sm">
              Contact us
            </Button>
          </div>

          <div className="lg:col-span-3 divide-y divide-sz-border">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                  >
                    <span
                      className="font-medium text-sz-dark group-hover:text-sz-interaction transition-colors duration-200"
                      style={{ fontFamily: 'var(--font-heading)', fontSize: 16 }}
                    >
                      {faq.question}
                    </span>
                    <span
                      className="shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 mt-0.5"
                      style={{
                        borderColor: isOpen ? '#3258A4' : '#E8E4DE',
                        color: isOpen ? '#3258A4' : '#303640',
                      }}
                    >
                      {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p
                          className="text-sz-secondary pb-5 pr-10"
                          style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7 }}
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
