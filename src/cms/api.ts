import type { AdminContentState } from '../admin/types/adminContent'

const API_BASE = ''

export class CmsApiError extends Error {
  status: number
  body: unknown

  constructor(message: string, status: number, body?: unknown) {
    super(message)
    this.status = status
    this.body = body
  }
}

async function parseJson(res: Response) {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text) as unknown
  } catch {
    return text
  }
}

export async function cmsFetch<T>(
  path: string,
  init: RequestInit & { token?: string | null } = {},
): Promise<T> {
  const { token, headers, ...rest } = init
  const res = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: {
      ...(rest.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  })
  const body = await parseJson(res)
  if (!res.ok) {
    const message =
      body && typeof body === 'object' && 'error' in body
        ? String((body as { error: string }).error)
        : `Request failed (${res.status})`
    throw new CmsApiError(message, res.status, body)
  }
  return body as T
}

export async function fetchPublicContent(): Promise<AdminContentState | null> {
  try {
    return await cmsFetch<AdminContentState>('/api/public/content')
  } catch (error) {
    if (error instanceof CmsApiError && error.status === 404) return null
    console.warn('[cms] public content unavailable', error)
    return null
  }
}
