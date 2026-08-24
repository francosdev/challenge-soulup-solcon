import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { PET_FONT, PET_PALETTE, type PetPalette } from './palette'
import {
  Coin,
  ConfettiStrip,
  GameAvatar,
  GameBar,
  GameCard,
  LevelPill,
  Sparkle,
  SpeechBubble,
  Sticker,
  StreakFire,
  TreasureChest,
  type StickerKind,
} from './primitives'

const STATE_KEY = 'ecoscore.petplanet.v2'
const NOW = (): number => Date.now()

export type ActionId = 'recic' | 'agua' | 'energia' | 'verde' | 'trilha' | 'compost'
export type Mood = 'happy' | 'celebrating' | 'sleepy' | 'sad'
type Screen = 'onboarding' | 'dashboard' | 'register' | 'success' | 'history' | 'profile'

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

const DEFAULT_STATE: PetState = {
  onboarded: false,
  level: 12,
  xp: 1842,
  xpToNext: 2500,
  co2: 47.3,
  coins: 1842,
  streak: 14,
  metrics: { trees: 3.2, water: 184, waste: 12.4, energy: 9.1 },
  history: [
    { id: 1, type: 'recic', qty: '6 itens', points: 24, co2: 1.2, ts: NOW() - 86400000 * 0.6 },
    { id: 2, type: 'agua', qty: 'rega', points: 8, co2: 0, ts: NOW() - 86400000 * 1.3 },
    { id: 3, type: 'agua', qty: '3 banhos curtos', points: 15, co2: 0.4, ts: NOW() - 86400000 * 2.2 },
    { id: 4, type: 'trilha', qty: 'trilha água cap. 1', points: 50, co2: 0, ts: NOW() - 86400000 * 3.1 },
    { id: 5, type: 'compost', qty: 'compostagem', points: 12, co2: 0.3, ts: NOW() - 86400000 * 4.0 },
    { id: 6, type: 'energia', qty: 'lâmpada LED ×2', points: 18, co2: 0.7, ts: NOW() - 86400000 * 5.4 },
  ],
  redeemed: [],
  lastActionAt: NOW() - 3600000 * 2,
}

// ─── Estado persistente ────────────────────────────────────────────────────

function loadState(): PetState {
  try {
    const raw = localStorage.getItem(STATE_KEY)
    if (!raw) return { ...DEFAULT_STATE }
    return { ...DEFAULT_STATE, ...(JSON.parse(raw) as Partial<PetState>) }
  } catch {
    return { ...DEFAULT_STATE }
  }
}

function saveState(s: PetState): void {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(s))
  } catch {
    // localStorage indisponível (modo privado): o protótipo segue em memória.
  }
}

function moodFromState(s: PetState): Mood {
  const hoursSince = (NOW() - s.lastActionAt) / 3600000
  if (hoursSince < 0.05) return 'celebrating'
  if (hoursSince < 24) return 'happy'
  if (hoursSince < 48) return 'sleepy'
  return 'sad'
}

function healthFromState(s: PetState): number {
  const days = (NOW() - s.lastActionAt) / 86400000
  const decay = Math.min(0.6, Math.max(0, days * 0.05))
  return Math.max(0.08, 0.74 - decay)
}

// ─── Mascote interativo ────────────────────────────────────────────────────

export interface InteractiveMascotProps {
  pal: PetPalette
  size?: number
  expression?: Mood
  onPoke?: () => void
  style?: CSSProperties
}

/** Olhos rastreiam o cursor; clique provoca pulinho; expressões dinâmicas. */
export function InteractiveMascot({
  pal,
  size = 200,
  expression = 'happy',
  onPoke,
  style,
}: InteractiveMascotProps) {
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

  return (
    <div
      ref={wrapRef}
      onClick={handleClick}
      style={{ position: 'relative', display: 'inline-block', cursor: 'pointer', ...style }}
    >
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
        <div
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            fontFamily: PET_FONT.game,
            fontWeight: 700,
            color: pal.muted,
            fontSize: size * 0.16,
          }}
        >
          <span className="inline-block motion-safe:animate-pp-zzz">z</span>
          <span className="inline-block motion-safe:animate-pp-zzz" style={{ animationDelay: '0.6s', marginLeft: 2 }}>
            z
          </span>
          <span className="inline-block motion-safe:animate-pp-zzz" style={{ animationDelay: '1.2s', marginLeft: 2 }}>
            Z
          </span>
        </div>
      ) : null}

      {isCelebrating || poked ? (
        <>
          <span className="motion-safe:animate-pp-twinkle" style={{ position: 'absolute', top: -2, left: r * 0.5 }}>
            <Sparkle size={size * 0.12} color={pal.sun} stroke={pal.line} />
          </span>
          <span
            className="motion-safe:animate-pp-twinkle"
            style={{ position: 'absolute', top: r * 0.4, right: -4, animationDelay: '0.4s' }}
          >
            <Sparkle size={size * 0.1} color={pal.coralDeep} stroke={pal.line} />
          </span>
          <span
            className="motion-safe:animate-pp-twinkle"
            style={{ position: 'absolute', bottom: r * 0.3, left: -4, animationDelay: '0.8s' }}
          >
            <Sparkle size={size * 0.11} color={pal.coin} stroke={pal.line} />
          </span>
        </>
      ) : null}
    </div>
  )
}

