import { Lightbulb, Sprout, TrendingDown, TrendingUp } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { CircleBadge } from '../components/ui/CircleBadge'
import { FeatureItem, FeatureList } from '../components/ui/FeatureList'
import { MetricRow } from '../components/ui/MetricRow'
import { NextStep } from '../components/ui/NextStep'
import { PageHero, Realce } from '../components/ui/PageHero'
import { PullQuote } from '../components/ui/PullQuote'
import { FILOSOFIA } from '../data/sobre'

export function Sobre() {
  return (
    <>
      <PageHero
        tag="Sobre o projeto"
        titulo={
          <>
            O problema que o <Realce>EcoScore resolve</Realce>
          </>
        }
        texto="Entenda o contexto da SoulUp, o desafio do engajamento sustentável e como o EcoScore foi concebido como solução."
      />

      {/* O PROBLEMA */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="inline-flex items-center rounded-pill border border-soul-light bg-soul-wash px-3 py-1 font-sans text-xs font-medium text-soul-deep">
              O problema
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold text-navy sm:text-3xl">
              Engajamento esporádico não gera mudança real
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-ink-muted">
              A SoulUp já conecta usuários a benefícios reais e impacto ambiental positivo. Mas como
              transformar uma interação pontual em um hábito sustentável duradouro?
            </p>
            <p className="mt-3 font-sans text-base leading-relaxed text-ink-muted">
              Hábitos ecológicos raramente sobrevivem aos primeiros meses sem reforço positivo contínuo. A
              motivação intrínseca existe, mas precisa de estrutura.
            </p>
            <FeatureList className="mt-6">
              <FeatureItem>Falta de feedback imediato por ações sustentáveis</FeatureItem>
              <FeatureItem>Ausência de comunidade e senso de pertencimento</FeatureItem>
              <FeatureItem>Recompensas abstratas ou distantes demais</FeatureItem>
              <FeatureItem>Sem progressão visível nem metas claras</FeatureItem>
            </FeatureList>
          </div>

          <div className="rounded-card border border-red-200 bg-red-50 p-6 sm:p-8">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-pill border border-red-200 bg-white text-red-600">
              <TrendingDown size={22} aria-hidden />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-navy">Cenário atual</h3>
            <p className="mt-1 font-sans text-xs text-ink-muted">Fonte: GA4 SoulUp, jan–abr 2026</p>

            <div className="mt-6 flex flex-col gap-4">
              <MetricRow label="Queda anual em usuários ativos" valor="−77%" pct={77} tone="alerta" />
              <MetricRow label="Sessões por usuário/mês (média)" valor="0,4" pct={8} tone="alerta" />
              <MetricRow label="Novos usuários sobre total ativo" valor="30%" pct={30} tone="alerta" />
            </div>

            <p className="mt-5 font-sans text-xs leading-relaxed text-ink-muted">
              9.599 usuários ativos · 15.572 sessões · tempo médio 11min06s por sessão. Base retorna, mas sem
              frequência estruturada.
            </p>
          </div>
        </div>
      </section>

      {/* A ESCUTA */}
      <section className="border-t border-line bg-surf">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          <span className="inline-flex items-center rounded-pill border border-soul-light bg-white px-3 py-1 font-sans text-xs font-medium text-soul-deep">
            A escuta
          </span>
          <h2 className="mt-4 font-display text-2xl font-semibold text-navy sm:text-3xl">
            O que 7 conversas reais ensinaram
          </h2>

          <div className="mt-6 flex flex-col gap-6">
            <p className="font-sans text-base leading-relaxed text-ink-muted">
              Antes de escrever uma linha de código, conversamos com 7 pessoas — moradores de apartamento,
              jovens adultos de São Paulo — sobre o que as faz agir ou paralisar quando o assunto é
              sustentabilidade. Nenhuma entrevista foi formal: foram conversas sobre rotina, hábito e
              frustração.
            </p>

            <PullQuote
              quote="Eu quero reciclar, mas não sei onde é o ponto de coleta. Aí fica para amanhã, e amanhã nunca chega."
              cite="Mulher, 28 anos · Apartamento · São Paulo, SP"
            />

            <p className="font-sans text-base leading-relaxed text-ink-muted">
              O padrão era sempre <strong className="font-medium text-navy">fricção de contexto</strong> — não
              falta de vontade. A intenção existe. O que falta é um ponto de entrada pequeno o suficiente para
              começar agora, com o que já tem em casa. Ninguém pediu por complexidade. Pediram por clareza.
            </p>

            <p className="font-sans text-base leading-relaxed text-ink-muted">
              Sobre o retorno: duas coisas apareceram sempre — ver que progrediu em algo concreto, e saber que
              alguém viu. Não necessariamente elogio. Só visibilidade. A recompensa financeira foi mencionada
              como "seria ótimo" — nunca como razão principal. Status na comunidade importou mais do que
              benefício individual.
            </p>

            <p className="border-t border-line pt-5 font-sans text-sm font-medium italic leading-relaxed text-soul-deep">
              Essas conversas moldaram as 3 classes do MVP: escolhidas por acessibilidade urbana, não por
              complexidade técnica.
            </p>
          </div>
        </div>
      </section>

      {/* A FILOSOFIA */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="inline-flex items-center rounded-pill border border-soul-light bg-soul-wash px-3 py-1 font-sans text-xs font-medium text-soul-deep">
              A filosofia
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold text-navy sm:text-3xl">
              Gamificação não é infantilização.
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-ink-muted">
              É arquitetura de comportamento. A diferença entre um sistema que engaja e um que manipula está em
              se as recompensas refletem ações reais — ou apenas a ilusão delas.
            </p>
            <p className="mt-3 font-sans text-base leading-relaxed text-ink-muted">
              O EcoScore foi construído para que cada ponto, cada selo e cada posição no ranking seja
              consequência direta do que o usuário fez no mundo físico — verificado, não declarado. Não é um
              jogo, é uma construção de hábitos reais e saudáveis.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {FILOSOFIA.map((pilar) => (
              <article key={pilar.numero} className="flex gap-4 rounded-card border border-line bg-white p-5">
                <CircleBadge variant="wash" size="sm">
                  {pilar.numero}
                </CircleBadge>
                <div>
                  <h3 className="font-display text-base font-semibold text-navy">{pilar.titulo}</h3>
                  <p className="mt-1.5 font-sans text-sm leading-relaxed text-ink-muted">{pilar.texto}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* A SOLUÇÃO */}
      <section className="border-t border-line bg-surf">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div className="rounded-card border border-line bg-white p-6 sm:p-8">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-pill border border-soul-light bg-soul-wash text-soul-deep">
              <TrendingUp size={22} aria-hidden />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-navy">Hipótese de design</h3>
            <p className="mt-1 font-sans text-xs text-ink-muted">
              Baseada em benchmarks de apps de gamificação com mecânicas similares
            </p>

            <div className="mt-6 flex flex-col gap-5">
              <MetricRow
                label="Sessões/usuário por mês (objetivo)"
                valor="4+"
                pct={75}
                nota="Duolingo reporta média de 4,3 sessões/semana para usuários com streak ativo"
              />
              <MetricRow
                label="Retenção em 30 dias (faixa estimada)"
                valor="35–50%"
                pct={42}
                nota="Apps gamificados de hábito (Habitica, Nike Run Club) reportam 2–3× a retenção de apps não-gamificados equivalentes"
              />
            </div>

            <p className="mt-5 border-t border-line pt-4 font-sans text-xs leading-relaxed text-ink-muted">
              Projeções baseadas em benchmarks de sistemas de gamificação com mecânicas similares. Dados base:
              GA4 SoulUp, jan–abr 2026.
            </p>
          </div>

          <div>
            <span className="inline-flex items-center rounded-pill border border-soul-light bg-white px-3 py-1 font-sans text-xs font-medium text-soul-deep">
              A solução
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold text-navy sm:text-3xl">
              EcoScore: gamificação com propósito real
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-ink-muted">
              O EcoScore é uma camada de amplificação sobre a plataforma SoulUp. Ele usa mecânicas de jogos
              comprovadas — progressão, recompensa, comunidade — direcionadas para hábitos sustentáveis
              verificáveis.
            </p>
            <p className="mt-3 font-sans text-base leading-relaxed text-ink-muted">
              O diferencial está na <strong className="font-medium text-soul">validação por metadados</strong>:
              a foto é capturada no app com GPS e timestamp automáticos. Isso elimina o principal vetor de
              fraude — reutilização de imagens antigas ou de outro contexto — sem adicionar fricção para quem
              está sendo honesto. Além disso, temos um sistema de engajamento por meio de votos e interação dos
              usuários.
            </p>

            <div className="mt-5 rounded-card border border-line bg-white p-5">
              <h3 className="font-display text-base font-semibold text-navy">Por que foto e não vídeo</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                O desafio original previa vídeo com reconhecimento de imagem. Optamos por foto capturada no app
                com metadados de GPS e timestamp por três razões: custo de armazenamento e transmissão
                significativamente menor, fricção reduzida para o usuário (especialmente em conexões móveis
                limitadas), e porque o vetor de fraude mais comum — reutilizar imagem antiga ou de outro
                contexto — é resolvido pelos metadados, não pelo formato do arquivo. O reconhecimento do
                conteúdo da imagem permanece no roadmap como camada 3.
              </p>
            </div>

            <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-wide text-ink-muted">
              Arquitetura de confiança em 3 camadas
            </p>
            <div className="mt-3 flex flex-col items-start gap-2">
              <Badge tone="verde">Camada 1 · MVP — captura no app + metadados de GPS e timestamp</Badge>
              <Badge tone="laranja">
                Camada 2 · Sprint 4 — modelo de ML sinaliza submissões anômalas para revisão
              </Badge>
              <Badge tone="roxo">Camada 3 · Roadmap — visão computacional do conteúdo da imagem</Badge>
            </div>

            <Button to="/como-funciona" className="mt-6">
              Ver como funciona →
            </Button>
          </div>
        </div>
      </section>

      {/* SOULUP */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            tag="A parceria"
            titulo="Quem é a SoulUp?"
            descricao="A plataforma que inspira o EcoScore e fornece a infraestrutura de recompensas reais."
          />

          <div className="mt-10 grid items-center gap-8 rounded-card border border-line bg-surf p-8 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-xl font-semibold text-navy">
                SoulUp <span className="font-sans text-base font-normal text-ink-muted">by Prospera</span>
              </h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-ink-muted">
                A SoulUp identificou que engajamento pontual não gera retenção duradoura. Os dados de 2026
                mostram queda de 77% em usuários ativos em relação ao ano anterior. O EcoScore nasce como
                resposta direta a esse desafio: criar uma razão estrutural para o usuário voltar — não por
                notificação, mas porque tem algo concreto a construir.
              </p>
              <p className="mt-3 font-sans text-base leading-relaxed text-ink-muted">
                A plataforma fornece a infraestrutura de pontos e benefícios. O EcoScore traz a camada de
                progressão, verificação e comunidade que transforma uma visita isolada em uma trajetória.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { icone: <Sprout size={20} aria-hidden />, titulo: 'Impacto ambiental', texto: 'Ações reais mensuradas e reportadas' },
                { icone: <span aria-hidden>🇧🇷</span>, titulo: 'Plataforma brasileira', texto: 'Desenvolvida para o contexto nacional' },
                { icone: <Lightbulb size={20} aria-hidden />, titulo: 'Benefícios reais', texto: 'Pontos que valem energia, créditos e mais' },
              ].map((item) => (
                <div key={item.titulo} className="flex items-center gap-4 rounded-card border border-line bg-white p-4">
                  <CircleBadge variant="wash" size="md">
                    {item.icone}
                  </CircleBadge>
                  <div>
                    <p className="font-sans text-sm font-medium text-navy">{item.titulo}</p>
                    <p className="font-sans text-xs text-ink-muted">{item.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <NextStep
        titulo="Agora veja como o sistema funciona"
        descricao="Conheça os pilares do EcoScore, a Árvore de Habilidades Sustentáveis e o sistema de ranking com recompensas reais."
        ctaLabel="Conhecer o EcoScore →"
        ctaTo="/ecoscore"
      />
    </>
  )
}
