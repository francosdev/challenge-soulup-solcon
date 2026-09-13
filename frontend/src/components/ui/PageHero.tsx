import type { ReactNode } from 'react'
import { Spores } from '../visual/Spores'
import { Badge } from './Badge'

export type PageHeroProps = {
  tag: string
  titulo: ReactNode
  texto: string
}

/** Hero das páginas internas — equivalente ao `.hero-interno` do site anterior. */
export function PageHero({ tag, titulo, texto }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surf">
      <div className="pointer-events-none absolute inset-0">
        <Spores />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <Badge tone="azul">
          {tag}
        </Badge>
        <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl lg:text-5xl">
          {titulo}
        </h1>
        <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-ink-muted">{texto}</p>
      </div>
    </section>
  )
}
