import { useState, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight, ArrowUpLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import LanguageToggle from './LanguageToggle'
import { useLocale } from '../../providers/LocaleProvider'
import { getLocomotiveInstance, getScrollTop } from '../../lib/locomotive'

const PILL_EASE = [0.22, 1, 0.36, 1] as const

function isLinkActive(pathname: string, to: string) {
  if (to === '/') return pathname === '/'
  if (to === '/portfolio') {
    return pathname === '/portfolio' || pathname.startsWith('/portfolio/')
  }
  return pathname === to || pathname.startsWith(`${to}/`)
}

export default function Navbar() {
  const { t, dir } = useLocale()
  const isRtl = dir === 'rtl'
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  const navLinks = useMemo(
    () => [
      { label: t('nav.home'), to: '/' },
      { label: t('nav.about'), to: '/about' },
      { label: t('nav.services'), to: '/services' },
      { label: t('nav.portfolio'), to: '/portfolio' },
      { label: t('nav.insights'), to: '/insights' },
    ],
    [t]
  )

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

  const renderNavLink = (link: (typeof navLinks)[number], onNavigate?: () => void) => {
    const active = isLinkActive(pathname, link.to)

    return (
      <Link
        key={link.to}
        to={link.to}
        onClick={onNavigate}
        className="relative text-sm font-medium tracking-wide text-sz-dark transition-opacity duration-300 hover:opacity-75"
      >
        {link.label}
        {active && (
          <span
            aria-hidden
            className="absolute -bottom-2 start-1/2 hidden h-1 w-1 -translate-x-1/2 rounded-full bg-sz-dark lg:block"
          />
        )}
      </Link>
    )
  }

  const contactButtonIcon = isRtl ? (
    <ArrowUpLeft className="sz-btn__arrow sz-btn__arrow--native-rtl" strokeWidth={2.25} />
  ) : (
    <ArrowUpRight className="sz-btn__arrow" strokeWidth={2.25} />
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none px-3 pt-3 sm:px-5 sm:pt-4 md:px-8 lg:px-10">
      <div className="relative mx-auto w-full max-w-[90rem] pointer-events-auto">
        <motion.div
          dir="ltr"
          className={clsx(
            'nav-pill-glass relative flex w-full items-center justify-between gap-4 rounded-full',
            isRtl && 'flex-row-reverse',
            scrolled && 'nav-pill-glass--scrolled'
          )}
          initial={false}
          animate={{
            height: scrolled ? 58 : 64,
          }}
          transition={{ duration: 0.45, ease: PILL_EASE }}
          style={{
            paddingLeft: isRtl
              ? 'clamp(0.65rem, 1.2vw, 0.85rem)'
              : 'clamp(1.25rem, 2.5vw, 2rem)',
            paddingRight: isRtl
              ? 'clamp(1.25rem, 2.5vw, 2rem)'
              : 'clamp(0.65rem, 1.2vw, 0.85rem)',
          }}
        >
          <Link to="/" className="relative z-10 flex shrink-0 items-center py-2" aria-label={t('nav.homeAria')}>
            <Logo variant="light" height={scrolled ? 28 : 32} />
          </Link>

          <nav
            dir={isRtl ? 'rtl' : 'ltr'}
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 xl:gap-10 lg:flex"
          >
            {navLinks.map((link) => renderNavLink(link))}
          </nav>

          <div className="relative z-10 flex shrink-0 items-center gap-2">
            <LanguageToggle className="hidden sm:inline-flex" />

            <div className="hidden lg:block">
              <Button to="/contact" size="sm" icon={contactButtonIcon} dir={dir}>
                {t('nav.contact')}
              </Button>
            </div>

            <button
              type="button"
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full text-sz-dark transition-opacity duration-300 hover:opacity-70"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
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
              className="nav-mobile-glass absolute inset-x-0 top-[calc(100%+10px)] overflow-hidden rounded-[1.25rem] p-5 shadow-[0_20px_50px_rgba(4,5,8,0.08)] lg:hidden"
            >
              <div className="mb-4 flex justify-end sm:hidden">
                <LanguageToggle />
              </div>
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => renderNavLink(link, () => setMobileOpen(false)))}
              </div>
              <Button
                to="/contact"
                size="sm"
                className="mt-5 w-full justify-center"
                icon={contactButtonIcon}
                dir={dir}
                onClick={() => setMobileOpen(false)}
              >
                {t('nav.contact')}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
