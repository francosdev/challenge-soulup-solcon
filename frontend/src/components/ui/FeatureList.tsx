import { Check } from 'lucide-react'
import type { ReactNode } from 'react'

export interface FeatureItemProps {
  children: ReactNode
}

/** Item de lista com marcador circular — equivalente ao `.feature-item`. */
export function FeatureItem({ children }: FeatureItemProps) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-pill border border-soul bg-soul-wash text-soul-deep">
        <Check size={12} aria-hidden />
      </span>
      <span className="font-sans text-sm leading-relaxed text-ink-muted">{children}</span>
    </li>
  )
}

export interface FeatureListProps {
  children: ReactNode
  className?: string
}

export function FeatureList({ children, className = '' }: FeatureListProps) {
  return <ul className={`flex flex-col gap-3 ${className}`}>{children}</ul>
}
