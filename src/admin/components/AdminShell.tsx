import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'
import AdminToasts from './AdminToasts'
import { useAdminContent } from '../content/AdminContentContext'
import { useLocale } from '../../providers/LocaleProvider'

const TITLES: Record<string, { en: string; ar: string }> = {
  '/admin': { en: 'Overview', ar: 'نظرة عامة' },
  '/admin/pages': { en: 'Page copy', ar: 'نصوص الصفحات' },
  '/admin/media': { en: 'Site images', ar: 'صور الموقع' },
  '/admin/team': { en: 'Team', ar: 'الفريق' },
  '/admin/services': { en: 'Services', ar: 'الخدمات' },
  '/admin/projects': { en: 'Projects', ar: 'المشاريع' },
  '/admin/insights': { en: 'Insights', ar: 'المقالات' },
  '/admin/contact': { en: 'Contact', ar: 'التواصل' },
}

function resolveTitle(pathname: string, isAr: boolean) {
  const exact = TITLES[pathname]
  if (exact) return isAr ? exact.ar : exact.en

  if (pathname.startsWith('/admin/pages/')) return isAr ? 'تحرير نصوص الصفحة' : 'Edit page copy'
  if (pathname.startsWith('/admin/team/')) return isAr ? 'تعديل عضو الفريق' : 'Edit team member'
  if (pathname.startsWith('/admin/services/')) return isAr ? 'تعديل الخدمة' : 'Edit service'
  if (pathname.startsWith('/admin/projects/')) return isAr ? 'تعديل المشروع' : 'Edit project'
  if (pathname.startsWith('/admin/insights/')) return isAr ? 'تعديل المقال' : 'Edit article'

  return isAr ? 'لوحة التحكم' : 'Admin'
}

export default function AdminShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { uiLocale, loading } = useAdminContent()
  const { locale: siteLocale } = useLocale()
  const isAr = uiLocale === 'ar'
  const title = resolveTitle(location.pathname, isAr)

  useEffect(() => {
    document.documentElement.lang = uiLocale
    document.documentElement.dir = uiLocale === 'ar' ? 'rtl' : 'ltr'
    return () => {
      document.documentElement.lang = siteLocale
      document.documentElement.dir = siteLocale === 'ar' ? 'rtl' : 'ltr'
    }
  }, [uiLocale, siteLocale])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-sz-surface font-body text-sz-dark antialiased">
      <AdminSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="lg:ps-64">
        <AdminTopbar title={title} onMenuClick={() => setMenuOpen(true)} />
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex min-h-[40vh] items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-sz-primary/60">
                <span className="h-2 w-2 animate-pulse rounded-full bg-sz-interaction" />
                {isAr ? 'جاري تحميل المحتوى…' : 'Loading content…'}
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          )}
        </main>
      </div>
      <AdminToasts />
    </div>
  )
}
