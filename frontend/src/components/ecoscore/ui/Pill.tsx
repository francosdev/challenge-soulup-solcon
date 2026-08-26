import type { ReactNode } from 'react';

interface PillProps {
  children: ReactNode;
  /** Destaque em teal wash, para o valor corrente. */
  active?: boolean;
}

export function Pill({ children, active = false }: PillProps) {
  const tone = active
    ? 'bg-soul-wash text-soul-deep font-medium'
    : 'border border-line text-ink-muted';
  return <span className={`rounded-full px-3 py-1.5 text-[13px] ${tone}`}>{children}</span>;
}
