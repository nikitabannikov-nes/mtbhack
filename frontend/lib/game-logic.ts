import type { GameItem, Rarity, CategoryId } from '@/types'
import { RARITY_ORDER } from './constants'
import { ITEM_CATALOG } from './items'

const RARITY_WEIGHTS: Record<Rarity, number> = {
  DEFAULT:   9599,
  COMMON:    300,
  RARE:      150,
  EPIC:      50,
  LEGENDARY: 1,
}

export function makeItemAt(category: CategoryId, rarity: Rarity, position: number): GameItem {
  return makeItem(category, rarity, position)
}

function makeItem(category: CategoryId, rarity: Rarity, position: number): GameItem {
  const t = ITEM_CATALOG[category][rarity]
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    category,
    rarity,
    name: t.name,
    iconPath: t.iconPath,
    boardPosition: position,
    status: 'ACTIVE',
    bonusType: t.bonusType,
    description: t.description,
    bonusValue: t.bonusValue,
    bonusUnit: t.bonusUnit === 'NONE' ? undefined : t.bonusUnit,
    partnerName: t.partnerName,
    timerDays: t.timerDays,
    createdAt: new Date().toISOString(),
  }
}

export function pickItem(categories: CategoryId[], position: number): GameItem {
  const cats = categories.length > 0 ? categories : ['food' as CategoryId]

  const pool: Array<{ category: CategoryId; rarity: Rarity; weight: number }> = []
  for (const cat of cats) {
    for (const rarity of RARITY_ORDER) {
      pool.push({ category: cat, rarity, weight: RARITY_WEIGHTS[rarity] })
    }
  }

  const total = pool.reduce((s, e) => s + e.weight, 0)
  let r = Math.random() * total
  for (const entry of pool) {
    r -= entry.weight
    if (r <= 0) return makeItem(entry.category, entry.rarity, position)
  }
  return makeItem(pool[0].category, pool[0].rarity, position)
}

export function getMergeResult(a: GameItem, b: GameItem, position: number): GameItem | null {
  if (a.rarity !== b.rarity || a.category !== b.category) return null
  if (a.status === 'FROZEN' || b.status === 'FROZEN') return null

  const nextIdx = RARITY_ORDER.indexOf(a.rarity) + 1
  if (nextIdx >= RARITY_ORDER.length) return null

  const nextRarity = RARITY_ORDER[nextIdx]
  return makeItem(a.category, nextRarity, position)
}

export function randomMtBalls(): number {
  const raw = 0.5 + Math.random() * 1.5
  return Math.round(raw * 10) / 10
}

export function randomTimer(minDays: number, maxDays: number): string {
  const days = minDays + Math.floor(Math.random() * (maxDays - minDays + 1))
  const expires = new Date(Date.now() + days * 86400000)
  return expires.toISOString()
}

export function daysLeft(expiresAt: string): number {
  return Math.max(0, Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 86400000))
}
