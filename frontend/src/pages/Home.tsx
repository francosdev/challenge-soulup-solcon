import { ArrowRight, Zap } from 'lucide-react'
import { Solzinho } from '../components/mascot/Solzinho'
import { Button } from '../components/ui/Button'
import { CircleBadge } from '../components/ui/CircleBadge'
import { IconeAcao } from '../components/ui/IconeAcao'
import { SectionHeading } from '../components/ui/SectionHeading'
import { StatCard } from '../components/ui/StatCard'
import { ACOES, META_CICLO, TETO_BENEFICIO } from '../data/acoes'
import { IMPACTO, PILARES } from '../data/impacto'

export function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-pill border border-soul-light bg-soul-wash px-3 py-1 font-sans text-xs font-medium text-soul-deep">
              FIAP 2026 · SoulUp × SolCon
            </span>

            <h1 className="font-display text-4xl font-semibold leading-[1.1] text-navy sm:text-5xl">
              Registre. Pontue. Economize.
            </h1>

            <p className="max-w-md font-sans text-base leading-relaxed text-ink-muted">
              O EcoScore transforma ações ecológicas reais em Soul Points. Chegue a {META_CICLO} pontos no
              ciclo e tenha sua conta de energia subsidiada pela SoulUp.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button to="/solucao" size="lg">
                Ver a solução
                <ArrowRight size={18} aria-hidden />
              </Button>
              <Button to="/sobre" variant="secondary" size="lg">
                Entender o projeto
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Solzinho size={280} animated className="h-auto max-w-full" />
          </div>
        </div>
      </section>

      {/* PONTUAÇÃO POR AÇÃO */}
      <section className="border-t border-line bg-surf">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            tag="Pontuação"
            titulo="Aja. Some pontos."
            descricao="Quatro categorias no MVP, cada uma com peso próprio. Toda ação é validada por foto no app, com GPS e timestamp."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ACOES.map((acao) => (
              <article
                key={acao.id}
                className="flex flex-col items-center gap-3 rounded-card border border-line bg-white p-6 text-center"
              >
                <CircleBadge variant="wash" size="lg">
                  <IconeAcao nome={acao.icone} size={28} />
                </CircleBadge>

                <p className="font-display text-3xl font-semibold leading-none text-soul">
                  {acao.pontos.toLocaleString('pt-BR')}
                </p>
                <p className="font-sans text-sm font-medium text-navy">{acao.nome}</p>
                <p className="font-sans text-xs text-ink-muted">
                  Soul Points por {acao.unidade}
                </p>
                <p className="mt-1 font-sans text-xs leading-relaxed text-ink-muted">{acao.descricao}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PILARES */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            tag="Os pilares"
            titulo="Sinta. Pertença. Evolua."
            descricao="O EcoScore trata impacto ambiental como experiência: sentida no dashboard, construída em comunidade e devolvida em recompensa concreta."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILARES.map((pilar) => (
              <article key={pilar.id} className="rounded-card border border-line bg-white p-6">
                <CircleBadge variant="outline" size="sm">
                  {pilar.numero}
                </CircleBadge>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy">{pilar.titulo}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">{pilar.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACTO */}
      <section className="border-t border-line bg-surf">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            tag="Impacto"
            titulo="Meça o que muda."
            descricao="Números agregados da comunidade no ciclo atual. Cada métrica vem de ações validadas, nunca de autodeclaração."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {IMPACTO.map((metrica) => (
              <StatCard
                key={metrica.id}
                valor={metrica.valor}
                label={metrica.label}
                detalhe={metrica.detalhe}
              />
            ))}
          </div>
        </div>
      </section>

      {/* RECOMPENSA */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col items-start gap-6 rounded-card bg-navy p-8 sm:p-12">
            <CircleBadge variant="solid" size="md">
              <Zap size={20} aria-hidden />
            </CircleBadge>

            <h2 className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
              Lidere o ciclo. Zere a conta.
            </h2>

            <p className="max-w-xl font-sans text-base leading-relaxed text-white/75">
              Quem termina o mês no topo do ranking tem a conta de energia elétrica subsidiada pela SoulUp
              — 100% da fatura comprovada, limitada a R$ {TETO_BENEFICIO}. Não é sorteio nem cupom: é
              consequência direta de ações verificadas.
            </p>

            <Button to="/solucao" size="lg">
              Abrir o dashboard
              <ArrowRight size={18} aria-hidden />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
