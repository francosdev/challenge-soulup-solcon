export interface ProgressBarProps {
  valor: number
  max: number
  /** `dark` usa trilho navy-dark (telas da solução); `light` usa soul.light. */
  tone?: 'light' | 'dark'
  label?: string
  className?: string
}

export function ProgressBar({ valor, max, tone = 'light', label, className = '' }: ProgressBarProps) {
  const percentual = max > 0 ? Math.min(100, Math.max(0, (valor / max) * 100)) : 0

  return (
    <div className={className}>
      <div
        role="progressbar"
        aria-valuenow={valor}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className={`h-2.5 w-full overflow-hidden rounded-pill ${tone === 'dark' ? 'bg-navy-dark' : 'bg-soul-light'}`}
      >
        <div
          className="h-full rounded-pill bg-soul transition-[width] duration-500"
          style={{ width: `${percentual}%` }}
        />
      </div>
    </div>
  )
}
