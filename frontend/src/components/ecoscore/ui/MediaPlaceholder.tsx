type AlturaMidia = 170 | 280;

const ALTURAS: Record<AlturaMidia, string> = {
  170: 'h-[170px]',
  280: 'h-[280px]',
};

type MediaPlaceholderProps = {
  label: string;
  hint?: string;
  height: AlturaMidia;
}

/** Área de mídia por preencher — vídeo do conteúdo, câmera da comprovação. */
export function MediaPlaceholder({ label, hint, height }: MediaPlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 overflow-hidden rounded-card border border-line bg-surf ${ALTURAS[height]}`}
    >
      <span className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">{label}</span>
      {hint ? <span className="font-mono text-[11px] text-ink-muted/70">{hint}</span> : null}
    </div>
  );
}
