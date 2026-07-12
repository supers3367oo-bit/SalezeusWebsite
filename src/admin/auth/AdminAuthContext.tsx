import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { adminApi, getAdminToken } from '../api/adminApi'

type AdminAuthContextValue = {
  isAuthenticated: boolean
  email: string | null
  ready: boolean
  login: (
    email: string,
    password: string,
  ) => Promise<{ ok: true } | { ok: false; error: string }>
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const token = getAdminToken()
    if (!token) {
      setReady(true)
      return
    }
    adminApi
      .me()
      .then((me) => {
        if (!cancelled) setEmail(me?.email ?? null)
      })
      .finally(() => {
        if (!cancelled) setReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (inputEmail: string, password: string) => {
    try {
      const result = await adminApi.login(inputEmail, password)
      setEmail(result.email)
      return { ok: true as const }
    } catch (error) {
      return {
        ok: false as const,
        error: error instanceof Error ? error.message : 'Invalid email or password',
      }
    }
  }, [])

  const logout = useCallback(() => {
    adminApi.logout()
    setEmail(null)
  }, [])

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(email),
      email,
      ready,
      login,
      logout,
    }),
    [email, ready, login, logout],
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
