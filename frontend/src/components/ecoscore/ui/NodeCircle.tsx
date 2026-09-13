import type { ReactNode } from 'react';
import type { SkillState } from '../../../types/ecoscore';

type NodeCircleProps = {
  state: SkillState;
  /** Nó final da trilha recebe o tratamento em sun. */
  final?: boolean;
  children: ReactNode;
}

/**
 * Selo circular da marca, reaproveitado como nó da trilha.
 * O estado é legível pelo preenchimento, não só pela cor da borda.
 */
export function NodeCircle({ state, final = false, children }: NodeCircleProps) {
  let tone = 'border-line bg-surf';
  if (final && state === 'locked') tone = 'border-sun-line bg-sun-wash';
  if (state === 'available' || state === 'in_progress') tone = 'border-soul bg-soul-wash';
  if (state === 'completed') tone = 'border-soul bg-soul';
  return (
    <div className={`flex h-16 w-16 flex-none items-center justify-center rounded-full border ${tone}`}>
      {children}
    </div>
  );
}
