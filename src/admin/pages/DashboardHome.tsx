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
  ImageIcon,
  Sparkles,
  Layers,
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
  span?: string
}

export default function DashboardHome() {
  const { content, uiLocale } = useAdminContent()
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
      desc: isAr ? 'عناوين وفقرات مع معاينة مباشرة' : 'Titles & copy with live preview',
      icon: FileText,
      tone: 'bg-sz-interaction text-white',
      span: 'sm:col-span-2',
    },
    {
      to: '/admin/case-studies',
      label: isAr ? 'دراسة الحالات' : 'Case studies',
      desc: isAr ? 'صور ونصوص النجاح' : 'Featured success stories',
      icon: Layers,
      tone: 'bg-teal-600 text-white',
    },
    {
      to: '/admin/media',
      label: isAr ? 'صور الموقع' : 'Site images',
      desc: isAr ? 'شعارات وصور ثابتة' : 'Logos & static assets',
      icon: ImageIcon,
      tone: 'bg-amber-600 text-white',
    },
    {
      to: '/admin/team',
      label: isAr ? 'الفريق' : 'Team',
      desc: isAr ? 'الأعضاء والسير' : 'Members & bios',
      icon: Users,
      tone: 'bg-emerald-600 text-white',
    },
    {
      to: '/admin/services',
      label: isAr ? 'الخدمات' : 'Services',
      desc: isAr ? 'تفاصيل الخدمات' : 'Service details',
      icon: Briefcase,
      tone: 'bg-sky-600 text-white',
    },
    {
      to: '/admin/projects',
      label: isAr ? 'المشاريع' : 'Projects',
      desc: isAr ? 'دراسات الحالة الكاملة' : 'Full case studies',
      icon: FolderKanban,
      tone: 'bg-sz-dark text-white',
    },
    {
      to: '/admin/insights',
      label: isAr ? 'المقالات' : 'Insights',
      desc: isAr ? 'محتوى المدونة' : 'Blog articles',
      icon: Newspaper,
      tone: 'bg-rose-600 text-white',
    },
    {
      to: '/admin/contact',
      label: isAr ? 'التواصل' : 'Contact',
      desc: isAr ? 'بريد ومكاتب وسوشيال' : 'Email, offices & social',
      icon: Phone,
      tone: 'bg-[#c4a035] text-sz-dark',
    },
  ]

  return (
    <div className="space-y-7">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[1.85rem] bg-sz-dark px-5 py-8 text-white sm:px-8 sm:py-10"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -start-24 -top-28 h-72 w-72 rounded-full bg-sz-interaction/45 blur-3xl" />
          <div className="absolute -bottom-32 end-[-10%] h-80 w-80 rounded-full bg-sz-accent/20 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.45) 1px, transparent 1px)',
              backgroundSize: '42px 42px',
              maskImage: 'radial-gradient(ellipse 70% 80% at 30% 20%, black, transparent)',
            }}
          />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white/85 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-sz-accent" />
              {isAr ? 'Salezeus Content Studio' : 'Salezeus Content Studio'}
            </div>
            <h2 className="max-w-xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {isAr ? (
                <>
                  لوحة تحكم
                  <span className="mt-1 block text-white">لمحتوى الموقع بالكامل</span>
                </>
              ) : (
                <>
                  Design the site
                  <span className="mt-1 block text-white/55">from one calm workspace</span>
                </>
              )}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">
              {isAr
                ? 'عدّل النصوص والصور والمشاريع والمقالات بالعربي والإنجليزي، مع حفظ مباشر على السيرفر.'
                : 'Edit bilingual copy, media, projects, and insights — then publish straight to your CMS server.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            {[
              { label: isAr ? 'فريق' : 'Team', value: content.team.length },
              { label: isAr ? 'خدمات' : 'Services', value: content.services.length },
              { label: isAr ? 'مشاريع' : 'Projects', value: content.projects.length },
              { label: isAr ? 'مقالات' : 'Insights', value: content.insights.length },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 backdrop-blur-sm"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                  {item.label}
                </p>
                <p className="mt-1.5 font-heading text-2xl font-semibold tabular-nums">{item.value}</p>
              </motion.div>
            ))}
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
          hint={isAr ? `${onHome.services} على الرئيسية` : `${onHome.services} on home`}
        />
        <StatCard
          label={isAr ? 'المشاريع' : 'Projects'}
          value={content.projects.length}
          icon={FolderKanban}
          to="/admin/projects"
          delay={0.1}
          hint={isAr ? `${onHome.projects} على الرئيسية` : `${onHome.projects} on home`}
        />
        <StatCard
          label={isAr ? 'المقالات' : 'Insights'}
          value={content.insights.length}
          icon={Newspaper}
          to="/admin/insights"
          delay={0.15}
          hint={isAr ? `${onHome.insights} على الرئيسية` : `${onHome.insights} on home`}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(270px,340px)]">
        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="font-heading text-lg font-semibold text-sz-dark">
                {isAr ? 'اختصارات سريعة' : 'Quick workspace'}
              </h2>
              <p className="mt-0.5 text-xs text-sz-primary/50">
                {isAr ? 'انتقل مباشرة لأقسام المحتوى' : 'Jump into any content area'}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {links.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.03 * i }}
                className={item.span}
              >
                <Link
                  to={item.to}
                  className="group relative flex h-full min-h-[7.5rem] flex-col justify-between overflow-hidden rounded-[1.35rem] border border-white bg-white p-5 shadow-[0_12px_36px_-28px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_-28px_rgba(50,88,164,0.4)]"
                >
                  <div className="pointer-events-none absolute -end-8 -top-8 h-28 w-28 rounded-full bg-sz-interaction/[0.05] transition duration-500 group-hover:scale-125" />
                  <div className="relative flex items-start justify-between gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl ${item.tone}`}
                    >
                      <item.icon className="h-4 w-4" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-sz-primary/25 transition group-hover:text-sz-interaction rtl:-scale-x-100" />
                  </div>
                  <div className="relative mt-5">
                    <p className="font-heading text-base font-semibold text-sz-dark">{item.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-sz-primary/50">{item.desc}</p>
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
            className="overflow-hidden rounded-[1.35rem] border border-white bg-white shadow-[0_12px_36px_-28px_rgba(15,23,42,0.4)]"
          >
            <div className="bg-gradient-to-br from-sz-dark to-[#1a2233] px-5 py-5 text-white">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                {isAr ? 'الظهور في الرئيسية' : 'Homepage exposure'}
              </p>
              <p className="mt-1 font-heading text-lg font-semibold">
                {isAr ? 'ما يظهر للزائر أولاً' : 'What visitors see first'}
              </p>
            </div>
            <ul className="space-y-4 px-5 py-5">
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
              ].map((row) => {
                const pct = row.total ? Math.round((row.value / row.total) * 100) : 0
                return (
                  <li key={row.label} className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-sz-primary/65">{row.label}</span>
                      <span className="font-heading text-sm font-semibold text-sz-dark">
                        {row.value}
                        <span className="ms-1 font-normal text-sz-primary/35">/ {row.total}</span>
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-sz-surface">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-sz-interaction to-[#5b84d4]"
                      />
                    </div>
                  </li>
                )
              })}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.18 }}
            className="rounded-[1.35rem] border border-dashed border-sz-interaction/30 bg-sz-interaction/[0.04] px-5 py-5"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sz-primary/45">
              {isAr ? 'أقسام النصوص' : 'Copy sections'}
            </p>
            <p className="mt-1 font-heading text-3xl font-semibold text-sz-dark">
              {content.pageSections.length}
            </p>
            <Link
              to="/admin/pages"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-sz-interaction transition hover:gap-2"
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
