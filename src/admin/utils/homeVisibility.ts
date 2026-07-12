import type { AdminContentState } from '../types/adminContent'
import type { HomeVisibilityState } from '../../lib/homeVisibility'

export function buildHomeVisibilityFromContent(content: AdminContentState): HomeVisibilityState {
  return {
    services: Object.fromEntries(
      content.services.map((item) => [item.slug, Boolean(item.showOnHome)]),
    ),
    projects: Object.fromEntries(
      content.projects.map((item) => [item.slug, Boolean(item.showOnHome)]),
    ),
    insights: Object.fromEntries(
      content.insights.map((item) => [item.slug, Boolean(item.showOnHome)]),
    ),
  }
}
