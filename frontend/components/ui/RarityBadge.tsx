import { RARITY_CONFIG } from '@/lib/constants'
import type { Rarity } from '@/types'

export function RarityBadge({ rarity }: { rarity: Rarity }) {
  const cfg = RARITY_CONFIG[rarity]
  return (
    <span
      className="text-[9px] font-black uppercase tracking-wider rounded-md px-1.5 py-0.5"
      style={{ color: cfg.color, background: cfg.bg }}
    >
      {cfg.label}
    </span>
  )
}
