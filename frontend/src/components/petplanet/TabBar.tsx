import type { Screen } from '../../types/petplanet'

type TabBarProps = {
  current: Screen
  onNavigate: (s: Screen) => void
}

const TABS: { id: Screen; label: string }[] = [
  { id: 'dashboard', label: 'início' },
  { id: 'history', label: 'histórico' },
  { id: 'profile', label: 'perfil' },
]

/** Barra de abas fixa no rodapé do telefone. */
export function TabBar({ current, onNavigate }: TabBarProps) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-around border-t-[1.5px] border-soul-deep bg-navy px-[14px] py-2 text-[11px]">
      {TABS.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onNavigate(t.id)}
          className={`cursor-pointer px-1.5 py-1 ${current === t.id ? 'font-bold text-soul' : 'font-medium text-[#8FA3B0]'}`}
        >
          {current === t.id ? '● ' : '○ '}
          {t.label}
        </button>
      ))}
    </div>
  )
}
