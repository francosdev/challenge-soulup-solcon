import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Elemento #root não encontrado em index.html')
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
