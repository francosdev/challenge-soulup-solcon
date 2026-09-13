import type { PetPalette } from '../../types/petplanet'
import { PET_FONT_SVG } from './palette'

export type TamanhoMoeda = 14 | 18 | 20 | 26

/** Posição e corpo do rótulo: 70% e 45% do tamanho da moeda. */
const ROTULO_MOEDA: Record<TamanhoMoeda, string> = {
  14: '-right-[9.8px] text-[6.3px]',
  18: '-right-[12.6px] text-[8.1px]',
  20: '-right-[14px] text-[9px]',
  26: '-right-[18.2px] text-[11.7px]',
}

type CoinProps = {
  pal: PetPalette
  size?: TamanhoMoeda
  label?: string
}

export function Coin({ pal, size = 26, label }: CoinProps) {
  const r = size / 2
  return (
    <span className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={r} cy={r} r={r - 2} fill={pal.coin} stroke={pal.line} strokeWidth="2" />
        <circle cx={r - 1} cy={r - 1} r={r - 5} fill="none" stroke={pal.line} strokeWidth="1.2" opacity="0.5" />
        <text
          x={r}
          y={r + 3}
          textAnchor="middle"
          fontFamily={PET_FONT_SVG}
          fontWeight="700"
          fontSize={size * 0.45}
          fill={pal.line}
        >
          $
        </text>
      </svg>
      {label ? (
        <span className={`absolute -top-1.5 font-bold text-sun-line ${ROTULO_MOEDA[size]}`}>{label}</span>
      ) : null}
    </span>
  )
}
