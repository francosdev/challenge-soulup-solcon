import type { ReactNode } from 'react'

/**
 * `accent` marca o item acionável agora; `reward` é território de conquista
 * e recompensa, e por isso é o único tom que usa `sun`.
 */
export type CardTone = 'light' | 'dark' | 'wash' | 'accent' | 'reward'

export interface CardProps {
  children: ReactNode
  /** `light` para superfícies institucionais, `dark` para as telas da solução. */
  tone?: CardTone
  /** Desligue quando quem chama controla o próprio espaçamento interno. */
  padded?: boolean
  className?: string
}

const TONS: Record<CardTone, string> = {
  light: 'bg-white border-line text-navy',
  dark: 'bg-navy-dark border-white/10 text-white',
  wash: 'bg-soul-wash border-soul-light text-navy',
  accent: 'bg-white border-soul text-navy',
  reward: 'bg-sun-wash border-sun-line text-navy',
}

export function Card({ children, tone = 'light', padded = true, className = '' }: CardProps) {
  return (
    <div className={`rounded-card border ${padded ? 'p-6' : ''} ${TONS[tone]} ${className}`}>
      {children}
    </div>
  )
}
