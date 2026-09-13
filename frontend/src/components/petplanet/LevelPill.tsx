type LevelPillProps = {
  level: number
}

export function LevelPill({ level }: LevelPillProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border-2 border-soul-deep bg-sun px-2 py-[3px] text-[12px] font-bold text-soul-deep shadow-[0_2px_0_#0F5F61]">
      <span className="font-mono text-[9px] opacity-70">NV</span>
      {level}
    </div>
  )
}
