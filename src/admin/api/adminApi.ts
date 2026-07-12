import type { AdminContentState } from '../types/adminContent'
import { createSeedContent } from '../mock/seedFromSite'
import { CmsApiError, cmsFetch } from '../../cms/api'

const TOKEN_KEY = 'salezeus-admin-token'

export function getAdminToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setAdminToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* ignore */
  }
}

async function ensureSeeded(token: string): Promise<AdminContentState> {
  const seed = createSeedContent()
  return cmsFetch<AdminContentState>('/api/admin/content/seed', {
    method: 'POST',
    token,
    body: JSON.stringify({ content: seed, force: false }),
  })
}

export const adminApi = {
  async login(email: string, password: string): Promise<{ token: string; email: string }> {
    const result = await cmsFetch<{ token: string; email: string }>('/api/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    setAdminToken(result.token)
    return result
  },

  async me(): Promise<{ email: string } | null> {
    const token = getAdminToken()
    if (!token) return null
    try {
      return await cmsFetch<{ email: string }>('/api/admin/auth/me', { token })
    } catch {
      setAdminToken(null)
      return null
    }
  },

  logout() {
    setAdminToken(null)
  },

  async getContent(): Promise<AdminContentState> {
    const token = getAdminToken()
    if (!token) throw new Error('Not authenticated')
    try {
      return await cmsFetch<AdminContentState>('/api/admin/content', { token })
    } catch (error) {
      if (error instanceof CmsApiError && (error.status === 404 || error.status === 409)) {
        try {
          return await ensureSeeded(token)
        } catch (seedError) {
          if (seedError instanceof CmsApiError && seedError.status === 409) {
            return cmsFetch<AdminContentState>('/api/admin/content', { token })
          }
          // If seed rejected because exists, re-fetch; otherwise use local seed as last resort
          return createSeedContent()
        }
      }
      throw error
    }
  },

  async saveContent(next: AdminContentState): Promise<AdminContentState> {
    const token = getAdminToken()
    if (!token) throw new Error('Not authenticated')
    return cmsFetch<AdminContentState>('/api/admin/content', {
      method: 'PUT',
      token,
      body: JSON.stringify(next),
    })
  },

  async resetContent(): Promise<AdminContentState> {
    const token = getAdminToken()
    if (!token) throw new Error('Not authenticated')
    const seed = createSeedContent()
    return cmsFetch<AdminContentState>('/api/admin/content/reset', {
      method: 'POST',
      token,
      body: JSON.stringify({ content: seed }),
    })
  },
}
