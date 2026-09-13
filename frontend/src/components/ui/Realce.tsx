import type { ReactNode } from 'react'

type RealceProps = {
  children: ReactNode
}

/** Destaque em `soul` dentro de um título — substitui `.texto-gradiente`. */
export function Realce({ children }: RealceProps) {
  return <span className="text-soul">{children}</span>
}
