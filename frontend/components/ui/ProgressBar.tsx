interface Props {
  value: number
  max: number
  color?: string
  height?: string
}

export function ProgressBar({ value, max, color = 'bg-brand-500', height = 'h-2' }: Props) {
  const pct = Math.min(100, Math.round((value / Math.max(max, 1)) * 100))
  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${height}`}>
      <div
        className={`${color} ${height} rounded-full transition-all duration-500`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
