import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppProviders } from '@rtl-monorepo/ui-core'
import App from './shell/App'

const el = document.getElementById('root')!
createRoot(el).render(
  <StrictMode>
    <AppProviders>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </AppProviders>
  </StrictMode>
)
