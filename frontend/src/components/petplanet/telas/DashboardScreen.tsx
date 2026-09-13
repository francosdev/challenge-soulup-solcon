import { useEffect, useState } from 'react'
import { healthFromState, moodFromState } from '../../../services/petplanet'
import type { Mood, ScreenProps, StickerKind } from '../../../types/petplanet'
import { Coin } from '../Coin'
import { ConfettiStrip } from '../ConfettiStrip'
import { CountUp } from '../CountUp'
import { GameBar, type CorBarra } from '../GameBar'
import { GameCard } from '../GameCard'
import { GameInitials } from '../GameInitials'
import { InteractiveMascot } from '../InteractiveMascot'
import { LevelPill } from '../LevelPill'
import { PhoneFrame } from '../PhoneFrame'
import { ScreenScroll } from '../ScreenScroll'
import { Sparkle } from '../Sparkle'
import { SpeechBubble } from '../SpeechBubble'
import { Sticker } from '../Sticker'
import { StreakFire } from '../StreakFire'
import { TabBar } from '../TabBar'
import { TreasureChest } from '../TreasureChest'

/** Pontos onde o brilho ocioso pode aparecer dentro do painel do mascote. */
const POSICOES_BRILHO: readonly string[] = [
  'left-[40px] top-[120px]',
  'left-[230px] top-[140px]',
  'left-[70px] top-[230px]',
  'left-[250px] top-[250px]',
  'left-[150px] top-[110px]',
  'left-[110px] top-[270px]',
]

const MOOD_LINES: Record<Mood, { line: string; cta: string | null }> = {
  happy: { line: 'tudo florescendo por aqui ✦', cta: null },
  celebrating: { line: 'UHUUU! +pts pra você', cta: null },
  sleepy: { line: 'tô bocejando… faz uma ação?', cta: 'alimentar planetinha →' },
  sad: { line: 'saudade…', cta: 'voltar a brilhar →' },
}

