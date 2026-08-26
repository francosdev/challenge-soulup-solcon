import type { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';

interface AppShellProps {
  soulPoints: number;
  onBack?: () => void;
  footer?: ReactNode;
  children: ReactNode;
}

/** Cabeçalho com wordmark e saldo, área de scroll, rodapé fixo opcional. */
export function AppShell({ soulPoints, onBack, footer, children }: AppShellProps) {
  return (
    <div className="flex h-full flex-col bg-white">
      <header className="flex flex-none items-center justify-between border-b border-line px-5 pb-3.5 pt-1">
        <div className="flex items-center gap-2">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Voltar"
              className="mr-0.5 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-line text-navy"
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>
          ) : null}
          <span className="font-display text-lg font-semibold tracking-tight text-navy">soul</span>
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full border border-soul font-display text-[8px] font-semibold tracking-[0.06em] text-soul">
            UP
          </span>
          <span className="ml-1 border-l border-line pl-2 text-[10px] font-medium uppercase tracking-[0.06em] text-ink-muted">
            EcoScore
          </span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-soul-wash px-3 py-1.5">
          <span className="font-display text-sm font-semibold text-soul-deep">
            {soulPoints.toLocaleString('pt-BR')}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.06em] text-soul-deep">
            SP
          </span>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto">{children}</div>
      {footer ? <div className="flex-none border-t border-line p-5">{footer}</div> : null}
    </div>
  );
}
