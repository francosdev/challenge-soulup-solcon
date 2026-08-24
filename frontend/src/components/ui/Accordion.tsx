import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'

export interface AccordionItem {
  id: string
  pergunta: string
  resposta: string
}

export interface AccordionProps {
  itens: readonly AccordionItem[]
  className?: string
}

/** Acordeão controlado: um item aberto por vez. */
export function Accordion({ itens, className = '' }: AccordionProps) {
  const [abertoId, setAbertoId] = useState<string | null>(null)

  return (
    <div className={`divide-y divide-line rounded-card border border-line bg-white ${className}`}>
      {itens.map((item) => {
        const aberto = abertoId === item.id

        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => setAbertoId(aberto ? null : item.id)}
                aria-expanded={aberto}
                aria-controls={`painel-${item.id}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-soul"
              >
                <span className="font-sans text-sm font-medium text-navy sm:text-base">
                  {item.pergunta}
                </span>
                <span
                  className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-pill border transition-colors ${
                    aberto ? 'border-soul bg-soul text-white' : 'border-soul-light bg-soul-wash text-soul-deep'
                  }`}
                >
                  {aberto ? <Minus size={16} aria-hidden /> : <Plus size={16} aria-hidden />}
                </span>
              </button>
            </h3>

            {aberto ? (
              <div id={`painel-${item.id}`} className="px-5 pb-5">
                <p className="font-sans text-sm leading-relaxed text-ink-muted">{item.resposta}</p>
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
