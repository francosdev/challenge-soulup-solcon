import { useState } from 'react'
import {
  Award,
  Camera,
  Droplets,
  HelpCircle,
  Leaf,
  Recycle,
  Sprout,
  ThumbsDown,
  ThumbsUp,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Card } from '../components/ui/Card'
import { CircleBadge } from '../components/ui/CircleBadge'
import { FeatureItem, FeatureList } from '../components/ui/FeatureList'
import { NextStep } from '../components/ui/NextStep'
import { PageHero, Realce } from '../components/ui/PageHero'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Button } from '../components/ui/Button'
import { Spores } from '../components/visual/Spores'
import { QUESTS, RANKING_ECOSCORE, SKILL_TREE } from '../data/ecoscore'

const ICONES_TRILHA: Record<'recycle' | 'sprout' | 'droplets', LucideIcon> = {
  recycle: Recycle,
  sprout: Sprout,
  droplets: Droplets,
}

/** Placar de votos do feed ilustrativo — funciona, mas não é persistido. */
function VotoGrupo({ up, down, ativo = false }: { up: number; down: number; ativo?: boolean }) {
  const [voto, setVoto] = useState<'up' | 'down' | null>(ativo ? 'up' : null)

  const base =
    'inline-flex items-center gap-1.5 rounded-pill border px-3 py-1.5 font-sans text-xs transition-colors'

  return (
    <div className="flex gap-2">
      <button
        type="button"
        aria-pressed={voto === 'up'}
        onClick={() => setVoto(voto === 'up' ? null : 'up')}
        className={`${base} ${voto === 'up' ? 'border-soul bg-soul text-white' : 'border-line text-ink-muted hover:border-soul'}`}
      >
        <ThumbsUp size={13} aria-hidden />
        {up + (voto === 'up' && !ativo ? 1 : 0)}
      </button>
      <button
        type="button"
        aria-pressed={voto === 'down'}
        onClick={() => setVoto(voto === 'down' ? null : 'down')}
        className={`${base} ${voto === 'down' ? 'border-navy bg-navy text-white' : 'border-line text-ink-muted hover:border-navy'}`}
      >
        <ThumbsDown size={13} aria-hidden />
        {down + (voto === 'down' ? 1 : 0)}
      </button>
    </div>
  )
}

