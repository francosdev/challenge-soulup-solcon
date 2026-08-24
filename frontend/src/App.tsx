import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Sobre } from './pages/Sobre'
import { EcoScore } from './pages/EcoScore'
import { ComoFunciona } from './pages/ComoFunciona'
import { Dashboard } from './pages/Dashboard'
import { Faq } from './pages/Faq'
import { Integrantes } from './pages/Integrantes'
import { Contato } from './pages/Contato'

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/ecoscore" element={<EcoScore />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/contato" element={<Contato />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
