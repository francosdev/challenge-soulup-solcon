import { Check } from 'lucide-react';
import { Button } from '../../ui/Button';

export type StageStatus = 'locked' | 'active' | 'done';

interface StageRowProps {
  index: number;
  title: string;
  detail: string;
  status: StageStatus;
  isLast?: boolean;
  cta?: { label: string; onClick: () => void };
}

export function StageRow({ index, title, detail, status, isLast = false, cta }: StageRowProps) {
  const done = status === 'done';
  const locked = status === 'locked';
  const circle = done
    ? 'border-soul bg-soul text-white'
    : locked
      ? 'border-line bg-surf text-ink-muted'
      : 'border-soul bg-soul-wash text-soul-deep';

  return (
    <div className="relative flex gap-3.5 pb-4">
      {!isLast ? (
        <div
          className={`absolute bottom-0 left-[21px] top-12 w-px ${done ? 'bg-soul' : 'bg-line'}`}
        />
      ) : null}
      <div
        className={`relative z-10 flex h-11 w-11 flex-none items-center justify-center rounded-full border font-display text-sm font-semibold ${circle}`}
      >
        {done ? <Check size={18} strokeWidth={1.5} /> : index}
      </div>
      <div
        className={`flex-1 rounded-card border bg-white px-[18px] py-4 ${status === 'active' ? 'border-soul' : 'border-line'}`}
      >
        <div className="flex items-baseline justify-between gap-2.5">
          <span
            className={`font-display text-base font-medium ${locked ? 'text-ink-muted' : 'text-navy'}`}
          >
            {title}
          </span>
          <span
            className={`text-[11px] font-medium uppercase tracking-[0.06em] ${locked ? 'text-ink-muted' : 'text-soul-deep'}`}
          >
            {done ? 'Concluída' : locked ? 'Bloqueada' : 'Agora'}
          </span>
        </div>
        <div className="mt-1 text-sm leading-relaxed text-ink-muted">{detail}</div>
        {cta ? (
          <div className="mt-3.5">
            <Button className="w-full" onClick={cta.onClick}>{cta.label}</Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
