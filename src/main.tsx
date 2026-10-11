import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'

// The homepage intro hides the header until it plays; other routes skip the intro
if (location.pathname !== '/') document.documentElement.classList.remove('intro-active')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
