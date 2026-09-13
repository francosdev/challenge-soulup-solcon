type SparkleProps = {
  size?: number
  color?: string
  stroke?: string
}

export function Sparkle({ size = 16, color = '#C8A84B', stroke = '#0F5F61' }: SparkleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className="inline-block">
      <path
        d="M 8 1 L 9.4 6.6 L 15 8 L 9.4 9.4 L 8 15 L 6.6 9.4 L 1 8 L 6.6 6.6 Z"
        fill={color}
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}
