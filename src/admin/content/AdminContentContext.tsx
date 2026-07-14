import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { adminApi } from '../api/adminApi'
import type {
  AdminContentState,
  AdminFeaturedCase,
  AdminLocale,
  AdminContact,
  PageCopyField,
  PageCopySection,
} from '../types/adminContent'
import { createDefaultSiteAssets } from '../siteAssets/registry'
import { CMS_CONTENT_CHANGED_EVENT } from '../../lib/cmsEvents'
import { migrateProjectImagesToBlocks } from '../utils/createEmpty'
import { seedFeaturedCases, mergeMissingPageCopyFields } from '../mock/seedFromSite'
import { en } from '../../i18n/en'
import { ar } from '../../i18n/ar'

type Toast = { id: number; message: string; tone: 'success' | 'info' | 'error' }

type AdminContentContextValue = {
  content: AdminContentState | null
  loading: boolean
  dirty: boolean
  saving: boolean
  uiLocale: AdminLocale
  setUiLocale: (locale: AdminLocale) => void
  setContent: (updater: (prev: AdminContentState) => AdminContentState) => void
  /** Apply an update and immediately persist it to the CMS server. */
  applyAndSave: (
    updater: (prev: AdminContentState) => AdminContentState,
    successMessage?: string,
  ) => Promise<void>
  save: () => Promise<void>
  reset: () => Promise<void>
  toasts: Toast[]
  pushToast: (message: string, tone?: Toast['tone']) => void
  dismissToast: (id: number) => void
}

const AdminContentContext = createContext<AdminContentContextValue | null>(null)

const UI_LOCALE_KEY = 'salezeus-admin-ui-locale'
const CASE_COPY_ROOTS = ['featured', 'featuredSuccess'] as const

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function collectCaseCopyFields(): PageCopyField[] {
  const fields: PageCopyField[] = []
  const enTree = en as Record<string, unknown>
  const arTree = ar as Record<string, unknown>

  const walk = (enNode: unknown, arNode: unknown, path: string) => {
    if (typeof enNode === 'string') {
      fields.push({
        path,
        label: path.split('.').slice(1).join(' › ') || path,
        en: enNode,
        ar: typeof arNode === 'string' ? arNode : enNode,
        multiline: enNode.length > 60 || enNode.includes('\n'),
      })
      return
    }
    if (isPlainObject(enNode)) {
      for (const key of Object.keys(enNode)) {
        walk(
          enNode[key],
          isPlainObject(arNode) ? arNode[key] : undefined,
          path ? `${path}.${key}` : key,
        )
      }
    }
  }

  for (const root of CASE_COPY_ROOTS) {
    walk(enTree[root], arTree[root], root)
  }
  return fields
}

function isCaseCopyPath(path: string) {
  return CASE_COPY_ROOTS.some((root) => path === root || path.startsWith(`${root}.`))
}

function migrateCaseStudySections(sections: PageCopySection[]): PageCopySection[] {
  let caseFields: PageCopyField[] = []
  const withoutCase = sections.map((section) => {
    if (section.key === 'caseStudies') {
      caseFields = [...caseFields, ...section.fields]
      return section
    }
    const kept = section.fields.filter((f) => !isCaseCopyPath(f.path))
    const moved = section.fields.filter((f) => isCaseCopyPath(f.path))
    caseFields = [...caseFields, ...moved]
    return { ...section, fields: kept }
  })

  const mergedByPath = new Map<string, PageCopyField>()
  for (const field of [...collectCaseCopyFields(), ...caseFields]) {
    mergedByPath.set(field.path, field)
  }
  const mergedFields = [...mergedByPath.values()]

  if (withoutCase.some((s) => s.key === 'caseStudies')) {
    return withoutCase.map((s) =>
      s.key === 'caseStudies' ? { ...s, fields: mergedFields } : s,
    )
  }

  return [
    ...withoutCase,
    { key: 'caseStudies', label: 'Case Studies', fields: mergedFields },
  ]
}

function normalizeFeaturedCases(
  cases: AdminFeaturedCase[] | undefined,
  siteAssets: Record<string, string>,
): AdminFeaturedCase[] {
  if (cases?.length) {
    return cases.map((item) => ({
      ...item,
      client: item.client ?? { en: '', ar: '' },
      title: item.title ?? { en: '', ar: '' },
      service: item.service ?? { en: '', ar: '' },
      image: item.image || '',
    }))
  }
  return seedFeaturedCases(siteAssets)
}

function normalizeContact(contact: AdminContact | undefined): AdminContact {
  return {
    email: contact?.email ?? '',
    whatsappPhone: contact?.whatsappPhone ?? '',
    offices: (contact?.offices ?? []).map((office) => ({
      ...office,
      label: office.label ?? { en: '', ar: '' },
      phoneE164: office.phoneE164 ?? '',
      phoneDisplay: office.phoneDisplay ?? '',
    })),
    socialLinks: {
      linkedin: contact?.socialLinks?.linkedin ?? '',
      instagram: contact?.socialLinks?.instagram ?? '',
      twitter: contact?.socialLinks?.twitter ?? '',
      youtube: contact?.socialLinks?.youtube ?? '',
    },
  }
}

