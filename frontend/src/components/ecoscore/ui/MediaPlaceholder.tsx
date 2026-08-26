interface MediaPlaceholderProps {
  label: string;
  hint?: string;
  height: number;
}

/** Área de mídia por preencher — vídeo do conteúdo, câmera da comprovação. */
export function MediaPlaceholder({ label, hint, height }: MediaPlaceholderProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-1 overflow-hidden rounded-card border border-line bg-surf"
      style={{ height }}
    >
      <span className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">{label}</span>
      {hint ? <span className="font-mono text-[11px] text-ink-muted/70">{hint}</span> : null}
    </div>
  );
}
