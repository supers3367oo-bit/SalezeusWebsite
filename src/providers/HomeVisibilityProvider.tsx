import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  emptyHomeVisibility,
  HOME_VISIBILITY_EVENT,
  isVisibleOnHome,
  readStoredHomeVisibility,
  type HomeVisibilityKind,
  type HomeVisibilityState,
} from '../lib/homeVisibility'
import { useCmsContentOptional } from '../cms/CmsContentProvider'

type HomeVisibilityContextValue = {
  visibility: HomeVisibilityState
  isOnHome: (kind: HomeVisibilityKind, slug: string, fallback?: boolean) => boolean
}

const HomeVisibilityContext = createContext<HomeVisibilityContextValue | null>(null)

export function HomeVisibilityProvider({ children }: { children: ReactNode }) {
  const cms = useCmsContentOptional()
  const [localVisibility, setLocalVisibility] =
    useState<HomeVisibilityState>(emptyHomeVisibility)

  useEffect(() => {
    setLocalVisibility(readStoredHomeVisibility())
    const sync = () => setLocalVisibility(readStoredHomeVisibility())
    window.addEventListener(HOME_VISIBILITY_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(HOME_VISIBILITY_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const visibility = cms?.content ? cms.homeVisibility : localVisibility

  const isOnHome = useCallback(
    (kind: HomeVisibilityKind, slug: string, fallback = true) =>
      isVisibleOnHome(kind, slug, visibility, fallback),
    [visibility],
  )

  const value = useMemo(() => ({ visibility, isOnHome }), [visibility, isOnHome])

  return (
    <HomeVisibilityContext.Provider value={value}>{children}</HomeVisibilityContext.Provider>
  )
}

export function useHomeVisibility() {
  const ctx = useContext(HomeVisibilityContext)
  if (!ctx) {
    const visibility = readStoredHomeVisibility()
    return {
      visibility,
      isOnHome: (kind: HomeVisibilityKind, slug: string, fallback = true) =>
        isVisibleOnHome(kind, slug, visibility, fallback),
    }
  }
  return ctx
}