function normalizeContent(data: AdminContentState): AdminContentState {
  const siteAssets = {
    ...createDefaultSiteAssets(),
    ...(data.siteAssets ?? {}),
  }
  return {
    ...data,
    contact: normalizeContact(data.contact),
    siteAssets,
    featuredCases: normalizeFeaturedCases(data.featuredCases, siteAssets),
    pageSections: mergeMissingPageCopyFields(
      migrateCaseStudySections(data.pageSections ?? []),
    ),
    services: data.services.map((item) => ({
      ...item,
      showOnHome: item.showOnHome ?? true,
    })),
    projects: data.projects.map((item, index) => ({
      ...item,
      showOnHome: item.showOnHome ?? index < 4,
      images: item.images ?? [],
      blocks: migrateProjectImagesToBlocks(item.images ?? [], item.blocks),
    })),
    insights: data.insights.map((item, index) => ({
      ...item,
      showOnHome: item.showOnHome ?? index < 3,
    })),
  }
}

function notifyPublicSite() {
  window.dispatchEvent(new Event(CMS_CONTENT_CHANGED_EVENT))
}

export function AdminContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<AdminContentState | null>(null)
  const [loading, setLoading] = useState(true)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [uiLocale, setUiLocaleState] = useState<AdminLocale>(() => {
    try {
      const stored = localStorage.getItem(UI_LOCALE_KEY)
      return stored === 'ar' ? 'ar' : 'en'
    } catch {
      return 'en'
    }
  })

  const pushToast = useCallback((message: string, tone: Toast['tone'] = 'info') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, tone }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }, [])

  useEffect(() => {
    let cancelled = false
    let attempts = 0

    const load = () => {
      attempts += 1
      adminApi
        .getContent()
        .then((data) => {
          if (!cancelled) {
            setContentState(normalizeContent(data))
            setLoading(false)
          }
        })
        .catch((error) => {
          console.error(error)
          if (cancelled) return
          // Brief retry — Vite proxy can reset while the CMS server is restarting
          if (attempts < 3) {
            window.setTimeout(load, 600 * attempts)
            return
          }
          setLoading(false)
          pushToast(
            uiLocale === 'ar'
              ? 'تعذر الاتصال بسيرفر الـ CMS — شغّل npm run dev:server'
              : 'CMS server unreachable — run npm run dev:server',
            'error',
          )
        })
    }

    load()
    return () => {
      cancelled = true
    }
  }, [pushToast, uiLocale])

  const setUiLocale = useCallback((locale: AdminLocale) => {
    setUiLocaleState(locale)
    try {
      localStorage.setItem(UI_LOCALE_KEY, locale)
    } catch {
      /* ignore */
    }
  }, [])

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const setContent = useCallback(
    (updater: (prev: AdminContentState) => AdminContentState) => {
      setContentState((prev) => {
        if (!prev) return prev
        return updater(prev)
      })
      setDirty(true)
    },
    [],
  )

  const persist = useCallback(
    async (next: AdminContentState, successMessage?: string) => {
      setSaving(true)
      try {
        const saved = await adminApi.saveContent(normalizeContent(next))
        setContentState(normalizeContent(saved))
        setDirty(false)
        notifyPublicSite()
        pushToast(
          successMessage ??
            (uiLocale === 'ar' ? 'تم الحفظ على السيرفر' : 'Saved to CMS server'),
          'success',
        )
      } catch {
        setDirty(true)
        pushToast(
          uiLocale === 'ar'
            ? 'فشل الحفظ — تأكد أن السيرفر يعمل'
            : 'Save failed — is the server running?',
          'error',
        )
        throw new Error('CMS save failed')
      } finally {
        setSaving(false)
      }
    },
    [pushToast, uiLocale],
  )

  const applyAndSave = useCallback(
    async (
      updater: (prev: AdminContentState) => AdminContentState,
      successMessage?: string,
    ) => {
      if (!content) return
      const next = updater(content)
      setContentState(next)
      await persist(next, successMessage)
    },
    [content, persist],
  )

  const save = useCallback(async () => {
    if (!content) return
    try {
      await persist(content)
    } catch {
      /* toast already shown */
    }
  }, [content, persist])

  const reset = useCallback(async () => {
    try {
      const data = normalizeContent(await adminApi.resetContent())
      setContentState(data)
      setDirty(false)
      notifyPublicSite()
      pushToast(uiLocale === 'ar' ? 'تمت إعادة التعيين' : 'Content reset to site seed', 'info')
    } catch {
      pushToast(uiLocale === 'ar' ? 'فشل إعادة التعيين' : 'Reset failed', 'error')
    }
  }, [pushToast, uiLocale])

  const value = useMemo(
    () => ({
      content,
      loading,
      dirty,
      saving,
      uiLocale,
      setUiLocale,
      setContent,
      applyAndSave,
      save,
      reset,
      toasts,
      pushToast,
      dismissToast,
    }),
    [
      content,
      loading,
      dirty,
      saving,
      uiLocale,
      setUiLocale,
      setContent,
      applyAndSave,
      save,
      reset,
      toasts,
      pushToast,
      dismissToast,
    ],
  )

  return (
    <AdminContentContext.Provider value={value}>{children}</AdminContentContext.Provider>
  )
}

export function useAdminContent() {
  const ctx = useContext(AdminContentContext)
  if (!ctx) throw new Error('useAdminContent must be used within AdminContentProvider')
  return ctx
}
