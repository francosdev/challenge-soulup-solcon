import type { ReactNode } from 'react'

export interface ActionChipProps {
  nome: string
  pontos: number
  unidade: string
  icone: ReactNode
  /** Marca o chip como selecionado no registro de ação. */
  ativo?: boolean
  onClick?: () => void
  className?: string
}

/** Chip de registro de ação usado no dashboard escuro da Solução. */
export function ActionChip({
  nome,
  pontos,
  unidade,
  icone,
  ativo = false,
  onClick,
  className = '',
}: ActionChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className={`inline-flex items-center gap-3 rounded-pill border px-4 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soul focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
        ativo
          ? 'border-soul bg-soul text-white'
          : 'border-soul-light/30 bg-navy-dark text-white hover:border-soul'
      } ${className}`}
    >
      <span className={ativo ? 'text-white' : 'text-soul'}>{icone}</span>
      <span className="font-sans text-sm font-medium">{nome}</span>
      <span
        className={`font-display text-xs font-semibold ${ativo ? 'text-white/80' : 'text-soul-light'}`}
      >
        +{pontos.toLocaleString('pt-BR')}/{unidade}
      </span>
    </button>
  )
}
