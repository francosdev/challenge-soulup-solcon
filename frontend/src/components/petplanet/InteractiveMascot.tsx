import { useEffect, useRef, useState } from 'react'
import type { Mood, PetPalette } from '../../types/petplanet'
import { Sparkle } from './Sparkle'

export type TamanhoMascote = 92 | 170 | 200

/** Corpo dos "zzz": 16% do tamanho do mascote. */
const TAMANHO_ZZZ: Record<TamanhoMascote, string> = {
  92: 'text-[14.72px]',
  170: 'text-[27.2px]',
  200: 'text-[32px]',
}

/** Posição dos três brilhos, proporcional ao raio do mascote. */
const POSICAO_BRILHOS: Record<TamanhoMascote, { primeiro: string; segundo: string; terceiro: string }> = {
  92: { primeiro: 'left-[23px]', segundo: 'top-[18.4px]', terceiro: 'bottom-[13.8px]' },
  170: { primeiro: 'left-[42.5px]', segundo: 'top-[34px]', terceiro: 'bottom-[25.5px]' },
  200: { primeiro: 'left-[50px]', segundo: 'top-[40px]', terceiro: 'bottom-[30px]' },
}

type InteractiveMascotProps = {
  pal: PetPalette
  size?: TamanhoMascote
  expression?: Mood
  onPoke?: () => void
}

