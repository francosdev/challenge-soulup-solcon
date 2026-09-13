import type { ReactNode } from 'react'

type ScreenScrollProps = {
  children: ReactNode
}

/** Área rolável entre a barra de status e a barra de abas. */
export function ScreenScroll({ children }: ScreenScrollProps) {
  return <div className="absolute inset-x-0 bottom-14 top-7 overflow-y-auto overflow-x-hidden">{children}</div>
}
