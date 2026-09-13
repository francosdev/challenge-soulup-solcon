import { MousePointerClick } from 'lucide-react'
import { EcoScoreJourney } from '../components/ecoscore/EcoScoreJourney'
import { CircleBadge } from '../components/ui/CircleBadge'
import { NextStep } from '../components/ui/NextStep'
import { PageHero, Realce } from '../components/ui/PageHero'

export function Trilha() {
  return (
    <>
      <PageHero
        tag="Trilha de habilidades"
        titulo={
          <>
            Aprenda, valide, <Realce>pratique</Realce> e conquiste
          </>
        }
        texto="A jornada de uma habilidade em quatro etapas. Comece por Reciclagem: leia o conteúdo, passe no quiz, aceite a missão e comprove a ação para receber os Soul Points."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          {/* A jornada traz o próprio cabeçalho de app, então roda dentro de uma
              moldura com altura fixa — mesmo tratamento dado ao protótipo do
              Planetinha na página Dashboard. */}
          <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-card border border-line bg-white">
            <div className="h-[640px] sm:h-[720px]">
              <EcoScoreJourney />
            </div>
          </div>

          <div className="mx-auto mt-6 flex max-w-[420px] items-start gap-3 rounded-card border border-line bg-surf p-5">
            <CircleBadge variant="wash" size="sm">
              <MousePointerClick size={14} aria-hidden />
            </CircleBadge>
            <p className="font-sans text-sm leading-relaxed text-ink-muted">
              <strong className="font-medium text-navy">Protótipo navegável:</strong> o progresso vive
              em memória e some ao recarregar. Reciclagem tem conteúdo completo; as outras três
              habilidades mostram a estrutura da jornada, ainda sem conteúdo.
            </p>
          </div>
        </div>
      </section>

      <NextStep
        titulo="Veja o sistema por trás da trilha"
        descricao="A Árvore de Habilidades, o ranking do ciclo e como as recompensas se sustentam."
        ctaLabel="Ver o EcoScore →"
        ctaTo="/ecoscore"
      />
    </>
  )
}
