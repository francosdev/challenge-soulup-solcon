import type { ReactNode } from 'react'
import type { PetPalette, StickerKind } from '../../types/petplanet'

export type TamanhoSelo = 28 | 32 | 44
export type InclinacaoSelo = -4 | -2 | 0 | 3 | 4

const CIRCULO_SELO: Record<TamanhoSelo, string> = {
  28: 'h-7 w-7',
  32: 'h-8 w-8',
  44: 'h-11 w-11',
}

/** Largura máxima do rótulo: tamanho do selo + 16px. */
const ROTULO_SELO: Record<TamanhoSelo, string> = {
  28: 'max-w-[44px]',
  32: 'max-w-[48px]',
  44: 'max-w-[60px]',
}

const GIRO_SELO: Record<InclinacaoSelo, string> = {
  [-4]: '-rotate-[4deg]',
  [-2]: '-rotate-2',
  0: 'rotate-0',
  3: 'rotate-3',
  4: 'rotate-[4deg]',
}

type StickerProps = {
  pal: PetPalette
  kind?: StickerKind
  size: TamanhoSelo
  /** Cor do desenho em SVG. */
  color?: string
  locked?: boolean
  label?: string | null
  tilt?: InclinacaoSelo
}

export function Sticker({ pal, kind = 'leaf', size, color, locked = false, label, tilt = 0 }: StickerProps) {
  const c = locked ? pal.lineSoft : color || pal.eco
  const stroke = pal.line
  const r = size / 2

  const drawIcon = (): ReactNode => {
    switch (kind) {
      case 'drop':
        return (
          <path
            d={`M ${r} ${r * 0.5} Q ${r * 1.45} ${r} ${r * 1.4} ${r * 1.35} Q ${r * 1.3} ${r * 1.65} ${r} ${r * 1.55} Q ${r * 0.7} ${r * 1.65} ${r * 0.6} ${r * 1.35} Q ${r * 0.55} ${r} ${r} ${r * 0.5} Z`}
            fill={c}
            stroke={stroke}
            strokeWidth="2"
          />
        )
      case 'bolt':
        return (
          <path
            d={`M ${r * 1.1} ${r * 0.45} L ${r * 0.6} ${r * 1.1} L ${r} ${r * 1.1} L ${r * 0.85} ${r * 1.6} L ${r * 1.45} ${r * 0.95} L ${r * 1.05} ${r * 0.95} Z`}
            fill={c}
            stroke={stroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        )
      case 'tree':
        return (
          <g>
            <rect x={r - 3} y={r * 1.25} width="6" height={r * 0.55} fill={pal.coralDeep} stroke={stroke} strokeWidth="1.5" />
            <circle cx={r} cy={r * 0.95} r={r * 0.55} fill={c} stroke={stroke} strokeWidth="2" />
            <circle cx={r - 8} cy={r * 0.85} r={r * 0.35} fill={c} stroke={stroke} strokeWidth="2" />
            <circle cx={r + 8} cy={r * 0.8} r={r * 0.4} fill={c} stroke={stroke} strokeWidth="2" />
          </g>
        )
      case 'trophy':
        return (
          <g>
            <rect x={r - 4} y={r * 1.4} width="8" height={r * 0.3} fill={c} stroke={stroke} strokeWidth="1.5" />
            <path
              d={`M ${r * 0.55} ${r * 0.55} L ${r * 0.55} ${r * 1.1} Q ${r * 0.55} ${r * 1.45} ${r} ${r * 1.45} Q ${r * 1.45} ${r * 1.45} ${r * 1.45} ${r * 1.1} L ${r * 1.45} ${r * 0.55} Z`}
              fill={c}
              stroke={stroke}
              strokeWidth="2"
            />
            <path
              d={`M ${r * 0.55} ${r * 0.7} Q ${r * 0.3} ${r * 0.7} ${r * 0.3} ${r * 0.95} Q ${r * 0.3} ${r * 1.15} ${r * 0.55} ${r * 1.1}`}
              fill="none"
              stroke={stroke}
              strokeWidth="2"
            />
            <path
              d={`M ${r * 1.45} ${r * 0.7} Q ${r * 1.7} ${r * 0.7} ${r * 1.7} ${r * 0.95} Q ${r * 1.7} ${r * 1.15} ${r * 1.45} ${r * 1.1}`}
              fill="none"
              stroke={stroke}
              strokeWidth="2"
            />
          </g>
        )
      case 'star':
        return (
          <path
            d={`M ${r} ${r * 0.45} L ${r * 1.18} ${r * 0.9} L ${r * 1.65} ${r * 0.95} L ${r * 1.28} ${r * 1.25} L ${r * 1.4} ${r * 1.7} L ${r} ${r * 1.45} L ${r * 0.6} ${r * 1.7} L ${r * 0.72} ${r * 1.25} L ${r * 0.35} ${r * 0.95} L ${r * 0.82} ${r * 0.9} Z`}
            fill={c}
            stroke={stroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        )
      case 'leaf':
      default:
        return (
          <path
            d={`M ${r * 0.45} ${r * 1.45} Q ${r * 0.55} ${r * 0.55} ${r * 1.55} ${r * 0.45} Q ${r * 1.45} ${r * 1.45} ${r * 0.45} ${r * 1.45} Z M ${r * 0.5} ${r * 1.4} Q ${r} ${r} ${r * 1.5} ${r * 0.5}`}
            fill={c}
            stroke={stroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        )
    }
  }

  return (
    <div className={`inline-flex flex-col items-center gap-0.5 ${GIRO_SELO[tilt]}`}>
      <div
        className={`relative flex items-center justify-center rounded-full border-2 border-soul-deep bg-navy shadow-[0_3px_0_#0F5F61] ${CIRCULO_SELO[size]} ${locked ? 'opacity-[.55]' : ''}`}
      >
        <svg width={size * 0.95} height={size * 0.95} viewBox={`0 0 ${size} ${size}`}>
          {drawIcon()}
        </svg>
        {locked ? (
          <svg width="14" height="16" viewBox="0 0 14 16" className="absolute -bottom-0.5 -right-0.5">
            <rect x="2" y="7" width="10" height="8" rx="1.5" fill={pal.muted} stroke={stroke} strokeWidth="1.5" />
            <path d="M 4 7 V 5 a 3 3 0 0 1 6 0 V 7" fill="none" stroke={stroke} strokeWidth="1.5" />
          </svg>
        ) : null}
      </div>
      {label ? (
        <span
          className={`text-center font-mono text-[8px] uppercase leading-[1.1] ${locked ? 'text-[#8FA3B0]' : 'text-white'} ${ROTULO_SELO[size]}`}
        >
          {label}
        </span>
      ) : null}
    </div>
  )
}
