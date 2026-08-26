import type { Mission } from '../../../types/ecoscore';
import { Label } from '../ui/Label';
import { StatRow, StatTable } from '../ui/StatRow';

interface MissionOfferProps {
  mission: Mission;
}

export function MissionOffer({ mission }: MissionOfferProps) {
  return (
    <div className="px-5 pb-6 pt-6">
      <div className="mb-2">
        <Label>Etapa 3 de 4 · missão</Label>
      </div>
      <h1 className="mb-4 font-display text-[28px] font-semibold leading-tight text-navy">
        {mission.title}
      </h1>
      <p className="mb-3.5 max-w-[40ch] text-base leading-relaxed text-navy">
        {mission.description}
      </p>

      <div className="mb-5 rounded-card border border-line px-[18px] py-4">
        <div className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-ink-muted">
          Objetivo
        </div>
        <div className="text-[15px] leading-relaxed text-navy">{mission.objective}</div>
      </div>

      <StatTable>
        <StatRow label="Prazo" value={`${mission.durationDays} dias`} />
        <StatRow label="Dificuldade" value={mission.difficulty} />
        <StatRow label="Registros" value={`${mission.checklist.length} separações`} />
        <StatRow label="Recompensa" value={`+${mission.reward} Soul Points`} />
      </StatTable>
    </div>
  );
}
