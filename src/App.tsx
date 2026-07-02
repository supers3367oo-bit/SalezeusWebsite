import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CustomCursor from './components/ui/CustomCursor'
import FloatingActions from './components/ui/FloatingActions'
import LocomotiveProvider from './providers/LocomotiveProvider'
import ScrollToTop from './components/layout/ScrollToTop'
import ScrollAnchorHandler from './components/layout/ScrollAnchorHandler'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import InsightsPage from './pages/InsightsPage'
import ArticlePage from './pages/ArticlePage'
import ContactPage from './pages/ContactPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import PortfolioPage from './pages/PortfolioPage'

export default function App() {
  return (
    <BrowserRouter>
      <LocomotiveProvider>
        <ScrollToTop />
        <ScrollAnchorHandler />
        <div className="bg-sz-dark">
          <CustomCursor />
          <FloatingActions />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/insights/:slug" element={<ArticlePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LocomotiveProvider>
    </BrowserRouter>
  )
}
