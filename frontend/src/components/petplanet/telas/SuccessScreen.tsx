import { useEffect } from 'react'
import type { PetPalette } from '../../../types/petplanet'
import { Coin } from '../Coin'
import { ConfettiBurst } from '../ConfettiBurst'
import { CountUp } from '../CountUp'
import { InteractiveMascot } from '../InteractiveMascot'
import { PhoneFrame } from '../PhoneFrame'
import { SpeechBubble } from '../SpeechBubble'

type SuccessScreenProps = {
  pal: PetPalette
  gained: { points: number; co2: number }
  onContinue: () => void
}

export function SuccessScreen({ pal, gained, onContinue }: SuccessScreenProps) {
  useEffect(() => {
    const t = window.setTimeout(onContinue, 4000)
    return () => window.clearTimeout(t)
  }, [onContinue])

  return (
    <PhoneFrame>
      <div className="absolute inset-x-0 bottom-0 top-7 flex flex-col items-center overflow-hidden px-[18px] py-[30px]">
        <ConfettiBurst />

        <div className="z-[1] font-mono text-[11px] tracking-[3px] text-sun">AÇÃO REGISTRADA!</div>
        <div className="z-[1] mt-1.5 text-[28px] font-bold text-soul-light">uhuuu! ✦</div>

        <div className="relative z-[1] mt-[18px]">
          <InteractiveMascot pal={pal} size={200} expression="celebrating" />
        </div>

        <div className="z-[1] -mt-2 motion-safe:animate-pp-rise">
          <SpeechBubble ambar hand>
            obrigada!
          </SpeechBubble>
        </div>

        <div className="z-[1] mt-[18px] flex gap-2.5 self-stretch">
          <div className="flex-1 rounded-xl border-2 border-soul-deep bg-soul/[.14] px-3 py-2.5 text-center">
            <div className="font-mono text-[9px] text-[#8FA3B0]">Soul Points</div>
            <CountUp to={gained.points} duration={1200} className="text-[28px] font-bold text-soul-light" />
            <span className="ml-[3px] text-[14px] text-[#8FA3B0]">pts</span>
          </div>
          <div className="flex-1 rounded-xl border-2 border-sun bg-sun/[.1333] px-3 py-2.5 text-center">
            <div className="font-mono text-[9px] text-[#8FA3B0]">CO₂ evitado</div>
            <div>
              <span className="inline-block origin-center motion-safe:animate-pp-coin">
                <Coin pal={pal} size={18} />
              </span>
              <CountUp to={gained.co2} decimals={1} duration={1200} className="ml-1.5 text-[28px] font-bold text-sun" />
              <span className="ml-[3px] text-[12px] text-[#8FA3B0]">kg</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="z-[1] mb-1 mt-auto w-full cursor-pointer rounded-[14px] border-2 border-soul-deep bg-soul px-3.5 py-3 text-[16px] font-bold text-navy-dark"
        >
          continuar →
        </button>
      </div>
    </PhoneFrame>
  )
}
