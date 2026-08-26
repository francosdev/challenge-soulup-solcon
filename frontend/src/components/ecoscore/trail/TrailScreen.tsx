import type { Mission, Skill, SkillId, SkillState } from '../../../types/ecoscore';
import { TrailNode } from './TrailNode';
import { SponsoredSlot } from './SponsoredSlot';

interface TrailScreenProps {
  skills: Skill[];
  stateFor: (order: number) => SkillState;
  /** Etapa em curso da habilidade ativa, 1-indexada. */
  currentStage: number;
  /** Preenchido quando a primeira habilidade foi concluída. */
  completedSummary?: { skill: Skill; mission: Mission } | null;
  onOpenSkill: (id: SkillId) => void;
}

export function TrailScreen({
  skills,
  stateFor,
  currentStage,
  completedSummary,
  onOpenSkill,
}: TrailScreenProps) {
  const anyCompleted = Boolean(completedSummary);

  return (
    <div className="px-5 pb-8 pt-6">
      <h1 className="mb-2 font-display text-[28px] font-semibold leading-tight text-navy">
        Trilha de habilidades
      </h1>
      <p className="mb-6 max-w-[34ch] text-base leading-relaxed text-ink-muted">
        {anyCompleted
          ? 'Uma habilidade concluída. Consumo Consciente está liberada.'
          : 'Aprenda. Valide. Pratique. Cada habilidade se abre ao concluir a jornada da anterior.'}
      </p>

      {completedSummary ? (
        <div className="mb-7 flex items-center gap-3.5 rounded-card border border-sun-line bg-sun-wash px-[18px] py-4">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-sun-line bg-white font-display text-[13px] font-semibold text-sun">
            0{completedSummary.skill.order}
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-sun-text">
              Habilidade desbloqueada
            </div>
            <div className="mt-0.5 font-display text-base font-medium text-navy">
              {completedSummary.skill.name} · +{completedSummary.mission.reward} Soul Points
            </div>
            <div className="mt-0.5 text-[13px] leading-relaxed text-sun-text">
              {completedSummary.mission.estimatedCo2eKg.toLocaleString('pt-BR')} kg CO₂e evitados ·
              estimativa
            </div>
          </div>
        </div>
      ) : null}

      {skills.map((skill, i) => {
        const state = stateFor(skill.order);
        const openable = state === 'available' || state === 'in_progress';
        return (
          <TrailNode
            key={skill.id}
            skill={skill}
            state={state}
            currentStage={currentStage}
            isLast={i === skills.length - 1}
            onOpen={openable ? () => onOpenSkill(skill.id) : undefined}
          />
        );
      })}

      <SponsoredSlot />
    </div>
  );
}
