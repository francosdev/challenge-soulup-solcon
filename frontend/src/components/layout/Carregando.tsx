/** Reserva a altura da dobra enquanto o chunk da rota chega. */
export function Carregando() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="h-8 w-8 animate-spin rounded-pill border border-line border-t-soul" />
      <span className="sr-only">Carregando página</span>
    </div>
  )
}
