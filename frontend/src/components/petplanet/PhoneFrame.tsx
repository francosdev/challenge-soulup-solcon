import type { ReactNode } from 'react'

type PhoneFrameProps = {
  children: ReactNode
}

/** Moldura do telefone com barra de status. */
export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="relative h-[760px] w-[360px] max-w-full overflow-hidden rounded-[28px] border-2 border-soul-deep bg-navy-dark font-['Fredoka',system-ui,sans-serif] text-white shadow-[0_6px_0_#0F5F61,0_20px_60px_rgba(0,0,0,0.6)]">
      <div className="flex h-7 items-center justify-between px-[18px] font-mono text-[10px] text-[#8FA3B0]">
        <span>9:41</span>
        <span>● ● ●</span>
      </div>
      {children}
    </div>
  )
}
