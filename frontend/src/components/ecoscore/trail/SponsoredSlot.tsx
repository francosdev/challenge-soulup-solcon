/** Espaço reservado na arquitetura para missão de parceiro. Sem monetização real. */
export function SponsoredSlot() {
  return (
    <div className="flex items-center gap-3.5 rounded-card border border-line bg-surf p-4">
      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-line bg-white font-mono text-[9px] font-medium text-ink-muted">
        MARCA
      </div>
      <div className="flex-1">
        <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-ink-muted">
          Missão patrocinada
        </div>
        <div className="mt-0.5 text-sm leading-relaxed text-navy">
          Espaço reservado para parceiro.
        </div>
      </div>
    </div>
  );
}
