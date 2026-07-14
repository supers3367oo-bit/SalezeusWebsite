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
  Layers,
  type LucideIcon,
} from 'lucide-react'
import clsx from 'clsx'
import { useAdminAuth } from '../auth/AdminAuthContext'
import { useAdminContent } from '../content/AdminContentContext'
import Logo from '../../components/ui/Logo'

type NavItem = {
  to: string
  end?: boolean
  icon: LucideIcon
  labelEn: string
  labelAr: string
}

const NAV_PRIMARY: NavItem[] = [
  { to: '/admin', end: true, icon: LayoutDashboard, labelEn: 'Overview', labelAr: 'نظرة عامة' },
]

const NAV_CONTENT: NavItem[] = [
  { to: '/admin/pages', icon: FileText, labelEn: 'Page copy', labelAr: 'نصوص الصفحات' },
  { to: '/admin/case-studies', icon: Layers, labelEn: 'Case studies', labelAr: 'دراسة الحالات' },
  { to: '/admin/media', icon: ImageIcon, labelEn: 'Site images', labelAr: 'صور الموقع' },
]

const NAV_CATALOG: NavItem[] = [
  { to: '/admin/team', icon: Users, labelEn: 'Team', labelAr: 'الفريق' },
  { to: '/admin/services', icon: Briefcase, labelEn: 'Services', labelAr: 'الخدمات' },
  { to: '/admin/projects', icon: FolderKanban, labelEn: 'Projects', labelAr: 'المشاريع' },
  { to: '/admin/insights', icon: Newspaper, labelEn: 'Insights', labelAr: 'المقالات' },
  { to: '/admin/contact', icon: Phone, labelEn: 'Contact', labelAr: 'التواصل' },
]

type Props = {
  open: boolean
  onClose: () => void
}

function NavGroup({
  title,
  items,
  isAr,
  onClose,
  delayBase = 0,
}: {
  title?: string
  items: NavItem[]
  isAr: boolean
  onClose: () => void
  delayBase?: number
}) {
  return (
    <div className="space-y-0.5">
      {title ? (
        <p className="px-3.5 pb-2 pt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
          {title}
        </p>
      ) : (
        <div className="h-2" />
      )}
      {items.map((item, i) => (
        <motion.div
          key={item.to}
          initial={{ opacity: 0, x: isAr ? 10 : -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delayBase + 0.03 * i, duration: 0.25 }}
        >
          <NavLink
            to={item.to}
            end={item.end}
            onClick={onClose}
            className={({ isActive }) =>
              clsx(
                'group relative mx-2 flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-sz-interaction to-[#3f6bbc] text-white shadow-[0_10px_28px_-14px_rgba(50,88,164,0.95)]'
                  : 'text-white/55 hover:bg-white/[0.06] hover:text-white',
              )
            }
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10 text-current transition group-aria-[current=page]:bg-white/15">
              <item.icon className="h-4 w-4" aria-hidden />
            </span>
            <span className="truncate">{isAr ? item.labelAr : item.labelEn}</span>
          </NavLink>
        </motion.div>
      ))}
    </div>
  )
}

export default function AdminSidebar({ open, onClose }: Props) {
  const { logout, email } = useAdminAuth()
  const { uiLocale } = useAdminContent()
  const isAr = uiLocale === 'ar'

  const sidebarBody = (
    <div className="relative flex h-full flex-col">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -start-16 top-10 h-44 w-44 rounded-full bg-sz-interaction/30 blur-3xl" />
        <div className="absolute bottom-20 -end-10 h-36 w-36 rounded-full bg-sz-accent/15 blur-3xl" />
      </div>

      <div className="relative flex items-center justify-between gap-2 px-5 pb-4 pt-6">
        <div className="min-w-0">
          <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2.5 backdrop-blur">
            <Logo variant="dark" height={26} className="max-w-[138px]" />
          </div>
          <p className="mt-3 px-1 text-[11px] font-medium tracking-[0.14em] text-white/35 uppercase">
            {isAr ? 'استوديو المحتوى' : 'Content studio'}
          </p>
        </div>
        <button
          type="button"
          className="rounded-xl p-2 text-white/45 transition hover:bg-white/10 hover:text-white lg:hidden"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="admin-scroll-dark relative flex-1 overflow-y-auto pb-4">
        <NavGroup items={NAV_PRIMARY} isAr={isAr} onClose={onClose} />
        <NavGroup
          title={isAr ? 'المحتوى' : 'Content'}
          items={NAV_CONTENT}
          isAr={isAr}
          onClose={onClose}
          delayBase={0.05}
        />
        <NavGroup
          title={isAr ? 'المكتبة' : 'Library'}
          items={NAV_CATALOG}
          isAr={isAr}
          onClose={onClose}
          delayBase={0.1}
        />
      </nav>

      <div className="relative mx-3 mb-4 space-y-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur">
        <div className="min-w-0 px-1">
          <p className="truncate text-xs font-medium text-white/80">{email || 'admin'}</p>
          <p className="mt-0.5 text-[10px] text-white/35">
            {isAr ? 'مشرف النظام' : 'System admin'}
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-medium text-white/50 transition hover:bg-red-500/15 hover:text-red-300"
        >
          <LogOut className="h-4 w-4" />
          {isAr ? 'تسجيل الخروج' : 'Sign out'}
        </button>
      </div>
    </div>
  )

  return (
    <>
      <aside className="fixed inset-y-0 start-0 z-40 hidden w-[18rem] lg:block">
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
              className="absolute inset-0 bg-black/55 backdrop-blur-sm"
              aria-label="Close overlay"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: isAr ? 320 : -320 }}
              animate={{ x: 0 }}
              exit={{ x: isAr ? 320 : -320 }}
              transition={{ type: 'spring', stiffness: 340, damping: 34 }}
              className="absolute inset-y-0 start-0 w-[min(100%,18rem)] border-e border-white/10 bg-[#0a0d14] shadow-2xl"
            >
              {sidebarBody}
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
