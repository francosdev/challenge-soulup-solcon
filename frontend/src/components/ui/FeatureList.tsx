import type { ReactNode } from 'react'

export type FeatureListProps = {
  children: ReactNode
  className?: string
}

/** Lista de `FeatureItem`. */
export function FeatureList({ children, className = '' }: FeatureListProps) {
  return <ul className={`flex flex-col gap-3 ${className}`}>{children}</ul>
}
