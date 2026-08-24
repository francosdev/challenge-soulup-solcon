import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { TURMA } from '../../data/integrantes'

interface ColunaFooter {
  titulo: string
  links: readonly { to: string; label: string }[]
}

const COLUNAS: readonly ColunaFooter[] = [
  {
    titulo: 'Páginas',
    links: [
      { to: '/', label: 'Início' },
      { to: '/sobre', label: 'Sobre' },
      { to: '/ecoscore', label: 'EcoScore' },
      { to: '/como-funciona', label: 'Como Funciona' },
      { to: '/dashboard', label: 'Dashboard' },
    ],
  },
  {
    titulo: 'Projeto',
    links: [
      { to: '/faq', label: 'FAQ' },
      { to: '/integrantes', label: 'Integrantes' },
      { to: '/contato', label: 'Contato' },
    ],
  },
] as const

export function Footer() {
  return (
    <footer className="border-t border-line bg-surf">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-ink-muted">
              Gamificação sustentável desenvolvida para o Challenge FIAP 2026 em parceria com a SoulUp
              (by Prospera). Ações ecológicas reais viram Soul Points.
            </p>
            <span className="mt-4 inline-flex items-center rounded-pill border border-soul-light bg-soul-wash px-3 py-1 font-sans text-xs text-soul-deep">
              Challenge FIAP 2026 · Turma {TURMA}
            </span>
          </div>

          {COLUNAS.map((coluna) => (
            <div key={coluna.titulo}>
              <p className="font-display text-sm font-semibold text-navy">{coluna.titulo}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {coluna.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="font-sans text-sm text-ink-muted transition-colors hover:text-soul"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 font-sans text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 EcoScore — SolCon · FIAP {TURMA}</span>
          <span>React + Vite + TypeScript + TailwindCSS</span>
        </div>
      </div>
    </footer>
  )
}
