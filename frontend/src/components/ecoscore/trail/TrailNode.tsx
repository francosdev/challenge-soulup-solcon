import { Lock, Recycle, ShoppingBasket, Check, Droplet, Zap } from 'lucide-react';
import type { Skill, SkillState } from '../../../types/ecoscore';
import { NodeCircle } from '../ui/NodeCircle';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { StageChecklist } from './StageChecklist';

interface TrailNodeProps {
  skill: Skill;
  state: SkillState;
  /** Etapa atual da jornada quando `state === 'in_progress'`, 1-indexada. */
  currentStage?: number;
  /** Oculta a linha de conexão no último nó. */
  isLast?: boolean;
  onOpen?: () => void;
}

const ICONS = {
  reciclagem: Recycle,
  consumo: ShoppingBasket,
  agua: Droplet,
  energia: Zap,
} as const;

export function TrailNode({ skill, state, currentStage, isLast = false, onOpen }: TrailNodeProps) {
  const locked = state === 'locked';
  const done = state === 'completed';
  const Icon = ICONS[skill.id];

  const label = done
    ? `Habilidade 0${skill.order} · concluída`
    : state === 'in_progress'
      ? `Habilidade 0${skill.order} · em progresso`
      : locked
        ? `Habilidade 0${skill.order} · ${skill.isFinal ? 'final' : 'bloqueada'}`
        : `Habilidade 0${skill.order} · disponível`;

  const labelTone = locked
    ? skill.isFinal
      ? 'text-sun-text'
      : 'text-ink-muted'
    : done
      ? 'text-soul-deep'
      : 'text-soul';

  const detail = done
    ? 'Jornada completa. 4 separações registradas.'
    : state === 'in_progress'
      ? `Etapa ${currentStage ?? 1} de 4. Continue de onde parou.`
      : locked
        ? skill.isFinal
          ? skill.tagline
          : `Abre ao concluir a habilidade 0${skill.order - 1}.`
        : `${skill.tagline} ${skill.pointsPerAction} Soul Points por ação registrada.`;

  return (
    <div className="relative flex gap-4 pb-6">
      {!isLast ? (
        <div
          className={`absolute bottom-0 left-[31px] top-[70px] w-px ${done ? 'bg-soul' : 'bg-line'}`}
        />
      ) : null}
      <div className="relative z-10">
        <NodeCircle state={state} final={skill.isFinal}>
          {locked ? (
            <Lock size={24} strokeWidth={1.5} className={skill.isFinal ? 'text-sun' : 'text-ink-muted'} />
          ) : done ? (
            <Check size={28} strokeWidth={1.5} className="text-white" />
          ) : (
            <Icon size={28} strokeWidth={1.5} className="text-soul" />
          )}
        </NodeCircle>
      </div>
      <Card
        tone={
          locked && skill.isFinal
            ? 'reward'
            : state === 'available' || state === 'in_progress'
              ? 'accent'
              : 'light'
        }
        padded={false}
        className={`flex-1 ${onOpen ? 'p-5' : 'px-5 py-[18px]'}`}
      >
        <div className={`mb-1.5 text-xs font-medium uppercase tracking-[0.06em] ${labelTone}`}>
          {label}
        </div>
        <div
          className={`font-display text-xl leading-tight ${locked ? 'font-medium text-ink-muted' : 'font-semibold text-navy'}`}
        >
          {skill.name}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{detail}</p>
        {done ? <StageChecklist className="mt-3.5" /> : null}
        {onOpen ? (
          <div className="mt-4">
            <Button className="w-full" onClick={onOpen}>
              {state === 'in_progress' ? 'Continuar jornada' : 'Começar pela etapa 1'}
            </Button>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
