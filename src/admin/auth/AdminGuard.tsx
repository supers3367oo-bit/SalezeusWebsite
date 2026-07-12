import { Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from './AdminAuthContext'

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, ready } = useAdminAuth()
  const location = useLocation()

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sz-surface text-sm text-sz-primary/60">
        Loading…
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return <>{children}</>
}