// ─── Contador animado ──────────────────────────────────────────────────────

interface CountUpProps {
  to: number
  from?: number
  duration?: number
  decimals?: number
  style?: CSSProperties
}

function CountUp({ to, from = 0, duration = 900, decimals = 0, style }: CountUpProps) {
  const [value, setValue] = useState<number>(from)

  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (now: number): void => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(from + (to - from) * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, from, duration])

  return <span style={style}>{decimals ? value.toFixed(decimals) : Math.round(value)}</span>
}

// ─── Confete ───────────────────────────────────────────────────────────────

interface ConfettiBurstProps {
  pal: PetPalette
  count?: number
}

/** Estilo com custom properties consumidas pelo keyframe pp-confetti-fly. */
type ConfettiStyle = CSSProperties & { '--tx': string; '--ty': string }

function ConfettiBurst({ pal, count = 36 }: ConfettiBurstProps) {
  const colors = [pal.eco, pal.ecoDeep, pal.sun, pal.coin, pal.plum, pal.coralDeep]

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2
        const dist = 120 + ((i * 17) % 80)
        const style: ConfettiStyle = {
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 8,
          height: 4 + (i % 3) * 2,
          background: colors[i % colors.length],
          border: `1px solid ${pal.line}`,
          borderRadius: i % 2 ? '50%' : 2,
          transform: 'translate(-50%, -50%)',
          animationDelay: `${(i % 6) * 0.04}s`,
          '--tx': `${Math.cos(angle) * dist}px`,
          '--ty': `${Math.sin(angle) * dist}px`,
        }
        return <span key={i} className="motion-safe:animate-pp-confetti-fly" style={style} />
      })}
    </div>
  )
}

// ─── Moldura e navegação ───────────────────────────────────────────────────

function PhoneFrame({ pal, children }: { pal: PetPalette; children: ReactNode }) {
  return (
    <div
      style={{
        width: 360,
        height: 760,
        maxWidth: '100%',
        background: pal.bg,
        borderRadius: 28,
        border: `2px solid ${pal.line}`,
        boxShadow: `0 6px 0 ${pal.line}, 0 20px 60px rgba(0,0,0,0.6)`,
        overflow: 'hidden',
        position: 'relative',
        color: pal.ink,
        fontFamily: PET_FONT.ui,
      }}
    >
      <div
        style={{
          height: 28,
          padding: '0 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: PET_FONT.mono,
          fontSize: 10,
          color: pal.muted,
        }}
      >
        <span>9:41</span>
        <span>● ● ●</span>
      </div>
      {children}
    </div>
  )
}

interface TabBarProps {
  pal: PetPalette
  current: Screen
  onNavigate: (s: Screen) => void
}

function TabBar({ pal, current, onNavigate }: TabBarProps) {
  const tabs: { id: Screen; label: string }[] = [
    { id: 'dashboard', label: 'início' },
    { id: 'history', label: 'histórico' },
    { id: 'profile', label: 'perfil' },
  ]

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: '8px 14px',
        borderTop: `1.5px solid ${pal.line}`,
        background: pal.paper,
        display: 'flex',
        justifyContent: 'space-around',
        fontFamily: PET_FONT.game,
        fontSize: 11,
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onNavigate(t.id)}
          style={{
            background: 'transparent',
            border: 'none',
            color: current === t.id ? pal.eco : pal.muted,
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: current === t.id ? 700 : 500,
            cursor: 'pointer',
            padding: '4px 6px',
          }}
        >
          {current === t.id ? '● ' : '○ '}
          {t.label}
        </button>
      ))}
    </div>
  )
}

