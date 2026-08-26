import type { JourneyProgress, Mission, Skill } from '../../../types/ecoscore';
import { Label } from '../ui/Label';
import { StageRow, type StageStatus } from './StageRow';

interface SkillOverviewProps {
  skill: Skill;
  mission: Mission;
  progress: JourneyProgress;
  /** Habilidades sem conteúdo produzido mostram apenas a estrutura. */
  pending?: boolean;
  onOpenLearn: () => void;
  onOpenQuiz: () => void;
  onOpenMission: () => void;
  onOpenAchievement: () => void;
}

export function SkillOverview({
  skill,
  mission,
  progress,
  pending = false,
  onOpenLearn,
  onOpenQuiz,
  onOpenMission,
  onOpenAchievement,
}: SkillOverviewProps) {
  const stages: Array<{
    title: string;
    detail: string;
    done: boolean;
    unlocked: boolean;
    cta: { label: string; onClick: () => void };
  }> = [
    {
      title: 'Aprender',
      detail: 'Artigo + vídeo · 4 min',
      done: progress.learnDone,
      unlocked: true,
      cta: { label: 'Abrir conteúdo', onClick: onOpenLearn },
    },
    {
      title: 'Validar',
      detail: '5 perguntas. Acerte 4 para avançar.',
      done: progress.quizPassed,
      unlocked: progress.learnDone,
      cta: { label: 'Fazer o quiz', onClick: onOpenQuiz },
    },
    {
      title: 'Praticar',
      detail: `Missão de ${mission.durationDays} dias · ${mission.checklist.length} registros`,
      done: progress.missionDone,
      unlocked: progress.quizPassed,
      cta: {
        label: progress.missionAccepted ? 'Continuar missão' : 'Ver missão',
        onClick: onOpenMission,
      },
    },
    {
      title: 'Conquistar',
      detail: `Habilidade desbloqueada · +${mission.reward} SP`,
      done: progress.missionDone,
      unlocked: progress.missionDone,
      cta: { label: 'Ver conquista', onClick: onOpenAchievement },
    },
  ];

  let activeTaken = false;

  return (
    <div className="px-5 pb-8 pt-6">
      <div className="mb-2">
        <Label>Habilidade 0{skill.order}</Label>
      </div>
      <h1 className="mb-2 font-display text-[28px] font-semibold leading-tight text-navy">
        {skill.name}
      </h1>
      <p className="mb-6 max-w-[34ch] text-base leading-relaxed text-ink-muted">
        Quatro etapas. Conclua todas para desbloquear a habilidade.
      </p>

      {pending ? (
        <div className="mb-6 rounded-card border border-line bg-surf px-[18px] py-4 text-[15px] leading-relaxed text-navy">
          Conteúdo desta habilidade em produção. A jornada segue o mesmo formato de quatro etapas.
        </div>
      ) : (
        <div className="mb-6 flex gap-5 rounded-card border border-line px-[18px] py-4">
          {[
            { k: 'Recompensa', v: `+${mission.reward} SP` },
            { k: 'Por ação', v: `${skill.pointsPerAction} SP` },
            { k: 'Duração', v: `${mission.durationDays} dias` },
          ].map((stat, i) => (
            <div key={stat.k} className={i > 0 ? 'border-l border-line pl-5' : ''}>
              <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-ink-muted">
                {stat.k}
              </div>
              <div className="mt-0.5 font-display text-base font-semibold text-navy">{stat.v}</div>
            </div>
          ))}
        </div>
      )}

      {stages.map((stage, i) => {
        let status: StageStatus = 'locked';
        if (stage.done) status = 'done';
        else if (stage.unlocked && !activeTaken && !pending) {
          status = 'active';
          activeTaken = true;
        }
        const showCta = status === 'active' || (stage.done && i === 3);
        return (
          <StageRow
            key={stage.title}
            index={i + 1}
            title={stage.title}
            detail={pending && i > 0 ? 'Abre na sequência.' : stage.detail}
            status={pending ? 'locked' : status}
            isLast={i === stages.length - 1}
            cta={showCta ? stage.cta : undefined}
          />
        );
      })}
    </div>
  );
}
