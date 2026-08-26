import { ShoppingBasket, Trophy } from 'lucide-react';
import type { Mission, Skill } from '../../../types/ecoscore';
import { Label } from '../ui/Label';
import { StatRow, StatTable } from '../ui/StatRow';
import { pointsToReais } from '../../../data/skills';

interface AchievementScreenProps {
  skill: Skill;
  mission: Mission;
  /** Saldo antes de creditar a recompensa. */
  balanceBefore: number;
  nextSkill?: Skill | null;
}

export function AchievementScreen({
  skill,
  mission,
  balanceBefore,
  nextSkill,
}: AchievementScreenProps) {
  const after = balanceBefore + mission.reward;

  return (
    <div className="px-5 pb-5 pt-7 text-center">
      <div className="mb-4">
        <Label tone="sun">Etapa 4 de 4</Label>
      </div>

      <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full border border-sun-line bg-sun-wash">
        <Trophy size={40} strokeWidth={1.5} className="text-sun" />
      </div>

      <h1 className="font-display text-[28px] font-semibold leading-tight text-navy">
        Missão concluída.
      </h1>
      <p className="mx-auto mb-6 mt-2.5 max-w-[28ch] text-base leading-relaxed text-ink-muted">
        Habilidade desbloqueada: {skill.name}.
      </p>

      <div className="text-left">
        <StatTable>
          <StatRow label="Recompensa" value={`+${mission.reward} Soul Points`} reward />
          <StatRow
            label="Impacto"
            value={`${mission.estimatedCo2eKg.toLocaleString('pt-BR')} kg CO₂e evitados`}
          />
          <StatRow
            label="Saldo"
            value={`${balanceBefore.toLocaleString('pt-BR')} → ${after.toLocaleString('pt-BR')} SP`}
          />
          <StatRow label="Equivale a" value={`R$ ${pointsToReais(after)} na fatura`} />
        </StatTable>
        <div className="mb-5 mt-2 text-xs text-ink-muted">
          estimativa com base em fatores de emissão médios
        </div>

        {nextSkill ? (
          <div className="flex items-center gap-3.5 rounded-card border border-soul bg-soul-wash px-[18px] py-4">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-soul bg-white">
              <ShoppingBasket size={22} strokeWidth={1.5} className="text-soul" />
            </span>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-soul-deep">
                Próxima habilidade liberada
              </div>
              <div className="mt-0.5 font-display text-base font-medium text-navy">
                {nextSkill.name}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
