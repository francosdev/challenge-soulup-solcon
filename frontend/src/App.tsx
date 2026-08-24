import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Sobre } from './pages/Sobre'
import { Solucao } from './pages/Solucao'
import { Integrantes } from './pages/Integrantes'
import { Faq } from './pages/Faq'
import { Contato } from './pages/Contato'

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/solucao" element={<Solucao />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contato" element={<Contato />} />

          {/* Rotas antigas do site estático */}
          <Route path="/ecoscore" element={<Navigate to="/solucao" replace />} />
          <Route path="/dashboard" element={<Navigate to="/solucao" replace />} />
          <Route path="/como-funciona" element={<Navigate to="/sobre" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
