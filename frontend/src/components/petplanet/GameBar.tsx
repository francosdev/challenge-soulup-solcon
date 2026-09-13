export type AlturaBarra = 5 | 6 | 8 | 10
export type CorBarra = 'soul' | 'soul-light' | 'sun' | 'sun-line'

const ALTURAS_BARRA: Record<AlturaBarra, string> = {
  5: 'h-[5px]',
  6: 'h-1.5',
  8: 'h-2',
  10: 'h-2.5',
}

const CORES_BARRA: Record<CorBarra, string> = {
  soul: '[&::-webkit-progress-value]:bg-soul [&::-moz-progress-bar]:bg-soul',
  'soul-light': '[&::-webkit-progress-value]:bg-soul-light [&::-moz-progress-bar]:bg-soul-light',
  sun: '[&::-webkit-progress-value]:bg-sun [&::-moz-progress-bar]:bg-sun',
  'sun-line': '[&::-webkit-progress-value]:bg-sun-line [&::-moz-progress-bar]:bg-sun-line',
}

type GameBarProps = {
  /** Valor entre 0 e 1. */
  pct: number
  altura: AlturaBarra
  cor: CorBarra
  className?: string
}

/** Barra de progresso nativa (`<progress>`), com trilho e preenchimento pintados pelo Tailwind. */
export function GameBar({ pct, altura, cor, className = '' }: GameBarProps) {
  const p = Math.max(0, Math.min(1, pct))
  const divisoria =
    p < 1 ? '[&::-webkit-progress-value]:border-r-[1.5px] [&::-moz-progress-bar]:border-r-[1.5px]' : ''

  return (
    <progress
      value={p}
      max={1}
      aria-hidden="true"
      className={`relative block w-full appearance-none overflow-hidden rounded-full border-[1.5px] border-soul-deep bg-navy-dark [&::-webkit-progress-bar]:bg-navy-dark [&::-webkit-progress-value]:border-soul-deep [&::-moz-progress-bar]:border-soul-deep ${divisoria} ${ALTURAS_BARRA[altura]} ${CORES_BARRA[cor]} ${className}`}
    />
  )
}
