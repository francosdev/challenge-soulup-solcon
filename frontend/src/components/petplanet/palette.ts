import type { PetPalette } from '../../types/petplanet'

/**
 * Paleta do protótipo Pet Planet.
 *
 * Estes valores alimentam só os atributos dos desenhos em SVG (`fill`, `stroke`).
 * O visual dos elementos HTML usa as classes do Tailwind com os mesmos tokens da
 * SoulUp (`bg-navy`, `border-soul-deep`, `text-soul-light`...). `sun.*` aparece à
 * vontade porque esta superfície é, por definição, gamificação.
 */
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

/** Fonte usada no atributo `fontFamily` do texto desenhado em SVG. */
export const PET_FONT_SVG = "'Fredoka', system-ui, sans-serif"
