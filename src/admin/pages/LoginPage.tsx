import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useAdminAuth } from '../auth/AdminAuthContext'
import { useSiteAsset } from '../../providers/SiteAssetsProvider'

export default function LoginPage() {
  const { isAuthenticated, login } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/admin'
  const adminMark = useSiteAsset('brand.adminMark')

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    void login(email, password).then((result) => {
      if (result.ok) {
        navigate(from, { replace: true })
      } else {
        setError(result.error)
        setSubmitting(false)
      }
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-sz-dark text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -start-24 top-0 h-80 w-80 rounded-full bg-sz-interaction/30 blur-3xl" />
        <div className="absolute -end-16 bottom-0 h-96 w-96 rounded-full bg-sz-accent/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block"
        >
          <img src={adminMark} alt="Salezeus" className="mb-8 h-14 w-14 object-contain" />
          <p className="font-heading text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
            Salezeus
            <span className="mt-2 block text-sz-accent">Admin</span>
          </p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/65">
            Manage bilingual page copy, team, services, projects, and insights from one calm
            control center.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="mb-8 text-center lg:hidden">
            <img src={adminMark} alt="Salezeus" className="mx-auto mb-4 h-12 w-12 object-contain" />
            <h1 className="font-heading text-2xl font-semibold">Salezeus Admin</h1>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-white/10 bg-white/95 p-6 text-sz-dark shadow-xl backdrop-blur sm:p-8"
          >
            <h2 className="font-heading text-xl font-semibold">Sign in</h2>
            <p className="mt-1 text-sm text-sz-primary/60">Use your admin credentials to continue.</p>

            <div className="mt-6 space-y-4">
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-sz-primary/55">
                  Email
                </span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sz-primary/40" />
                  <input
                    type="email"
                    required
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-sz-border bg-white py-2.5 pe-3 ps-10 text-sm outline-none transition focus:border-sz-interaction focus:ring-2 focus:ring-sz-interaction/20"
                  />
                </div>
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-sz-primary/55">
                  Password
                </span>
                <div className="relative">
                  <Lock className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sz-primary/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-sz-border bg-white py-2.5 pe-10 ps-10 text-sm outline-none transition focus:border-sz-interaction focus:ring-2 focus:ring-sz-interaction/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute end-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-sz-primary/45 hover:text-sz-primary"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>
            </div>

            {error ? (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
              >
                {error}
              </motion.p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-btn bg-sz-interaction py-2.5 text-sm font-semibold text-white transition hover:bg-sz-interaction-hover disabled:opacity-60"
            >
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>

            <p className="mt-4 text-center text-[11px] text-sz-primary/45">
              Credentials are loaded from the server <code className="font-mono">.env</code>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
