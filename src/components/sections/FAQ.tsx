import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../ui/Button'

const FAQS = [
  {
    q: 'What industries do you work with?',
    a: 'We work across a broad range of industries including technology, retail, F&B, real estate, healthcare, education, and professional services. Our methodology is industry-agnostic — what matters most is your ambition to grow.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Project timelines vary by scope. A brand identity project typically takes 4–6 weeks. A website takes 6–10 weeks. A full brand + marketing launch can span 8–16 weeks. We\'ll give you a precise timeline after our discovery session.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. While we\'re headquartered with operations in Turkey and Syria, we work with clients remotely across the MENA region and beyond. Our workflows are built for distributed collaboration.',
  },
  {
    q: 'What is your pricing model?',
    a: 'We offer project-based pricing for defined scopes and retainer models for ongoing partnerships. We don\'t have one-size-fits-all pricing — every proposal is tailored to your specific needs and goals.',
  },
  {
    q: 'Can you handle both brand strategy and execution?',
    a: 'Absolutely — that\'s our core strength. We bridge the gap between strategic thinking and creative execution, providing end-to-end coverage so you don\'t need to manage multiple agencies.',
  },
  {
    q: 'Do you offer ongoing support after project launch?',
    a: 'Yes. We offer post-launch maintenance, monitoring, and growth retainers. Many of our clients transition from project engagements to long-term partnerships after seeing initial results.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="section-surface section-padding" id="faq">
      <div className="section-container">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">

          {/* Left: Header */}
          <div className="lg:col-span-2">
            <span className="label-tag mb-3 block">FAQ</span>
            <h2 className="heading-lg text-sz-dark mb-5">
              Common<br />Questions
            </h2>
            <p
              className="text-sz-secondary mb-8"
              style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7 }}
            >
              Can't find what you're looking for? Reach out directly and we'll respond within one business day.
            </p>
            <Button href="#contact">
              Ask Us Anything
            </Button>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-3 space-y-0 divide-y divide-sz-border">
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                  >
                    <span
                      className="font-medium text-sz-dark group-hover:text-sz-interaction transition-colors duration-200"
                      style={{ fontFamily: 'var(--font-heading)', fontSize: 16 }}
                    >
                      {faq.q}
                    </span>
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full border border-sz-border flex items-center justify-center transition-all duration-200 mt-0.5"
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
                          {faq.a}
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
