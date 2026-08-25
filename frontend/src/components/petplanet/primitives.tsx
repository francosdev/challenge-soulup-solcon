import type { CSSProperties, ReactNode } from 'react'
import { PET_FONT, type PetPalette } from './palette'

/** Ícones disponíveis no selo circular do protótipo. */
export type StickerKind = 'leaf' | 'drop' | 'bolt' | 'tree' | 'trophy' | 'star'

interface PalProps {
  pal: PetPalette
}

// ---- Cartões e widgets ----------------------------------------------------

export interface GameCardProps extends PalProps {
  color?: string
  style?: CSSProperties
  children: ReactNode
}

export function GameCard({ pal, color, style, children }: GameCardProps) {
  return (
    <div
      style={{
        background: color || pal.paper,
        border: `2px solid ${pal.line}`,
        borderRadius: 14,
        boxShadow: `0 3px 0 ${pal.line}`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export interface GameInitialsProps extends PalProps {
  size?: number
  label?: string
  color?: string
  style?: CSSProperties
}

export function GameInitials({ pal, size = 32, label = '?', color, style }: GameInitialsProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color || pal.eco,
        border: `2px solid ${pal.line}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: PET_FONT.game,
        fontSize: Math.max(9, size * 0.42),
        fontWeight: 700,
        color: pal.line,
        ...style,
      }}
    >
      {label}
    </div>
  )
}

export interface GameBarProps extends PalProps {
  pct?: number
  height?: number
  color?: string
  style?: CSSProperties
}

export function GameBar({ pal, pct = 0.5, height = 10, color, style }: GameBarProps) {
  const p = Math.max(0, Math.min(1, pct))
  return (
    <div
      style={{
        width: '100%',
        height,
        background: pal.bg,
        border: `1.5px solid ${pal.line}`,
        borderRadius: 999,
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      <div
        style={{
          width: `${p * 100}%`,
          height: '100%',
          background: color || pal.eco,
          borderRight: p < 1 ? `1.5px solid ${pal.line}` : 'none',
        }}
      />
    </div>
  )
}

export interface LevelPillProps extends PalProps {
  level: number
}

export function LevelPill({ pal, level }: LevelPillProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '3px 8px',
        background: pal.sun,
        border: `2px solid ${pal.line}`,
        borderRadius: 999,
        boxShadow: `0 2px 0 ${pal.line}`,
        fontFamily: PET_FONT.game,
        fontSize: 12,
        fontWeight: 700,
        color: pal.line,
      }}
    >
      <span style={{ fontFamily: PET_FONT.mono, fontSize: 9, opacity: 0.7 }}>NV</span>
      {level}
    </div>
  )
}

// ---- Primitivas em SVG ----------------------------------------------------

export interface SparkleProps {
  size?: number
  color?: string
  stroke?: string
}

export function Sparkle({ size = 16, color = '#C8A84B', stroke = '#0F5F61' }: SparkleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ display: 'inline-block' }}>
      <path
        d="M 8 1 L 9.4 6.6 L 15 8 L 9.4 9.4 L 8 15 L 6.6 9.4 L 1 8 L 6.6 6.6 Z"
        fill={color}
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export interface CoinProps extends PalProps {
  size?: number
  label?: string
}

export function Coin({ pal, size = 26, label }: CoinProps) {
  const r = size / 2
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={r} cy={r} r={r - 2} fill={pal.coin} stroke={pal.line} strokeWidth="2" />
        <circle cx={r - 1} cy={r - 1} r={r - 5} fill="none" stroke={pal.line} strokeWidth="1.2" opacity="0.5" />
        <text
          x={r}
          y={r + 3}
          textAnchor="middle"
          fontFamily={PET_FONT.game}
          fontWeight="700"
          fontSize={size * 0.45}
          fill={pal.line}
        >
          $
        </text>
      </svg>
      {label ? (
        <span
          style={{
            position: 'absolute',
            top: -6,
            right: -size * 0.7,
            fontFamily: PET_FONT.game,
            fontSize: size * 0.45,
            fontWeight: 700,
            color: pal.coralDeep,
          }}
        >
          {label}
        </span>
      ) : null}
    </span>
  )
}

export interface StreakFireProps extends PalProps {
  days?: number
}

export function StreakFire({ pal, days = 7 }: StreakFireProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '3px 8px',
        background: pal.coral,
        border: `2px solid ${pal.line}`,
        borderRadius: 999,
        boxShadow: `0 2px 0 ${pal.line}`,
      }}
    >
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
      <span style={{ fontFamily: PET_FONT.game, fontSize: 12, fontWeight: 700, color: pal.line }}>{days}d</span>
    </div>
  )
}

export interface ConfettiStripProps extends PalProps {
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

    if (shape === 0) {
      items.push(
        <rect
          key={i}
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
      items.push(<circle key={i} cx={x} cy={y} r={size * 0.5} fill={c} stroke={pal.line} strokeWidth="1" />)
    } else {
      items.push(
        <path
          key={i}
          d={`M ${x} ${y - size / 2} L ${x + size / 2} ${y} L ${x} ${y + size / 2} L ${x - size / 2} ${y} Z`}
          fill={c}
          stroke={pal.line}
          strokeWidth="1"
        />,
      )
    }
  }

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      {items}
    </svg>
  )
}

export interface StickerProps extends PalProps {
  kind?: StickerKind
  size?: number
  color?: string
  locked?: boolean
  label?: string | null
  tilt?: number
}

export function Sticker({ pal, kind = 'leaf', size = 60, color, locked = false, label, tilt = 0 }: StickerProps) {
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
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        transform: `rotate(${tilt}deg)`,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          background: pal.paper,
          border: `2px solid ${stroke}`,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 3px 0 ${stroke}`,
          position: 'relative',
          opacity: locked ? 0.55 : 1,
        }}
      >
        <svg width={size * 0.95} height={size * 0.95} viewBox={`0 0 ${size} ${size}`}>
          {drawIcon()}
        </svg>
        {locked ? (
          <svg width="14" height="16" viewBox="0 0 14 16" style={{ position: 'absolute', bottom: -2, right: -2 }}>
            <rect x="2" y="7" width="10" height="8" rx="1.5" fill={pal.muted} stroke={stroke} strokeWidth="1.5" />
            <path d="M 4 7 V 5 a 3 3 0 0 1 6 0 V 7" fill="none" stroke={stroke} strokeWidth="1.5" />
          </svg>
        ) : null}
      </div>
      {label ? (
        <span
          style={{
            fontFamily: PET_FONT.mono,
            fontSize: 8,
            color: locked ? pal.muted : pal.ink,
            textAlign: 'center',
            maxWidth: size + 16,
            lineHeight: 1.1,
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
      ) : null}
    </div>
  )
}

export interface TreasureChestProps extends PalProps {
  size?: number
}

export function TreasureChest({ pal, size = 60 }: TreasureChestProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ display: 'block' }}>
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

export interface SpeechBubbleProps extends PalProps {
  color?: string
  hand?: boolean
  tilt?: number
  style?: CSSProperties
  children: ReactNode
}

export function SpeechBubble({ pal, color, hand = false, tilt = 0, style, children }: SpeechBubbleProps) {
  return (
    <div
      style={{
        background: color || pal.paper,
        border: `2px solid ${pal.line}`,
        borderRadius: 14,
        padding: hand ? '4px 10px 6px' : '5px 10px 6px',
        fontFamily: hand ? PET_FONT.hand : PET_FONT.game,
        fontSize: hand ? 18 : 13,
        fontWeight: hand ? 500 : 600,
        color: pal.ink,
        boxShadow: `0 3px 0 ${pal.line}`,
        transform: `rotate(${tilt}deg)`,
        lineHeight: 1.1,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
