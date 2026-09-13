import { Camera, Cpu, GraduationCap, Leaf, Users, Zap } from 'lucide-react'
import { Spores } from '../components/visual/Spores'
import { Button } from '../components/ui/Button'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Card } from '../components/ui/Card'
import { CircleBadge } from '../components/ui/CircleBadge'
import { NextStep } from '../components/ui/NextStep'
import { PILARES_HOME, STATS_HOME } from '../data/home'

export function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0">
          <Spores />
        </div>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:py-28">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center gap-2 font-sans text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap size={14} aria-hidden /> FIAP 2026
              </span>
              <span aria-hidden>×</span>
              <span className="inline-flex items-center gap-1.5">
                <Leaf size={14} aria-hidden /> SoulUp
              </span>
              <span aria-hidden>×</span>
              <span className="inline-flex items-center gap-1.5 text-soul">
                <Cpu size={14} aria-hidden /> SolCon
              </span>
            </div>

            <h1 className="font-display text-4xl font-semibold leading-[1.1] text-navy sm:text-5xl">
              Sustentabilidade que
              <br />
              <span className="text-soul">gera recompensas reais</span>
            </h1>

            <p className="max-w-xl font-sans text-base leading-relaxed text-ink-muted">
              O EcoScore transforma ações sustentáveis do dia a dia em progressão, selos e benefícios concretos
              — verificados por foto no app.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button to="/ecoscore" size="lg">
                Explorar a solução
              </Button>
              <Button to="/como-funciona" variant="secondary" size="lg">
                Como funciona →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-t border-line bg-surf">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STATS_HOME.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-semibold text-soul sm:text-4xl">{stat.valor}</p>
                <p className="mt-1 font-sans text-sm text-ink-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILARES */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            tag="Os pilares"
            titulo="Uma plataforma de 4 dimensões"
            descricao="O EcoScore transforma impacto ambiental em uma experiência viva: sentida, acompanhada e construída pela comunidade."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILARES_HOME.map((pilar) => (
              <article key={pilar.numero} className="rounded-card border border-line bg-white p-6">
                <CircleBadge variant="outline" size="sm">
                  {pilar.numero}
                </CircleBadge>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy">{pilar.titulo}</h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {pilar.itens.map((item) => (
                    <li key={item} className="font-sans text-sm leading-relaxed text-ink-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* Interface emocional */}
          <div className="relative mt-12 overflow-hidden rounded-card bg-navy p-8 sm:p-12">
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <Spores />
            </div>

            <div className="relative">
              <span className="inline-flex items-center rounded-pill border border-soul/40 bg-soul/10 px-3 py-1 font-sans text-xs font-medium text-soul-light">
                Interface emocional
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
                Mais que métricas.
              </h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-white/75">
                Cada ação move um ecossistema vivo.
              </p>
              <p className="mt-2 max-w-xl font-sans text-base leading-relaxed text-white/75">
                O dashboard transforma CO₂ evitado, água economizada e evolução sustentável em uma presença
                visual que responde à comunidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="border-t border-line bg-surf">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            tag="Por que o EcoScore?"
            titulo="Feito para durar, não para viralizar"
            descricao="Três decisões de projeto sustentam o sistema — e todas elas partem do mesmo princípio: recompensa só existe depois da ação."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CircleBadge variant="wash" size="md">
                <Camera size={20} aria-hidden />
              </CircleBadge>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">Evidência por foto no app</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                Foto capturada direto no app — sem upload externo. Elimina o vetor de fraude mais óbvio sem
                adicionar fricção para quem está sendo honesto.
              </p>
            </Card>

            <Card>
              <CircleBadge variant="wash" size="md">
                <Zap size={20} aria-hidden />
              </CircleBadge>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">Recompensas tangíveis</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                Quem lidera o ranking ao fim do mês tem a conta de energia elétrica subsidiada pela SoulUp —
                100% da fatura, limitada a R$ 500. Não é sorteio nem cupom: é consequência direta de ações
                verificadas.
              </p>
            </Card>

            <Card>
              <CircleBadge variant="wash" size="md">
                <Users size={20} aria-hidden />
              </CircleBadge>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">
                Sua voz cresce com sua trajetória
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                Ups de quem completou a trilha de Reciclagem valem mais do que os de quem criou a conta ontem.
                Não é algoritmo — é consequência direta de quem agiu.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="rounded-card border border-line bg-surf p-8 text-center sm:p-10">
            <span className="inline-flex items-center rounded-pill border border-soul-light bg-white px-3 py-1 font-sans text-xs font-medium text-soul-deep">
              Comece agora
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold text-navy sm:text-3xl">
              Pronto para fazer a diferença?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl font-sans text-base leading-relaxed text-ink-muted">
              Explore o sistema completo, entenda como funciona a validação e conheça a equipe por trás do
              EcoScore.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button to="/ecoscore">Ver o EcoScore</Button>
              <Button to="/sobre" variant="secondary">
                Sobre o projeto
              </Button>
            </div>
          </div>
        </div>
      </section>

      <NextStep
        titulo="Conheça o projeto por trás"
        descricao="Entenda o problema, a pesquisa e a filosofia que deram origem ao EcoScore."
        ctaLabel="Sobre o projeto →"
        ctaTo="/sobre"
      />
    </>
  )
}
