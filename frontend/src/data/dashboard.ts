import type { CategoriaAcao } from './acoes'

export interface Conquista {
  id: string
  nome: string
  criterio: string
  desbloqueada: boolean
}

export interface PosicaoRanking {
  posicao: number
  nome: string
  pontos: number
  /** Marca a linha do usuário logado no protótipo. */
  usuario: boolean
}

export interface RegistroAcao {
  id: string
  categoria: CategoriaAcao
  descricao: string
  quantidade: number
  pontos: number
  data: string
}

export interface ResumoUsuario {
  nome: string
  pontos: number
  meta: number
  co2Evitado: number
  aguaEconomizada: number
  residuosReciclados: number
  posicao: number
  totalParticipantes: number
  streakDias: number
}

export const RESUMO: ResumoUsuario = {
  nome: 'Carlos',
  pontos: 68,
  meta: 100,
  co2Evitado: 42.7,
  aguaEconomizada: 1840,
  residuosReciclados: 12.5,
  posicao: 4,
  totalParticipantes: 1287,
  streakDias: 9,
}

export const CONQUISTAS: readonly Conquista[] = [
  { id: 'primeiro-broto', nome: 'Primeiro broto', criterio: 'Registre a primeira ação', desbloqueada: true },
  { id: 'reciclador', nome: 'Reciclador ativo', criterio: 'Recicle 10 kg de resíduos', desbloqueada: true },
  { id: 'agua-consciente', nome: 'Água consciente', criterio: 'Economize 100 L de água', desbloqueada: true },
  { id: 'energia-inteligente', nome: 'Energia inteligente', criterio: '5 ações de redução de energia', desbloqueada: true },
  { id: 'mao-verde', nome: 'Mão verde', criterio: '5 ações de plantio', desbloqueada: false },
  { id: 'campeao', nome: 'Campeão EcoScore', criterio: 'Atinja 100 Soul Points', desbloqueada: false },
] as const

export const RANKING: readonly PosicaoRanking[] = [
  { posicao: 1, nome: 'Beatriz M.', pontos: 94, usuario: false },
  { posicao: 2, nome: 'Rafael T.', pontos: 81, usuario: false },
  { posicao: 3, nome: 'Juliana P.', pontos: 73, usuario: false },
  { posicao: 4, nome: 'Você', pontos: 68, usuario: true },
  { posicao: 5, nome: 'Diego A.', pontos: 61, usuario: false },
] as const

export const HISTORICO: readonly RegistroAcao[] = [
  {
    id: 'reg-1',
    categoria: 'plantio',
    descricao: 'Muda de ipê no canteiro da rua',
    quantidade: 1,
    pontos: 5,
    data: '22/08/2026',
  },
  {
    id: 'reg-2',
    categoria: 'reciclagem',
    descricao: 'Entrega de recicláveis no ecoponto',
    quantidade: 4,
    pontos: 12,
    data: '20/08/2026',
  },
  {
    id: 'reg-3',
    categoria: 'energia',
    descricao: 'Troca de 6 lâmpadas por LED',
    quantidade: 1,
    pontos: 2,
    data: '18/08/2026',
  },
  {
    id: 'reg-4',
    categoria: 'agua',
    descricao: 'Reúso da água da máquina de lavar',
    quantidade: 120,
    pontos: 12,
    data: '15/08/2026',
  },
] as const
