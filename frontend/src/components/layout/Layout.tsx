import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Carregando } from './Carregando'
import { Header } from './Header'
import { Footer } from './Footer'

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
