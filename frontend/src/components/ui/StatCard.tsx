import type { ReactNode } from 'react'
import { CircleBadge } from './CircleBadge'

export interface StatCardProps {
  valor: string
  label: string
  detalhe?: string
  /** Conteúdo do selo circular — normalmente um ícone lucide. */
  icone?: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}

export function StatCard({ valor, label, detalhe, icone, tone = 'light', className = '' }: StatCardProps) {
  const escuro = tone === 'dark'

  return (
    <div
      className={`flex flex-col gap-3 rounded-card border p-6 ${
        escuro ? 'border-white/10 bg-navy-dark' : 'border-line bg-white'
      } ${className}`}
    >
      {icone ? (
        <CircleBadge variant={escuro ? 'solid' : 'wash'} size="md">
          {icone}
        </CircleBadge>
      ) : null}

      <p className={`font-display text-3xl font-semibold leading-none ${escuro ? 'text-white' : 'text-navy'}`}>
        {valor}
      </p>
      <p className={`font-sans text-sm font-medium ${escuro ? 'text-soul-light' : 'text-soul-deep'}`}>{label}</p>

      {detalhe ? (
        <p className={`font-sans text-xs leading-relaxed ${escuro ? 'text-white/60' : 'text-ink-muted'}`}>
          {detalhe}
        </p>
      ) : null}
    </div>
  )
}
