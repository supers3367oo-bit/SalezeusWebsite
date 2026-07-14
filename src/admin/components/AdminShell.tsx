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
  '/admin/case-studies': { en: 'Case studies', ar: 'دراسة الحالات' },
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
    <div className="relative h-svh overflow-hidden font-body text-sz-dark antialiased">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#0a0d14]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_15%_0%,rgba(50,88,164,0.35),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_10%,rgba(212,175,55,0.12),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.06) 0.8px, transparent 0.8px)',
            backgroundSize: '18px 18px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)',
          }}
        />
      </div>

      <AdminSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="h-full lg:ps-[18rem]">
        <div className="h-full lg:p-3 lg:ps-0">
          <div className="admin-scroll flex h-full flex-col overflow-y-auto overflow-x-hidden border-white/10 bg-[#f3f5f9] lg:rounded-[1.75rem] lg:border lg:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.65)]">
            <AdminTopbar title={title} onMenuClick={() => setMenuOpen(true)} />
            <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:pb-10">
              {loading ? (
                <div className="flex min-h-[42vh] items-center justify-center">
                  <div className="flex items-center gap-3 rounded-2xl border border-sz-border/70 bg-white px-5 py-3.5 text-sm text-sz-primary/65 shadow-sm">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inset-0 animate-ping rounded-full bg-sz-interaction/45" />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-sz-interaction" />
                    </span>
                    {isAr ? 'جاري تحميل المحتوى…' : 'Loading content…'}
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Outlet />
                  </motion.div>
                </AnimatePresence>
              )}
            </main>
          </div>
        </div>
      </div>

      <AdminToasts />
    </div>
  )
}
