import { Check } from 'lucide-react';
import type { Mission } from '../../../types/ecoscore';
import { Label } from '../ui/Label';
import { Pill } from '../ui/Pill';

interface MissionProgressProps {
  mission: Mission;
  registeredIds: string[];
  daysLeft: number;
  /** Rótulo de quando cada item foi registrado, por id. */
  registeredAtLabels?: Record<string, string>;
}

export function MissionProgress({
  mission,
  registeredIds,
  daysLeft,
  registeredAtLabels = {},
}: MissionProgressProps) {
  return (
    <div className="px-5 pb-6 pt-6">
      <div className="mb-2">
        <Label>Missão em andamento</Label>
      </div>
      <h1 className="mb-3.5 font-display text-[28px] font-semibold leading-tight text-navy">
        {mission.title}
      </h1>

      <div className="mb-6 flex gap-2">
        <Pill>Faltam {daysLeft} dias</Pill>
        <Pill active>
          {registeredIds.length} de {mission.checklist.length} registros
        </Pill>
      </div>

      <ul className="flex flex-col gap-2.5">
        {mission.checklist.map((item) => {
          const done = registeredIds.includes(item.id);
          return (
            <li
              key={item.id}
              className={`flex items-center gap-3.5 rounded-card border border-line px-[18px] py-4 ${done ? 'bg-white' : 'bg-surf'}`}
            >
              <span
                className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border ${done ? 'border-soul bg-soul' : 'border-line bg-white'}`}
              >
                {done ? <Check size={18} strokeWidth={1.5} className="text-white" /> : null}
              </span>
              <span
                className={`flex-1 font-display text-base font-medium ${done ? 'text-navy' : 'text-ink-muted'}`}
              >
                {item.label}
              </span>
              <span className="text-[13px] text-ink-muted">
                {done ? (registeredAtLabels[item.id] ?? 'registrado') : 'pendente'}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
