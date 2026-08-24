import { useState } from 'react'
import { Accordion } from '../components/ui/Accordion'
import { Button } from '../components/ui/Button'
import { SectionHeading } from '../components/ui/SectionHeading'
import { FAQ } from '../data/faq'

export function Faq() {
  const [categoriaId, setCategoriaId] = useState<string>(FAQ[0].id)

  const categoria = FAQ.find((item) => item.id === categoriaId) ?? FAQ[0]

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            tag="FAQ"
            titulo="Pergunte. Entenda."
            descricao="Validação por IA, Soul Points, ranking e recompensas — o que a banca e os usuários mais perguntam."
          />

          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Categorias do FAQ">
            {FAQ.map((item) => {
              const ativo = item.id === categoria.id

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={ativo}
                  onClick={() => setCategoriaId(item.id)}
                  className={`rounded-pill border px-4 py-2 font-sans text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soul focus-visible:ring-offset-2 ${
                    ativo
                      ? 'border-soul bg-soul text-white'
                      : 'border-soul-light bg-white text-soul-deep hover:bg-soul-wash'
                  }`}
                >
                  {item.titulo}
                </button>
              )
            })}
          </div>

          <Accordion key={categoria.id} itens={categoria.perguntas} className="mt-6" />
        </div>
      </section>

      <section className="border-t border-line bg-surf">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col items-start gap-4 rounded-card border border-line bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold text-navy">
                Não achou a resposta?
              </h2>
              <p className="mt-1 font-sans text-sm text-ink-muted">
                Manda a pergunta para a equipe — respondemos por e-mail.
              </p>
            </div>
            <Button to="/contato" size="lg">
              Fale conosco
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
