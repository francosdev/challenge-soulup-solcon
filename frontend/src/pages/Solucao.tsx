import { useState } from 'react'
import { Award, Flame, Leaf, Recycle, Trophy } from 'lucide-react'
import { ActionChip } from '../components/ui/ActionChip'
import { CircleBadge } from '../components/ui/CircleBadge'
import { IconeAcao } from '../components/ui/IconeAcao'
import { ProgressBar } from '../components/ui/ProgressBar'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Solzinho } from '../components/mascot/Solzinho'
import { ACOES, type CategoriaAcao } from '../data/acoes'
import { CONQUISTAS, HISTORICO, RANKING, RESUMO } from '../data/dashboard'

export function Solucao() {
  const [categoria, setCategoria] = useState<CategoriaAcao | null>(null)

  const acaoSelecionada = ACOES.find((acao) => acao.id === categoria) ?? null
  const restante = Math.max(0, RESUMO.meta - RESUMO.pontos)

  return (
    <div className="bg-ink">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        {/* CABEÇALHO */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <SectionHeading
            tag="Solução"
            titulo="Acompanhe. Registre. Avance."
            descricao={`Ciclo de agosto · ${RESUMO.totalParticipantes.toLocaleString('pt-BR')} participantes ativos.`}
            tone="dark"
          />
          <Solzinho size={104} animated className="shrink-0" />
        </div>

        {/* SOUL POINTS + MÉTRICAS */}
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <section className="rounded-card border border-white/10 bg-navy-dark p-6 lg:col-span-2">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-sans text-sm text-white/60">Soul Points no ciclo</p>
                <p className="mt-1 font-display text-5xl font-semibold leading-none text-white">
                  {RESUMO.pontos}
                  <span className="ml-2 font-display text-xl font-medium text-soul-light">
                    / {RESUMO.meta}
                  </span>
                </p>
              </div>

              <span className="inline-flex items-center gap-2 rounded-pill border border-sun-line/40 bg-sun/10 px-3 py-1.5 font-sans text-xs font-medium text-sun">
                <Flame size={14} aria-hidden />
                {RESUMO.streakDias} dias seguidos
              </span>
            </div>

            <ProgressBar
              valor={RESUMO.pontos}
              max={RESUMO.meta}
              tone="dark"
              label={`${RESUMO.pontos} de ${RESUMO.meta} Soul Points`}
              className="mt-5"
            />

            <p className="mt-3 font-sans text-sm text-white/60">
              Faltam {restante} Pontos Soul para a conta de energia do próximo mês ser subsidiada.
            </p>
          </section>

          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-card border border-white/10 bg-navy-dark p-6">
              <CircleBadge variant="solid" size="sm">
                <Leaf size={14} aria-hidden />
              </CircleBadge>
              <p className="mt-4 font-display text-3xl font-semibold leading-none text-white">
                {RESUMO.co2Evitado.toLocaleString('pt-BR')} kg
              </p>
              <p className="mt-1 font-sans text-sm text-soul-light">de CO₂ evitado</p>
            </div>

            <div className="rounded-card border border-white/10 bg-navy-dark p-6">
              <CircleBadge variant="solid" size="sm">
                <Trophy size={14} aria-hidden />
              </CircleBadge>
              <p className="mt-4 font-display text-3xl font-semibold leading-none text-white">
                {RESUMO.posicao}º
              </p>
              <p className="mt-1 font-sans text-sm text-soul-light">no ranking nacional</p>
            </div>
          </section>
        </div>

        {/* REGISTRO DE AÇÃO */}
        <section className="mt-10 rounded-card border border-white/10 bg-navy-dark p-6">
          <h2 className="font-display text-lg font-semibold text-white">Escolha a ação. Registre.</h2>
          <p className="mt-1 font-sans text-sm text-white/60">
            Selecione a categoria e capture a evidência direto no app.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {ACOES.map((acao) => (
              <ActionChip
                key={acao.id}
                nome={acao.nome}
                pontos={acao.pontos}
                unidade={acao.unidade}
                icone={<IconeAcao nome={acao.icone} size={16} />}
                ativo={categoria === acao.id}
                onClick={() => setCategoria(categoria === acao.id ? null : acao.id)}
              />
            ))}
          </div>

          <p className="mt-5 font-sans text-sm leading-relaxed text-white/70" aria-live="polite">
            {acaoSelecionada
              ? `${acaoSelecionada.nome}: ${acaoSelecionada.pontos.toLocaleString('pt-BR')} Soul Points por ${acaoSelecionada.unidade}. ${acaoSelecionada.descricao}`
              : 'Nenhuma categoria selecionada.'}
          </p>
        </section>

        {/* RANKING + HISTÓRICO */}
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <section className="rounded-card border border-white/10 bg-navy-dark p-6">
            <h2 className="font-display text-lg font-semibold text-white">Ranking do ciclo</h2>
            <ul className="mt-5 flex flex-col gap-2">
              {RANKING.map((linha) => (
                <li
                  key={linha.posicao}
                  className={`flex items-center gap-4 rounded-card border px-4 py-3 ${
                    linha.usuario ? 'border-soul bg-soul/10' : 'border-white/10 bg-ink/40'
                  }`}
                >
                  <CircleBadge variant={linha.usuario ? 'solid' : 'outline'} size="sm">
                    {linha.posicao}
                  </CircleBadge>
                  <span className="flex-1 font-sans text-sm text-white">{linha.nome}</span>
                  <span className="font-display text-sm font-semibold text-soul-light">
                    {linha.pontos} pts
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-card border border-white/10 bg-navy-dark p-6">
            <h2 className="font-display text-lg font-semibold text-white">Últimos registros</h2>
            <ul className="mt-5 flex flex-col gap-4">
              {HISTORICO.map((registro) => {
                const acao = ACOES.find((item) => item.id === registro.categoria)

                return (
                  <li key={registro.id} className="flex items-start gap-4">
                    <CircleBadge variant="outline" size="sm">
                      {acao ? <IconeAcao nome={acao.icone} size={14} /> : <Recycle size={14} aria-hidden />}
                    </CircleBadge>

                    <div className="min-w-0 flex-1">
                      <p className="font-sans text-sm text-white">{registro.descricao}</p>
                      <p className="font-sans text-xs text-white/50">
                        {registro.data} · {registro.quantidade.toLocaleString('pt-BR')}{' '}
                        {acao ? acao.unidade : ''}
                      </p>
                    </div>

                    <span className="font-display text-sm font-semibold text-soul">
                      +{registro.pontos}
                    </span>
                  </li>
                )
              })}
            </ul>
          </section>
        </div>

        {/* CONQUISTAS — território exclusivo de sun.* */}
        <section className="mt-10 rounded-card border border-white/10 bg-navy-dark p-6">
          <h2 className="font-display text-lg font-semibold text-white">Conquistas</h2>
          <p className="mt-1 font-sans text-sm text-white/60">
            Marcos permanentes do perfil. Não zeram no fim do ciclo.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONQUISTAS.map((conquista) => (
              <div
                key={conquista.id}
                className={`flex items-center gap-4 rounded-card border px-4 py-3 ${
                  conquista.desbloqueada ? 'border-sun-line/40 bg-sun/10' : 'border-white/10 bg-ink/40'
                }`}
              >
                <CircleBadge variant={conquista.desbloqueada ? 'sun' : 'outline'} size="md">
                  <Award size={18} aria-hidden />
                </CircleBadge>

                <div className="min-w-0">
                  <p
                    className={`font-sans text-sm font-medium ${
                      conquista.desbloqueada ? 'text-sun' : 'text-white/50'
                    }`}
                  >
                    {conquista.nome}
                  </p>
                  <p className="font-sans text-xs text-white/50">{conquista.criterio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
