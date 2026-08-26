import type { ReactNode } from 'react';

type Tone = 'soul' | 'muted' | 'sun';

interface LabelProps {
  children: ReactNode;
  tone?: Tone;
}

const TONES: Record<Tone, string> = {
  soul: 'text-soul',
  muted: 'text-ink-muted',
  sun: 'text-sun-text',
};

/** Rótulo em caixa alta usado acima de cada título de tela. */
export function Label({ children, tone = 'soul' }: LabelProps) {
  return (
    <div className={`text-xs font-medium uppercase tracking-[0.06em] ${TONES[tone]}`}>
      {children}
    </div>
  );
}
