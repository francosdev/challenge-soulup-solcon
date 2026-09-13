/**
 * As 36 peças do confete, já com o destino de cada uma (`--tx`, `--ty`, lidas pelo
 * keyframe pp-confetti-fly), altura, cor, canto e atraso. Classes completas e estáticas:
 * o Tailwind só gera o que encontra escrito por inteiro no código.
 */
const PECAS_CONFETE: readonly string[] = [
  '[--tx:120px] [--ty:0px] h-1 bg-soul rounded-[2px] [animation-delay:0s]',
  '[--tx:134.92px] [--ty:23.79px] h-1.5 bg-soul-light rounded-full [animation-delay:0.04s]',
  '[--tx:144.71px] [--ty:52.67px] h-2 bg-sun rounded-[2px] [animation-delay:0.08s]',
  '[--tx:148.09px] [--ty:85.5px] h-1 bg-sun rounded-full [animation-delay:0.12s]',
  '[--tx:144.02px] [--ty:120.84px] h-1.5 bg-soul rounded-[2px] [animation-delay:0.16s]',
  '[--tx:80.35px] [--ty:95.76px] h-2 bg-sun-line rounded-full [animation-delay:0.2s]',
  '[--tx:71px] [--ty:122.98px] h-1 bg-soul rounded-[2px] [animation-delay:0s]',
  '[--tx:54.38px] [--ty:149.41px] h-1.5 bg-soul-light rounded-full [animation-delay:0.04s]',
  '[--tx:30.56px] [--ty:173.33px] h-2 bg-sun rounded-[2px] [animation-delay:0.08s]',
  '[--tx:0px] [--ty:193px] h-1 bg-sun rounded-full [animation-delay:0.12s]',
  '[--tx:-22.57px] [--ty:128.03px] h-1.5 bg-soul rounded-[2px] [animation-delay:0.16s]',
  '[--tx:-50.28px] [--ty:138.13px] h-2 bg-sun-line rounded-full [animation-delay:0.2s]',
  '[--tx:-82px] [--ty:142.03px] h-1 bg-soul rounded-[2px] [animation-delay:0s]',
  '[--tx:-116.34px] [--ty:138.65px] h-1.5 bg-soul-light rounded-full [animation-delay:0.04s]',
  '[--tx:-151.68px] [--ty:127.27px] h-2 bg-sun rounded-[2px] [animation-delay:0.08s]',
  '[--tx:-116.91px] [--ty:67.5px] h-1 bg-sun rounded-full [animation-delay:0.12s]',
  '[--tx:-142.83px] [--ty:51.99px] h-1.5 bg-soul rounded-[2px] [animation-delay:0.16s]',
  '[--tx:-166.43px] [--ty:29.35px] h-2 bg-sun-line rounded-full [animation-delay:0.2s]',
  '[--tx:-186px] [--ty:0px] h-1 bg-soul rounded-[2px] [animation-delay:0s]',
  '[--tx:-121.13px] [--ty:-21.36px] h-1.5 bg-soul-light rounded-full [animation-delay:0.04s]',
  '[--tx:-131.56px] [--ty:-47.88px] h-2 bg-sun rounded-[2px] [animation-delay:0.08s]',
  '[--tx:-135.97px] [--ty:-78.5px] h-1 bg-sun rounded-full [animation-delay:0.12s]',
  '[--tx:-133.29px] [--ty:-111.85px] h-1.5 bg-soul rounded-[2px] [animation-delay:0.16s]',
  '[--tx:-122.77px] [--ty:-146.31px] h-2 bg-sun-line rounded-full [animation-delay:0.2s]',
  '[--tx:-64px] [--ty:-110.85px] h-1 bg-soul rounded-[2px] [animation-delay:0s]',
  '[--tx:-49.59px] [--ty:-136.26px] h-1.5 bg-soul-light rounded-full [animation-delay:0.04s]',
  '[--tx:-28.13px] [--ty:-159.54px] h-2 bg-sun rounded-[2px] [animation-delay:0.08s]',
  '[--tx:0px] [--ty:-179px] h-1 bg-sun rounded-full [animation-delay:0.12s]',
  '[--tx:34.04px] [--ty:-193.02px] h-1.5 bg-soul rounded-[2px] [animation-delay:0.16s]',
  '[--tx:45.49px] [--ty:-124.98px] h-2 bg-sun-line rounded-full [animation-delay:0.2s]',
  '[--tx:75px] [--ty:-129.9px] h-1 bg-soul rounded-[2px] [animation-delay:0s]',
  '[--tx:107.35px] [--ty:-127.93px] h-1.5 bg-soul-light rounded-full [animation-delay:0.04s]',
  '[--tx:140.95px] [--ty:-118.27px] h-2 bg-sun rounded-[2px] [animation-delay:0.08s]',
  '[--tx:104.79px] [--ty:-60.5px] h-1 bg-sun rounded-full [animation-delay:0.12s]',
  '[--tx:129.68px] [--ty:-47.2px] h-1.5 bg-soul rounded-[2px] [animation-delay:0.16s]',
  '[--tx:152.65px] [--ty:-26.92px] h-2 bg-sun-line rounded-full [animation-delay:0.2s]',
]

/** Explosão de confete da tela de sucesso. */
export function ConfettiBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {PECAS_CONFETE.map((peca) => (
        <span
          key={peca}
          className={`absolute left-1/2 top-1/2 w-2 -translate-x-1/2 -translate-y-1/2 border border-soul-deep motion-safe:animate-pp-confetti-fly ${peca}`}
        />
      ))}
    </div>
  )
}
