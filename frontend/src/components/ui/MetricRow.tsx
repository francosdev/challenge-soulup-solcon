import { ProgressBar } from './ProgressBar'

export interface MetricRowProps {
  label: string
  valor: string
  /** Percentual preenchido da barra, de 0 a 100. */
  pct: number
  /** `alerta` pinta o valor em vermelho, para os números do cenário atual. */
  tone?: 'soul' | 'alerta'
  nota?: string
}

/** Linha de métrica com rótulo, valor e barra — usada em Sobre. */
export function MetricRow({ label, valor, pct, tone = 'soul', nota }: MetricRowProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-sans text-sm text-ink-muted">{label}</span>
        <span
          className={`font-display text-sm font-semibold ${tone === 'alerta' ? 'text-red-600' : 'text-soul'}`}
        >
          {valor}
        </span>
      </div>
      <ProgressBar valor={pct} max={100} label={`${label}: ${valor}`} className="mt-2" />
      {nota ? <p className="mt-1.5 font-sans text-xs leading-relaxed text-ink-muted">{nota}</p> : null}
    </div>
  )
}
