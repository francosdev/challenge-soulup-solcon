import { moodFromState } from '../../../services/petplanet'
import type { ScreenProps } from '../../../types/petplanet'
import { GameBar } from '../GameBar'
import { InteractiveMascot } from '../InteractiveMascot'
import { LevelPill } from '../LevelPill'
import { PhoneFrame } from '../PhoneFrame'
import { ScreenScroll } from '../ScreenScroll'
import { Sticker } from '../Sticker'
import { StreakFire } from '../StreakFire'
import { TabBar } from '../TabBar'

type ProfileScreenProps = ScreenProps & {
  onReset: () => void
}

export function ProfileScreen({ pal, state, onNavigate, onReset }: ProfileScreenProps) {
  const mood = moodFromState(state)
  const stats: { l: string; v: string | number; cor: string }[] = [
    { l: 'CO₂ kg', v: state.co2.toFixed(1).replace('.', ','), cor: 'text-soul-light' },
    { l: 'AÇÕES', v: state.history.length, cor: 'text-sun-line' },
    { l: 'MOEDAS', v: state.coins.toLocaleString('pt-BR'), cor: 'text-sun' },
  ]

  return (
    <PhoneFrame>
      <ScreenScroll>
        <div className="px-[14px] pt-2.5">
          <div className="font-mono text-[10px] tracking-[1px] text-[#8FA3B0]">PERFIL</div>
        </div>

        <div className="relative mx-[14px] mt-1.5 rounded-2xl border-2 border-soul-deep bg-soul/[.14] px-3 py-3.5">
          <div className="flex items-center gap-3">
            <InteractiveMascot pal={pal} size={92} expression={mood} />
            <div className="flex-1">
              <div className="text-[18px] font-bold">Mariana Reis</div>
              <div className="font-mono text-[9px] text-[#8FA3B0]">@mari.reis · São Paulo</div>
              <div className="mt-1.5 flex flex-wrap gap-1">
                <LevelPill level={state.level} />
                <StreakFire pal={pal} days={state.streak} />
              </div>
            </div>
          </div>
          <div className="mt-2.5">
            <div className="flex justify-between">
              <span className="text-[11px] font-semibold">xp · nv {state.level + 1}</span>
              <span className="font-mono text-[9px] text-[#8FA3B0]">
                {state.xp.toLocaleString('pt-BR')} / {state.xpToNext.toLocaleString('pt-BR')}
              </span>
            </div>
            <GameBar pct={state.xp / state.xpToNext} cor="sun" altura={8} className="mt-1" />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_1fr_1fr] gap-1.5 px-[14px] pt-2.5">
          {stats.map((s) => (
            <div key={s.l} className="rounded-[10px] border-[1.5px] border-soul-deep bg-navy px-1.5 py-2 text-center">
              <div className={`text-[20px] font-bold ${s.cor}`}>{s.v}</div>
              <div className="font-mono text-[9px] text-[#8FA3B0]">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="px-[14px] pt-3">
          <div className="mb-1.5 text-[13px] font-bold">vitrine 🏆</div>
          <div className="grid grid-cols-[repeat(4,1fr)] gap-2 rounded-xl border-[1.5px] border-soul-deep bg-navy px-2 py-3">
            <Sticker pal={pal} kind="leaf" size={44} color={pal.eco} tilt={-4} label="iniciante" />
            <Sticker pal={pal} kind="trophy" size={44} color={pal.coral} tilt={3} label="100 itens" />
            <Sticker pal={pal} kind="drop" size={44} color={pal.sky} tilt={-2} label="-200L" />
            <Sticker pal={pal} kind="star" size={44} color={pal.plum} tilt={4} label="combo" />
          </div>
        </div>

        <div className="px-[14px] pb-[18px] pt-3">
          <button
            type="button"
            onClick={onReset}
            className="w-full cursor-pointer rounded-xl border-[1.5px] border-dashed border-soul-deep px-3.5 py-2.5 text-[12px] font-semibold text-[#8FA3B0]"
          >
            ↻ resetar progresso (demo)
          </button>
        </div>
      </ScreenScroll>
      <TabBar current="profile" onNavigate={onNavigate} />
    </PhoneFrame>
  )
}
