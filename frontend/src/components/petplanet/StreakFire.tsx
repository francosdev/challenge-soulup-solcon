import type { PetPalette } from '../../types/petplanet'

type StreakFireProps = {
  pal: PetPalette
  days: number
}

export function StreakFire({ pal, days }: StreakFireProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border-2 border-soul-deep bg-sun px-2 py-[3px] shadow-[0_2px_0_#0F5F61]">
      <svg width="14" height="16" viewBox="0 0 14 16">
        <path
          d="M 7 1 Q 11 5 11 9 Q 11 13 7 15 Q 3 13 3 9 Q 3 6 7 1 Z"
          fill={pal.coralDeep}
          stroke={pal.line}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M 7 6 Q 9 9 8 12 Q 7 13 6 12 Q 5 10 7 6 Z" fill={pal.sun} />
      </svg>
      <span className="text-[12px] font-bold text-soul-deep">{days}d</span>
    </div>
  )
}
