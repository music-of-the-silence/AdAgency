import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Import i18n configuration
import './i18n'

// Import jQuery as a global variable
import $ from 'jquery'
window.$ = $
window.jQuery = $

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
