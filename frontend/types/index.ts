export type Rarity = 'DEFAULT' | 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY'

export type CategoryId =
  | 'coffee' | 'food' | 'delivery' | 'transport'
  | 'subscriptions' | 'marketplace' | 'games'
  | 'travel' | 'education' | 'tech'

export type RewardType =
  | 'NONE' | 'CASHBACK_BOOST' | 'PROMO_CODE'
  | 'DISCOUNT' | 'FREE_DELIVERY' | 'SUBSCRIPTION' | 'CERTIFICATE'

export type ItemStatus = 'ACTIVE' | 'FROZEN'

export type TaskType = 'DAILY' | 'WEEKLY' | 'REFERRAL'
export type TaskEventType =
  | 'LOGIN' | 'CREATE_ITEM' | 'MERGE'
  | 'SPEND' | 'TRANSFER' | 'REFERRAL_SIGNUP'

export interface GameItem {
  id: string
  category: CategoryId
  rarity: Rarity
  name: string
  icon: string
  boardPosition: number
  status: ItemStatus
  bonusType?: RewardType
  bonusDescription?: string
  bonusValue?: number
  bonusUnit?: 'PERCENT' | 'BYN'
  partnerName?: string
  timerMinDays?: number
  timerMaxDays?: number
  expiresAt?: string
  createdAt: string
}

export interface UserProfile {
  id: string
  username: string
  email: string
  level: number
  energy: number
  maxEnergy: number
  mtBalls: number
  monthlySpend: number
  selectedCategories: CategoryId[]
  referralCode: string
}

export interface Task {
  id: string
  type: TaskType
  eventType: TaskEventType
  title: string
  icon: string
  energyReward: number
  currentCount: number
  targetCount: number
  completed: boolean
  claimed: boolean
  periodKey?: string
}

export interface Reward {
  id: string
  type: RewardType
  value: number
  description: string
  source: 'ITEM_CREATED' | 'MERGE' | 'TASK_CLAIMED'
  createdAt: string
}

export interface MtBallTransaction {
  id: string
  delta: number
  reason: string
  createdAt: string
}

export interface ApiError {
  code: string
  message: string
  status: number
}

export interface AuthResponse {
  token: string
  user: UserProfile
}

export interface BoardResponse {
  cells: (GameItem | null)[]
}

export interface CreateItemResponse {
  item: GameItem
  energyLeft: number
  reward?: Reward
}

export interface MergeResponse {
  merged: GameItem
  energyLeft: number
  reward?: Reward
}

export interface ClaimTaskResponse {
  energyGranted: number
  energyLeft: number
}
