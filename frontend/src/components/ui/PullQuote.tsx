export interface PullQuoteProps {
  quote: string
  cite: string
}

/** Citação destacada com filete lateral — equivalente ao `.pull-quote`. */
export function PullQuote({ quote, cite }: PullQuoteProps) {
  return (
    <figure className="border-l border-soul bg-soul-wash py-4 pl-5 pr-4">
      <blockquote className="font-display text-lg font-medium leading-snug text-navy">{quote}</blockquote>
      <figcaption className="mt-3 font-sans text-xs text-ink-muted">{cite}</figcaption>
    </figure>
  )
}
