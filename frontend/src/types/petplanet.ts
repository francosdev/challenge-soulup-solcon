/** Contratos do protótipo Pet Planet (página Dashboard). */

export type ActionId = 'recic' | 'agua' | 'energia' | 'verde' | 'trilha' | 'compost'
export type Mood = 'happy' | 'celebrating' | 'sleepy' | 'sad'
export type Screen = 'onboarding' | 'dashboard' | 'register' | 'success' | 'history' | 'profile'

/** Ícones disponíveis no selo circular do protótipo. */
export type StickerKind = 'leaf' | 'drop' | 'bolt' | 'tree' | 'trophy' | 'star'

export interface HistoryEntry {
  id: number
  type: ActionId
  qty: string
  points: number
  co2: number
  ts: number
}

export interface PetMetrics {
  trees: number
  water: number
  waste: number
  energy: number
}

export interface PetState {
  onboarded: boolean
  level: number
  xp: number
  xpToNext: number
  co2: number
  coins: number
  streak: number
  metrics: PetMetrics
  history: HistoryEntry[]
  redeemed: string[]
  lastActionAt: number
}

export interface SubmittedAction {
  type: ActionId
  qty: string
  points: number
  co2: number
}

/** Props comuns às telas que leem o estado e trocam de tela. */
export type ScreenProps = {
  pal: PetPalette
  state: PetState
  onNavigate: (s: Screen) => void
}

/** Paleta usada nos atributos dos desenhos em SVG (`fill`, `stroke`). */
export interface PetPalette {
  /** Fundo da página e da moldura do telefone. */
  bg: string
  /** Superfície de cartão. */
  paper: string
  /** Texto principal. */
  ink: string
  /** Texto secundário claro. */
  inkSoft: string
  /** Texto de apoio. */
  muted: string
  /** Contorno de 2px e texto sobre chips claros. */
  line: string
  lineSoft: string
  shadow: string
  /** Acento de marca. */
  eco: string
  /** Variante clara do acento, usada como texto brilhante. */
  ecoDeep: string
  /** Painel de destaque atrás do mascote. */
  ecoSoft: string
  sun: string
  sunDeep: string
  coin: string
  /** Tonalidade do corpo do planeta. */
  sky: string
  coral: string
  coralDeep: string
  plum: string
}
