import { Bot, CircleHelp, Settings2, Star, Trophy, type LucideIcon } from 'lucide-react'
import { Accordion } from '../components/ui/Accordion'
import { Button } from '../components/ui/Button'
import { CircleBadge } from '../components/ui/CircleBadge'
import { NextStep } from '../components/ui/NextStep'
import { PageHero, Realce } from '../components/ui/PageHero'
import { FAQ, type CategoriaFaq } from '../data/faq'

const ICONES: Record<CategoriaFaq['icone'], LucideIcon> = {
  'circle-help': CircleHelp,
  star: Star,
  bot: Bot,
  trophy: Trophy,
  settings: Settings2,
}

export function Faq() {
  return (
    <>
      <PageHero
        tag="FAQ"
        titulo={
          <>
            Perguntas <Realce>frequentes</Realce>
          </>
        }
        texto="Encontre respostas sobre o EcoScore, a validação por IA, os Soul Points e o sistema de recompensas."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col gap-12">
            {FAQ.map((categoria) => {
              const Icone = ICONES[categoria.icone]
              return (
                <div key={categoria.id}>
                  <div className="flex items-center gap-3">
                    <CircleBadge variant="wash" size="md">
                      <Icone size={20} aria-hidden />
                    </CircleBadge>
                    <h2 className="font-display text-xl font-semibold text-navy">{categoria.titulo}</h2>
                  </div>
                  <Accordion itens={categoria.perguntas} className="mt-5" />
                </div>
              )
            })}
          </div>

          <div className="mt-12 rounded-card border border-line bg-surf p-8 text-center">
            <p className="font-sans text-base text-ink-muted">Não encontrou o que procurava?</p>
            <Button to="/contato" size="lg" className="mt-5">
              Fale conosco →
            </Button>
          </div>
        </div>
      </section>

      <NextStep
        titulo="Conheça quem construiu"
        descricao="A equipe 1TDSPH da FIAP por trás do EcoScore, em parceria com a startup SolCon."
        ctaLabel="Ver a equipe →"
        ctaTo="/integrantes"
      />
    </>
  )
}
