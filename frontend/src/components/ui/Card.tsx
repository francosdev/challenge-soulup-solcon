import type { ReactNode } from 'react'

export type CardTone = 'light' | 'dark' | 'wash'

export interface CardProps {
  children: ReactNode
  /** `light` para superfícies institucionais, `dark` para as telas da solução. */
  tone?: CardTone
  className?: string
}

const TONS: Record<CardTone, string> = {
  light: 'bg-white border-line text-navy',
  dark: 'bg-navy-dark border-white/10 text-white',
  wash: 'bg-soul-wash border-soul-light text-navy',
}

export function Card({ children, tone = 'light', className = '' }: CardProps) {
  return (
    <div className={`rounded-card border p-6 ${TONS[tone]} ${className}`}>{children}</div>
  )
}
