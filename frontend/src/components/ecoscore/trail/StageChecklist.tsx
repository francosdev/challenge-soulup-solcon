import { Check } from 'lucide-react';

const STAGES = ['Aprender', 'Validar', 'Praticar', 'Conquistar'] as const;

/**
 * As quatro batidas da jornada, todas concluídas.
 * Marcas nomeadas, não uma barra — o desbloqueio não vem de acúmulo.
 */
export function StageChecklist({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-x-3.5 gap-y-2 ${className}`}>
      {STAGES.map((stage) => (
        <span key={stage} className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-soul">
            <Check size={13} strokeWidth={1.5} className="text-white" />
          </span>
          <span className="text-[13px] text-soul-deep">{stage}</span>
        </span>
      ))}
    </div>
  );
}
