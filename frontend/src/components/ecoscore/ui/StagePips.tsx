import { Check } from 'lucide-react';

interface StagePipsProps {
  total: number;
  /** Índice da pergunta atual, 0-indexado. */
  current: number;
  answeredCount: number;
}

export function StagePips({ total, current, answeredCount }: StagePipsProps) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }, (_, i) => {
        const done = i < answeredCount;
        const active = i === current;
        const tone = done
          ? 'border-soul bg-soul text-white'
          : active
            ? 'border-soul bg-soul-wash text-soul-deep'
            : 'border-line bg-white text-ink-muted';
        return (
          <span
            key={i}
            className={`flex h-[26px] w-[26px] items-center justify-center rounded-full border text-[11px] font-medium ${tone}`}
          >
            {done ? <Check size={13} strokeWidth={1.5} /> : i + 1}
          </span>
        );
      })}
    </div>
  );
}
