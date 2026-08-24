export interface LogoProps {
  /** `dark` inverte para uso sobre fundo ink/navy. */
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * Marca SoulUp aplicada ao EcoScore: palavra em minúsculas seguida do
 * selo circular com "UP" dentro — o device gráfico central da identidade.
 */
export function Logo({ tone = 'light', className = '' }: LogoProps) {
  const escuro = tone === 'dark'

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span
        className={`font-display text-lg font-semibold lowercase leading-none ${
          escuro ? 'text-white' : 'text-navy'
        }`}
      >
        ecoscore
      </span>
      <span
        aria-hidden
        className={`inline-flex h-6 w-6 items-center justify-center rounded-pill border font-display text-[0.625rem] font-semibold leading-none ${
          escuro ? 'border-soul bg-soul text-white' : 'border-soul text-soul'
        }`}
      >
        UP
      </span>
    </span>
  )
}