export function DashboardScreen({ pal, state, onNavigate }: ScreenProps) {
  const mood = moodFromState(state)
  const health = healthFromState(state)
  const moodInfo = MOOD_LINES[mood]

  const [idleSpark, setIdleSpark] = useState<{ posicao: string; id: number } | null>(null)

  useEffect(() => {
    const tick = (): void => {
      const posicao = POSICOES_BRILHO[Math.floor(Math.random() * POSICOES_BRILHO.length)]
      setIdleSpark({ posicao, id: Date.now() })
      window.setTimeout(() => setIdleSpark(null), 1200)
    }
    const id = window.setInterval(tick, 8000 + Math.random() * 4000)
    return () => window.clearInterval(id)
  }, [])

  const metricCards: { k: StickerKind; c: string; cor: CorBarra; l: string; v: number; u: string; pct: number }[] = [
    { k: 'tree', c: pal.eco, cor: 'soul', l: 'árvores eq', v: state.metrics.trees, u: 'un', pct: 0.68 },
    { k: 'drop', c: pal.sky, cor: 'soul-light', l: 'água', v: state.metrics.water, u: 'L', pct: 0.45 },
    { k: 'leaf', c: pal.plum, cor: 'soul', l: 'resíduos', v: state.metrics.waste, u: 'kg', pct: 0.85 },
    { k: 'bolt', c: pal.coin, cor: 'sun', l: 'energia', v: state.metrics.energy, u: 'kWh', pct: 0.3 },
  ]

  return (
    <PhoneFrame>
      <ScreenScroll>
        <div className="flex items-center justify-between px-[14px] pb-1.5 pt-2.5">
          <div className="flex items-center gap-2">
            <GameInitials label="MR" />
            <div className="leading-[1.1]">
              <div className="font-mono text-[8px] text-[#8FA3B0]">OI,</div>
              <div className="text-[14px] font-bold">Mariana</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="inline-flex items-center gap-1 rounded-full border-[1.5px] border-soul-deep bg-navy px-2 py-[3px]">
              <Coin pal={pal} size={14} />
              <span className="text-[12px] font-bold">{state.coins.toLocaleString('pt-BR')}</span>
            </div>
            <StreakFire pal={pal} days={state.streak} />
            <LevelPill level={state.level} />
          </div>
        </div>

        <div className="relative mx-[14px] mt-1.5 overflow-hidden rounded-[18px] border-2 border-soul-deep bg-soul/[.14] px-3 pb-3 pt-3.5">
          <div className="absolute left-2 right-2 top-1.5">
            <ConfettiStrip pal={pal} w={300} h={18} />
          </div>
          {idleSpark ? (
            <span key={idleSpark.id} className={`absolute motion-safe:animate-pp-twinkle ${idleSpark.posicao}`}>
              <Sparkle size={14} color={pal.sun} stroke={pal.line} />
            </span>
          ) : null}
          <div className="relative mt-2 text-center">
            <InteractiveMascot pal={pal} size={170} expression={mood} />
            <div className="absolute -right-1 top-0 motion-safe:animate-pp-rise">
              <SpeechBubble hand tilt={4}>
                {moodInfo.line}
              </SpeechBubble>
            </div>
          </div>

          <div className="mt-1 text-center">
            <div className="font-mono text-[9px] tracking-[1px] text-[#8FA3B0]">CO₂ EVITADO · ACUMULADO</div>
            <div className="mt-0.5">
              <CountUp to={state.co2} decimals={1} className="text-[46px] font-bold leading-[0.95] text-soul-light" />
              <span className="ml-1 text-[16px] text-[#8FA3B0]">kg</span>
            </div>
            <div className="-mt-0.5 font-['Caveat',cursive] text-[16px] text-sun-line">≈ 8 chuveiros quentes a menos</div>
          </div>

          <div className="mt-2.5 px-1">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[12px] font-semibold">saúde do planeta</span>
              <span className={`text-[12px] font-bold ${health > 0.5 ? 'text-soul-light' : 'text-sun-line'}`}>
                {Math.round(health * 100)}%
              </span>
            </div>
            <GameBar pct={health} cor={health > 0.5 ? 'soul' : 'sun-line'} altura={10} />
          </div>
        </div>

        {moodInfo.cta ? (
          <div className="px-[14px] pt-2.5">
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="flex w-full origin-center cursor-pointer items-center justify-center gap-2 rounded-[14px] border-2 border-soul-deep bg-soul px-3.5 py-3 text-[15px] font-bold text-navy-dark motion-safe:animate-pp-pulse"
            >
              <Sparkle size={14} color={pal.bg} stroke={pal.line} />
              {moodInfo.cta}
            </button>
          </div>
        ) : null}

        <div className="px-[14px] pt-3">
          <div className="mb-2 text-[14px] font-bold">seus poderes ✦</div>
          <div className="grid grid-cols-[1fr_1fr] gap-2">
            {metricCards.map((m) => (
              <GameCard key={m.k} className="flex items-center gap-2 px-2.5 pb-2 pt-2.5">
                <Sticker pal={pal} kind={m.k} size={32} color={m.c} tilt={-4} label={null} />
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[8px] uppercase text-[#8FA3B0]">{m.l}</div>
                  <div className="text-[20px] font-bold leading-none">
                    {String(m.v).replace('.', ',')}
                    <span className="ml-0.5 text-[10px] font-medium text-[#8FA3B0]">{m.u}</span>
                  </div>
                  <GameBar pct={m.pct} cor={m.cor} altura={5} className="mt-1" />
                </div>
              </GameCard>
            ))}
          </div>
        </div>

        {!moodInfo.cta ? (
          <div className="px-[14px] pt-3">
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] border-2 border-soul bg-navy px-3.5 py-[11px] text-[14px] font-bold text-white"
            >
              <span className="text-[18px]">+</span> registrar nova ação
            </button>
          </div>
        ) : null}

        <div className="px-[14px] pb-[18px] pt-3">
          <GameCard painel className="flex items-center gap-2.5 px-3 py-2.5">
            <TreasureChest pal={pal} size={48} />
            <div className="flex-1">
              <div className="font-mono text-[9px] text-[#8FA3B0]">PRÓXIMA RECOMPENSA</div>
              <div className="text-[13px] font-bold leading-[1.1] text-white">+2 reciclagens → selo Reciclador 7d!</div>
              <GameBar pct={0.85} cor="sun" altura={6} className="mt-1" />
            </div>
            <Coin pal={pal} size={26} label="+50" />
          </GameCard>
        </div>
      </ScreenScroll>
      <TabBar current="dashboard" onNavigate={onNavigate} />
    </PhoneFrame>
  )
}
