import { Check } from 'lucide-react';

type StagePipsProps = {
  total: number;
  /** Índice da pergunta atual, 0-indexado. */
  current: number;
  answeredCount: number;
}

export function StagePips({ total, current, answeredCount }: StagePipsProps) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }, (_, i) => i + 1).map((numero) => {
        // numero é o número da pergunta (1, 2, 3...), identidade estável de cada marcador.
        const done = numero <= answeredCount;
        const active = numero === current + 1;
        const tone = done
          ? 'border-soul bg-soul text-white'
          : active
            ? 'border-soul bg-soul-wash text-soul-deep'
            : 'border-line bg-white text-ink-muted';
        return (
          <span
            key={numero}
            className={`flex h-[26px] w-[26px] items-center justify-center rounded-full border text-[11px] font-medium ${tone}`}
          >
            {done ? <Check size={13} strokeWidth={1.5} /> : numero}
          </span>
        );
      })}
    </div>
  );
}
