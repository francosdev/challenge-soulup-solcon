import { BarChart3, Globe2, MousePointerClick, Save, Trophy } from 'lucide-react'
import { PetPlanetApp } from '../components/petplanet/PetPlanetApp'
import { Card } from '../components/ui/Card'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CircleBadge } from '../components/ui/CircleBadge'
import { NextStep } from '../components/ui/NextStep'
import { PageHero, Realce } from '../components/ui/PageHero'
import { Button } from '../components/ui/Button'

export function Dashboard() {
  return (
    <>
      <PageHero
        tag="Protótipo interativo"
        titulo={
          <>
            Visualize seu <Realce>impacto real</Realce>
          </>
        }
        texto="Cada ação registrada na plataforma vira métrica concreta — CO₂ evitado, árvores equivalentes, água economizada e resíduos reciclados. Tudo guiado pelo Solzinho, seu mascote ecológico. Temos o objetivo de mostrar ao usuário que ele está fazendo a diferença."
      />

      {/* PROTÓTIPO */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            tag="Demonstração"
            titulo="Experimente o Dashboard"
            descricao="Clique no Solzinho. Registre uma ação. Veja o impacto subir em tempo real. O protótipo persiste no seu navegador, então você pode voltar quando quiser."
          />

          {/* Moldura do protótipo */}
          <div className="mt-10 overflow-hidden rounded-card border border-line bg-ink">
            <div className="flex items-center gap-3 border-b border-white/10 bg-navy-dark px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-pill bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-pill bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-pill bg-soul" />
              </div>
              <span className="flex-1 truncate rounded-pill border border-white/10 px-3 py-1 font-sans text-xs text-white/50">
                ecoscore.soulup.app/impacto
              </span>
              <span className="hidden shrink-0 font-sans text-xs text-soul-light sm:inline">EcoScore</span>
            </div>

            <PetPlanetApp />
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-card border border-line bg-surf p-5">
            <CircleBadge variant="wash" size="sm">
              <MousePointerClick size={14} aria-hidden />
            </CircleBadge>
            <p className="font-sans text-sm leading-relaxed text-ink-muted">
              <strong className="font-medium text-navy">Dica:</strong> o mascote rastreia o cursor com os olhos,
              clique nele pra reagir. O onboarding aparece no primeiro acesso — depois você pode resetar tudo
              pelo perfil.
            </p>
          </div>
        </div>
      </section>

      {/* O QUE ESPERAR */}
      <section className="border-t border-line bg-surf">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            tag="O que esperar"
            titulo="Cada detalhe foi pensado"
            descricao="O protótipo entrega o loop completo de gamificação: registrar, ser recompensado, ver o impacto crescer e voltar pra mais."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CircleBadge variant="wash" size="md">
                <Globe2 size={20} aria-hidden />
              </CircleBadge>
              <h3 className="mt-4 font-display text-base font-semibold text-navy">Mascote vivo</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                O Solzinho reage à sua atividade — feliz, sonolento ou triste. Os olhos seguem o cursor. Clique
                pra ver ele pular.
              </p>
            </Card>
            <Card>
              <CircleBadge variant="wash" size="md">
                <Save size={20} aria-hidden />
              </CircleBadge>
              <h3 className="mt-4 font-display text-base font-semibold text-navy">Estado persistente</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                Todas as ações ficam salvas no seu navegador. Volte amanhã, semana que vem — seu progresso
                continua exatamente onde parou.
              </p>
            </Card>
            <Card>
              <CircleBadge variant="wash" size="md">
                <BarChart3 size={20} aria-hidden />
              </CircleBadge>
              <h3 className="mt-4 font-display text-base font-semibold text-navy">Métricas reais</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                CO₂ usa fator médio de emissão, árvores convertem absorção anual, água e energia partem de
                médias brasileiras de consumo doméstico.
              </p>
            </Card>
            <Card>
              <CircleBadge variant="sun" size="md">
                <Trophy size={20} aria-hidden />
              </CircleBadge>
              <h3 className="mt-4 font-display text-base font-semibold text-navy">Loop de recompensa</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                Soul Points, moedas e streak crescem a cada ação. Confete real, números animados e o mascote
                festejando — feedback imediato.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="rounded-card border border-line bg-surf p-8 text-center sm:p-10">
            <span className="inline-flex items-center rounded-pill border border-soul-light bg-white px-3 py-1 font-sans text-xs font-medium text-soul-deep">
              Próximos passos
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold text-navy sm:text-3xl">
              Quer entender a engenharia por trás?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl font-sans text-base leading-relaxed text-ink-muted">
              Conheça os pilares, a Árvore de Habilidades, o sistema de ranking e como pretendemos sustentar as
              recompensas reais a longo prazo.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button to="/ecoscore">Ver o EcoScore completo</Button>
              <Button to="/como-funciona" variant="secondary">
                Como funciona →
              </Button>
            </div>
          </div>
        </div>
      </section>

      <NextStep
        titulo="Ainda tem dúvidas?"
        descricao="Reunimos as perguntas mais frequentes sobre validação, Soul Points, ranking e recompensas reais."
        ctaLabel="Ver o FAQ →"
        ctaTo="/faq"
      />
    </>
  )
}
