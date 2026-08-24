import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'

interface ItemNav {
  to: string
  label: string
}

const NAV: readonly ItemNav[] = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/solucao', label: 'Solução' },
  { to: '/integrantes', label: 'Integrantes' },
  { to: '/faq', label: 'FAQ' },
] as const

export function Header() {
  const [aberto, setAberto] = useState<boolean>(false)
  const { pathname } = useLocation()

  const linkClasses = ({ isActive }: { isActive: boolean }): string =>
    `font-sans text-sm transition-colors ${isActive ? 'text-soul font-medium' : 'text-navy hover:text-soul'}`

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link to="/" aria-label="EcoScore — início" onClick={() => setAberto(false)}>
          <Logo />
        </Link>

        {/* Desktop */}
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={linkClasses}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to="/contato"
                className={`inline-flex items-center rounded-pill border border-soul px-4 py-2 font-sans text-sm font-medium transition-colors ${
                  pathname === '/contato' ? 'bg-soul text-white' : 'text-soul hover:bg-soul-wash'
                }`}
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile */}
        <button
          type="button"
          onClick={() => setAberto((atual) => !atual)}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-line text-navy transition-colors hover:border-soul hover:text-soul md:hidden"
        >
          {aberto ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </div>

      {aberto ? (
        <nav id="menu-mobile" aria-label="Principal (mobile)" className="border-t border-line bg-white md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {[...NAV, { to: '/contato', label: 'Contato' }].map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setAberto(false)}
                  className={({ isActive }) =>
                    `block border-b border-line py-3 font-sans text-sm last:border-b-0 ${
                      isActive ? 'text-soul font-medium' : 'text-navy'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
