import { CalendarClock } from 'lucide-react';
import type { SponsoredChallenge } from '../../../types/ecoscore';

interface SponsoredSlotProps {
  challenge: SponsoredChallenge;
}

/**
 * Desafio sazonal de parceiro no topo da trilha.
 *
 * O tratamento é deliberadamente sóbrio: `sun` fica reservado a conquista e
 * recompensa, então o patrocínio se identifica pelo rótulo, não pela cor. A
 * marca aparece; ela não grita.
 */
export function SponsoredSlot({ challenge }: SponsoredSlotProps) {
  return (
    <article className="rounded-card border border-line bg-surf p-4">
      <div className="flex items-center gap-3.5">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-line bg-white">
          <CalendarClock size={20} strokeWidth={1.5} className="text-ink-muted" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-ink-muted">
            Desafio patrocinado
          </div>
          <div className="mt-0.5 font-display text-base font-medium leading-tight text-navy">
            {challenge.title}
          </div>
        </div>
      </div>

      <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">{challenge.description}</p>

      <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px]">
        <div className="flex gap-1.5">
          <dt className="text-ink-muted">Prazo</dt>
          <dd className="font-medium text-navy">{challenge.durationDays} dias</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="text-ink-muted">Missões</dt>
          <dd className="font-medium text-navy">{challenge.missionCount}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="text-ink-muted">Recompensa</dt>
          <dd className="font-medium text-navy">+{challenge.reward} Soul Points</dd>
        </div>
      </dl>

      <p className="mt-3 border-t border-line pt-3 text-[11px] leading-relaxed text-ink-muted">
        {challenge.partnerReward} · em parceria com {challenge.sponsor.name} ·{' '}
        {challenge.sponsor.segment}
      </p>
    </article>
  );
}
