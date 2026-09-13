import type { MissionDifficulty, SkillId } from './ecoscore'

/** Situação do conteúdo da habilidade no protótipo. */
export type SituacaoConteudo = 'completo' | 'em-producao'

/** As quatro etapas da jornada de toda habilidade. */
export type NomeEtapa = 'Aprender' | 'Validar' | 'Praticar' | 'Conquistar'

export interface EtapaHabilidade {
  nome: NomeEtapa
  detalhe: string
}

export interface ParceiroHabilidade {
  nome: string
  segmento: string
}

export interface MissaoHabilidade {
  titulo: string
  descricao: string
  objetivo: string
  duracaoDias: number
  dificuldade: MissionDifficulty
  co2eEstimadoKg: number
}

/** Contrato de cada item de public/data/habilidades.json. */
export interface Habilidade {
  id: number
  slug: SkillId
  ordem: number
  nome: string
  chamada: string
  pontosPorAcao: number
  recompensaMissao: number
  /** A última habilidade da trilha. */
  final: boolean
  conteudo: SituacaoConteudo
  objetivo: string | null
  parceiro: ParceiroHabilidade | null
  missao: MissaoHabilidade | null
  etapas: EtapaHabilidade[]
}
