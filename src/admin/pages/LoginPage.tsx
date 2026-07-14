import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react'
import { useAdminAuth } from '../auth/AdminAuthContext'
import { useSiteAsset } from '../../providers/SiteAssetsProvider'

export default function LoginPage() {
  const { isAuthenticated, login } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/admin'
  const adminMark = useSiteAsset('brand.adminMark')
  const ambientImage = useSiteAsset('about.hero')

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
    <div dir="ltr" className="relative min-h-screen overflow-hidden bg-[#070a10] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-0 h-[28rem] w-[28rem] rounded-full bg-sz-interaction/35 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-[30rem] w-[30rem] rounded-full bg-sz-accent/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.45) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Soft ambient photo — right side, bleeds behind the login card */}
        <div className="absolute inset-y-[-10%] right-[-8%] w-[78%] max-w-4xl rotate-2 lg:w-[64%]">
          <img
            src={ambientImage}
            alt=""
            className="h-full w-full scale-[1.12] object-cover opacity-[0.16] saturate-[0.8]"
            style={{
              maskImage:
                'linear-gradient(to left, black 0%, rgba(0,0,0,0.75) 48%, transparent 92%), linear-gradient(to bottom, transparent 0%, black 16%, black 82%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to left, black 0%, rgba(0,0,0,0.75) 48%, transparent 92%), linear-gradient(to bottom, transparent 0%, black 16%, black 82%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tl from-[#070a10]/45 via-transparent to-[#070a10]/70" />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
          className="hidden lg:block"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white/80 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-sz-accent" />
            Admin
          </div>
          <img src={adminMark} alt="Salezeus" className="-my-8 h-36 w-36 object-contain" />
          <p className="whitespace-nowrap font-heading text-5xl font-semibold leading-none tracking-tight">
            Salezeus <span className="text-white/45">Admin</span>
          </p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/55">
            Manage bilingual page copy, team, services, projects, and insights from one calm
            control center.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="relative z-10 mx-auto w-full max-w-md"
        >
          <div className="mb-8 text-center lg:hidden">
            <img src={adminMark} alt="Salezeus" className="mx-auto -mb-6 h-28 w-28 object-contain" />
            <h1 className="whitespace-nowrap font-heading text-2xl font-semibold">Salezeus Admin</h1>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-[1.75rem] border border-white/10 bg-white/95 p-6 text-sz-dark shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:p-8"
          >
            <h2 className="font-heading text-xl font-semibold tracking-tight">Sign in</h2>
            <p className="mt-1 text-sm text-sz-primary/55">
              Use your admin credentials to continue.
            </p>

            <div className="mt-6 space-y-4">
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-sz-primary/50">
                  Email
                </span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sz-primary/35" />
                  <input
                    type="email"
                    required
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@salezeus.com"
                    className="w-full rounded-xl border border-sz-border bg-[#f7f8fb] py-2.5 pe-3 ps-10 text-sm outline-none transition placeholder:text-sz-primary/30 focus:border-sz-interaction focus:bg-white focus:ring-2 focus:ring-sz-interaction/15"
                  />
                </div>
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-sz-primary/50">
                  Password
                </span>
                <div className="relative">
                  <Lock className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sz-primary/35" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-sz-border bg-[#f7f8fb] py-2.5 pe-10 ps-10 text-sm outline-none transition placeholder:text-sz-primary/30 focus:border-sz-interaction focus:bg-white focus:ring-2 focus:ring-sz-interaction/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute end-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-sz-primary/40 hover:text-sz-primary"
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
                className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700"
              >
                {error}
              </motion.p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-xl bg-sz-interaction py-2.5 text-sm font-semibold text-white shadow-[0_14px_32px_-16px_rgba(50,88,164,0.95)] transition hover:brightness-110 disabled:opacity-60"
            >
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
