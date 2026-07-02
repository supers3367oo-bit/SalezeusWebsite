import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import { getLocomotiveInstance, getScrollTop } from '../../lib/locomotive'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Insights', to: '/insights' },
]

const PILL_EASE = [0.22, 1, 0.36, 1] as const

function isLinkActive(pathname: string, to: string) {
  if (to === '/') return pathname === '/'
  if (to === '/portfolio') {
    return pathname === '/portfolio' || pathname.startsWith('/portfolio/')
  }
  return pathname === to || pathname.startsWith(`${to}/`)
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(getScrollTop() > 24)

    const lenis = getLocomotiveInstance()?.lenisInstance
    if (lenis) {
      lenis.on('scroll', onScroll)
      onScroll()
      return () => lenis.off('scroll', onScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  const renderNavLink = (link: (typeof NAV_LINKS)[number], onNavigate?: () => void) => {
    const active = isLinkActive(pathname, link.to)

    return (
      <Link
        key={link.label}
        to={link.to}
        onClick={onNavigate}
        className="relative text-sm font-medium tracking-wide text-sz-dark transition-opacity duration-300 hover:opacity-75"
      >
        {link.label}
        {active && (
          <span
            aria-hidden
            className="absolute -bottom-2 left-1/2 hidden h-1 w-1 -translate-x-1/2 rounded-full bg-sz-dark lg:block"
          />
        )}
      </Link>
    )
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none px-3 pt-3 sm:px-5 sm:pt-4 md:px-8 lg:px-10">
      <div className="relative mx-auto w-full max-w-[90rem] pointer-events-auto">
        <motion.div
          className={clsx(
            'nav-pill-glass relative flex w-full items-center justify-between gap-4 rounded-full',
            scrolled && 'nav-pill-glass--scrolled'
          )}
          initial={false}
          animate={{
            height: scrolled ? 58 : 64,
          }}
          transition={{ duration: 0.45, ease: PILL_EASE }}
          style={{
            paddingLeft: 'clamp(1.25rem, 2.5vw, 2rem)',
            paddingRight: 'clamp(0.65rem, 1.2vw, 0.85rem)',
          }}
        >
          <Link to="/" className="relative z-10 flex shrink-0 items-center py-2" aria-label="Salezeus home">
            <Logo variant="light" height={scrolled ? 28 : 32} />
          </Link>

          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 xl:gap-10 lg:flex">
            {NAV_LINKS.map((link) => renderNavLink(link))}
          </nav>

          <div className="relative z-10 ml-auto flex items-center gap-2">
            <div className="hidden lg:block">
              <Button to="/contact" size="sm">
                Contact Us
              </Button>
            </div>

            <button
              type="button"
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full text-sz-dark transition-opacity duration-300 hover:opacity-70"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.28, ease: PILL_EASE }}
              className="nav-mobile-glass absolute left-0 right-0 top-[calc(100%+10px)] overflow-hidden rounded-[1.25rem] p-5 shadow-[0_20px_50px_rgba(4,5,8,0.08)] lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => renderNavLink(link, () => setMobileOpen(false)))}
              </div>
              <Button
                to="/contact"
                size="sm"
                className="mt-5 w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
