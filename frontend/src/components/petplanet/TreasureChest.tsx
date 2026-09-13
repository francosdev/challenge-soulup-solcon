import type { PetPalette } from '../../types/petplanet'
import { Sparkle } from './Sparkle'

type TreasureChestProps = {
  pal: PetPalette
  size?: number
}

export function TreasureChest({ pal, size = 60 }: TreasureChestProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" className="block">
      <ellipse cx="30" cy="54" rx="22" ry="3" fill={pal.shadow} />
      <rect x="6" y="28" width="48" height="22" rx="3" fill={pal.coralDeep} stroke={pal.line} strokeWidth="2" />
      <path d="M 6 28 q 24 -22 48 0 L 54 34 L 6 34 Z" fill={pal.coin} stroke={pal.line} strokeWidth="2" />
      <rect x="25" y="32" width="10" height="10" fill={pal.sun} stroke={pal.line} strokeWidth="1.5" />
      <circle cx="30" cy="37" r="1.5" fill={pal.line} />
      <g transform="translate(8 12)">
        <Sparkle size={10} color={pal.sun} stroke={pal.line} />
      </g>
      <g transform="translate(46 8)">
        <Sparkle size={12} color={pal.coin} stroke={pal.line} />
      </g>
      <g transform="translate(40 22)">
        <Sparkle size={8} color={pal.paper} stroke={pal.line} />
      </g>
    </svg>
  )
}
