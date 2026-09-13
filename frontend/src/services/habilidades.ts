import type { Habilidade } from '../types/habilidade'

/** Lê as quatro Habilidades de public/data/habilidades.json. */
export async function buscarHabilidades(signal?: AbortSignal): Promise<Habilidade[]> {
  const resposta = await fetch('/data/habilidades.json', { signal })

  if (!resposta.ok) {
    throw new Error(`Não foi possível carregar as habilidades (${resposta.status}).`)
  }

  return (await resposta.json()) as Habilidade[]
}

/** Localiza uma Habilidade pelo id numérico. Devolve undefined se o id não existir. */
export async function buscarHabilidadePorId(
  id: number,
  signal?: AbortSignal,
): Promise<Habilidade | undefined> {
  const habilidades = await buscarHabilidades(signal)
  return habilidades.find((habilidade) => habilidade.id === id)
}
