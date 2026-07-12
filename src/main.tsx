import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { CmsContentProvider } from './cms/CmsContentProvider'
import { LocaleProvider } from './providers/LocaleProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CmsContentProvider>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </CmsContentProvider>
  </StrictMode>,
)
