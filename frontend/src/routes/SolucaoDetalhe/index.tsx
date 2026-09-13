import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { PageHero } from '../../components/ui/PageHero'
import { buscarHabilidadePorId } from '../../services/habilidades'
import type { Habilidade } from '../../types/habilidade'

export default function SolucaoDetalhe() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [habilidade, setHabilidade] = useState<Habilidade | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function carregar() {
      try {
        setCarregando(true)
        setErro('')
        setHabilidade(null)
        // O parâmetro da URL chega como texto; o id do JSON é número.
        const encontrada = await buscarHabilidadePorId(Number(id), controller.signal)

        if (!encontrada) {
          setErro('Habilidade não encontrada.')
          return
        }
        setHabilidade(encontrada)
      } catch (erroDesconhecido) {
        if (erroDesconhecido instanceof DOMException && erroDesconhecido.name === 'AbortError') return
        setErro('Não foi possível carregar a habilidade.')
      } finally {
        if (!controller.signal.aborted) setCarregando(false)
      }
    }

    carregar()
    return () => controller.abort()
  }, [id])

  if (carregando) {
    return (
      <section className="bg-white">
        <p role="status" className="mx-auto max-w-6xl px-4 py-24 text-center font-sans text-base text-ink-muted sm:px-6">
          Carregando habilidade...
        </p>
      </section>
    )
  }

  if (erro || !habilidade) {
    return (
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
          <h1 className="font-display text-3xl font-semibold text-navy sm:text-4xl">Habilidade não encontrada</h1>
          <p role="alert" className="mt-4 font-sans text-base text-ink-muted">
            {erro}
          </p>
          <Button type="button" size="lg" className="mt-8" onClick={() => navigate('/solucao')}>
            ← Voltar para Solução
          </Button>
        </div>
      </section>
    )
  }

  const { missao } = habilidade

  return (
    <>
      <PageHero tag={`Habilidade 0${habilidade.ordem}`} titulo={habilidade.nome} texto={habilidade.chamada} />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:py-20">
          <div>
            <h2 className="font-display text-2xl font-semibold text-navy">
              Quatro etapas. Conclua todas para desbloquear a habilidade.
            </h2>

            {habilidade.objetivo ? (
              <p className="mt-3 font-sans text-base leading-relaxed text-ink-muted">{habilidade.objetivo}</p>
            ) : null}

            <ol className="mt-6 flex flex-col gap-3">
              {habilidade.etapas.map((etapa, indice) => (
                <li key={etapa.nome} className="flex items-center gap-4 rounded-card border border-line bg-white px-5 py-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-pill border border-soul-light bg-soul-wash font-display text-sm font-semibold text-soul-deep">
                    {indice + 1}
                  </span>
                  <div>
                    <p className="font-display text-base font-medium text-navy">{etapa.nome}</p>
                    <p className="font-sans text-sm text-ink-muted">{etapa.detalhe}</p>
                  </div>
                </li>
              ))}
            </ol>

            {habilidade.conteudo === 'em-producao' ? (
              <p className="mt-6 rounded-card border border-line bg-surf px-5 py-4 font-sans text-sm leading-relaxed text-navy">
                Conteúdo desta habilidade em produção. A jornada segue o mesmo formato de quatro etapas.
              </p>
            ) : null}
          </div>

          <aside className="flex flex-col gap-5">
            <Card tone="wash">
              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                <div>
                  <dt className="font-sans text-[11px] font-medium uppercase tracking-[0.06em] text-ink-muted">Por ação</dt>
                  <dd className="mt-0.5 font-display text-base font-semibold text-navy">{habilidade.pontosPorAcao} SP</dd>
                </div>
                <div>
                  <dt className="font-sans text-[11px] font-medium uppercase tracking-[0.06em] text-ink-muted">Recompensa</dt>
                  <dd className="mt-0.5 font-display text-base font-semibold text-navy">+{habilidade.recompensaMissao} SP</dd>
                </div>
                {missao ? (
                  <div>
                    <dt className="font-sans text-[11px] font-medium uppercase tracking-[0.06em] text-ink-muted">Duração</dt>
                    <dd className="mt-0.5 font-display text-base font-semibold text-navy">{missao.duracaoDias} dias</dd>
                  </div>
                ) : null}
              </dl>
              {habilidade.parceiro ? (
                <p className="mt-4 font-sans text-xs text-ink-muted">
                  Em parceria com {habilidade.parceiro.nome} · {habilidade.parceiro.segmento}
                </p>
              ) : null}
            </Card>

            {missao ? (
              <Card>
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.06em] text-soul-deep">
                  Missão · {missao.dificuldade}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-navy">{missao.titulo}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">{missao.descricao}</p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">{missao.objetivo}</p>
                <p className="mt-3 font-sans text-xs text-ink-muted">
                  {missao.co2eEstimadoKg.toLocaleString('pt-BR')} kg CO₂e evitados · estimativa
                </p>
              </Card>
            ) : null}
          </aside>
        </div>

        <div className="mx-auto flex max-w-6xl flex-wrap gap-3 px-4 pb-16 sm:px-6 lg:pb-20">
          <Button type="button" variant="secondary" onClick={() => navigate('/solucao')}>
            ← Todas as habilidades
          </Button>
          {!habilidade.final ? (
            <Button type="button" onClick={() => navigate(`/solucao/${habilidade.id + 1}`)}>
              Próxima habilidade →
            </Button>
          ) : null}
          {habilidade.conteudo === 'completo' ? (
            <Button to="/trilha" variant="ghost">
              Abrir a Trilha
            </Button>
          ) : null}
        </div>
      </section>
    </>
  )
}
