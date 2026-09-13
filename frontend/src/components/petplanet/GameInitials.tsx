type GameInitialsProps = {
  label: string
}

export function GameInitials({ label }: GameInitialsProps) {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-soul-deep bg-soul text-[13.44px] font-bold text-soul-deep">
      {label}
    </div>
  )
}
