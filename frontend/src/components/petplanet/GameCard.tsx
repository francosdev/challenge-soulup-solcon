import type { ReactNode } from 'react'

type GameCardProps = {
  /** Fundo translúcido do painel de destaque em vez do fundo de cartão. */
  painel?: boolean
  className?: string
  children: ReactNode
}

export function GameCard({ painel = false, className = '', children }: GameCardProps) {
  const fundo = painel ? 'bg-soul/[.14]' : 'bg-navy'
  return (
    <div className={`rounded-[14px] border-2 border-soul-deep shadow-[0_3px_0_#0F5F61] ${fundo} ${className}`}>
      {children}
    </div>
  )
}