/** Olhos rastreiam o cursor; clique provoca pulinho; expressões dinâmicas. */
export function InteractiveMascot({ pal, size = 200, expression = 'happy', onPoke }: InteractiveMascotProps) {
  const r = size / 2
  const wrapRef = useRef<HTMLDivElement>(null)
  const [eye, setEye] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [poked, setPoked] = useState<boolean>(false)
  const pokeTimer = useRef<number | null>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent): void => {
      if (!wrapRef.current) return
      const box = wrapRef.current.getBoundingClientRect()
      const cx = box.left + box.width / 2
      const cy = box.top + box.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy) || 1
      const max = 3
      const k = Math.min(1, 80 / dist)
      setEye({ x: (dx / dist) * max * k, y: (dy / dist) * max * k })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    return () => {
      if (pokeTimer.current !== null) window.clearTimeout(pokeTimer.current)
    }
  }, [])

  const handleClick = (): void => {
    setPoked(true)
    if (pokeTimer.current !== null) window.clearTimeout(pokeTimer.current)
    pokeTimer.current = window.setTimeout(() => setPoked(false), 800)
    if (onPoke) onPoke()
  }

  const isCelebrating = expression === 'celebrating'
  const isSad = expression === 'sad'
  const isSleepy = expression === 'sleepy'
  const isHappy = expression === 'happy' || isCelebrating

  const tint = isSad ? pal.muted : pal.sky
  const continentFill = isSad ? pal.muted : pal.eco
  const continentDeep = isSad ? pal.muted : pal.ecoDeep

  const eyeY = r - 6
  const eyeLX = r - 15
  const eyeRX = r + 15

  const eyes = isSleepy ? (
    <g>
      <path d={`M ${eyeLX - 7} ${eyeY} q 7 4 14 0`} fill="none" stroke={pal.line} strokeWidth="3" strokeLinecap="round" />
      <path d={`M ${eyeRX - 7} ${eyeY} q 7 4 14 0`} fill="none" stroke={pal.line} strokeWidth="3" strokeLinecap="round" />
    </g>
  ) : isCelebrating ? (
    <g>
      <path d={`M ${eyeLX - 7} ${eyeY - 2} q 7 -10 14 0`} fill="none" stroke={pal.line} strokeWidth="3" strokeLinecap="round" />
      <path d={`M ${eyeRX - 7} ${eyeY - 2} q 7 -10 14 0`} fill="none" stroke={pal.line} strokeWidth="3" strokeLinecap="round" />
    </g>
  ) : (
    <g>
      <ellipse cx={eyeLX} cy={eyeY} rx="6" ry={isSad ? 5 : 7} fill="#FFFFFF" stroke={pal.line} strokeWidth="2" />
      <ellipse cx={eyeRX} cy={eyeY} rx="6" ry={isSad ? 5 : 7} fill="#FFFFFF" stroke={pal.line} strokeWidth="2" />
      <ellipse cx={eyeLX + eye.x} cy={eyeY + eye.y} rx="3" ry={isSad ? 3 : 4} fill={pal.line} />
      <ellipse cx={eyeRX + eye.x} cy={eyeY + eye.y} rx="3" ry={isSad ? 3 : 4} fill={pal.line} />
      <circle cx={eyeLX + eye.x - 1} cy={eyeY + eye.y - 1.5} r="1" fill="#FFFFFF" />
      <circle cx={eyeRX + eye.x - 1} cy={eyeY + eye.y - 1.5} r="1" fill="#FFFFFF" />
      {isSad ? (
        <ellipse cx={eyeLX - 1} cy={eyeY + 7} rx="2.5" ry="4" fill={pal.plum} stroke={pal.line} strokeWidth="1" />
      ) : null}
    </g>
  )

  const mouth = isCelebrating ? (
    <g>
      <ellipse cx={r} cy={r + 12} rx="10" ry="7" fill={pal.line} />
      <ellipse cx={r} cy={r + 14} rx="6" ry="3" fill={pal.coralDeep} />
    </g>
  ) : isHappy ? (
    <path d={`M ${r - 12} ${r + 8} q 12 14 24 0`} fill={pal.line} stroke={pal.line} strokeWidth="2" strokeLinejoin="round" />
  ) : isSad ? (
    <path d={`M ${r - 10} ${r + 14} q 10 -8 20 0`} fill="none" stroke={pal.line} strokeWidth="3" strokeLinecap="round" />
  ) : (
    <path d={`M ${r - 6} ${r + 12} q 6 4 12 0`} fill="none" stroke={pal.line} strokeWidth="2.5" strokeLinecap="round" />
  )

  const animClass = poked
    ? 'motion-safe:animate-pp-poked origin-bottom'
    : isCelebrating
      ? 'motion-safe:animate-pp-celebrate origin-bottom'
      : isSad
        ? 'motion-safe:animate-pp-sad'
        : isSleepy
          ? 'motion-safe:animate-pp-sleep'
          : 'motion-safe:animate-pp-bob origin-center'

  const brilhos = POSICAO_BRILHOS[size]

  return (
    <div ref={wrapRef} onClick={handleClick} className="relative inline-block cursor-pointer">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={animClass}>
        <ellipse cx={r} cy={size - 8} rx={r * 0.7} ry="6" fill={pal.shadow} />
        <circle cx={r} cy={r} r={r - 12} fill={tint} stroke={pal.line} strokeWidth="3" />
        <path
          d={`M ${r - 40} ${r + 4} q 14 -10 28 -2 q 8 6 -2 14 q -16 6 -22 -2 q -10 -6 -4 -10 Z`}
          fill={continentFill}
          stroke={pal.line}
          strokeWidth="2"
        />
        <path
          d={`M ${r + 4} ${r - 28} q 16 -2 26 8 q 4 12 -8 14 q -10 0 -16 -8 q -8 -8 -2 -14 Z`}
          fill={continentFill}
          stroke={pal.line}
          strokeWidth="2"
        />
        <path
          d={`M ${r + 18} ${r + 22} q 8 -2 12 4 q 2 8 -6 10 q -8 0 -10 -6 q -2 -6 4 -8 Z`}
          fill={continentDeep}
          stroke={pal.line}
          strokeWidth="2"
        />
        {!isSad ? (
          <g>
            <circle cx={r - 22} cy={r + 10} r="5" fill={pal.coral} opacity="0.7" />
            <circle cx={r + 22} cy={r + 10} r="5" fill={pal.coral} opacity="0.7" />
          </g>
        ) : null}
        {eyes}
        {mouth}
        <g transform={`translate(${r - 10} 4)`}>
          <path
            d="M 10 18 q -8 -4 -8 -12 q 8 0 12 8"
            fill={isSad ? pal.muted : pal.eco}
            stroke={pal.line}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M 10 18 q 0 -10 4 -16" fill="none" stroke={pal.line} strokeWidth="1.5" />
        </g>
        <ellipse
          cx={r}
          cy={r + 4}
          rx={r - 4}
          ry={r * 0.3}
          fill="none"
          stroke={pal.line}
          strokeWidth="2"
          strokeDasharray="3 4"
          opacity="0.35"
        />
      </svg>

      {isSleepy ? (
        <div className={`absolute right-1 top-1 font-bold text-[#8FA3B0] ${TAMANHO_ZZZ[size]}`}>
          <span className="inline-block motion-safe:animate-pp-zzz">z</span>
          <span className="ml-0.5 inline-block [animation-delay:0.6s] motion-safe:animate-pp-zzz">z</span>
          <span className="ml-0.5 inline-block [animation-delay:1.2s] motion-safe:animate-pp-zzz">Z</span>
        </div>
      ) : null}

      {isCelebrating || poked ? (
        <>
          <span className={`absolute -top-0.5 motion-safe:animate-pp-twinkle ${brilhos.primeiro}`}>
            <Sparkle size={size * 0.12} color={pal.sun} stroke={pal.line} />
          </span>
          <span className={`absolute -right-1 [animation-delay:0.4s] motion-safe:animate-pp-twinkle ${brilhos.segundo}`}>
            <Sparkle size={size * 0.1} color={pal.coralDeep} stroke={pal.line} />
          </span>
          <span className={`absolute -left-1 [animation-delay:0.8s] motion-safe:animate-pp-twinkle ${brilhos.terceiro}`}>
            <Sparkle size={size * 0.11} color={pal.coin} stroke={pal.line} />
          </span>
        </>
      ) : null}
    </div>
  )
}
