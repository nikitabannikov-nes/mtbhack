import axios, { type AxiosError } from 'axios'
import type {
  AuthResponse, BoardResponse, CreateItemResponse, MergeResponse,
  ClaimTaskResponse, Task, UserProfile, Reward, MtBallTransaction, ApiError,
  CategoryId,
} from '@/types'

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
      http.post<AuthResponse>('/api/auth/register', body).then(r => r.data),
    login: (body: { email: string; password: string }) =>
      http.post<AuthResponse>('/api/auth/login', body).then(r => r.data),
    me: () =>
      http.get<UserProfile>('/api/auth/me').then(r => r.data),
  },

  profile: {
    get: () =>
      http.get<UserProfile>('/api/profile').then(r => r.data),
    setCategories: (categoryIds: CategoryId[]) =>
      http.put<UserProfile>('/api/profile/categories', { categoryIds }).then(r => r.data),
    level: () =>
      http.get<{ level: number; spendRequired: number; spendCurrent: number; categorySlots: number; maxEnergy: number }>(
        '/api/profile/level',
      ).then(r => r.data),
  },

  game: {
    board: () =>
      http.get<BoardResponse>('/api/game/board').then(r => r.data),
    createItem: () =>
      http.post<CreateItemResponse>('/api/game/create-item').then(r => r.data),
    merge: (fromPosition: number, toPosition: number) =>
      http.post<MergeResponse>('/api/game/merge', { fromPosition, toPosition }).then(r => r.data),
    energy: () =>
      http.get<{ energy: number; maxEnergy: number }>('/api/game/energy').then(r => r.data),
    rewards: () =>
      http.get<Reward[]>('/api/game/rewards').then(r => r.data),
    deleteItem: (position: number) =>
      http.delete<{ energyLeft: number }>(`/api/game/item/${position}`).then(r => r.data),
    activateItem: (position: number) =>
      http.post<{ expiresAt: string }>(`/api/game/item/${position}/activate`).then(r => r.data),
    takeMtBalls: (position: number) =>
      http.post<{ mtBalls: number; newBalance: number }>(`/api/game/item/${position}/take-mtballs`).then(r => r.data),
  },

  tasks: {
    daily: () =>
      http.get<Task[]>('/api/tasks/daily').then(r => r.data),
    weekly: () =>
      http.get<Task[]>('/api/tasks/weekly').then(r => r.data),
    referral: () =>
      http.get<Task[]>('/api/tasks/referral').then(r => r.data),
    claim: (id: string) =>
      http.post<ClaimTaskResponse>(`/api/tasks/${id}/claim`).then(r => r.data),
  },

  mtballs: {
    balance: () =>
      http.get<{ balance: number; transactions: MtBallTransaction[] }>('/api/mtballs').then(r => r.data),
    withdraw: () =>
      http.post<{ success: boolean; message: string }>('/api/mtballs/withdraw').then(r => r.data),
  },

  mock: {
    spend: (amount: number, category?: CategoryId) =>
      http.post('/api/mock/spend', { amount, category }).then(r => r.data),
    transfer: (amount: number) =>
      http.post('/api/mock/transfer', { amount }).then(r => r.data),
    loginEvent: () =>
      http.post('/api/mock/login-event').then(r => r.data),
    referral: (referralCode: string) =>
      http.post('/api/mock/referral', { referralCode }).then(r => r.data),
  },
}
