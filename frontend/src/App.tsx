import { lazy } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import Home from './routes/Home'

// A home entra no bundle inicial; as demais páginas são carregadas sob demanda.
const Sobre = lazy(() => import('./routes/Sobre'))
const Solucao = lazy(() => import('./routes/Solucao'))
const SolucaoDetalhe = lazy(() => import('./routes/SolucaoDetalhe'))
const EcoScore = lazy(() => import('./routes/EcoScore'))
const ComoFunciona = lazy(() => import('./routes/ComoFunciona'))
const Dashboard = lazy(() => import('./routes/Dashboard'))
const Trilha = lazy(() => import('./routes/Trilha'))
const Faq = lazy(() => import('./routes/Faq'))
const Integrantes = lazy(() => import('./routes/Integrantes'))
const Contato = lazy(() => import('./routes/Contato'))

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
