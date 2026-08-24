export type SectionHeadingTone = 'light' | 'dark'
export type SectionHeadingAlign = 'left' | 'center'

export interface SectionHeadingProps {
  /** Etiqueta curta acima do título. */
  tag?: string
  /** Título no imperativo, sentence case, frases curtas separadas por ponto. */
  titulo: string
  descricao?: string
  tone?: SectionHeadingTone
  align?: SectionHeadingAlign
  className?: string
}

export function SectionHeading({
  tag,
  titulo,
  descricao,
  tone = 'light',
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const escuro = tone === 'dark'
  const alinhamento = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alinhamento} ${className}`}>
      {tag ? (
        <span
          className={`inline-flex items-center rounded-pill border px-3 py-1 font-sans text-xs font-medium ${
            escuro ? 'border-soul/40 bg-soul/10 text-soul-light' : 'border-soul-light bg-soul-wash text-soul-deep'
          }`}
        >
          {tag}
        </span>
      ) : null}

      <h2
        className={`font-display text-2xl font-semibold leading-tight sm:text-3xl ${
          escuro ? 'text-white' : 'text-navy'
        }`}
      >
        {titulo}
      </h2>

      {descricao ? (
        <p className={`font-sans text-base leading-relaxed ${escuro ? 'text-white/70' : 'text-ink-muted'}`}>
          {descricao}
        </p>
      ) : null}
    </div>
  )
}
