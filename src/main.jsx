import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Global style cascade: tokens first, then reset/base, then reusable
// component classes, then small utilities. Order matters for the
// cascade -- keep tokens.css first and utilities.css last.
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/layout.css'
import './styles/hero.css'
import './styles/about.css'
import './styles/ecosystem.css'
import './styles/intake.css'
import './styles/proposal.css'
import './styles/pricing.css'
import './styles/animations.css'
import './styles/social.css'
import './styles/utilities.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
