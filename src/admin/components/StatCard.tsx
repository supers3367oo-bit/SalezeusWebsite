import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

type Props = {
  label: string
  value: string | number
  hint?: string
  icon: LucideIcon
  to?: string
  delay?: number
}

export default function StatCard({ label, value, hint, icon: Icon, to, delay = 0 }: Props) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="group relative overflow-hidden rounded-2xl border border-sz-border bg-white p-5 shadow-[0_1px_0_rgba(15,23,42,0.03)] transition duration-300 hover:-translate-y-0.5 hover:border-sz-interaction/35 hover:shadow-[0_16px_32px_-20px_rgba(15,23,42,0.35)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sz-interaction/40 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="pointer-events-none absolute -end-8 -top-10 h-28 w-28 rounded-full bg-sz-interaction-soft blur-2xl transition duration-500 group-hover:scale-125" />
      <div className="pointer-events-none absolute -bottom-12 -start-6 h-24 w-24 rounded-full bg-sz-accent/20 blur-2xl opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sz-primary/50">
            {label}
          </p>
          <p className="mt-2.5 font-heading text-3xl font-semibold tracking-tight text-sz-dark">
            {value}
          </p>
          {hint ? (
            <p className="mt-1.5 text-xs text-sz-primary/55">{hint}</p>
          ) : null}
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="rounded-xl bg-sz-interaction-soft p-2.5 text-sz-interaction ring-1 ring-sz-interaction/10 transition group-hover:bg-sz-interaction group-hover:text-white">
            <Icon className="h-5 w-5" />
          </div>
          {to ? (
            <ArrowUpRight className="h-3.5 w-3.5 text-sz-primary/25 transition group-hover:text-sz-interaction rtl:-scale-x-100" />
          ) : null}
        </div>
      </div>
    </motion.div>
  )

  if (to) {
    return (
      <Link
        to={to}
        className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sz-interaction"
      >
        {inner}
      </Link>
    )
  }

  return inner
}
