import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { WHATSAPP_URL } from '../../data/contact'
import './FloatingActions.css'

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40" role="group" aria-label="Quick actions">
      <div className="floating-dual-btn">
        <div className="floating-dual-btn__slant" aria-hidden />

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-dual-btn__segment floating-dual-btn__segment--whatsapp group"
          aria-label="Chat on WhatsApp"
        >
          <span>WhatsApp</span>
          <span className="floating-dual-btn__icon">
            <WhatsAppIcon className="h-[15px] w-[15px]" />
          </span>
        </a>

        <Link
          to="/contact"
          className="floating-dual-btn__segment floating-dual-btn__segment--start group"
          aria-label="Start now - contact us"
        >
          <span>Start Now!</span>
          <span className="floating-dual-btn__icon">
            <ArrowUpRight className="h-[15px] w-[15px]" strokeWidth={2.25} />
          </span>
        </Link>
      </div>
    </div>
  )
}
