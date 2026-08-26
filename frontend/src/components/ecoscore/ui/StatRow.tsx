import type { ReactNode } from 'react';

interface StatRowProps {
  label: string;
  value: string;
  /** Valor em sun — reservado a recompensa. */
  reward?: boolean;
}

export function StatRow({ label, value, reward = false }: StatRowProps) {
  return (
    <div className="flex items-center justify-between bg-white px-[18px] py-3.5">
      <span className="text-[15px] text-ink-muted">{label}</span>
      <span
        className={
          reward
            ? 'font-display text-[15px] font-semibold text-sun'
            : 'text-[15px] font-medium text-navy'
        }
      >
        {value}
      </span>
    </div>
  );
}

export function StatTable({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-px overflow-hidden rounded-card border border-line bg-line">
      {children}
    </div>
  );
}
