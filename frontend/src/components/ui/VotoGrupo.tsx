import { useState } from 'react'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

type Voto = 'up' | 'down'

type VotoGrupoProps = {
  up: number
  down: number
  /** O post já chega com o voto positivo do usuário. */
  ativo?: boolean
}

const BASE =
  'inline-flex items-center gap-1.5 rounded-pill border px-3 py-1.5 font-sans text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soul focus-visible:ring-offset-2'

/** Placar de votos do feed ilustrativo — funciona, mas não é persistido. */
export function VotoGrupo({ up, down, ativo = false }: VotoGrupoProps) {
  const [voto, setVoto] = useState<Voto | null>(ativo ? 'up' : null)

  return (
    <div className="flex gap-2">
      <button
        type="button"
        aria-pressed={voto === 'up'}
        onClick={() => setVoto(voto === 'up' ? null : 'up')}
        className={`${BASE} ${voto === 'up' ? 'border-soul bg-soul text-white' : 'border-line text-ink-muted hover:border-soul'}`}
      >
        <ThumbsUp size={13} aria-hidden />
        {up + (voto === 'up' && !ativo ? 1 : 0)}
      </button>
      <button
        type="button"
        aria-pressed={voto === 'down'}
        onClick={() => setVoto(voto === 'down' ? null : 'down')}
        className={`${BASE} ${voto === 'down' ? 'border-navy bg-navy text-white' : 'border-line text-ink-muted hover:border-navy'}`}
      >
        <ThumbsDown size={13} aria-hidden />
        {down + (voto === 'down' ? 1 : 0)}
      </button>
    </div>
  )
}
