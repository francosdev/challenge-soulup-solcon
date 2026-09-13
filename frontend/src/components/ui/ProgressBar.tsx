export type ProgressBarProps = {
  valor: number
  max: number
  /** `dark` usa trilho navy-dark (telas da solução); `light` usa soul.light. */
  tone?: 'light' | 'dark'
  label?: string
  className?: string
}

export function ProgressBar({ valor, max, tone = 'light', label, className = '' }: ProgressBarProps) {
  const percentual = max > 0 ? Math.min(100, Math.max(0, (valor / max) * 100)) : 0

  // <progress> nativo: o navegador calcula a largura do preenchimento a partir de value/max.
  return (
    <div className={className}>
      <progress
        value={percentual}
        max={100}
        aria-label={label}
        className={`block h-2.5 w-full appearance-none overflow-hidden rounded-pill ${tone === 'dark' ? 'bg-navy-dark' : 'bg-soul-light'} [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:rounded-pill [&::-webkit-progress-value]:bg-soul [&::-webkit-progress-value]:transition-[width] [&::-webkit-progress-value]:duration-500 [&::-moz-progress-bar]:rounded-pill [&::-moz-progress-bar]:bg-soul`}
      />
    </div>
  )
}
