import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users,
  Briefcase,
  FolderKanban,
  Newspaper,
  FileText,
  Phone,
  ArrowUpRight,
  RotateCcw,
  ImageIcon,
  Sparkles,
  Server,
  CheckCircle2,
  CircleAlert,
  type LucideIcon,
} from 'lucide-react'
import StatCard from '../components/StatCard'
import { useAdminContent } from '../content/AdminContentContext'

type QuickLink = {
  to: string
  label: string
  desc: string
  icon: LucideIcon
  tone: string
}

export default function DashboardHome() {
  const { content, uiLocale, reset, dirty } = useAdminContent()
  const isAr = uiLocale === 'ar'
  if (!content) return null

  const onHome = {
    services: content.services.filter((s) => s.showOnHome).length,
    projects: content.projects.filter((p) => p.showOnHome).length,
    insights: content.insights.filter((a) => a.showOnHome).length,
  }

  const links: QuickLink[] = [
    {
      to: '/admin/pages',
      label: isAr ? 'نصوص الصفحات' : 'Page copy',
      desc: isAr ? 'عناوين وفقرات الموقع' : 'Titles & section copy',
      icon: FileText,
      tone: 'bg-sz-interaction/10 text-sz-interaction',
    },
    {
      to: '/admin/media',
      label: isAr ? 'صور الموقع' : 'Site images',
      desc: isAr ? 'الشعارات والصور الثابتة' : 'Logos & static images',
      icon: ImageIcon,
      tone: 'bg-amber-500/10 text-amber-700',
    },
    {
      to: '/admin/team',
      label: isAr ? 'الفريق' : 'Team',
      desc: isAr ? 'الأعضاء والسير الذاتية' : 'Members & bios',
      icon: Users,
      tone: 'bg-emerald-500/10 text-emerald-700',
    },
    {
      to: '/admin/services',
      label: isAr ? 'الخدمات' : 'Services',
      desc: isAr ? 'تفاصيل الخدمات' : 'Service details',
      icon: Briefcase,
      tone: 'bg-sky-500/10 text-sky-700',
    },
    {
      to: '/admin/projects',
      label: isAr ? 'المشاريع' : 'Projects',
      desc: isAr ? 'دراسات الحالة' : 'Case studies',
      icon: FolderKanban,
      tone: 'bg-violet-500/10 text-violet-700',
    },
    {
      to: '/admin/insights',
      label: isAr ? 'المقالات' : 'Insights',
      desc: isAr ? 'محتوى المدونة' : 'Blog articles',
      icon: Newspaper,
      tone: 'bg-rose-500/10 text-rose-700',
    },
    {
      to: '/admin/contact',
      label: isAr ? 'التواصل' : 'Contact',
      desc: isAr ? 'البريد والمكاتب' : 'Email & offices',
      icon: Phone,
      tone: 'bg-sz-accent/25 text-sz-dark',
    },
  ]

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[1.75rem] border border-sz-border bg-sz-dark px-5 py-6 text-white sm:px-7 sm:py-8"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -start-16 -top-20 h-56 w-56 rounded-full bg-sz-interaction/35 blur-3xl" />
          <div className="absolute -bottom-24 end-0 h-64 w-64 rounded-full bg-sz-accent/25 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/85 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-sz-accent" />
              {isAr ? 'لوحة محتوى Salezeus' : 'Salezeus content studio'}
            </div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              {isAr ? 'مرحباً بك في لوحة التحكم' : 'Welcome to your control center'}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              {isAr
                ? 'عدّل نصوص وصور ومحتوى الموقع بالعربي والإنجليزي من مكان واحد، مع معاينة مباشرة قبل الحفظ.'
                : 'Edit bilingual copy, media, and site content from one place — with live previews before you save.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                dirty
                  ? 'bg-sz-accent text-sz-dark'
                  : 'border border-white/15 bg-white/10 text-white/80'
              }`}
            >
              {dirty ? (
                <CircleAlert className="h-3.5 w-3.5" />
              ) : (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
              )}
              {dirty
                ? isAr
                  ? 'تغييرات غير محفوظة'
                  : 'Unsaved changes'
                : isAr
                  ? 'كل شيء محفوظ'
                  : 'All changes saved'}
            </span>
            <button
              type="button"
              onClick={() => void reset()}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm transition hover:bg-white/15"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {isAr ? 'إعادة لبيانات الموقع' : 'Reset to site seed'}
            </button>
          </div>
        </div>
      </motion.section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label={isAr ? 'أعضاء الفريق' : 'Team members'}
          value={content.team.length}
          icon={Users}
          to="/admin/team"
          delay={0}
          hint={isAr ? 'الملف التعريفي' : 'Profiles'}
        />
        <StatCard
          label={isAr ? 'الخدمات' : 'Services'}
          value={content.services.length}
          icon={Briefcase}
          to="/admin/services"
          delay={0.05}
          hint={
            isAr
              ? `${onHome.services} على الرئيسية`
              : `${onHome.services} on home`
          }
        />
        <StatCard
          label={isAr ? 'المشاريع' : 'Projects'}
          value={content.projects.length}
          icon={FolderKanban}
          to="/admin/projects"
          delay={0.1}
          hint={
            isAr
              ? `${onHome.projects} على الرئيسية`
              : `${onHome.projects} on home`
          }
        />
        <StatCard
          label={isAr ? 'المقالات' : 'Insights'}
          value={content.insights.length}
          icon={Newspaper}
          to="/admin/insights"
          delay={0.15}
          hint={
            isAr
              ? `${onHome.insights} على الرئيسية`
              : `${onHome.insights} on home`
          }
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(260px,320px)]">
        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sz-interaction-soft text-sz-interaction">
                <FileText className="h-4 w-4" />
              </span>
              <div>
                <h2 className="font-heading text-base font-semibold text-sz-dark">
                  {isAr ? 'اختصارات سريعة' : 'Quick links'}
                </h2>
                <p className="text-xs text-sz-primary/50">
                  {isAr ? 'انتقل مباشرة لأقسام المحتوى' : 'Jump straight into content areas'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {links.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.04 * i }}
              >
                <Link
                  to={item.to}
                  className="group flex items-start gap-3 rounded-2xl border border-sz-border bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:border-sz-interaction/35 hover:shadow-[0_12px_28px_-16px_rgba(15,23,42,0.35)]"
                >
                  <span
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.tone}`}
                  >
                    <item.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-sz-dark">{item.label}</p>
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-sz-primary/25 transition group-hover:text-sz-interaction rtl:-scale-x-100" />
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-sz-primary/55">{item.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
            className="overflow-hidden rounded-2xl border border-sz-border bg-white"
          >
            <div className="border-b border-sz-border bg-gradient-to-br from-sz-surface to-white px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-sz-primary/50">
                {isAr ? 'على الصفحة الرئيسية' : 'On homepage'}
              </p>
              <p className="mt-1 font-heading text-lg font-semibold text-sz-dark">
                {isAr ? 'الظهور في الهوم' : 'Home visibility'}
              </p>
            </div>
            <ul className="divide-y divide-sz-border px-5">
              {[
                {
                  label: isAr ? 'خدمات' : 'Services',
                  value: onHome.services,
                  total: content.services.length,
                },
                {
                  label: isAr ? 'مشاريع' : 'Projects',
                  value: onHome.projects,
                  total: content.projects.length,
                },
                {
                  label: isAr ? 'مقالات' : 'Insights',
                  value: onHome.insights,
                  total: content.insights.length,
                },
              ].map((row) => (
                <li key={row.label} className="flex items-center justify-between gap-3 py-3.5">
                  <span className="text-sm text-sz-primary/70">{row.label}</span>
                  <span className="font-heading text-sm font-semibold text-sz-dark">
                    {row.value}
                    <span className="ms-1 font-normal text-sz-primary/40">/ {row.total}</span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.18 }}
            className="relative overflow-hidden rounded-2xl border border-sz-border bg-gradient-to-br from-sz-interaction-soft/80 via-white to-sz-accent/15 p-5"
          >
            <div className="pointer-events-none absolute -end-8 -top-8 h-28 w-28 rounded-full bg-sz-interaction/10 blur-2xl" />
            <div className="relative flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sz-dark text-white">
                <Server className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-sz-dark">
                  {isAr ? 'سيرفر Node.js للـ CMS' : 'Node.js CMS server'}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-sz-primary/65">
                  {isAr
                    ? 'الحفظ يتم على السيرفر (server/). شغّل npm run dev:server مع الواجهة أثناء التطوير.'
                    : 'Saves go to the CMS server (server/). Keep npm run dev:server running with the UI in development.'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.22 }}
            className="rounded-2xl border border-dashed border-sz-border/80 bg-white/70 px-5 py-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-sz-primary/45">
              {isAr ? 'أقسام النصوص' : 'Copy sections'}
            </p>
            <p className="mt-1 font-heading text-2xl font-semibold text-sz-dark">
              {content.pageSections.length}
            </p>
            <Link
              to="/admin/pages"
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-sz-interaction transition hover:gap-1.5"
            >
              {isAr ? 'إدارة النصوص' : 'Manage copy'}
              <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
            </Link>
          </motion.div>
        </aside>
      </div>
    </div>
  )
}
