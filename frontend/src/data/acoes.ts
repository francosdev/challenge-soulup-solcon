/** Categorias de ação sustentável reconhecidas pelo EcoScore. */
export type CategoriaAcao = 'plantio' | 'reciclagem' | 'energia' | 'agua'

export interface Acao {
  id: CategoriaAcao
  /** Nome curto exibido em chips e badges. */
  nome: string
  /** Soul Points creditados por unidade registrada. */
  pontos: number
  /** Unidade de medida da quantidade registrada. */
  unidade: string
  /** Ícone lucide-react correspondente. */
  icone: 'sprout' | 'recycle' | 'zap' | 'droplets'
  descricao: string
}

export const ACOES: readonly Acao[] = [
  {
    id: 'plantio',
    nome: 'Plantio',
    pontos: 5,
    unidade: 'muda',
    icone: 'sprout',
    descricao: 'Plante uma muda e registre a foto no app. Vale nova evidência 14 dias depois.',
  },
  {
    id: 'reciclagem',
    nome: 'Reciclagem',
    pontos: 3,
    unidade: 'kg',
    icone: 'recycle',
    descricao: 'Separe e destine resíduos recicláveis. Pesagem confirmada no ponto de coleta.',
  },
  {
    id: 'energia',
    nome: 'Energia',
    pontos: 2,
    unidade: 'ação',
    icone: 'zap',
    descricao: 'Troque lâmpadas, ajuste o chuveiro, desligue standby. Comprovado pela fatura.',
  },
  {
    id: 'agua',
    nome: 'Água',
    pontos: 0.1,
    unidade: 'litro',
    icone: 'droplets',
    descricao: 'Reúso, banho curto e captação de chuva. Cada litro economizado conta.',
  },
] as const

/** Meta de Soul Points de um ciclo mensal. */
export const META_CICLO = 100

/** Teto do benefício de energia subsidiada, em reais. */
export const TETO_BENEFICIO = 500
