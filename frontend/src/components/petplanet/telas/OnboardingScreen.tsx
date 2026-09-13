import { useState } from 'react'
import type { Mood, PetPalette } from '../../../types/petplanet'
import { InteractiveMascot } from '../InteractiveMascot'
import { PhoneFrame } from '../PhoneFrame'

type OnboardingScreenProps = {
  pal: PetPalette
  onDone: () => void
}

const STEPS: { mood: Mood; title: string; body: string }[] = [
  { mood: 'happy', title: 'olá, eu sou o Planetinha 🌍', body: 'tô aqui pra crescer com você. cada ação sustentável me alimenta!' },
  { mood: 'celebrating', title: 'registre, ganhe, festeje', body: 'tira foto da sua ação, valido por IA, vc ganha pontos e moedas. ✦' },
  { mood: 'sleepy', title: 'mas cuidado: se sumir…', body: 'fico triste e perco saúde. seu streak também! bora?' },
]

export function OnboardingScreen({ pal, onDone }: OnboardingScreenProps) {
  const [i, setI] = useState<number>(0)
  const cur = STEPS[i]

  return (
    <PhoneFrame>
      <div className="absolute inset-x-0 bottom-0 top-7 flex flex-col items-center px-[22px] py-8">
        <div className="mb-[18px] font-mono text-[10px] tracking-[2px] text-[#8FA3B0]">BEM-VINDO AO ECOSCORE</div>
        <div className="relative mb-4">
          <InteractiveMascot pal={pal} size={200} expression={cur.mood} />
        </div>
        <div className="text-center text-[22px] font-bold leading-[1.15]">{cur.title}</div>
        <div className="mt-2.5 text-center text-[14px] leading-[1.35] text-soul-light">{cur.body}</div>

        <div className="mb-3.5 mt-auto flex gap-2">
          {STEPS.map((step, k) => (
            <span
              key={step.title}
              className={`h-2 rounded-full transition-[width] duration-[250ms] ease-[ease] ${k === i ? 'w-6 bg-soul' : 'w-2 bg-soul-deep'}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => (i < STEPS.length - 1 ? setI(i + 1) : onDone())}
          className="w-full cursor-pointer rounded-[14px] border-2 border-soul-deep bg-soul px-3.5 py-3 text-[16px] font-bold text-navy-dark"
        >
          {i < STEPS.length - 1 ? 'continuar →' : 'começar minha jornada ✦'}
        </button>
        {i < STEPS.length - 1 ? (
          <button type="button" onClick={onDone} className="mt-2 cursor-pointer text-[12px] text-[#8FA3B0]">
            pular
          </button>
        ) : null}
      </div>
    </PhoneFrame>
  )
}
