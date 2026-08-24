import type { ReactNode } from 'react'

export interface PageHeroProps {
  tag: string
  titulo: ReactNode
  texto: string
}

/** Hero das páginas internas — equivalente ao `.hero-interno` do site anterior. */
export function PageHero({ tag, titulo, texto }: PageHeroProps) {
  return (
    <section className="border-b border-line bg-surf">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <span className="inline-flex items-center rounded-pill border border-soul-light bg-white px-3 py-1 font-sans text-xs font-medium text-soul-deep">
          {tag}
        </span>
        <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl lg:text-5xl">
          {titulo}
        </h1>
        <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-ink-muted">{texto}</p>
      </div>
    </section>
  )
}

/** Destaque em `soul` dentro de um título — substitui `.texto-gradiente`. */
export function Realce({ children }: { children: ReactNode }) {
  return <span className="text-soul">{children}</span>
}
