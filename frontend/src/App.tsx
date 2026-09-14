import { lazy } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import Home from './pages/Home'

// A home entra no bundle inicial; as demais páginas são carregadas sob demanda.
const Sobre = lazy(() => import('./pages/Sobre'))
const Solucao = lazy(() => import('./pages/Solucao'))
const SolucaoDetalhe = lazy(() => import('./pages/SolucaoDetalhe'))
const EcoScore = lazy(() => import('./pages/EcoScore'))
const ComoFunciona = lazy(() => import('./pages/ComoFunciona'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Trilha = lazy(() => import('./pages/Trilha'))
const Faq = lazy(() => import('./pages/Faq'))
const Integrantes = lazy(() => import('./pages/Integrantes'))
const Contato = lazy(() => import('./pages/Contato'))

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/solucao" element={<Solucao />} />
          <Route path="/solucao/:id" element={<SolucaoDetalhe />} />
          <Route path="/ecoscore" element={<EcoScore />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trilha" element={<Trilha />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/contato" element={<Contato />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
