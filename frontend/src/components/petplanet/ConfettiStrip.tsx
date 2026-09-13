import type { ReactNode } from 'react'
import type { PetPalette } from '../../types/petplanet'

type ConfettiStripProps = {
  pal: PetPalette
  w?: number
  h?: number
}

export function ConfettiStrip({ pal, w = 300, h = 24 }: ConfettiStripProps) {
  const colors = [pal.eco, pal.sun, pal.coralDeep, pal.sky, pal.plum, pal.coin]
  const seed = (i: number): number => ((Math.sin(i * 9.13) * 1000) % 1)
  const items: ReactNode[] = []

  for (let i = 0; i < 22; i++) {
    const x = (i / 22) * w + seed(i) * 12
    const y = ((seed(i + 3) + 1) / 2) * h
    const size = 4 + ((seed(i + 7) + 1) / 2) * 5
    const rot = seed(i + 1) * 60
    const c = colors[i % colors.length]
    const shape = i % 3
    // Cada peça é identificada pela própria posição na faixa.
    const id = `${shape}-${x.toFixed(3)}-${y.toFixed(3)}`

    if (shape === 0) {
      items.push(
        <rect
          key={id}
          x={x}
          y={y}
          width={size}
          height={size * 0.6}
          fill={c}
          stroke={pal.line}
          strokeWidth="1"
          transform={`rotate(${rot} ${x} ${y})`}
        />,
      )
    } else if (shape === 1) {
      items.push(<circle key={id} cx={x} cy={y} r={size * 0.5} fill={c} stroke={pal.line} strokeWidth="1" />)
    } else {
      items.push(
        <path
          key={id}
          d={`M ${x} ${y - size / 2} L ${x + size / 2} ${y} L ${x} ${y + size / 2} L ${x - size / 2} ${y} Z`}
          fill={c}
          stroke={pal.line}
          strokeWidth="1"
        />,
      )
    }
  }

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="block">
      {items}
    </svg>
  )
}
