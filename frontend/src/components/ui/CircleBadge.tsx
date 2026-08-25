import type { ReactNode } from 'react'

export type CircleBadgeVariant = 'outline' | 'solid' | 'wash' | 'sun'
export type CircleBadgeSize = 'sm' | 'md' | 'lg'

export interface CircleBadgeProps {
  children: ReactNode
  variant?: CircleBadgeVariant
  size?: CircleBadgeSize
  className?: string
  /** Descrição acessível quando o conteúdo é apenas gráfico. */
  label?: string
}

const VARIANTES: Record<CircleBadgeVariant, string> = {
  outline: 'border border-soul text-soul bg-transparent',
  solid: 'border border-soul bg-soul text-white',
  wash: 'border border-soul-light bg-soul-wash text-soul-deep',
  sun: 'border border-sun-line bg-sun-wash text-sun-text',
}

const TAMANHOS: Record<CircleBadgeSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-20 w-20 text-xl',
}

/**
 * Selo circular da marca SoulUp — o "UP" dentro do círculo.
 * Usado em pontuações, ícones de ação, iniciais de perfil e conquistas.
 */
export function CircleBadge({
  children,
  variant = 'outline',
  size = 'md',
  className = '',
  label,
}: CircleBadgeProps) {
  return (
    <span
      aria-label={label}
      role={label ? 'img' : undefined}
      className={`inline-flex shrink-0 items-center justify-center rounded-pill font-display font-semibold leading-none ${VARIANTES[variant]} ${TAMANHOS[size]} ${className}`}
    >
      {children}
    </span>
  )
}
