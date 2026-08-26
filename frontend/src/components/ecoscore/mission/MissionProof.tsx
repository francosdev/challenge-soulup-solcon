import { Check } from 'lucide-react';
import type { Mission, ProofCapture } from '../../../types/ecoscore';
import { Label } from '../ui/Label';
import { Button } from '../../ui/Button';
import { MediaPlaceholder } from '../ui/MediaPlaceholder';

interface MissionProofProps {
  mission: Mission;
  /** Índice do item que está sendo comprovado, 0-indexado. */
  itemIndex: number;
  capture: ProofCapture | null;
  /** Dispare a câmera aqui; o retorno alimenta `capture`. */
  onCapture: () => void;
}

export function MissionProof({ mission, itemIndex, capture, onCapture }: MissionProofProps) {
  const item = mission.checklist[Math.min(itemIndex, mission.checklist.length - 1)];

  return (
    <div className="px-5 pb-6 pt-6">
      <div className="mb-2">
        <Label>
          Registro {itemIndex + 1} de {mission.checklist.length}
        </Label>
      </div>
      <h1 className="mb-5 font-display text-[28px] font-semibold leading-tight text-navy">
        Registre a separação
      </h1>

      <div className="mb-4 flex items-center justify-between rounded-card border border-line px-[18px] py-3.5">
        <span className="text-[15px] text-ink-muted">Tipo de resíduo</span>
        <span className="font-display text-base font-medium text-navy">{item.label}</span>
      </div>

      <div className="mb-3.5">
        {capture ? (
          <div className="flex h-[280px] flex-col items-center justify-center gap-3 rounded-card border border-soul bg-soul-wash">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-soul">
              <Check size={26} strokeWidth={1.5} className="text-white" />
            </span>
            <span className="text-sm font-medium text-soul-deep">
              Foto capturada · {new Date(capture.capturedAt).toLocaleString('pt-BR')}
            </span>
            <span className="font-mono text-xs text-ink-muted">
              {capture.coords.lat.toFixed(4)}, {capture.coords.lng.toFixed(4)}
            </span>
          </div>
        ) : (
          <MediaPlaceholder
            label="Câmera · foto da separação"
            hint="validação automática"
            height={280}
          />
        )}
      </div>

      <p className="mb-4 max-w-[40ch] text-[15px] leading-relaxed text-ink-muted">
        A foto é validada automaticamente e registra data e local.
      </p>

      {!capture ? (
        <Button className="w-full" variant="secondary" onClick={onCapture}>
          Capturar foto
        </Button>
      ) : null}
    </div>
  );
}
