import { Routes, Route, Navigate } from 'react-router-dom'
import { AdminAuthProvider } from './auth/AdminAuthContext'
import AdminGuard from './auth/AdminGuard'
import { AdminContentProvider } from './content/AdminContentContext'
import AdminShell from './components/AdminShell'
import LoginPage from './pages/LoginPage'
import DashboardHome from './pages/DashboardHome'
import PagesIndex from './pages/PagesIndex'
import PageCopyEditor from './pages/PageCopyEditor'
import SiteAssetsEditor from './pages/SiteAssetsEditor'
import TeamList from './pages/TeamList'
import TeamEditor from './pages/TeamEditor'
import ServicesList from './pages/ServicesList'
import ServiceEditor from './pages/ServiceEditor'
import ProjectsList from './pages/ProjectsList'
import ProjectEditor from './pages/ProjectEditor'
import InsightsList from './pages/InsightsList'
import InsightEditor from './pages/InsightEditor'
import ContactEditor from './pages/ContactEditor'

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          element={
            <AdminGuard>
              <AdminContentProvider>
                <AdminShell />
              </AdminContentProvider>
            </AdminGuard>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="pages" element={<PagesIndex />} />
          <Route path="pages/:pageKey" element={<PageCopyEditor />} />
          <Route path="media" element={<SiteAssetsEditor />} />
          <Route path="team" element={<TeamList />} />
          <Route path="team/:id" element={<TeamEditor />} />
          <Route path="services" element={<ServicesList />} />
          <Route path="services/:slug" element={<ServiceEditor />} />
          <Route path="projects" element={<ProjectsList />} />
          <Route path="projects/:slug" element={<ProjectEditor />} />
          <Route path="insights" element={<InsightsList />} />
          <Route path="insights/:slug" element={<InsightEditor />} />
          <Route path="contact" element={<ContactEditor />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  )
}
