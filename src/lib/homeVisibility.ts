export type HomeVisibilityKind = 'services' | 'projects' | 'insights'

export type HomeVisibilityState = Record<HomeVisibilityKind, Record<string, boolean>>

export const HOME_VISIBILITY_STORAGE_KEY = 'salezeus-home-visibility'
export const HOME_VISIBILITY_EVENT = 'salezeus-home-visibility-changed'

export function emptyHomeVisibility(): HomeVisibilityState {
  return { services: {}, projects: {}, insights: {} }
}

export function readStoredHomeVisibility(): HomeVisibilityState {
  try {
    const raw = localStorage.getItem(HOME_VISIBILITY_STORAGE_KEY)
    if (!raw) return emptyHomeVisibility()
    const parsed = JSON.parse(raw) as Partial<HomeVisibilityState>
    return {
      services: parsed.services ?? {},
      projects: parsed.projects ?? {},
      insights: parsed.insights ?? {},
    }
  } catch {
    return emptyHomeVisibility()
  }
}

export function writeStoredHomeVisibility(state: HomeVisibilityState) {
  try {
    localStorage.setItem(HOME_VISIBILITY_STORAGE_KEY, JSON.stringify(state))
    window.dispatchEvent(new Event(HOME_VISIBILITY_EVENT))
  } catch {
    /* ignore */
  }
}

export function clearStoredHomeVisibility() {
  try {
    localStorage.removeItem(HOME_VISIBILITY_STORAGE_KEY)
    window.dispatchEvent(new Event(HOME_VISIBILITY_EVENT))
  } catch {
    /* ignore */
  }
}

export function isVisibleOnHome(
  kind: HomeVisibilityKind,
  slug: string,
  state: HomeVisibilityState,
  fallback = true,
): boolean {
  const value = state[kind][slug]
  return typeof value === 'boolean' ? value : fallback
}