export function EcoScore() {
  return (
    <>
      <PageHero
        tag="O sistema"
        titulo={
          <>
            Conheça o <Realce>EcoScore</Realce> em detalhe
          </>
        }
        texto="A Árvore de Habilidades Sustentáveis, os pilares de engajamento e o ranking com recompensas que mudam de vida."
      />

      {/* SKILL TREE */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            tag="Progressão"
            titulo="Árvore de Habilidades Sustentáveis"
            descricao="3 classes no MVP — escolhidas por acessibilidade urbana. Qualquer usuário em apartamento consegue percorrer as três. Cada classe tem 3 camadas de progressão."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="text-center">
              <CircleBadge variant="wash" size="md" className="mx-auto">
                <HelpCircle size={20} aria-hidden />
              </CircleBadge>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">1. Quiz</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                Baixo atrito. Ativa o loop de recompensa rápida e ensina o conceito antes de exigir qualquer
                ação real.
              </p>
            </Card>
            <Card className="text-center">
              <CircleBadge variant="wash" size="md" className="mx-auto">
                <Camera size={20} aria-hidden />
              </CircleBadge>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">2. Evidência</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                Foto capturada direto no app — sem upload externo. Elimina fraude sem adicionar fricção para
                quem está sendo honesto.
              </p>
            </Card>
            <Card className="text-center">
              <CircleBadge variant="sun" size="md" className="mx-auto">
                <Award size={20} aria-hidden />
              </CircleBadge>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">3. Selo</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                Concedido automaticamente ao completar a trilha. O peso do selo vem do caminho percorrido, não
                de votos externos.
              </p>
            </Card>
          </div>

          {/* Árvore */}
          <div className="mt-12 rounded-card border border-line bg-surf p-6 sm:p-8">
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-pill border border-soul bg-soul px-5 py-2.5 font-display text-sm font-semibold text-white">
                <Leaf size={16} aria-hidden /> EcoScore — MVP
              </span>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SKILL_TREE.map((ramo) => {
                const Icone = ICONES_TRILHA[ramo.icone]
                return (
                  <div key={ramo.id} className="rounded-card border border-line bg-white p-5">
                    <div className="flex items-center gap-3">
                      <CircleBadge variant="wash" size="md">
                        <Icone size={20} aria-hidden />
                      </CircleBadge>
                      <h3 className="font-display text-base font-semibold text-navy">{ramo.nome}</h3>
                    </div>
                    <ul className="mt-4 flex flex-col gap-2">
                      {ramo.nos.map((no) => (
                        <li
                          key={no.label}
                          title={no.detalhe}
                          className={`rounded-card border px-3 py-2 font-sans text-xs leading-relaxed ${
                            no.ativo
                              ? 'border-soul bg-soul-wash text-soul-deep'
                              : 'border-line bg-surf text-ink-muted'
                          }`}
                        >
                          {no.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="font-sans text-sm text-ink-muted">
                Destacado = desbloqueado. A progressão é por camadas de comprometimento — não de complexidade
                técnica.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Badge tone="verde">● Desbloqueado</Badge>
                <Badge tone="neutro">● Bloqueado</Badge>
              </div>
              <p className="mt-4 font-sans text-xs text-ink-muted">
                Diagrama ilustrativo da progressão do MVP — passe o cursor sobre uma camada para ver o que ela
                exige. A árvore interativa vive dentro do app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUESTS */}
      <section className="border-t border-line bg-surf">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            tag="Missões"
            titulo="Trilhas das 3 classes"
            descricao="Cada classe segue a mesma estrutura: Quiz → Evidência → Selo. A dificuldade cresce por camadas de comprometimento, não de complexidade técnica."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {QUESTS.map((quest) => {
              const Icone = ICONES_TRILHA[quest.icone]
              return (
                <Card key={quest.id}>
                  <div className="flex items-start justify-between gap-3">
                    <Badge tone={quest.status === 'Em progresso' ? 'verde' : 'laranja'}>{quest.status}</Badge>
                    <span className="font-sans text-xs text-ink-muted">{quest.camadas}</span>
                  </div>
                  <CircleBadge variant="wash" size="md" className="mt-4">
                    <Icone size={20} aria-hidden />
                  </CircleBadge>
                  <h3 className="mt-4 font-display text-lg font-semibold text-navy">{quest.titulo}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">{quest.texto}</p>
                  <ProgressBar
                    valor={quest.progresso}
                    max={100}
                    label={`${quest.titulo}: ${quest.progresso}%`}
                    className="mt-4"
                  />
                  <p className="mt-2 font-sans text-xs text-ink-muted">Camada atual: {quest.camadaAtual}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA DASHBOARD */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-pill border border-soul-light bg-soul-wash px-3 py-1 font-sans text-xs font-medium text-soul-deep">
              Novo
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold text-navy sm:text-3xl">
              Já dá pra <Realce>testar o Dashboard</Realce>
            </h2>
            <p className="mt-3 font-sans text-base leading-relaxed text-ink-muted">
              Um protótipo interativo do que o usuário vê depois de uma ação validada. Mascote vivo, métricas
              reais e feedback imediato.
            </p>
          </div>

          <div className="relative mt-8 grid items-center gap-6 overflow-hidden rounded-card border border-line bg-surf p-6 sm:p-8 lg:grid-cols-[1fr_auto]">
            <div className="pointer-events-none absolute inset-0">
              <Spores />
            </div>

            <div className="relative">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="verde">Protótipo navegável</Badge>
                <span className="font-sans text-xs uppercase tracking-wide text-ink-muted">
                  Mobile-first · MVP
                </span>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold text-navy">Dashboard de impacto</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                Acompanhe ao vivo o resultado das ações sustentáveis: CO₂ evitado, árvores equivalentes, água
                economizada e energia poupada. Tudo guiado pelo Planetinha, o mascote ecológico do EcoScore.
              </p>

              <div className="mt-5 flex flex-wrap gap-6 border-t border-line pt-4">
                {[
                  { valor: '47,3', unidade: 'kg', label: 'CO₂ evitado', destaque: false },
                  { valor: '3,2', unidade: '', label: 'Árvores eq.', destaque: false },
                  { valor: '184', unidade: 'L', label: 'Água', destaque: false },
                  { valor: '68', unidade: '/100', label: 'Soul Points', destaque: true },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p
                      className={`font-display text-2xl font-semibold ${stat.destaque ? 'text-soul' : 'text-navy'}`}
                    >
                      {stat.valor}
                      {stat.unidade ? (
                        <span className="ml-0.5 font-sans text-sm font-normal text-ink-muted">
                          {stat.unidade}
                        </span>
                      ) : null}
                    </p>
                    <p className="font-sans text-xs text-ink-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <Button to="/dashboard" size="lg">
                Abrir →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* RANKING */}
      <section className="border-t border-line bg-surf">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-pill border border-soul-light bg-white px-3 py-1 font-sans text-xs font-medium text-soul-deep">
              Competição
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold text-navy sm:text-3xl">
              Ranking de Soul Points
            </h2>
            <p className="mt-3 font-sans text-base leading-relaxed text-ink-muted">
              O ranking mensal acumula Soul Points ao longo do mês. No fechamento, o 1º colocado recebe a conta
              de energia elétrica subsidiada em 100%, limitada a R$ 500. Os pontos do ranking zeram no início do
              mês seguinte — um novo ciclo começa para todos.
            </p>
          </div>

          <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
            <ol className="flex flex-col gap-3">
              {RANKING_ECOSCORE.map((linha) => (
                <li
                  key={linha.posicao}
                  className={`flex items-center gap-4 rounded-card border p-4 ${
                    linha.posicao <= 3 ? 'border-soul-light bg-white' : 'border-line bg-white'
                  }`}
                >
                  <span className="w-7 shrink-0 text-center font-display text-lg">{linha.medalha}</span>
                  <CircleBadge variant={linha.posicao <= 3 ? 'solid' : 'outline'} size="md">
                    {linha.inicial}
                  </CircleBadge>
                  <div className="min-w-0 flex-1">
                    <p className="font-sans text-sm font-medium text-navy">{linha.nome}</p>
                    <p className="font-sans text-xs text-ink-muted">{linha.cidade}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-base font-semibold text-soul">
                      {linha.pontos}
                      <span className="font-sans text-xs font-normal text-ink-muted">/100</span>
                    </p>
                    <p className="font-sans text-xs text-ink-muted">Soul Points</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="flex flex-col gap-5">
              <div className="rounded-card border border-sun-line bg-sun-wash p-6">
                <CircleBadge variant="sun" size="md">
                  <Zap size={20} aria-hidden />
                </CircleBadge>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy">Recompensa do top 1</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                  Quem termina o mês na primeira posição recebe a conta de energia elétrica subsidiada em 100%,
                  limitada a R$ 500/mês — valor que cobre integralmente a fatura da maioria dos lares
                  brasileiros.
                </p>
                <p className="mt-3 font-sans text-xs leading-relaxed text-ink-muted">
                  A viabilidade está sendo validada com um modelo de patrocínio: empresas do setor de energia e
                  ESG cobrem o benefício em troca de visibilidade qualificada — usuários com comportamento
                  sustentável documentado são a audiência mais valiosa que elas podem alcançar. É um modelo em
                  teste, não uma promessa.
                </p>
                <p className="mt-4 inline-flex rounded-pill border border-sun-line bg-white px-3 py-1.5 font-sans text-xs text-sun-text">
                  Teto do benefício: R$ 500/mês · Conta residencial média no Brasil: R$ 280/mês
                </p>
              </div>

              <Card>
                <h3 className="font-display text-lg font-semibold text-navy">Como acumular Soul Points</h3>
                <FeatureList className="mt-4">
                  <FeatureItem>
                    <strong className="font-medium text-navy">Quizzes</strong> — pontos por camada de
                    aprendizado
                  </FeatureItem>
                  <FeatureItem>
                    <strong className="font-medium text-navy">Evidências</strong> — pontos por foto validada no
                    app
                  </FeatureItem>
                  <FeatureItem>
                    <strong className="font-medium text-navy">Selos</strong> — bônus ao completar a trilha
                    completa
                  </FeatureItem>
                  <FeatureItem>
                    <strong className="font-medium text-navy">Jardinagem cruzada</strong> — vaso de PET conta em
                    Reciclagem e Jardinagem simultaneamente
                  </FeatureItem>
                </FeatureList>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* REPUTAÇÃO SOCIAL */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="inline-flex items-center rounded-pill border border-soul-light bg-white px-3 py-1 font-sans text-xs font-medium text-soul-deep">
              Comunidade
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold text-navy sm:text-3xl">
              Reputação social e visibilidade
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-ink-muted">
              Cada post pode receber ups e downs da comunidade. Conteúdo relevante sobe, conteúdo fraco some.
              Sem moderação manual, sem algoritmo opaco — a própria base de usuários decide o que merece
              atenção.
            </p>
            <p className="mt-3 font-sans text-base leading-relaxed text-ink-muted">
              O diferencial está no{' '}
              <strong className="font-medium text-soul">peso da reputação acumulada</strong>: um up de quem
              completou a trilha de Reciclagem vale mais do que um up de quem criou a conta ontem. Isso cria um
              incentivo concreto para investir na própria trajetória — não só pelos selos, mas porque a voz
              dentro da comunidade cresce junto. Isso também é uma forma de aumentar o engajamento da
              plataforma e resolver um dos problemas encontrados.
            </p>
            <FeatureList className="mt-6">
              <FeatureItem>Posts com evidências reais ganham mais visibilidade naturalmente</FeatureItem>
              <FeatureItem>Peso do voto proporcional aos selos e histórico do usuário</FeatureItem>
              <FeatureItem>O feed se auto-organiza em torno de quem está realmente agindo</FeatureItem>
            </FeatureList>
          </div>

          <div className="flex flex-col gap-4">
            <Card>
              <div className="flex items-center gap-3">
                <CircleBadge variant="solid" size="md">
                  M
                </CircleBadge>
                <div>
                  <p className="font-sans text-sm font-medium text-navy">Marina Costa</p>
                  <p className="font-sans text-xs text-ink-muted">
                    Recicladora Certificada · Cultivadora Urbana
                  </p>
                </div>
              </div>
              <p className="mt-4 font-sans text-sm leading-relaxed text-ink-muted">
                Fiz um vaso com garrafa PET — contou nas duas trilhas ao mesmo tempo.
              </p>
              <div className="mt-4">
                <VotoGrupo up={142} down={3} ativo />
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <CircleBadge variant="outline" size="md">
                  ?
                </CircleBadge>
                <div>
                  <p className="font-sans text-sm font-medium text-navy">Usuário novo</p>
                  <p className="font-sans text-xs text-ink-muted">Sem selos · Sem histórico</p>
                </div>
              </div>
              <p className="mt-4 font-sans text-sm leading-relaxed text-ink-muted">
                Sustentabilidade é importante! #verde #planeta
              </p>
              <div className="mt-4">
                <VotoGrupo up={4} down={1} />
              </div>
            </Card>

            <p className="text-center font-sans text-xs leading-relaxed text-ink-muted">
              Feed ilustrativo — os votos funcionam aqui, mas não são persistidos. O sistema não precisa dizer
              que evidências valem mais: o comportamento emerge da mecânica.
            </p>
          </div>
        </div>
      </section>

      <NextStep
        titulo="Veja como o sistema funciona"
        descricao="Acompanhe o fluxo completo: da ação real até a verificação dos metadados da evidência e a recompensa final."
        ctaLabel="Como funciona →"
        ctaTo="/como-funciona"
      />
    </>
  )
}
