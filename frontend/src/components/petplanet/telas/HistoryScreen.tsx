import { useState } from 'react'
import { NOW } from '../../../services/petplanet'
import type { ActionId, ScreenProps, StickerKind } from '../../../types/petplanet'
import { PhoneFrame } from '../PhoneFrame'
import { ScreenScroll } from '../ScreenScroll'
import { Sticker } from '../Sticker'
import { TabBar } from '../TabBar'

/** Atraso de entrada de cada linha (0,04s por posição), para no máximo 30 linhas. */
const ATRASOS_LINHA: readonly string[] = [
  '[animation-delay:0s]', '[animation-delay:0.04s]', '[animation-delay:0.08s]', '[animation-delay:0.12s]', '[animation-delay:0.16s]', '[animation-delay:0.2s]',
  '[animation-delay:0.24s]', '[animation-delay:0.28s]', '[animation-delay:0.32s]', '[animation-delay:0.36s]', '[animation-delay:0.4s]', '[animation-delay:0.44s]',
  '[animation-delay:0.48s]', '[animation-delay:0.52s]', '[animation-delay:0.56s]', '[animation-delay:0.6s]', '[animation-delay:0.64s]', '[animation-delay:0.68s]',
  '[animation-delay:0.72s]', '[animation-delay:0.76s]', '[animation-delay:0.8s]', '[animation-delay:0.84s]', '[animation-delay:0.88s]', '[animation-delay:0.92s]',
  '[animation-delay:0.96s]', '[animation-delay:1s]', '[animation-delay:1.04s]', '[animation-delay:1.08s]', '[animation-delay:1.12s]', '[animation-delay:1.16s]',
]

const CHIPS: [ActionId | 'all', string][] = [
  ['all', 'tudo'],
  ['recic', '♻️ recic'],
  ['agua', '💧 água'],
  ['energia', '⚡ energia'],
  ['verde', '🌱 verde'],
]

function fmtDate(ts: number): string {
  const d = new Date(ts)
  const days = Math.floor((NOW() - ts) / 86400000)
  if (days === 0) return 'hoje'
  if (days === 1) return 'ontem'
  if (days < 7) return `há ${days}d`
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

export function HistoryScreen({ pal, state, onNavigate }: ScreenProps) {
  const labels: Record<ActionId, { l: string; c: string; k: StickerKind }> = {
    recic: { l: 'Reciclagem', c: pal.eco, k: 'leaf' },
    agua: { l: 'Água', c: pal.sky, k: 'drop' },
    energia: { l: 'Energia', c: pal.coin, k: 'bolt' },
    verde: { l: 'Verde', c: pal.ecoDeep, k: 'tree' },
    trilha: { l: 'Trilha', c: pal.plum, k: 'star' },
    compost: { l: 'Compostagem', c: pal.eco, k: 'leaf' },
  }

  const [filter, setFilter] = useState<ActionId | 'all'>('all')
  // Lista ordenada e filtrada calculada na renderização, a partir do estado e do filtro.
  const sorted = [...state.history].sort((a, b) => b.ts - a.ts)
  const list = filter === 'all' ? sorted : sorted.filter((e) => e.type === filter)

  return (
    <PhoneFrame>
      <ScreenScroll>
        <div className="px-[14px] pb-1.5 pt-2.5">
          <div className="font-mono text-[10px] tracking-[1px] text-[#8FA3B0]">HISTÓRICO DE AÇÕES</div>
          <div className="text-[24px] font-bold">sua trajetória ✦</div>
        </div>

        <div className="grid grid-cols-[1fr_1fr_1fr] gap-1.5 px-[14px]">
          <div className="rounded-[10px] border-[1.5px] border-soul-deep bg-navy px-1.5 py-2 text-center">
            <div className="text-[22px] font-bold text-soul-light">{state.history.length}</div>
            <div className="font-mono text-[9px] text-[#8FA3B0]">AÇÕES</div>
          </div>
          <div className="rounded-[10px] border-[1.5px] border-soul-deep bg-navy px-1.5 py-2 text-center">
            <div className="text-[22px] font-bold text-sun">{state.history.reduce((s, e) => s + e.points, 0)}</div>
            <div className="font-mono text-[9px] text-[#8FA3B0]">PTS</div>
          </div>
          <div className="rounded-[10px] border-[1.5px] border-soul-deep bg-navy px-1.5 py-2 text-center">
            <div className="text-[22px] font-bold text-soul">{state.streak}</div>
            <div className="font-mono text-[9px] text-[#8FA3B0]">STREAK</div>
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto px-[14px] pb-1.5 pt-2.5">
          {CHIPS.map(([id, l]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={`cursor-pointer whitespace-nowrap rounded-full border-[1.5px] px-2.5 py-1 text-[11px] font-bold ${
                filter === id ? 'border-soul bg-soul text-navy-dark' : 'border-soul-deep bg-navy text-white'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="px-[14px] pb-3.5 pt-1">
          {list.length === 0 ? (
            <div className="p-[30px] text-center text-[#8FA3B0]">nenhuma ação dessa categoria ainda 🌱</div>
          ) : null}
          {list.map((e, i) => {
            const lab = labels[e.type] ?? labels.recic
            return (
              <div
                key={e.id}
                className={`flex items-center gap-2.5 border-b border-soul-deep px-1.5 py-2.5 motion-safe:animate-pp-rise ${ATRASOS_LINHA[i] ?? ''}`}
              >
                <Sticker pal={pal} kind={lab.k} size={32} color={lab.c} tilt={-4} label={null} />
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold text-white">{lab.l}</div>
                  <div className="font-mono text-[9px] text-[#8FA3B0]">
                    {e.qty} · {fmtDate(e.ts)}
                  </div>
                </div>
                {e.co2 > 0 ? <span className="font-mono text-[10px] text-soul-light">+{e.co2.toFixed(1)}kg</span> : null}
                <span className="text-[14px] font-bold text-sun">+{e.points}</span>
              </div>
            )
          })}
        </div>
      </ScreenScroll>
      <TabBar current="history" onNavigate={onNavigate} />
    </PhoneFrame>
  )
}
