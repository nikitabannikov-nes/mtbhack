import type { GameItem, Task, UserProfile } from '@/types'
import { makeItemAt } from './game-logic'

export const MOCK_PROFILE: UserProfile = {
  id: '1',
  username: 'Никита',
  email: 'nikita@example.com',
  level: 2,
  energy: 5,
  maxEnergy: 10,
  mtBalls: 1.5,
  monthlySpend: 850,
  selectedCategories: ['food', 'coffee'],
  referralCode: 'MTB-NK2024',
  availableCategories: ['food', 'coffee', 'gaming', 'travel', 'fitness', 'shopping'],
}

export const MOCK_BOARD: (GameItem | null)[] = (() => {
  const cells: (GameItem | null)[] = Array(25).fill(null)

  const place = (pos: number, cat: Parameters<typeof makeItemAt>[0], rar: Parameters<typeof makeItemAt>[1]) => {
    cells[pos] = makeItemAt(cat, rar, pos)
  }

  place(0,  'food',   'DEFAULT')
  place(1,  'food',   'DEFAULT')
  place(2,  'coffee', 'COMMON')
  place(3,  'food',   'RARE')
  place(5,  'coffee', 'DEFAULT')
  place(7,  'food',   'COMMON')
  place(12, 'coffee', 'EPIC')

  // One frozen item with timer
  const frozen = makeItemAt('food', 'RARE', 10)
  frozen.status   = 'FROZEN'
  frozen.expiresAt = new Date(Date.now() + 2 * 86400000).toISOString()
  cells[10] = frozen

  return cells
})()

export const MOCK_TASKS_DAILY: Task[] = [
  { id: 'd1', type: 'DAILY', eventType: 'LOGIN',       title: 'Войти в приложение',         icon: '📱', energyReward: 1, currentCount: 1, targetCount: 1, completed: true,  claimed: false, periodKey: today() },
  { id: 'd2', type: 'DAILY', eventType: 'CREATE_ITEM', title: 'Открыть 1 клетку',           icon: '🎲', energyReward: 1, currentCount: 0, targetCount: 1, completed: false, claimed: false, periodKey: today() },
  { id: 'd3', type: 'DAILY', eventType: 'MERGE',       title: 'Совершить 1 слияние',        icon: '✨', energyReward: 1, currentCount: 0, targetCount: 1, completed: false, claimed: false, periodKey: today() },
  { id: 'd4', type: 'DAILY', eventType: 'SPEND',       title: 'Совершить покупку по карте', icon: '💳', energyReward: 1, currentCount: 0, targetCount: 1, completed: false, claimed: false, periodKey: today() },
]

export const MOCK_TASKS_WEEKLY: Task[] = [
  { id: 'w1', type: 'WEEKLY', eventType: 'SPEND',    title: 'Сделай 3 покупки по карте',         icon: '🛍️', energyReward: 3, currentCount: 2, targetCount: 3, completed: false, claimed: false, periodKey: thisWeek() },
  { id: 'w2', type: 'WEEKLY', eventType: 'TRANSFER', title: 'Переведи другу через МТБанк',       icon: '📤', energyReward: 2, currentCount: 0, targetCount: 1, completed: false, claimed: false, periodKey: thisWeek() },
  { id: 'w3', type: 'WEEKLY', eventType: 'MERGE',    title: 'Сделай 5 слияний за неделю',        icon: '🔀', energyReward: 3, currentCount: 1, targetCount: 5, completed: false, claimed: false, periodKey: thisWeek() },
  { id: 'w4', type: 'WEEKLY', eventType: 'LOGIN',    title: 'Войди 5 дней подряд',               icon: '📅', energyReward: 2, currentCount: 3, targetCount: 5, completed: false, claimed: false, periodKey: thisWeek() },
]

export const MOCK_TASKS_REFERRAL: Task[] = [
  { id: 'r1', type: 'REFERRAL', eventType: 'REFERRAL_SIGNUP', title: 'Пригласи 1 друга в МТБанк',   icon: '👥', energyReward: 5, currentCount: 0, targetCount: 1,  completed: false, claimed: false },
  { id: 'r2', type: 'REFERRAL', eventType: 'REFERRAL_SIGNUP', title: 'Пригласи 5 друзей в МТБанк',  icon: '🎉', energyReward: 4, currentCount: 0, targetCount: 5,  completed: false, claimed: false },
  { id: 'r3', type: 'REFERRAL', eventType: 'REFERRAL_SIGNUP', title: 'Пригласи 10 друзей в МТБанк', icon: '🚀', energyReward: 4, currentCount: 0, targetCount: 10, completed: false, claimed: false },
]

function today() {
  return new Date().toISOString().slice(0, 10)
}

function thisWeek() {
  const d = new Date()
  const day = d.getDay() || 7
  d.setDate(d.getDate() - day + 1)
  return `${d.getFullYear()}-W${String(Math.ceil(d.getDate() / 7)).padStart(2, '0')}`
}
