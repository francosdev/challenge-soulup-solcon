import { Button } from './Button'

export interface NextStepProps {
  tag?: string
  titulo: string
  descricao: string
  ctaLabel: string
  ctaTo: string
  /** CTA secundário opcional. */
  secundarioLabel?: string
  secundarioTo?: string
}

/**
 * Bloco "Próximo passo" que fechava todas as páginas do site anterior,
 * encadeando a navegação de uma página para a seguinte.
 */
export function NextStep({
  tag = 'Próximo passo',
  titulo,
  descricao,
  ctaLabel,
  ctaTo,
  secundarioLabel,
  secundarioTo,
}: NextStepProps) {
  return (
    <section className="border-t border-line bg-surf">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="rounded-card border border-line bg-white p-8 text-center sm:p-10">
          <span className="inline-flex items-center rounded-pill border border-soul-light bg-soul-wash px-3 py-1 font-sans text-xs font-medium text-soul-deep">
            {tag}
          </span>
          <h2 className="mt-4 font-display text-2xl font-semibold text-navy sm:text-3xl">{titulo}</h2>
          <p className="mx-auto mt-3 max-w-2xl font-sans text-base leading-relaxed text-ink-muted">{descricao}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button to={ctaTo} size="lg">
              {ctaLabel}
            </Button>
            {secundarioLabel && secundarioTo ? (
              <Button to={secundarioTo} variant="secondary" size="lg">
                {secundarioLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
