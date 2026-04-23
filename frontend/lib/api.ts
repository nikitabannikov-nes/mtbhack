import axios, { type AxiosError } from 'axios'
import type {
  AuthResponse, BoardResponse, CreateItemResponse, MergeResponse,
  ClaimTaskResponse, Task, UserProfile, Reward, MtBallTransaction, ApiError,
  CategoryId, GameItem, TaskType, TaskEventType,
} from '@/types'
import { LEVEL_SPEND_THRESHOLDS } from '@/lib/constants'

type BackendProfile = {
  userId: number
  email: string
  username: string
  energy: number
  maxEnergy: number
  mtBalls: number
  playerLevel: number
  monthlySpend: number
  referralCode: string
  categories: CategoryId[]
}

type BackendAuthResponse = {
  token: string
  profile: BackendProfile
}

type BackendGameItem = {
  id: number
  categorySlug: CategoryId
  rarity: GameItem['rarity']
  name: string
  icon: string
  boardPosition: number
  status: GameItem['status']
  bonusType?: GameItem['bonusType']
  bonusDescription?: string
  bonusValue?: number
  bonusUnit?: 'PERCENT' | 'BYN' | 'NONE'
  partnerName?: string
  expiresAt?: string
  createdAt: string
}

type BackendBoardResponse = {
  items: BackendGameItem[]
  energy: number
  maxEnergy: number
}

type BackendTask = {
  progressId: number | null
  taskId: number
  type: TaskType
  eventType: TaskEventType
  title: string
  icon: string
  energyReward: number
  targetCount: number
  currentCount: number
  completed: boolean
  claimed: boolean
}

type BackendCreateItemResponse = {
  item: BackendGameItem
  energyAfter: number
}

type BackendClaimTaskResponse = {
  energyGained: number
  energyAfter: number
}

type BackendLevelResponse = {
  level: number
  spendRequired: number
  spendCurrent: number
  categorySlots: number
  maxEnergy: number
}

type BackendMtBallBalanceResponse = {
  balance: number
  transactions: Array<{
    id: number
    delta: number
    reason: string
    createdAt: string
  }>
}

type BackendWithdrawResponse = {
  success: boolean
  message: string
}

const mapProfile = (profile: BackendProfile): UserProfile => ({
  id: String(profile.userId),
  username: profile.username,
  email: profile.email,
  level: profile.playerLevel,
  energy: profile.energy,
  maxEnergy: profile.maxEnergy,
  mtBalls: profile.mtBalls,
  monthlySpend: profile.monthlySpend,
  selectedCategories: profile.categories,
  referralCode: profile.referralCode,
})

const mapGameItem = (item: BackendGameItem): GameItem => ({
  id: String(item.id),
  category: item.categorySlug,
  rarity: item.rarity,
  name: item.name,
  icon: item.icon,
  boardPosition: item.boardPosition,
  status: item.status,
  bonusType: item.bonusType,
  bonusDescription: item.bonusDescription,
  bonusValue: item.bonusValue,
  bonusUnit: item.bonusUnit === 'NONE' ? undefined : item.bonusUnit,
  partnerName: item.partnerName,
  expiresAt: item.expiresAt,
  createdAt: item.createdAt,
})

const mapBoard = (board: BackendBoardResponse): BoardResponse => {
  const cells: (GameItem | null)[] = Array(25).fill(null)
  for (const item of board.items) {
    cells[item.boardPosition] = mapGameItem(item)
  }
  return { cells, energy: board.energy, maxEnergy: board.maxEnergy }
}

const mapTask = (task: BackendTask): Task => ({
  id: String(task.progressId ?? task.taskId),
  type: task.type,
  eventType: task.eventType,
  title: task.title,
  icon: task.icon,
  energyReward: task.energyReward,
  currentCount: task.currentCount,
  targetCount: task.targetCount,
  completed: task.completed,
  claimed: task.claimed,
})

const mapMtBallTransaction = (tx: BackendMtBallBalanceResponse['transactions'][number]): MtBallTransaction => ({
  id: String(tx.id),
  delta: tx.delta,
  reason: tx.reason,
  createdAt: tx.createdAt,
})

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('auth-storage')
    if (raw) {
      const { state } = JSON.parse(raw) as { state: { token: string | null } }
      if (state?.token) config.headers.Authorization = `Bearer ${state.token}`
    }
  }
  return config
})

http.interceptors.response.use(
  (r) => r,
  (err: AxiosError<ApiError>) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('auth-storage')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  },
)

