import { motion, useReducedMotion } from 'framer-motion'
import ServiceCard from './ServiceCard'
import { SERVICES } from '../../data/services'

export default function ServicesGrid() {
  const reduce = useReducedMotion() ?? false

  return (
    <section className="section-surface section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <ServiceCard service={service} layout="grid" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
