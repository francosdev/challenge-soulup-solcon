import { useEffect, useState } from 'react'
import { CardHabilidade } from '../../components/solucao/CardHabilidade'
import { PageHero } from '../../components/ui/PageHero'
import { Realce } from '../../components/ui/Realce'
import { buscarHabilidades } from '../../services/habilidades'
import type { Habilidade } from '../../types/habilidade'

export default function Solucao() {
  const [habilidades, setHabilidades] = useState<Habilidade[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function carregar() {
      try {
        setCarregando(true)
        setErro('')
        setHabilidades(await buscarHabilidades(controller.signal))
      } catch (erroDesconhecido) {
        if (erroDesconhecido instanceof DOMException && erroDesconhecido.name === 'AbortError') return
        setErro('Não foi possível carregar as habilidades.')
      } finally {
        if (!controller.signal.aborted) setCarregando(false)
      }
    }

    carregar()
    return () => controller.abort()
  }, [])

  return (
    <>
      <PageHero
        tag="Solução"
        titulo={
          <>
            Trilha de <Realce>habilidades</Realce>
          </>
        }
        texto="Aprenda. Valide. Pratique. Cada habilidade se abre ao concluir a jornada da anterior."
      />

      <section className="bg-white" aria-label="Habilidades da Trilha">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          {carregando && (
            <p role="status" className="py-16 text-center font-sans text-base text-ink-muted">
              Carregando habilidades...
            </p>
          )}

          {erro && (
            <p role="alert" className="rounded-card border border-red-600 bg-red-50 p-5 font-sans text-sm text-red-700">
              {erro}
            </p>
          )}

          {!carregando && !erro && habilidades.length === 0 && (
            <p className="py-16 text-center font-sans text-base text-ink-muted">Nenhuma habilidade cadastrada.</p>
          )}

          {!carregando && !erro && habilidades.length > 0 && (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {habilidades.map((habilidade) => (
                <li key={habilidade.id}>
                  <CardHabilidade habilidade={habilidade} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
