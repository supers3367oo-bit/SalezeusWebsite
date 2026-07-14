import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react'
import { useAdminContent } from '../content/AdminContentContext'

export default function AdminToasts() {
  const { toasts, dismissToast } = useAdminContent()

  return (
    <div className="pointer-events-none fixed bottom-6 end-6 z-[80] flex w-[min(100%-2rem,22rem)] flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon =
            toast.tone === 'success'
              ? CheckCircle2
              : toast.tone === 'error'
                ? AlertCircle
                : Info
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              className={`pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.45)] backdrop-blur ${
                toast.tone === 'success'
                  ? 'border-emerald-200/80 bg-emerald-50/95 text-emerald-900'
                  : toast.tone === 'error'
                    ? 'border-red-200/80 bg-red-50/95 text-red-900'
                    : 'border-white/80 bg-white/95 text-sz-dark'
              }`}
            >
              <Icon className="mt-0.5 h-4 w-4 shrink-0 opacity-80" />
              <p className="flex-1 text-sm leading-snug">{toast.message}</p>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="rounded-md p-0.5 opacity-55 transition hover:opacity-100"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
