import type { SiteAssetKey } from '../admin/siteAssets/registry'
import { createDefaultSiteAssets } from '../admin/siteAssets/registry'

export const SITE_ASSETS_STORAGE_KEY = 'salezeus-site-assets'
export const SITE_ASSETS_EVENT = 'salezeus-site-assets-changed'

const DEFAULTS = createDefaultSiteAssets()

export function readStoredSiteAssets(): Partial<Record<SiteAssetKey, string>> {
  try {
    const raw = localStorage.getItem(SITE_ASSETS_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return {}
    return parsed as Partial<Record<SiteAssetKey, string>>
  } catch {
    return {}
  }
}

export function writeStoredSiteAssets(assets: Record<string, string>) {
  try {
    localStorage.setItem(SITE_ASSETS_STORAGE_KEY, JSON.stringify(assets))
    window.dispatchEvent(new Event(SITE_ASSETS_EVENT))
  } catch {
    /* quota / private mode — ignore */
  }
}

export function clearStoredSiteAssets() {
  try {
    localStorage.removeItem(SITE_ASSETS_STORAGE_KEY)
    window.dispatchEvent(new Event(SITE_ASSETS_EVENT))
  } catch {
    /* ignore */
  }
}

export function resolveSiteAsset(
  key: SiteAssetKey,
  overrides?: Partial<Record<SiteAssetKey, string>> | null,
): string {
  const fromOverride = overrides?.[key]
  if (fromOverride) return fromOverride
  const stored = readStoredSiteAssets()[key]
  if (stored) return stored
  return DEFAULTS[key]
}
