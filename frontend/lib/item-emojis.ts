import type { CategoryId, Rarity } from '@/types'

const ITEM_EMOJI_CATALOG: Record<CategoryId, Record<Rarity, string>> = {
  coffee: {
    DEFAULT: '☕',
    COMMON: '🥤',
    RARE: '🫘',
    EPIC: '🫖',
    LEGENDARY: '🍯',
  },
  food: {
    DEFAULT: '🍔',
    COMMON: '🍕',
    RARE: '🌮',
    EPIC: '🍜',
    LEGENDARY: '🍣',
  },
  transport: {
    DEFAULT: '🚗',
    COMMON: '🚕',
    RARE: '⛽',
    EPIC: '🏎️',
    LEGENDARY: '🛻',
  },
  shopping: {
    DEFAULT: '🛍️',
    COMMON: '🛒',
    RARE: '📦',
    EPIC: '💄',
    LEGENDARY: '💍',
  },
  gaming: {
    DEFAULT: '🎮',
    COMMON: '🕹️',
    RARE: '🎲',
    EPIC: '🎯',
    LEGENDARY: '🎸',
  },
  travel: {
    DEFAULT: '✈️',
    COMMON: '🧳',
    RARE: '🗺️',
    EPIC: '🚢',
    LEGENDARY: '🌍',
  },
  fitness: {
    DEFAULT: '💪',
    COMMON: '🏋️',
    RARE: '🤸',
    EPIC: '🥊',
    LEGENDARY: '🥇',
  },
  education: {
    DEFAULT: '📚',
    COMMON: '📝',
    RARE: '🎓',
    EPIC: '🔬',
    LEGENDARY: '🏫',
  },
  streaming: {
    DEFAULT: '🎬',
    COMMON: '🎧',
    RARE: '📺',
    EPIC: '🎤',
    LEGENDARY: '🎚️',
  },
  tech: {
    DEFAULT: '💻',
    COMMON: '📱',
    RARE: '⌨️',
    EPIC: '🖥️',
    LEGENDARY: '🛰️',
  },
}

const rarityFromPath = {
  default: 'DEFAULT',
  common: 'COMMON',
  rare: 'RARE',
  epic: 'EPIC',
  legendary: 'LEGENDARY',
} as const satisfies Record<string, Rarity>

export function getItemEmoji(icon: string | undefined | null): string {
  if (!icon) return '🎁'
  if (!icon.startsWith('/icons/bonus/')) return icon

  const match = icon.match(/^\/icons\/bonus\/([a-z]+)-(default|common|rare|epic|legendary)-(\d+)\.svg$/)
  if (!match) return '🎁'

  const [, categorySlug, raritySlug, indexRaw] = match
  const category = categorySlug as CategoryId
  const rarity = rarityFromPath[raritySlug as keyof typeof rarityFromPath]
  void indexRaw

  return ITEM_EMOJI_CATALOG[category]?.[rarity] ?? '🎁'
}
