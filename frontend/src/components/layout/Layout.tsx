import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

/** Reserva a altura da dobra enquanto o chunk da rota chega. */
function Carregando() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="h-8 w-8 animate-spin rounded-pill border border-line border-t-soul" />
      <span className="sr-only">Carregando página</span>
    </div>
  )
}

export function Layout() {
  const { pathname } = useLocation()

  // Cada rota começa no topo, como numa navegação de página inteira.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // `overflow-x-clip` e não `hidden`: os dois barram o scroll horizontal, mas
  // `hidden` cria um contexto de rolagem no ancestral e mata o `sticky` do
  // Header. `clip` não cria.
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-white font-sans text-navy antialiased">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<Carregando />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
