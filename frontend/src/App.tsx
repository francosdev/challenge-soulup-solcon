import { lazy } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'

/**
 * A home entra no bundle inicial; as demais rotas são carregadas sob demanda.
 * Dashboard e Trilha pesam bem mais que as outras — cada uma carrega um
 * protótipo interativo inteiro — e só quem visita a rota paga por elas.
 */
const carregar = <T extends Record<string, React.ComponentType>>(
  importar: () => Promise<T>,
  nome: keyof T,
) => lazy(() => importar().then((m) => ({ default: m[nome] })))

const Sobre = carregar(() => import('./pages/Sobre'), 'Sobre')
const EcoScore = carregar(() => import('./pages/EcoScore'), 'EcoScore')
const ComoFunciona = carregar(() => import('./pages/ComoFunciona'), 'ComoFunciona')
const Dashboard = carregar(() => import('./pages/Dashboard'), 'Dashboard')
const Trilha = carregar(() => import('./pages/Trilha'), 'Trilha')
const Faq = carregar(() => import('./pages/Faq'), 'Faq')
const Integrantes = carregar(() => import('./pages/Integrantes'), 'Integrantes')
const Contato = carregar(() => import('./pages/Contato'), 'Contato')

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
