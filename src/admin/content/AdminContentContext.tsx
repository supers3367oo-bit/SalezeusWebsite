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
import type { AdminContentState, AdminLocale } from '../types/adminContent'
import { createDefaultSiteAssets } from '../siteAssets/registry'
import { CMS_CONTENT_CHANGED_EVENT } from '../../lib/cmsEvents'

type Toast = { id: number; message: string; tone: 'success' | 'info' | 'error' }

type AdminContentContextValue = {
  content: AdminContentState | null
  loading: boolean
  dirty: boolean
  saving: boolean
  uiLocale: AdminLocale
  setUiLocale: (locale: AdminLocale) => void
  setContent: (updater: (prev: AdminContentState) => AdminContentState) => void
  save: () => Promise<void>
  reset: () => Promise<void>
  toasts: Toast[]
  pushToast: (message: string, tone?: Toast['tone']) => void
  dismissToast: (id: number) => void
}

const AdminContentContext = createContext<AdminContentContextValue | null>(null)

const UI_LOCALE_KEY = 'salezeus-admin-ui-locale'

function normalizeContent(data: AdminContentState): AdminContentState {
  return {
    ...data,
    siteAssets: {
      ...createDefaultSiteAssets(),
      ...(data.siteAssets ?? {}),
    },
    services: data.services.map((item) => ({
      ...item,
      showOnHome: item.showOnHome ?? true,
    })),
    projects: data.projects.map((item, index) => ({
      ...item,
      showOnHome: item.showOnHome ?? index < 4,
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
        if (!cancelled) {
          setLoading(false)
          pushToast(
            uiLocale === 'ar'
              ? 'تعذر الاتصال بسيرفر الـ CMS — شغّل npm run dev:server'
              : 'CMS server unreachable — run npm run dev:server',
            'error',
          )
        }
      })
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

  const save = useCallback(async () => {
    if (!content) return
    setSaving(true)
    try {
      const saved = await adminApi.saveContent(normalizeContent(content))
      setContentState(normalizeContent(saved))
      setDirty(false)
      notifyPublicSite()
      pushToast(
        uiLocale === 'ar' ? 'تم الحفظ على السيرفر' : 'Saved to CMS server',
        'success',
      )
    } catch {
      pushToast(
        uiLocale === 'ar' ? 'فشل الحفظ — تأكد أن السيرفر يعمل' : 'Save failed — is the server running?',
        'error',
      )
    } finally {
      setSaving(false)
    }
  }, [content, pushToast, uiLocale])

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
