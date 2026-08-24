export interface StatHome {
  valor: string
  label: string
}

export const STATS_HOME: readonly StatHome[] = [
  { valor: '3', label: 'Classes no MVP' },
  { valor: '4', label: 'Pilares do sistema' },
  { valor: '0–100', label: 'Score de impacto por ação' },
  { valor: 'R$ 500', label: 'Benefício mensal máximo' },
] as const

export interface PilarHome {
  numero: string
  titulo: string
  itens: readonly string[]
}

export const PILARES_HOME: readonly PilarHome[] = [
  {
    numero: '01',
    titulo: 'Dashboard vivo',
    itens: [
      'Planeta vivo que reage às ações da comunidade',
      'Feedback emocional em tempo real sobre impacto ambiental',
      'Ecossistema visual que evolui junto com os usuários',
    ],
  },
  {
    numero: '02',
    titulo: 'Pertencimento',
    itens: [
      'Avatar com itens base gratuitos desde o início',
      'Itens especiais desbloqueados por missão, não comprados',
      'Feed social com up/down ponderado por reputação',
    ],
  },
  {
    numero: '03',
    titulo: 'Progressão',
    itens: [
      '3 classes no MVP: Reciclagem, Jardinagem e Água',
      'Quiz → Evidência (foto no app) → Selo automático',
      'Trilhas com dificuldade crescente por comprometimento',
    ],
  },
  {
    numero: '04',
    titulo: 'Recompensa',
    itens: [
      'Pontos que usam o sistema SoulUp já existente',
      'Selos no perfil como status conquistado',
      'Maior pontuação do mês vence o ranking',
      'Vencedor recebe a conta de energia subsidiada em 100% pela SoulUp, limitada a R$ 500/mês',
    ],
  },
] as const
