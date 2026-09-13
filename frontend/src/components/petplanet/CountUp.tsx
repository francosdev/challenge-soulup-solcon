import { useEffect, useState } from 'react'

type CountUpProps = {
  to: number
  from?: number
  duration?: number
  decimals?: number
  className?: string
}

/** Número que sobe animado do valor inicial até o final. */
export function CountUp({ to, from = 0, duration = 900, decimals = 0, className = '' }: CountUpProps) {
  const [value, setValue] = useState<number>(from)

  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (now: number): void => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(from + (to - from) * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, from, duration])

  return <span className={className}>{decimals ? value.toFixed(decimals) : Math.round(value)}</span>
}
