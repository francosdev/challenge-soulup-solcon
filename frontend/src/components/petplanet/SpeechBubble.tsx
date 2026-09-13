import type { ReactNode } from 'react'

type SpeechBubbleProps = {
  /** Fundo âmbar em vez do fundo de cartão. */
  ambar?: boolean
  /** Letra manuscrita (Caveat) em vez da letra do jogo. */
  hand?: boolean
  tilt?: 0 | 4
  children: ReactNode
}

export function SpeechBubble({ ambar = false, hand = false, tilt = 0, children }: SpeechBubbleProps) {
  const fundo = ambar ? 'bg-sun' : 'bg-navy'
  const letra = hand
    ? "pb-1.5 pt-1 font-['Caveat',cursive] text-[18px] font-medium"
    : 'pb-1.5 pt-[5px] text-[13px] font-semibold'
  const giro = tilt === 4 ? 'rotate-[4deg]' : 'rotate-0'

  return (
    <div
      className={`whitespace-nowrap rounded-[14px] border-2 border-soul-deep px-2.5 leading-[1.1] text-white shadow-[0_3px_0_#0F5F61] ${fundo} ${letra} ${giro}`}
    >
      {children}
    </div>
  )
}
