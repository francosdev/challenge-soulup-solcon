/**
 * Paleta do protótipo Pet Planet.
 *
 * O protótipo original desenhava tudo com estilos inline a partir de um objeto
 * de cores. Aqui os papéis foram mantidos e os valores trocados pelos tokens
 * da SoulUp — `sun.*` aparece à vontade porque esta superfície é, por
 * definição, gamificação.
 */
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

export const PET_PALETTE: PetPalette = {
  bg: '#0E3550',
  paper: '#16486B',
  ink: '#FFFFFF',
  inkSoft: '#A4DBDE',
  muted: '#8FA3B0',
  line: '#0F5F61',
  lineSoft: 'rgba(255,255,255,0.12)',
  shadow: 'rgba(0,0,0,0.35)',
  eco: '#29B4B7',
  ecoDeep: '#A4DBDE',
  ecoSoft: 'rgba(41,180,183,0.14)',
  sun: '#C8A84B',
  sunDeep: '#C8A84B',
  coin: '#C8A84B',
  sky: '#A4DBDE',
  coral: '#C8A84B',
  coralDeep: '#EBD9A8',
  plum: '#29B4B7',
}

/** Tipografia lúdica, exclusiva desta superfície. */
export const PET_FONT = {
  game: "'Fredoka', system-ui, sans-serif",
  ui: "'Fredoka', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  hand: "'Caveat', cursive",
} as const
