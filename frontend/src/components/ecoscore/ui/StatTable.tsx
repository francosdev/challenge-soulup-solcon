import type { ReactNode } from 'react';

type StatTableProps = {
  children: ReactNode;
};

/** Agrupa linhas `StatRow` com divisórias de 1px. */
export function StatTable({ children }: StatTableProps) {
  return (
    <div className="flex flex-col gap-px overflow-hidden rounded-card border border-line bg-line">
      {children}
    </div>
  );
}