function ScreenScroll({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 28,
        left: 0,
        right: 0,
        bottom: 56,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

// ─── Tela: onboarding ──────────────────────────────────────────────────────

function OnboardingScreen({ pal, onDone }: { pal: PetPalette; onDone: () => void }) {
  const steps: { mood: Mood; title: string; body: string }[] = [
    { mood: 'happy', title: 'olá, eu sou o Solzinho 🌍', body: 'tô aqui pra crescer com você. cada ação sustentável me alimenta!' },
    { mood: 'celebrating', title: 'registre, ganhe, festeje', body: 'tira foto da sua ação, valido por IA, vc ganha pontos e moedas. ✦' },
    { mood: 'sleepy', title: 'mas cuidado: se sumir…', body: 'fico triste e perco saúde. seu streak também! bora?' },
  ]
  const [i, setI] = useState<number>(0)
  const cur = steps[i]

  return (
    <PhoneFrame pal={pal}>
      <div
        style={{
          position: 'absolute',
          inset: '28px 0 0',
          padding: '32px 22px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ fontFamily: PET_FONT.mono, fontSize: 10, color: pal.muted, letterSpacing: 2, marginBottom: 18 }}>
          BEM-VINDO AO ECOSCORE
        </div>
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <InteractiveMascot pal={pal} size={200} expression={cur.mood} />
        </div>
        <div style={{ fontFamily: PET_FONT.game, fontSize: 22, fontWeight: 700, textAlign: 'center', lineHeight: 1.15 }}>
          {cur.title}
        </div>
        <div style={{ fontFamily: PET_FONT.ui, fontSize: 14, color: pal.inkSoft, textAlign: 'center', marginTop: 10, lineHeight: 1.35 }}>
          {cur.body}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 'auto', marginBottom: 14 }}>
          {steps.map((step, k) => (
            <span
              key={step.title}
              style={{
                width: k === i ? 24 : 8,
                height: 8,
                borderRadius: 999,
                background: k === i ? pal.eco : pal.line,
                transition: 'width .25s',
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => (i < steps.length - 1 ? setI(i + 1) : onDone())}
          style={{
            width: '100%',
            padding: '12px 14px',
            background: pal.eco,
            color: pal.bg,
            border: `2px solid ${pal.line}`,
            borderRadius: 14,
            fontFamily: PET_FONT.game,
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
          }}
        >
          {i < steps.length - 1 ? 'continuar →' : 'começar minha jornada ✦'}
        </button>
        {i < steps.length - 1 ? (
          <button
            type="button"
            onClick={onDone}
            style={{
              marginTop: 8,
              background: 'transparent',
              border: 'none',
              fontFamily: PET_FONT.ui,
              fontSize: 12,
              color: pal.muted,
              cursor: 'pointer',
            }}
          >
            pular
          </button>
        ) : null}
      </div>
    </PhoneFrame>
  )
}

// ─── Tela: dashboard ───────────────────────────────────────────────────────

interface ScreenProps {
  pal: PetPalette
  state: PetState
  onNavigate: (s: Screen) => void
}

function DashboardScreen({ pal, state, onNavigate }: ScreenProps) {
  const mood = moodFromState(state)
  const health = healthFromState(state)
  const moodLines: Record<Mood, { line: string; cta: string | null }> = {
    happy: { line: 'tudo florescendo por aqui ✦', cta: null },
    celebrating: { line: 'UHUUU! +pts pra você', cta: null },
    sleepy: { line: 'tô bocejando… faz uma ação?', cta: 'alimentar planetinha →' },
    sad: { line: 'saudade…', cta: 'voltar a brilhar →' },
  }
  const moodInfo = moodLines[mood]

  const [idleSpark, setIdleSpark] = useState<{ x: number; y: number; id: number } | null>(null)

  useEffect(() => {
    const tick = (): void => {
      setIdleSpark({ x: 20 + Math.random() * 250, y: 100 + Math.random() * 180, id: Date.now() })
      window.setTimeout(() => setIdleSpark(null), 1200)
    }
    const id = window.setInterval(tick, 8000 + Math.random() * 4000)
    return () => window.clearInterval(id)
  }, [])

  const metricCards: { k: StickerKind; c: string; l: string; v: number; u: string; pct: number }[] = [
    { k: 'tree', c: pal.eco, l: 'árvores eq', v: state.metrics.trees, u: 'un', pct: 0.68 },
    { k: 'drop', c: pal.sky, l: 'água', v: state.metrics.water, u: 'L', pct: 0.45 },
    { k: 'leaf', c: pal.plum, l: 'resíduos', v: state.metrics.waste, u: 'kg', pct: 0.85 },
    { k: 'bolt', c: pal.coin, l: 'energia', v: state.metrics.energy, u: 'kWh', pct: 0.3 },
  ]

  return (
    <PhoneFrame pal={pal}>
      <ScreenScroll>
        <div style={{ padding: '10px 14px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <GameAvatar pal={pal} size={32} label="MR" color={pal.eco} />
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontFamily: PET_FONT.mono, fontSize: 8, color: pal.muted }}>OI,</div>
              <div style={{ fontFamily: PET_FONT.game, fontSize: 14, fontWeight: 700 }}>Mariana</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '3px 8px',
                background: pal.paper,
                border: `1.5px solid ${pal.line}`,
                borderRadius: 999,
              }}
            >
              <Coin pal={pal} size={14} />
              <span style={{ fontFamily: PET_FONT.game, fontSize: 12, fontWeight: 700 }}>
                {state.coins.toLocaleString('pt-BR')}
              </span>
            </div>
            <StreakFire pal={pal} days={state.streak} />
            <LevelPill pal={pal} level={state.level} />
          </div>
        </div>

        <div
          style={{
            margin: '6px 14px 0',
            padding: '14px 12px 12px',
            background: pal.ecoSoft,
            border: `2px solid ${pal.line}`,
            borderRadius: 18,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 6, left: 8, right: 8 }}>
            <ConfettiStrip pal={pal} w={300} h={18} />
          </div>
          {idleSpark ? (
            <span
              key={idleSpark.id}
              className="motion-safe:animate-pp-twinkle"
              style={{ position: 'absolute', left: idleSpark.x, top: idleSpark.y }}
            >
              <Sparkle size={14} color={pal.sun} stroke={pal.line} />
            </span>
          ) : null}
          <div style={{ position: 'relative', textAlign: 'center', marginTop: 8 }}>
            <InteractiveMascot pal={pal} size={170} expression={mood} />
            <div className="motion-safe:animate-pp-rise" style={{ position: 'absolute', top: 0, right: -4 }}>
              <SpeechBubble pal={pal} hand tilt={4}>
                {moodInfo.line}
              </SpeechBubble>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 4 }}>
            <div style={{ fontFamily: PET_FONT.mono, fontSize: 9, color: pal.muted, letterSpacing: 1 }}>
              CO₂ EVITADO · ACUMULADO
            </div>
            <div style={{ marginTop: 2 }}>
              <CountUp
                to={state.co2}
                decimals={1}
                style={{ fontFamily: PET_FONT.game, fontSize: 46, fontWeight: 700, color: pal.ecoDeep, lineHeight: 0.95 }}
              />
              <span style={{ fontFamily: PET_FONT.game, fontSize: 16, color: pal.muted, marginLeft: 4 }}>kg</span>
            </div>
            <div style={{ fontFamily: PET_FONT.hand, fontSize: 16, color: pal.coralDeep, marginTop: -2 }}>
              ≈ 8 chuveiros quentes a menos
            </div>
          </div>

          <div style={{ marginTop: 10, padding: '0 4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontFamily: PET_FONT.game, fontSize: 12, fontWeight: 600 }}>saúde do planeta</span>
              <span
                style={{
                  fontFamily: PET_FONT.game,
                  fontSize: 12,
                  fontWeight: 700,
                  color: health > 0.5 ? pal.ecoDeep : pal.coralDeep,
                }}
              >
                {Math.round(health * 100)}%
              </span>
            </div>
            <GameBar pal={pal} pct={health} color={health > 0.5 ? pal.eco : pal.coralDeep} height={10} />
          </div>
        </div>

        {moodInfo.cta ? (
          <div style={{ padding: '10px 14px 0' }}>
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="motion-safe:animate-pp-pulse origin-center"
              style={{
                width: '100%',
                padding: '12px 14px',
                background: pal.eco,
                color: pal.bg,
                border: `2px solid ${pal.line}`,
                borderRadius: 14,
                fontFamily: PET_FONT.game,
                fontWeight: 700,
                fontSize: 15,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <Sparkle size={14} color={pal.bg} stroke={pal.line} />
              {moodInfo.cta}
            </button>
          </div>
        ) : null}

        <div style={{ padding: '12px 14px 0' }}>
          <div style={{ fontFamily: PET_FONT.game, fontSize: 14, fontWeight: 700, marginBottom: 8 }}>seus poderes ✦</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {metricCards.map((m) => (
              <GameCard key={m.k} pal={pal} style={{ padding: '10px 10px 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sticker pal={pal} kind={m.k} size={32} color={m.c} tilt={-4} label={null} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: PET_FONT.mono, fontSize: 8, color: pal.muted, textTransform: 'uppercase' }}>
                    {m.l}
                  </div>
                  <div style={{ fontFamily: PET_FONT.game, fontSize: 20, lineHeight: 1, fontWeight: 700 }}>
                    {String(m.v).replace('.', ',')}
                    <span style={{ fontSize: 10, color: pal.muted, marginLeft: 2, fontWeight: 500 }}>{m.u}</span>
                  </div>
                  <GameBar pal={pal} pct={m.pct} color={m.c} height={5} style={{ marginTop: 4 }} />
                </div>
              </GameCard>
            ))}
          </div>
        </div>

        {!moodInfo.cta ? (
          <div style={{ padding: '12px 14px 0' }}>
            <button
              type="button"
              onClick={() => onNavigate('register')}
              style={{
                width: '100%',
                padding: '11px 14px',
                background: pal.paper,
                color: pal.ink,
                border: `2px solid ${pal.eco}`,
                borderRadius: 14,
                fontFamily: PET_FONT.game,
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 18 }}>+</span> registrar nova ação
            </button>
          </div>
        ) : null}

        <div style={{ padding: '12px 14px 18px' }}>
          <GameCard pal={pal} color={pal.ecoSoft} style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <TreasureChest pal={pal} size={48} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: PET_FONT.mono, fontSize: 9, color: pal.muted }}>PRÓXIMA RECOMPENSA</div>
              <div style={{ fontFamily: PET_FONT.game, fontSize: 13, fontWeight: 700, lineHeight: 1.1, color: pal.ink }}>
                +2 reciclagens → selo Reciclador 7d!
              </div>
              <GameBar pal={pal} pct={0.85} color={pal.sun} height={6} style={{ marginTop: 4 }} />
            </div>
            <Coin pal={pal} size={26} label="+50" />
          </GameCard>
        </div>
      </ScreenScroll>
      <TabBar pal={pal} current="dashboard" onNavigate={onNavigate} />
    </PhoneFrame>
  )
}

// ─── Tela: registrar ação ──────────────────────────────────────────────────

interface ActionType {
  id: ActionId
  k: StickerKind
  c: string
  l: string
  pts: number
  co2: number
}

const ACTION_TYPES: ActionType[] = [
  { id: 'recic', k: 'leaf', c: '#29B4B7', l: 'Reciclei', pts: 24, co2: 1.2 },
  { id: 'agua', k: 'drop', c: '#A4DBDE', l: 'Economizei água', pts: 15, co2: 0.4 },
  { id: 'energia', k: 'bolt', c: '#C8A84B', l: 'Poupei energia', pts: 18, co2: 0.7 },
  { id: 'verde', k: 'tree', c: '#EBD9A8', l: 'Plantei / verde', pts: 30, co2: 0.5 },
]

const QTY_CHIPS = ['1 item', '2 itens', '3-5', '+5', 'personalizado'] as const

export interface SubmittedAction {
  type: ActionId
  qty: string
  points: number
  co2: number
}

interface RegisterScreenProps {
  pal: PetPalette
  onCancel: () => void
  onSubmit: (action: SubmittedAction) => void
}

function RegisterScreen({ pal, onCancel, onSubmit }: RegisterScreenProps) {
  const [type, setType] = useState<ActionId>(ACTION_TYPES[0].id)
  const [qty, setQty] = useState<string>(QTY_CHIPS[1])
  const [photo, setPhoto] = useState<boolean>(false)
  const sel = ACTION_TYPES.find((a) => a.id === type) ?? ACTION_TYPES[0]

  return (
    <PhoneFrame pal={pal}>
      <div style={{ position: 'absolute', top: 28, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: 'transparent',
              border: 'none',
              color: pal.ink,
              fontFamily: PET_FONT.game,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ← voltar
          </button>
          <span style={{ fontFamily: PET_FONT.mono, fontSize: 10, color: pal.muted, letterSpacing: 1 }}>NOVA AÇÃO</span>
          <span style={{ width: 60 }} />
        </div>

        <div style={{ overflowY: 'auto', flex: 1, padding: '4px 14px 14px' }}>
          <div style={{ fontFamily: PET_FONT.game, fontSize: 14, fontWeight: 700, marginBottom: 6 }}>o que você fez?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {ACTION_TYPES.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setType(a.id)}
                style={{
                  padding: '10px 8px',
                  background: type === a.id ? a.c : pal.paper,
                  border: `${type === a.id ? 2 : 1.5}px solid ${type === a.id ? pal.ink : pal.line}`,
                  borderRadius: 12,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: type === a.id ? pal.bg : pal.ink,
                  fontFamily: PET_FONT.game,
                  fontSize: 13,
                  fontWeight: 700,
                  textAlign: 'left',
                }}
              >
                <Sticker pal={pal} kind={a.k} size={28} color={type === a.id ? pal.paper : a.c} tilt={-4} label={null} />
                <span>{a.l}</span>
              </button>
            ))}
          </div>

          <div style={{ fontFamily: PET_FONT.game, fontSize: 14, fontWeight: 700, marginTop: 14, marginBottom: 6 }}>
            foto pra validar 📸
          </div>
          <button
            type="button"
            onClick={() => setPhoto(true)}
            style={{
              width: '100%',
              padding: 14,
              background: photo ? pal.ecoSoft : pal.paper,
              border: `2px ${photo ? 'solid' : 'dashed'} ${photo ? pal.eco : pal.line}`,
              borderRadius: 12,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              color: pal.ink,
              fontFamily: 'inherit',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: photo ? pal.eco : pal.ecoSoft,
                border: `2px solid ${pal.line}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="22" height="18" viewBox="0 0 28 22">
                <rect x="1" y="5" width="26" height="16" rx="2" fill="none" stroke={pal.line} strokeWidth="2" />
                <circle cx="14" cy="13" r="5" fill={photo ? pal.bg : 'none'} stroke={pal.line} strokeWidth="2" />
                <rect x="9" y="2" width="10" height="4" rx="1" fill="none" stroke={pal.line} strokeWidth="2" />
              </svg>
            </div>
            <span style={{ fontFamily: PET_FONT.game, fontSize: 13, fontWeight: 600 }}>
              {photo ? '✓ foto registrada · validada por IA' : 'tocar pra abrir câmera'}
            </span>
            <span style={{ fontFamily: PET_FONT.mono, fontSize: 9, color: pal.muted }}>
              captura direta · sem upload manual
            </span>
          </button>

          <div style={{ fontFamily: PET_FONT.game, fontSize: 13, fontWeight: 700, marginTop: 14, marginBottom: 6 }}>quanto?</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {QTY_CHIPS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setQty(q)}
                style={{
                  padding: '5px 12px',
                  border: `1.5px solid ${qty === q ? pal.eco : pal.line}`,
                  background: qty === q ? pal.eco : pal.paper,
                  color: qty === q ? pal.bg : pal.ink,
                  borderRadius: 999,
                  fontFamily: PET_FONT.game,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {q}
              </button>
            ))}
          </div>

          <div
            style={{
              marginTop: 14,
              padding: '10px 12px',
              background: pal.ecoSoft,
              border: `1.5px solid ${pal.line}`,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Sparkle size={14} color={pal.sun} stroke={pal.line} />
            <span style={{ flex: 1, fontFamily: PET_FONT.game, fontSize: 12, fontWeight: 600, color: pal.ink }}>vai render</span>
            <Coin pal={pal} size={20} label={`+${sel.pts}`} />
            <span style={{ fontFamily: PET_FONT.game, fontSize: 13, fontWeight: 700, color: pal.ecoDeep }}>
              +{sel.co2.toFixed(1)}kg CO₂
            </span>
          </div>
        </div>

        <div style={{ padding: '8px 14px 14px' }}>
          <button
            type="button"
            onClick={() => photo && onSubmit({ type, qty, points: sel.pts, co2: sel.co2 })}
            disabled={!photo}
            style={{
              width: '100%',
              padding: '12px 14px',
              background: photo ? pal.eco : pal.line,
              color: photo ? pal.bg : pal.muted,
              border: `2px solid ${pal.line}`,
              borderRadius: 14,
              fontFamily: PET_FONT.game,
              fontWeight: 700,
              fontSize: 16,
              cursor: photo ? 'pointer' : 'not-allowed',
              opacity: photo ? 1 : 0.6,
            }}
          >
            {photo ? 'alimentar planetinha →' : 'tira uma foto primeiro'}
          </button>
        </div>
      </div>
    </PhoneFrame>
  )
}

// ─── Tela: sucesso ─────────────────────────────────────────────────────────

interface SuccessScreenProps {
  pal: PetPalette
  gained: { points: number; co2: number }
  onContinue: () => void
}

function SuccessScreen({ pal, gained, onContinue }: SuccessScreenProps) {
  useEffect(() => {
    const t = window.setTimeout(onContinue, 4000)
    return () => window.clearTimeout(t)
  }, [onContinue])

  return (
    <PhoneFrame pal={pal}>
      <div
        style={{
          position: 'absolute',
          inset: '28px 0 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '30px 18px',
          overflow: 'hidden',
        }}
      >
        <ConfettiBurst pal={pal} />

        <div style={{ fontFamily: PET_FONT.mono, fontSize: 11, color: pal.sun, letterSpacing: 3, zIndex: 1 }}>
          AÇÃO REGISTRADA!
        </div>
        <div style={{ fontFamily: PET_FONT.game, fontSize: 28, fontWeight: 700, color: pal.ecoDeep, marginTop: 6, zIndex: 1 }}>
          uhuuu! ✦
        </div>

        <div style={{ position: 'relative', marginTop: 18, zIndex: 1 }}>
          <InteractiveMascot pal={pal} size={200} expression="celebrating" />
        </div>

        <div className="motion-safe:animate-pp-rise" style={{ zIndex: 1, marginTop: -8 }}>
          <SpeechBubble pal={pal} color={pal.sun} hand>
            obrigada!
          </SpeechBubble>
        </div>

        <div style={{ marginTop: 18, display: 'flex', gap: 10, alignSelf: 'stretch', zIndex: 1 }}>
          <div
            style={{
              flex: 1,
              padding: '10px 12px',
              background: pal.ecoSoft,
              border: `2px solid ${pal.line}`,
              borderRadius: 12,
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: PET_FONT.mono, fontSize: 9, color: pal.muted }}>Soul Points</div>
            <CountUp
              to={gained.points}
              duration={1200}
              style={{ fontFamily: PET_FONT.game, fontSize: 28, fontWeight: 700, color: pal.ecoDeep }}
            />
            <span style={{ fontFamily: PET_FONT.game, fontSize: 14, color: pal.muted, marginLeft: 3 }}>pts</span>
          </div>
          <div
            style={{
              flex: 1,
              padding: '10px 12px',
              background: `${pal.sunDeep}22`,
              border: `2px solid ${pal.sun}`,
              borderRadius: 12,
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: PET_FONT.mono, fontSize: 9, color: pal.muted }}>CO₂ evitado</div>
            <div>
              <span className="inline-block motion-safe:animate-pp-coin origin-center">
                <Coin pal={pal} size={18} />
              </span>
              <CountUp
                to={gained.co2}
                decimals={1}
                duration={1200}
                style={{ fontFamily: PET_FONT.game, fontSize: 28, fontWeight: 700, color: pal.sun, marginLeft: 6 }}
              />
              <span style={{ fontFamily: PET_FONT.game, fontSize: 12, color: pal.muted, marginLeft: 3 }}>kg</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onContinue}
          style={{
            marginTop: 'auto',
            marginBottom: 4,
            width: '100%',
            padding: '12px 14px',
            background: pal.eco,
            color: pal.bg,
            border: `2px solid ${pal.line}`,
            borderRadius: 14,
            fontFamily: PET_FONT.game,
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          continuar →
        </button>
      </div>
    </PhoneFrame>
  )
}

// ─── Tela: histórico ───────────────────────────────────────────────────────

function HistoryScreen({ pal, state, onNavigate }: ScreenProps) {
  const labels: Record<ActionId, { l: string; c: string; k: StickerKind }> = {
    recic: { l: 'Reciclagem', c: pal.eco, k: 'leaf' },
    agua: { l: 'Água', c: pal.sky, k: 'drop' },
    energia: { l: 'Energia', c: pal.coin, k: 'bolt' },
    verde: { l: 'Verde', c: pal.ecoDeep, k: 'tree' },
    trilha: { l: 'Trilha', c: pal.plum, k: 'star' },
    compost: { l: 'Compostagem', c: pal.eco, k: 'leaf' },
  }

  const [filter, setFilter] = useState<ActionId | 'all'>('all')
  const sorted = [...state.history].sort((a, b) => b.ts - a.ts)
  const list = filter === 'all' ? sorted : sorted.filter((e) => e.type === filter)

  const fmtDate = (ts: number): string => {
    const d = new Date(ts)
    const days = Math.floor((NOW() - ts) / 86400000)
    if (days === 0) return 'hoje'
    if (days === 1) return 'ontem'
    if (days < 7) return `há ${days}d`
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  }

  const chips: [ActionId | 'all', string][] = [
    ['all', 'tudo'],
    ['recic', '♻️ recic'],
    ['agua', '💧 água'],
    ['energia', '⚡ energia'],
    ['verde', '🌱 verde'],
  ]

  return (
    <PhoneFrame pal={pal}>
      <ScreenScroll>
        <div style={{ padding: '10px 14px 6px' }}>
          <div style={{ fontFamily: PET_FONT.mono, fontSize: 10, color: pal.muted, letterSpacing: 1 }}>
            HISTÓRICO DE AÇÕES
          </div>
          <div style={{ fontFamily: PET_FONT.game, fontSize: 24, fontWeight: 700 }}>sua trajetória ✦</div>
        </div>

        <div style={{ padding: '0 14px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          <div style={{ padding: '8px 6px', background: pal.paper, border: `1.5px solid ${pal.line}`, borderRadius: 10, textAlign: 'center' }}>
            <div style={{ fontFamily: PET_FONT.game, fontSize: 22, fontWeight: 700, color: pal.ecoDeep }}>
              {state.history.length}
            </div>
            <div style={{ fontFamily: PET_FONT.mono, fontSize: 9, color: pal.muted }}>AÇÕES</div>
          </div>
          <div style={{ padding: '8px 6px', background: pal.paper, border: `1.5px solid ${pal.line}`, borderRadius: 10, textAlign: 'center' }}>
            <div style={{ fontFamily: PET_FONT.game, fontSize: 22, fontWeight: 700, color: pal.sun }}>
              {state.history.reduce((s, e) => s + e.points, 0)}
            </div>
            <div style={{ fontFamily: PET_FONT.mono, fontSize: 9, color: pal.muted }}>PTS</div>
          </div>
          <div style={{ padding: '8px 6px', background: pal.paper, border: `1.5px solid ${pal.line}`, borderRadius: 10, textAlign: 'center' }}>
            <div style={{ fontFamily: PET_FONT.game, fontSize: 22, fontWeight: 700, color: pal.plum }}>{state.streak}</div>
            <div style={{ fontFamily: PET_FONT.mono, fontSize: 9, color: pal.muted }}>STREAK</div>
          </div>
        </div>

        <div style={{ padding: '10px 14px 6px', display: 'flex', gap: 6, overflowX: 'auto' }}>
          {chips.map(([id, l]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              style={{
                padding: '4px 10px',
                whiteSpace: 'nowrap',
                border: `1.5px solid ${filter === id ? pal.eco : pal.line}`,
                background: filter === id ? pal.eco : pal.paper,
                color: filter === id ? pal.bg : pal.ink,
                borderRadius: 999,
                fontFamily: PET_FONT.game,
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {l}
            </button>
          ))}
        </div>

        <div style={{ padding: '4px 14px 14px' }}>
          {list.length === 0 ? (
            <div style={{ padding: 30, textAlign: 'center', color: pal.muted, fontFamily: PET_FONT.ui }}>
              nenhuma ação dessa categoria ainda 🌱
            </div>
          ) : null}
          {list.map((e, i) => {
            const lab = labels[e.type] ?? labels.recic
            return (
              <div
                key={e.id}
                className="motion-safe:animate-pp-rise"
                style={{
                  animationDelay: `${i * 0.04}s`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 6px',
                  borderBottom: `1px solid ${pal.line}`,
                }}
              >
                <Sticker pal={pal} kind={lab.k} size={32} color={lab.c} tilt={-4} label={null} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: PET_FONT.game, fontSize: 13, fontWeight: 600, color: pal.ink }}>{lab.l}</div>
                  <div style={{ fontFamily: PET_FONT.mono, fontSize: 9, color: pal.muted }}>
                    {e.qty} · {fmtDate(e.ts)}
                  </div>
                </div>
                {e.co2 > 0 ? (
                  <span style={{ fontFamily: PET_FONT.mono, fontSize: 10, color: pal.ecoDeep }}>+{e.co2.toFixed(1)}kg</span>
                ) : null}
                <span style={{ fontFamily: PET_FONT.game, fontSize: 14, fontWeight: 700, color: pal.sun }}>+{e.points}</span>
              </div>
            )
          })}
        </div>
      </ScreenScroll>
      <TabBar pal={pal} current="history" onNavigate={onNavigate} />
    </PhoneFrame>
  )
}

// ─── Tela: perfil ──────────────────────────────────────────────────────────

function ProfileScreen({ pal, state, onNavigate, onReset }: ScreenProps & { onReset: () => void }) {
  const mood = moodFromState(state)
  const stats: { l: string; v: string | number; c: string }[] = [
    { l: 'CO₂ kg', v: state.co2.toFixed(1).replace('.', ','), c: pal.ecoDeep },
    { l: 'AÇÕES', v: state.history.length, c: pal.coralDeep },
    { l: 'MOEDAS', v: state.coins.toLocaleString('pt-BR'), c: pal.sun },
  ]

  return (
    <PhoneFrame pal={pal}>
      <ScreenScroll>
        <div style={{ padding: '10px 14px 0' }}>
          <div style={{ fontFamily: PET_FONT.mono, fontSize: 10, color: pal.muted, letterSpacing: 1 }}>PERFIL</div>
        </div>

        <div
          style={{
            margin: '6px 14px 0',
            padding: '14px 12px',
            background: pal.ecoSoft,
            border: `2px solid ${pal.line}`,
            borderRadius: 16,
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <InteractiveMascot pal={pal} size={92} expression={mood} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: PET_FONT.game, fontSize: 18, fontWeight: 700 }}>Mariana Reis</div>
              <div style={{ fontFamily: PET_FONT.mono, fontSize: 9, color: pal.muted }}>@mari.reis · São Paulo</div>
              <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                <LevelPill pal={pal} level={state.level} />
                <StreakFire pal={pal} days={state.streak} />
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: PET_FONT.game, fontSize: 11, fontWeight: 600 }}>xp · nv {state.level + 1}</span>
              <span style={{ fontFamily: PET_FONT.mono, fontSize: 9, color: pal.muted }}>
                {state.xp.toLocaleString('pt-BR')} / {state.xpToNext.toLocaleString('pt-BR')}
              </span>
            </div>
            <GameBar pal={pal} pct={state.xp / state.xpToNext} color={pal.sun} height={8} style={{ marginTop: 4 }} />
          </div>
        </div>

        <div style={{ padding: '10px 14px 0', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          {stats.map((s) => (
            <div
              key={s.l}
              style={{ padding: '8px 6px', background: pal.paper, border: `1.5px solid ${pal.line}`, borderRadius: 10, textAlign: 'center' }}
            >
              <div style={{ fontFamily: PET_FONT.game, fontSize: 20, fontWeight: 700, color: s.c }}>{s.v}</div>
              <div style={{ fontFamily: PET_FONT.mono, fontSize: 9, color: pal.muted }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: '12px 14px 0' }}>
          <div style={{ fontFamily: PET_FONT.game, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>vitrine 🏆</div>
          <div
            style={{
              padding: '12px 8px',
              background: pal.paper,
              border: `1.5px solid ${pal.line}`,
              borderRadius: 12,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 8,
            }}
          >
            <Sticker pal={pal} kind="leaf" size={44} color={pal.eco} tilt={-4} label="iniciante" />
            <Sticker pal={pal} kind="trophy" size={44} color={pal.coral} tilt={3} label="100 itens" />
            <Sticker pal={pal} kind="drop" size={44} color={pal.sky} tilt={-2} label="-200L" />
            <Sticker pal={pal} kind="star" size={44} color={pal.plum} tilt={4} label="combo" />
          </div>
        </div>

        <div style={{ padding: '12px 14px 18px' }}>
          <button
            type="button"
            onClick={onReset}
            style={{
              width: '100%',
              padding: '10px 14px',
              background: 'transparent',
              color: pal.muted,
              border: `1.5px dashed ${pal.line}`,
              borderRadius: 12,
              fontFamily: PET_FONT.game,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ↻ resetar progresso (demo)
          </button>
        </div>
      </ScreenScroll>
      <TabBar pal={pal} current="profile" onNavigate={onNavigate} />
    </PhoneFrame>
  )
}

// ─── App / roteador de telas ───────────────────────────────────────────────

export function PetPlanetApp() {
  const pal = PET_PALETTE
  const [state, setState] = useState<PetState>(loadState)
  const [screen, setScreen] = useState<Screen>(state.onboarded ? 'dashboard' : 'onboarding')
  const [lastGained, setLastGained] = useState<{ points: number; co2: number } | null>(null)

  useEffect(() => {
    saveState(state)
  }, [state])

  const finishOnboarding = (): void => {
    setState((s) => ({ ...s, onboarded: true }))
    setScreen('dashboard')
  }

  const submitAction = (action: SubmittedAction): void => {
    const entry: HistoryEntry = {
      id: NOW(),
      type: action.type,
      qty: action.qty,
      points: action.points,
      co2: action.co2,
      ts: NOW(),
    }
    setState((s) => ({
      ...s,
      co2: +(s.co2 + action.co2).toFixed(1),
      coins: s.coins + action.points,
      xp: Math.min(s.xpToNext, s.xp + action.points),
      lastActionAt: NOW(),
      history: [entry, ...s.history].slice(0, 30),
      metrics: {
        ...s.metrics,
        waste: action.type === 'recic' ? +(s.metrics.waste + 0.6).toFixed(1) : s.metrics.waste,
      },
    }))
    setLastGained({ points: action.points, co2: action.co2 })
    setScreen('success')
  }

  const resetAll = (): void => {
    if (!window.confirm('Resetar todo o progresso da demo?')) return
    localStorage.removeItem(STATE_KEY)
    setState(DEFAULT_STATE)
    setScreen('onboarding')
  }

  let body: ReactNode
  if (screen === 'onboarding') {
    body = <OnboardingScreen pal={pal} onDone={finishOnboarding} />
  } else if (screen === 'register') {
    body = <RegisterScreen pal={pal} onCancel={() => setScreen('dashboard')} onSubmit={submitAction} />
  } else if (screen === 'success') {
    body = <SuccessScreen pal={pal} gained={lastGained ?? { points: 0, co2: 0 }} onContinue={() => setScreen('dashboard')} />
  } else if (screen === 'history') {
    body = <HistoryScreen pal={pal} state={state} onNavigate={setScreen} />
  } else if (screen === 'profile') {
    body = <ProfileScreen pal={pal} state={state} onNavigate={setScreen} onReset={resetAll} />
  } else {
    body = <DashboardScreen pal={pal} state={state} onNavigate={setScreen} />
  }

  // O fundo fica a cargo da página que hospeda o protótipo.
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        key={screen}
        className="motion-safe:animate-pp-screen-in"
        style={{ filter: 'drop-shadow(0 18px 40px rgba(14,53,80,0.22))' }}
      >
        {body}
      </div>
    </div>
  )
}
