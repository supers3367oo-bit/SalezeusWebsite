import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AdminContentState } from '../admin/types/adminContent'
import { fetchPublicContent } from './api'
import {
  buildMessagesOverlay,
  homeVisibilityFromCms,
  siteAssetsFromCms,
} from './adapters'
import type { Locale, TranslationTree } from '../i18n/types'
import type { HomeVisibilityState } from '../lib/homeVisibility'
import { createDefaultSiteAssets } from '../admin/siteAssets/registry'
import { CMS_CONTENT_CHANGED_EVENT } from '../lib/cmsEvents'

type CmsContentContextValue = {
  content: AdminContentState | null
  loading: boolean
  refresh: () => Promise<void>
  siteAssets: Record<string, string>
  homeVisibility: HomeVisibilityState
  messagesOverlay: (locale: Locale) => TranslationTree
}

const CmsContentContext = createContext<CmsContentContextValue | null>(null)

const emptyVisibility: HomeVisibilityState = {
  services: {},
  projects: {},
  insights: {},
}

export function CmsContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<AdminContentState | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const next = await fetchPublicContent()
    setContent(next)
  }, [])

  useEffect(() => {
    let cancelled = false
    const load = () => {
      void fetchPublicContent().then((next) => {
        if (!cancelled) setContent(next)
      })
    }

    setLoading(true)
    fetchPublicContent()
      .then((next) => {
        if (!cancelled) setContent(next)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    window.addEventListener(CMS_CONTENT_CHANGED_EVENT, load)
    return () => {
      cancelled = true
      window.removeEventListener(CMS_CONTENT_CHANGED_EVENT, load)
    }
  }, [])

  const value = useMemo<CmsContentContextValue>(() => {
    return {
      content,
      loading,
      refresh,
      siteAssets: content ? siteAssetsFromCms(content) : createDefaultSiteAssets(),
      homeVisibility: content ? homeVisibilityFromCms(content) : emptyVisibility,
      messagesOverlay: (locale: Locale) =>
        content ? buildMessagesOverlay(content, locale) : {},
    }
  }, [content, loading, refresh])

  return <CmsContentContext.Provider value={value}>{children}</CmsContentContext.Provider>
}

export function useCmsContent() {
  const ctx = useContext(CmsContentContext)
  if (!ctx) throw new Error('useCmsContent must be used within CmsContentProvider')
  return ctx
}

export function useCmsContentOptional() {
  return useContext(CmsContentContext)
}
