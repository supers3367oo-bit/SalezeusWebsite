import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { SiteAssetKey } from '../admin/siteAssets/registry'
import { createDefaultSiteAssets } from '../admin/siteAssets/registry'
import {
  readStoredSiteAssets,
  resolveSiteAsset,
  SITE_ASSETS_EVENT,
} from '../lib/siteAssets'
import { useCmsContentOptional } from '../cms/CmsContentProvider'

type SiteAssetsContextValue = {
  getAsset: (key: SiteAssetKey) => string
  assets: Record<SiteAssetKey, string>
}

const SiteAssetsContext = createContext<SiteAssetsContextValue | null>(null)

function mergeLocalAssets(): Record<SiteAssetKey, string> {
  return { ...createDefaultSiteAssets(), ...readStoredSiteAssets() }
}

export function SiteAssetsProvider({ children }: { children: ReactNode }) {
  const cms = useCmsContentOptional()
  const [localAssets, setLocalAssets] =
    useState<Record<SiteAssetKey, string>>(mergeLocalAssets)

  useEffect(() => {
    const sync = () => setLocalAssets(mergeLocalAssets())
    window.addEventListener(SITE_ASSETS_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(SITE_ASSETS_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const assets = (cms?.content
    ? ({ ...createDefaultSiteAssets(), ...cms.siteAssets } as Record<SiteAssetKey, string>)
    : localAssets)

  const getAsset = useCallback(
    (key: SiteAssetKey) => resolveSiteAsset(key, assets),
    [assets],
  )

  const value = useMemo(() => ({ getAsset, assets }), [getAsset, assets])

  return (
    <SiteAssetsContext.Provider value={value}>{children}</SiteAssetsContext.Provider>
  )
}

export function useSiteAsset(key: SiteAssetKey): string {
  const ctx = useContext(SiteAssetsContext)
  if (!ctx) {
    return resolveSiteAsset(key)
  }
  return ctx.getAsset(key)
}

export function useSiteAssets() {
  const ctx = useContext(SiteAssetsContext)
  if (!ctx) {
    const assets = mergeLocalAssets()
    return {
      assets,
      getAsset: (key: SiteAssetKey) => resolveSiteAsset(key, assets),
    }
  }
  return ctx
}