export const api = {
  auth: {
    register: (body: { email: string; password: string; username: string }) =>
      http.post<BackendAuthResponse>('/api/auth/register', body).then(r => ({
        token: r.data.token,
        user: mapProfile(r.data.profile),
      }) satisfies AuthResponse),
    login: (body: { email: string; password: string }) =>
      http.post<BackendAuthResponse>('/api/auth/login', body).then(r => ({
        token: r.data.token,
        user: mapProfile(r.data.profile),
      }) satisfies AuthResponse),
    me: () =>
      http.get<BackendProfile>('/api/auth/me').then(r => mapProfile(r.data)),
  },

  profile: {
    get: () =>
      http.get<BackendProfile>('/api/profile').then(r => mapProfile(r.data)),
    setCategories: (categoryIds: CategoryId[]) =>
      http.put<BackendProfile>('/api/profile/categories', { categoryIds }).then(r => mapProfile(r.data)),
    level: () =>
      http.get<BackendLevelResponse>('/api/profile/level').then(r => r.data),
  },

  game: {
    board: () =>
      http.get<BackendBoardResponse>('/api/game/board').then(r => mapBoard(r.data)),
    createItem: (boardPosition: number) =>
      http.post<BackendCreateItemResponse>('/api/game/items', { boardPosition }).then(r => ({
        item: mapGameItem(r.data.item),
        energyLeft: r.data.energyAfter,
      }) satisfies CreateItemResponse),
    merge: (sourceItemId: number, targetItemId: number, targetPosition: number) =>
      http.post<BackendGameItem>('/api/game/items/merge', { sourceItemId, targetItemId, targetPosition }).then(r => ({
        merged: mapGameItem(r.data),
      }) satisfies MergeResponse),
    moveItem: (sourceItemId: number, targetPosition: number) =>
      http.post<BackendBoardResponse>('/api/game/items/move', { sourceItemId, targetPosition }).then(r => mapBoard(r.data)),
    energy: () =>
      http.get<{ energy: number; maxEnergy: number }>('/api/game/energy').then(r => r.data),
    rewards: async () => [] as Reward[],
    deleteItem: (itemId: number) =>
      http.delete<{ energyAfter: number }>('/api/game/items', { data: { itemId } }).then(r => ({
        energyLeft: r.data.energyAfter,
      })),
    activateItem: (itemId: number) =>
      http.post<BackendGameItem>('/api/game/items/activate', { itemId }).then(r => ({
        expiresAt: r.data.expiresAt ?? '',
      })),
    takeMtBalls: (itemId: number) =>
      http.post<{ gained: number; totalMtBalls: number }>('/api/mt-balls/take', { itemId }).then(r => ({
        mtBalls: r.data.gained,
        newBalance: r.data.totalMtBalls,
      })),
  },

  tasks: {
    daily: () =>
      http.get<BackendTask[]>('/api/tasks', { params: { type: 'DAILY' } }).then(r => r.data.map(mapTask)),
    weekly: () =>
      http.get<BackendTask[]>('/api/tasks', { params: { type: 'WEEKLY' } }).then(r => r.data.map(mapTask)),
    referral: () =>
      http.get<BackendTask[]>('/api/tasks', { params: { type: 'REFERRAL' } }).then(r => r.data.map(mapTask)),
    claim: (id: string) =>
      http.post<BackendClaimTaskResponse>('/api/tasks/claim', { taskProgressId: Number(id) }).then(r => ({
        energyGranted: r.data.energyGained,
        energyLeft: r.data.energyAfter,
      }) satisfies ClaimTaskResponse),
  },

  mtballs: {
    balance: () =>
      http.get<BackendMtBallBalanceResponse>('/api/mt-balls').then(r => ({
        balance: r.data.balance,
        transactions: r.data.transactions.map(mapMtBallTransaction),
      })),
    withdraw: () =>
      http.post<BackendWithdrawResponse>('/api/mt-balls/withdraw').then(r => r.data),
  },

  mock: {
    spend: (amount: number, category?: CategoryId) =>
      http.post('/api/mock/spend', { amount, category }).then(r => r.data),
    transfer: (amount: number) =>
      http.post('/api/mock/transfer', { amount }).then(r => r.data),
    loginEvent: () =>
      http.post('/api/mock/login').then(r => r.data),
    referral: (referralCode: string) =>
      http.post('/api/mock/referral', { referralCode }).then(r => r.data),
  },
}
