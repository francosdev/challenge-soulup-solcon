export interface NoTrilha {
  label: string
  detalhe: string
  ativo: boolean
}

export interface RamoTrilha {
  id: string
  nome: string
  icone: 'recycle' | 'sprout' | 'droplets'
  nos: readonly NoTrilha[]
}

export const SKILL_TREE: readonly RamoTrilha[] = [
  {
    id: 'reciclagem',
    nome: 'Reciclagem',
    icone: 'recycle',
    nos: [
      {
        label: 'Quiz: separação básica',
        detalhe: 'Perguntas sobre separação de recicláveis. Baixo atrito, sem exigir ação no mundo físico.',
        ativo: true,
      },
      {
        label: 'Evidência: foto no descarte',
        detalhe: 'Foto capturada no app no ponto de coleta, com GPS e timestamp automáticos.',
        ativo: true,
      },
      {
        label: 'Selo: Reciclador Certificado',
        detalhe: 'Concedido automaticamente ao concluir as camadas anteriores da trilha.',
        ativo: false,
      },
    ],
  },
  {
    id: 'jardinagem',
    nome: 'Jardinagem',
    icone: 'sprout',
    nos: [
      {
        label: 'Quiz: fundamentos de cultivo',
        detalhe: 'Perguntas sobre cultivo em recipiente — garrafa PET, copo, lata.',
        ativo: true,
      },
      {
        label: 'Evidência: plantio em recipiente',
        detalhe: 'Foto no momento do plantio, capturada direto no app.',
        ativo: true,
      },
      {
        label: 'Foto 14 dias após plantio',
        detalhe: 'Segunda foto do mesmo plantio 14 dias depois — o único prazo obrigatório do sistema.',
        ativo: false,
      },
      {
        label: 'Selo: Cultivador Urbano',
        detalhe: 'Concedido automaticamente ao concluir as camadas anteriores da trilha.',
        ativo: false,
      },
    ],
  },
  {
    id: 'agua',
    nome: 'Água',
    icone: 'droplets',
    nos: [
      {
        label: 'Quiz: consumo consciente',
        detalhe: 'Perguntas sobre consumo consciente de água no dia a dia.',
        ativo: true,
      },
      {
        label: 'Evidência: adaptações no lar',
        detalhe: 'Foto de adaptação instalada: redutor de fluxo, captador de chuva, reúso documentado.',
        ativo: false,
      },
      {
        label: 'Selo: Guardião das Águas',
        detalhe: 'Concedido automaticamente ao concluir as camadas anteriores da trilha.',
        ativo: false,
      },
    ],
  },
] as const

export interface Quest {
  id: string
  titulo: string
  status: 'Em progresso' | 'Não iniciada'
  camadas: string
  texto: string
  progresso: number
  camadaAtual: string
  icone: 'recycle' | 'sprout' | 'droplets'
}

export const QUESTS: readonly Quest[] = [
  {
    id: 'reciclagem',
    titulo: 'Reciclagem',
    status: 'Em progresso',
    camadas: '2/3 camadas',
    texto: 'Quiz de separação básica concluído. Próximo passo: foto no ponto de descarte, capturada direto no app.',
    progresso: 66,
    camadaAtual: 'Evidência',
    icone: 'recycle',
  },
  {
    id: 'jardinagem',
    titulo: 'Jardinagem',
    status: 'Em progresso',
    camadas: '1/3 camadas',
    texto:
      'Qualquer recipiente conta: garrafa PET, copo, lata. A evidência intermediária 2 exige uma foto 14 dias após o plantio — o único ponto com tempo real obrigatório.',
    progresso: 33,
    camadaAtual: 'Evidência',
    icone: 'sprout',
  },
  {
    id: 'agua',
    titulo: 'Água',
    status: 'Não iniciada',
    camadas: '0/3 camadas',
    texto:
      'Quiz de consumo consciente disponível. Evidência: adaptações no lar fotografadas no app. Sem necessidade de fatura ou comprovante externo.',
    progresso: 0,
    camadaAtual: 'Quiz',
    icone: 'droplets',
  },
] as const

export interface LinhaRanking {
  posicao: number
  medalha: string
  inicial: string
  nome: string
  cidade: string
  pontos: string
}

export const RANKING_ECOSCORE: readonly LinhaRanking[] = [
  { posicao: 1, medalha: '🥇', inicial: 'C', nome: 'Carlos Franco', cidade: 'São Paulo, SP', pontos: '14.820' },
  { posicao: 2, medalha: '🥈', inicial: 'M', nome: 'Murilo Almeida', cidade: 'São Paulo, SP', pontos: '13.410' },
  { posicao: 3, medalha: '🥉', inicial: 'H', nome: 'Henrique Bonachela', cidade: 'São Paulo, SP', pontos: '11.990' },
  { posicao: 4, medalha: '4', inicial: 'M', nome: 'Marina Costa', cidade: 'São Paulo, SP', pontos: '9.780' },
  { posicao: 5, medalha: '5', inicial: 'J', nome: 'Julia Mendes', cidade: 'Belo Horizonte, MG', pontos: '8.530' },
] as const

export interface ItemAvatar {
  titulo: string
  texto: string
  icone: 'shirt' | 'unlock' | 'medal' | 'user-check'
}

export const AVATAR_ITENS: readonly ItemAvatar[] = [
  { titulo: 'Itens base', texto: 'Gratuitos desde o início — sem custo de pontos', icone: 'shirt' },
  { titulo: 'Itens de missão', texto: 'Desbloqueados ao completar trilhas — não estão à venda', icone: 'unlock' },
  { titulo: 'Selos no perfil', texto: 'Status conquistado visível para toda a comunidade', icone: 'medal' },
  { titulo: 'Identidade real', texto: 'O perfil conta sua história — não seu saldo de pontos', icone: 'user-check' },
] as const
