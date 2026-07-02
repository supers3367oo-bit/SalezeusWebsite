import { Link } from 'react-router-dom'
import { ArrowUp, Linkedin, Instagram, Twitter, Youtube } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import { scrollPageToTop } from '../../lib/locomotive'
import { CONTACT_EMAIL } from '../../data/contact'
import ContactPhones from '../contact/ContactPhones'

const SERVICES = [
  { label: 'Branding', to: '/services/branding' },
  { label: 'Marketing', to: '/services/marketing' },
  { label: 'Social Media', to: '/services/social-media' },
  { label: 'Consulting', to: '/services/business-consulting' },
  { label: 'Web Development', to: '/services/web-development' },
  { label: 'Mobile Apps', to: '/services/mobile-apps' },
]
const COMPANY = [
  { label: 'About', to: '/about' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Insights', to: '/insights' },
  { label: 'Careers', to: '/about#team' },
  { label: 'Contact', to: '/contact' },
]
const SOCIALS = [
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Twitter, href: '#', label: 'X / Twitter' },
  { Icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-sz-dark border-t border-white/[0.08]">
      <div className="section-container py-16 lg:py-20">

        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 pb-14 border-b border-white/[0.08]">

          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-5">
              <Link to="/" aria-label="Salezeus home">
                <Logo height={36} />
              </Link>
            </div>

            <p
              className="text-white/40 mb-6 max-w-xs"
              style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7 }}
            >
              A full-service brand growth agency partnering with ambitious businesses across Turkey, Syria, and beyond.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {SOCIALS.map(({ Icon, href, label }) => (
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

          {/* Links */}
          <div>
            <p
              className="text-white/60 font-medium mb-5"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              Services
            </p>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.label}>
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
              Company
            </p>
            <ul className="space-y-3">
              {COMPANY.map((c) => (
                <li key={c.label}>
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

          {/* Contact */}
          <div>
            <p
              className="text-white/60 font-medium mb-5"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              Get In Touch
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-white/30 text-xs mb-1" style={{ fontFamily: 'var(--font-body)' }}>Email</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-white/60 hover:text-white transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <ContactPhones />
            </div>

            <Button to="/contact" size="sm" className="mt-6">
              Start a Project
            </Button>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-7 flex flex-col items-center gap-6">
          <Button
            type="button"
            size="sm"
            onClick={() => scrollPageToTop()}
            icon={<ArrowUp className="sz-btn__arrow" strokeWidth={2.25} />}
            aria-label="Back to top"
          >
            Back to top
          </Button>

          <div className="flex w-full flex-col sm:flex-row items-center justify-between gap-4">
            <p
              className="text-white/40"
              style={{ fontFamily: 'var(--font-body)', fontSize: 12 }}
            >
              © 2026 Salezeus. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
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
