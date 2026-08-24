import type { ReactNode } from 'react'

/**
 * Os nomes de cor vêm do site anterior (verde/laranja/roxo/azul) e foram
 * remapeados para os tokens da SoulUp, mantendo a mesma hierarquia visual.
 */
export type BadgeTone = 'verde' | 'laranja' | 'roxo' | 'azul' | 'neutro'

export interface BadgeProps {
  tone?: BadgeTone
  children: ReactNode
  className?: string
}

const TONS: Record<BadgeTone, string> = {
  verde: 'border-soul bg-soul-wash text-soul-deep',
  laranja: 'border-sun-line bg-sun-wash text-sun-text',
  roxo: 'border-navy bg-navy text-white',
  azul: 'border-soul-light bg-white text-soul-deep',
  neutro: 'border-line bg-surf text-ink-muted',
}

export function Badge({ tone = 'verde', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 font-sans text-xs font-medium ${TONS[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
