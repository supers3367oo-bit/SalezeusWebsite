import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  FileText,
  ImageIcon,
  Users,
  Briefcase,
  FolderKanban,
  Newspaper,
  Phone,
  LogOut,
  X,
} from 'lucide-react'
import clsx from 'clsx'
import { useAdminAuth } from '../auth/AdminAuthContext'
import { useAdminContent } from '../content/AdminContentContext'
import Logo from '../../components/ui/Logo'

const NAV = [
  { to: '/admin', end: true, icon: LayoutDashboard, labelEn: 'Overview', labelAr: 'نظرة عامة' },
  { to: '/admin/pages', end: false, icon: FileText, labelEn: 'Page copy', labelAr: 'نصوص الصفحات' },
  { to: '/admin/media', end: false, icon: ImageIcon, labelEn: 'Site images', labelAr: 'صور الموقع' },
  { to: '/admin/team', end: false, icon: Users, labelEn: 'Team', labelAr: 'الفريق' },
  { to: '/admin/services', end: false, icon: Briefcase, labelEn: 'Services', labelAr: 'الخدمات' },
  { to: '/admin/projects', end: false, icon: FolderKanban, labelEn: 'Projects', labelAr: 'المشاريع' },
  { to: '/admin/insights', end: false, icon: Newspaper, labelEn: 'Insights', labelAr: 'المقالات' },
  { to: '/admin/contact', end: false, icon: Phone, labelEn: 'Contact', labelAr: 'التواصل' },
] as const

type Props = {
  open: boolean
  onClose: () => void
}

export default function AdminSidebar({ open, onClose }: Props) {
  const { logout } = useAdminAuth()
  const { uiLocale } = useAdminContent()
  const isAr = uiLocale === 'ar'

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(
      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
      isActive
        ? 'bg-sz-interaction text-white shadow-sm'
        : 'text-sz-primary/80 hover:bg-sz-interaction-soft hover:text-sz-interaction',
    )

  const sidebarBody = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 border-b border-sz-border px-5 py-5">
        <div className="min-w-0">
          <Logo variant="light" height={28} className="max-w-[148px]" />
          <p className="mt-1.5 text-[11px] text-sz-primary/55">
            {isAr ? 'لوحة التحكم' : 'Admin console'}
          </p>
        </div>
        <button
          type="button"
          className="rounded-lg p-1.5 text-sz-primary/60 hover:bg-sz-surface lg:hidden"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV.map((item, i) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, x: isAr ? 8 : -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.04 * i, duration: 0.25 }}
          >
            <NavLink to={item.to} end={item.end} className={linkClass} onClick={onClose}>
              <item.icon className="h-4 w-4 shrink-0" />
              {isAr ? item.labelAr : item.labelEn}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <div className="border-t border-sz-border p-3">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sz-primary/70 transition hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="h-4 w-4" />
          {isAr ? 'تسجيل الخروج' : 'Sign out'}
        </button>
      </div>
    </div>
  )

  return (
    <>
      <aside className="fixed inset-y-0 start-0 z-40 hidden w-64 border-e border-sz-border bg-white lg:block">
        {sidebarBody}
      </aside>

      <AnimatePresence>
        {open ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-sz-dark/40 backdrop-blur-sm"
              aria-label="Close overlay"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: isAr ? 280 : -280 }}
              animate={{ x: 0 }}
              exit={{ x: isAr ? 280 : -280 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="absolute inset-y-0 start-0 w-[min(100%,17rem)] bg-white shadow-xl"
            >
              {sidebarBody}
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
