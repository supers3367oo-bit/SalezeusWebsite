import { Link } from 'react-router-dom'
import { ArrowUp, Linkedin, Instagram, Twitter, Youtube } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import { scrollPageToTop } from '../../lib/locomotive'
import { useCmsContact } from '../../cms/useCmsContact'
import ContactPhones from '../contact/ContactPhones'
import { useLocale } from '../../providers/LocaleProvider'

export default function Footer() {
  const { t } = useLocale()
  const { email } = useCmsContact()

  const services = [
    { label: t('services.branding'), to: '/services/branding' },
    { label: t('services.marketing'), to: '/services/marketing' },
    { label: t('services.socialMedia'), to: '/services/social-media' },
    { label: t('services.consulting'), to: '/services/business-consulting' },
    { label: t('services.webDevelopment'), to: '/services/web-development' },
    { label: t('services.mobileApps'), to: '/services/mobile-apps' },
  ]

  const company = [
    { label: t('nav.about'), to: '/about' },
    { label: t('nav.portfolio'), to: '/portfolio' },
    { label: t('nav.insights'), to: '/insights' },
    { label: t('footer.careers'), to: '/about#team-heading' },
    { label: t('nav.contact'), to: '/contact' },
  ]

  const socials = [
    { Icon: Linkedin, href: '#', label: t('footer.linkedin') },
    { Icon: Instagram, href: '#', label: t('footer.instagram') },
    { Icon: Twitter, href: '#', label: t('footer.twitter') },
    { Icon: Youtube, href: '#', label: t('footer.youtube') },
  ]

  const legal = [
    t('footer.privacy'),
    t('footer.terms'),
    t('footer.cookies'),
  ]

  return (
    <footer className="bg-sz-dark border-t border-white/[0.08]">
      <div className="section-container py-16 lg:py-20">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 pb-14 border-b border-white/[0.08]">

          <div className="lg:col-span-2">
            <div className="mb-5">
              <Link to="/" aria-label={t('nav.homeAria')}>
                <Logo height={36} />
              </Link>
            </div>

            <p
              className="text-white/40 mb-6 max-w-xs"
              style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7 }}
            >
              {t('footer.tagline')}
            </p>

            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-card border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p
              className="text-white/60 font-medium mb-5"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              {t('footer.services')}
            </p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.to}>
                  <Link
                    to={s.to}
                    className="text-white/35 hover:text-white/70 transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="text-white/60 font-medium mb-5"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              {t('footer.company')}
            </p>
            <ul className="space-y-3">
              {company.map((c) => (
                <li key={c.to}>
                  <Link
                    to={c.to}
                    className="text-white/35 hover:text-white/70 transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="text-white/60 font-medium mb-5"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              {t('footer.getInTouch')}
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-white/30 text-xs mb-1" style={{ fontFamily: 'var(--font-body)' }}>{t('footer.email')}</p>
                <a
                  href={`mailto:${email}`}
                  className="text-white/60 hover:text-white transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}
                >
                  {email}
                </a>
              </div>
              <ContactPhones />
            </div>

            <Button to="/contact" size="sm" className="mt-6">
              {t('footer.startProject')}
            </Button>
          </div>

        </div>

        <div className="pt-7 flex flex-col items-center gap-6">
          <Button
            type="button"
            size="sm"
            onClick={() => scrollPageToTop()}
            icon={<ArrowUp className="sz-btn__arrow" strokeWidth={2.25} />}
            aria-label={t('footer.backToTopAria')}
          >
            {t('footer.backToTop')}
          </Button>

          <div className="flex w-full flex-col sm:flex-row items-center justify-between gap-4">
            <p
              className="text-white/40"
              style={{ fontFamily: 'var(--font-body)', fontSize: 12 }}
            >
              {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-6">
              {legal.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/40 hover:text-white/70 transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 12 }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
