import { Droplet, Recycle, ShoppingBasket, Zap, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { SkillId } from '../../types/ecoscore'
import type { Habilidade } from '../../types/habilidade'
import { Card } from '../ui/Card'
import { CircleBadge } from '../ui/CircleBadge'

type CardHabilidadeProps = {
  habilidade: Habilidade
}

const ICONES: Record<SkillId, LucideIcon> = {
  reciclagem: Recycle,
  consumo: ShoppingBasket,
  agua: Droplet,
  energia: Zap,
}

export function CardHabilidade({ habilidade }: CardHabilidadeProps) {
  const Icone = ICONES[habilidade.slug]

  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-center gap-3">
        <CircleBadge variant="wash" size="md">
          <Icone size={20} aria-hidden />
        </CircleBadge>
        <span className="font-sans text-xs font-medium uppercase tracking-[0.06em] text-soul-deep">
          Habilidade 0{habilidade.ordem}
        </span>
      </div>

      <h2 className="mt-4 font-display text-xl font-semibold text-navy">{habilidade.nome}</h2>
      {habilidade.parceiro ? (
        <p className="mt-1 font-sans text-xs text-ink-muted">
          Em parceria com {habilidade.parceiro.nome} · {habilidade.parceiro.segmento}
        </p>
      ) : null}
      <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-ink-muted">
        {habilidade.chamada} {habilidade.pontosPorAcao} Soul Points por ação registrada.
      </p>

      <Link
        to={`/solucao/${habilidade.id}`}
        className="mt-5 inline-flex items-center gap-2 self-start rounded-pill border border-soul px-5 py-2.5 font-sans text-sm font-medium text-soul transition-colors hover:bg-soul-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soul focus-visible:ring-offset-2"
      >
        Ver habilidade <span aria-hidden>→</span>
      </Link>
    </Card>
  )
}
