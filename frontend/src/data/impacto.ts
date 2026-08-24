export interface Metrica {
  id: string
  valor: string
  label: string
  detalhe: string
}

/** Números agregados da comunidade, exibidos na Home. */
export const IMPACTO: readonly Metrica[] = [
  { id: 'acoes', valor: '18,4 mil', label: 'ações validadas', detalhe: 'Evidência por foto no app, com GPS e timestamp' },
  { id: 'co2', valor: '62 t', label: 'de CO₂ evitado', detalhe: 'Fator médio de emissão da matriz brasileira' },
  { id: 'agua', valor: '1,2 mi L', label: 'de água economizada', detalhe: 'Reúso, captação de chuva e banho curto' },
  { id: 'contas', valor: '37', label: 'contas de energia pagas', detalhe: 'Limite de R$ 500 por ciclo mensal' },
] as const

export interface Pilar {
  id: string
  numero: string
  titulo: string
  texto: string
}

export const PILARES: readonly Pilar[] = [
  {
    id: 'dashboard',
    numero: '01',
    titulo: 'Dashboard vivo',
    texto: 'Um ecossistema visual que reage às ações da comunidade e devolve feedback imediato de impacto.',
  },
  {
    id: 'pertencimento',
    numero: '02',
    titulo: 'Pertencimento',
    texto: 'Avatar com itens gratuitos desde o início. O que é especial se desbloqueia por missão, nunca por compra.',
  },
  {
    id: 'progressao',
    numero: '03',
    titulo: 'Progressão',
    texto: 'Quatro categorias no MVP, em trilhas de dificuldade crescente: quiz, evidência e selo automático.',
  },
  {
    id: 'recompensa',
    numero: '04',
    titulo: 'Recompensa',
    texto: 'Cem Soul Points no ciclo e a conta de energia do mês seguinte é subsidiada, limitada a R$ 500.',
  },
] as const
