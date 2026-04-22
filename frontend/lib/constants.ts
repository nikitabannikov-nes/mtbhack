import type { Rarity, CategoryId } from '@/types'

export const RARITY_CONFIG: Record<Rarity, {
  label: string
  color: string
  bg: string
  border: string
  glow: string
  gradient: string
}> = {
  DEFAULT: {
    label: 'Базовый',
    color: '#9E9E9E',
    bg: '#F5F5F5',
    border: '#E0E0E0',
    glow: 'rgba(158,158,158,0.15)',
    gradient: 'from-gray-400 to-gray-500',
  },
  COMMON: {
    label: 'Обычный',
    color: '#607D8B',
    bg: '#ECEFF1',
    border: '#B0BEC5',
    glow: 'rgba(96,125,139,0.25)',
    gradient: 'from-slate-400 to-slate-600',
  },
  RARE: {
    label: 'Редкий',
    color: '#1565C0',
    bg: '#E3F2FD',
    border: '#90CAF9',
    glow: 'rgba(21,101,192,0.3)',
    gradient: 'from-blue-500 to-blue-700',
  },
  EPIC: {
    label: 'Эпический',
    color: '#6A1B9A',
    bg: '#F3E5F5',
    border: '#CE93D8',
    glow: 'rgba(106,27,154,0.35)',
    gradient: 'from-purple-500 to-purple-800',
  },
  LEGENDARY: {
    label: 'Легендарный',
    color: '#E65100',
    bg: '#FFF3E0',
    border: '#FFCC02',
    glow: 'rgba(230,81,0,0.45)',
    gradient: 'from-orange-400 to-orange-600',
  },
}

export const CATEGORY_CONFIG: Record<CategoryId, {
  name: string
  icon: string
  color: string
  desc: string
}> = {
  coffee:        { name: 'Кофе',          icon: '☕', color: '#795548', desc: 'Кофейни и напитки' },
  food:          { name: 'Еда',            icon: '🍕', color: '#E53935', desc: 'Рестораны и кафе' },
  delivery:      { name: 'Доставка',       icon: '📦', color: '#F57C00', desc: 'Курьерские сервисы' },
  transport:     { name: 'Транспорт',      icon: '🚕', color: '#0288D1', desc: 'Такси и каршеринг' },
  subscriptions: { name: 'Подписки',       icon: '🎵', color: '#7B1FA2', desc: 'Стриминг и сервисы' },
  marketplace:   { name: 'Маркетплейс',   icon: '🛍️', color: '#388E3C', desc: 'Онлайн-магазины' },
  games:         { name: 'Игры',           icon: '🎮', color: '#1565C0', desc: 'Игры и развлечения' },
  travel:        { name: 'Путешествия',    icon: '✈️', color: '#00897B', desc: 'Билеты и отели' },
  education:     { name: 'Обучение',       icon: '📚', color: '#F9A825', desc: 'Курсы и образование' },
  tech:          { name: 'Техника',        icon: '💻', color: '#546E7A', desc: 'Электроника и гаджеты' },
}

export const ENERGY_MAX_BY_LEVEL: Record<number, number> = {
  1: 7,
  2: 10,
  3: 12,
  4: 15,
}

export const LEVEL_SPEND_THRESHOLDS = [
  { level: 1, min: 0,    max: 500  },
  { level: 2, min: 500,  max: 1500 },
  { level: 3, min: 1500, max: 3000 },
  { level: 4, min: 3000, max: Infinity },
]

export const BOARD_SIZE = 25

export const RARITY_ORDER: Rarity[] = ['DEFAULT', 'COMMON', 'RARE', 'EPIC', 'LEGENDARY']
