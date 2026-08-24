import { Droplets, Recycle, Sprout, Zap, type LucideIcon } from 'lucide-react'
import type { Acao } from '../../data/acoes'

const MAPA: Record<Acao['icone'], LucideIcon> = {
  sprout: Sprout,
  recycle: Recycle,
  zap: Zap,
  droplets: Droplets,
}

export interface IconeAcaoProps {
  nome: Acao['icone']
  size?: number
  className?: string
}

/** Resolve o ícone lucide de uma categoria de ação sem recorrer a `any`. */
export function IconeAcao({ nome, size = 20, className = '' }: IconeAcaoProps) {
  const Componente = MAPA[nome]
  return <Componente size={size} className={className} aria-hidden />
}
