export interface PilarFilosofia {
  numero: string
  titulo: string
  texto: string
}

export const FILOSOFIA: readonly PilarFilosofia[] = [
  {
    numero: '01',
    titulo: 'Ação precede recompensa',
    texto:
      'Nenhum ponto é concedido por intenção. A foto precisa existir. A ação precisa ter acontecido. Isso não é burocracia — é integridade.',
  },
  {
    numero: '02',
    titulo: 'Progressão cria identidade',
    texto:
      'Quando alguém completa a trilha de Reciclagem, isso muda como ela se vê. Não é apenas um selo — é uma narrativa de si mesma que passou a existir.',
  },
  {
    numero: '03',
    titulo: 'Comunidade amplifica impacto',
    texto:
      'Uma ação sustentável feita em silêncio tem um certo peso. A mesma ação vista por pessoas que também agiram tem outro. O EcoScore torna esse peso visível.',
  },
  {
    numero: '04',
    titulo: 'O planeta como protagonista',
    texto:
      'O Planetinha não é mascote decorativo. É a representação emocional do estado coletivo do ecossistema — um feedback que você sente antes de ler qualquer número.',
  },
] as const
