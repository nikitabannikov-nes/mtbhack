'use client'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { LEVEL_SPEND_THRESHOLDS } from '@/lib/constants'
import { useAuthStore } from '@/store/auth'

function formatMtBalls(value: number) {
  const hasFraction = Math.abs(value % 1) > 0
  return value.toLocaleString('ru-RU', {
    minimumFractionDigits: hasFraction ? 1 : 0,
    maximumFractionDigits: hasFraction ? 1 : 0,
  })
}

function formatShortDate(value: string) {
  return new Date(value).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
  })
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function UserAvatar() {
  return (
    <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-[20px] bg-[rgba(217,217,217,0.52)]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0))]" />
      <svg viewBox="0 0 72 72" className="h-[60px] w-[60px]" aria-hidden="true">
        <defs>
          <linearGradient id="profile-avatar-fill" x1="36" y1="7" x2="36" y2="65" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EEF5FF" />
            <stop offset="1" stopColor="#55A7FF" />
          </linearGradient>
        </defs>
        <path
          d="M36 12c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13Zm0 30c12.15 0 22 8.51 22 19 0 1.66-1.34 3-3 3H17c-1.66 0-3-1.34-3-3 0-10.49 9.85-19 22-19Z"
          fill="url(#profile-avatar-fill)"
        />
      </svg>
    </div>
  )
}

export default function ProfilePage() {
  const qc = useQueryClient()
  const setUser = useAuthStore((s) => s.setUser)
  const [toast, setToast] = useState<string | null>(null)

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const profile = await api.profile.get()
      setUser(profile)
      return profile
    },
  })

  const levelQuery = useQuery({
    queryKey: ['profile', 'level'],
    queryFn: api.profile.level,
  })

  const mtballsQuery = useQuery({
    queryKey: ['mtballs'],
    queryFn: api.mtballs.balance,
  })

  function showToast(message: string) {
    setToast(message)
    setTimeout(() => setToast(null), 2500)
  }

  const withdrawMutation = useMutation({
    mutationFn: api.mtballs.withdraw,
    onSuccess: async (result) => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: ['mtballs'] }),
        qc.invalidateQueries({ queryKey: ['profile'] }),
      ])
      showToast(`✅ ${result.message}`)
    },
    onError: () => showToast('Не удалось вывести МТБаллы'),
  })

  const profile = profileQuery.data
  const mtBalls = mtballsQuery.data?.balance ?? profile?.mtBalls ?? 0
  const txHistory = mtballsQuery.data?.transactions ?? []
  const level = profile?.level ?? 1
  const spend = profile?.monthlySpend ?? 0
  const currentThreshold = LEVEL_SPEND_THRESHOLDS[Math.max(0, level - 1)]
  const nextThreshold = LEVEL_SPEND_THRESHOLDS[level] ?? null
  const spendCurrent = levelQuery.data?.spendCurrent ?? spend
  const spendRequired = levelQuery.data?.spendRequired ?? nextThreshold?.min ?? currentThreshold.max
  const progressLimit = nextThreshold ? nextThreshold.min - currentThreshold.min : currentThreshold.max - currentThreshold.min
  const progressValue = nextThreshold
    ? clamp(spendCurrent - currentThreshold.min, 0, progressLimit)
    : progressLimit
  const progressPercent = progressLimit > 0 ? clamp((progressValue / progressLimit) * 100, 0, 100) : 100
  const levelLabel = nextThreshold ? `${level} уровень` : 'Максимальный уровень'

  function handleWithdraw() {
    if (mtBalls <= 0 || withdrawMutation.isPending) return
    withdrawMutation.mutate()
  }

  return (
    <div className="min-h-full bg-[#F5F5F5] text-[#111111]">
      <section
        className="relative overflow-hidden rounded-b-[40px] text-white shadow-[0_4px_14px_rgba(0,0,0,0.18)]"
        style={{
          background: 'radial-gradient(120% 70% at 48% 48%, #0D1B73 17%, #1F36D3 72%)',
        }}
      >
        <div className="px-5 pb-5 pt-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <UserAvatar />
              <div className="min-w-0">
                <p className="max-w-[170px] break-words text-[22px] font-semibold leading-tight tracking-[-0.03em] text-white">
                  {profile?.username ?? 'Danil Kolbasenko'}
                </p>
                <p className="mt-1 text-[15px] font-light leading-none text-white/80">
                  МТБанк
                </p>
              </div>
            </div>

            <img
              src="/icons/profile/info.svg"
              alt=""
              className="h-6 w-6 shrink-0 opacity-95"
              aria-hidden="true"
            />
          </div>

          <div className="mt-5">
            <p className="text-[20px] font-semibold leading-none tracking-[-0.03em] text-white">
              МТ-Баллы
            </p>

            <div className="mt-1.5 flex items-end gap-2">
              <p className="text-[42px] font-bold leading-none tracking-[-0.05em] text-white">
                {formatMtBalls(mtBalls)}
              </p>
              <img
                src="/icons/profile/mtball.svg"
                alt=""
                className="mb-1 h-[22px] w-[28px] shrink-0"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-[18px] font-normal leading-none text-white">
              {levelLabel}
            </p>

            <div className="mt-3 h-[18px] overflow-hidden rounded-full bg-[#F0F0F0] shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)]">
              <div
                className="h-full rounded-full bg-[#3772F4] transition-all duration-500"
                style={{ width: `${Math.max(nextThreshold ? 12 : 100, progressPercent)}%` }}
              />
            </div>

            <p className="mt-2 text-center text-[13px] font-normal leading-none text-white/80">
              {nextThreshold ? `${spendCurrent} из ${spendRequired} BYN` : `${spendCurrent} BYN`}
            </p>
          </div>
        </div>
      </section>

      <div className="space-y-5 pb-8 pt-5">
        <section className="rounded-[40px] bg-[#FBFBFB] px-6 py-5 shadow-[0_3px_12px_rgba(0,0,0,0.10)]">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[20px] font-semibold leading-none text-black">
                Вывести МТ-Баллы
              </p>
              <p className="mt-3 text-[14px] font-light leading-none text-black">
                На бонусный счёт пакета
              </p>
            </div>

            <button
              onClick={handleWithdraw}
              disabled={mtBalls <= 0 || withdrawMutation.isPending}
              className={[
                'flex h-[49px] w-[150px] shrink-0 items-center justify-center rounded-[24px] text-[24px] font-medium leading-none transition-transform',
                mtBalls > 0 && !withdrawMutation.isPending
                  ? 'bg-[#1F36D3] text-white active:scale-[0.98]'
                  : 'bg-[#D7DDF4] text-white/80',
              ].join(' ')}
            >
              {withdrawMutation.isPending ? '...' : 'Вывести'}
            </button>
          </div>
        </section>

        <section className="rounded-[40px] bg-[#FBFBFB] px-6 py-6 shadow-[0_3px_12px_rgba(0,0,0,0.10)]">
          <p className="text-[20px] font-semibold leading-none text-black">
            Реферальный код
          </p>

          <div className="mt-6 rounded-[40px] bg-[#EEEEEE] px-6 py-5 text-center">
            <p className="text-[32px] font-medium leading-none tracking-[-0.04em] text-black">
              {profile?.referralCode ?? '7H4Td02L'}
            </p>
          </div>

          <p className="mt-6 text-[14px] font-light leading-[1.15] text-black">
            Поделись кодом - друг получит пакет, а ты энергию
          </p>
        </section>

        <section className="rounded-[40px] bg-[#FBFBFB] px-6 py-6 shadow-[0_3px_12px_rgba(0,0,0,0.10)]">
          <p className="text-[20px] font-semibold leading-none text-black">
            История МТ-Баллов
          </p>

          {txHistory.length === 0 ? (
            <p className="mt-4 text-[16px] font-normal leading-none text-black">
              Пока нет операций по МТ-Баллам
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {txHistory.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between gap-4 rounded-[28px] bg-[#F1F1F1] px-5 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-medium leading-none text-black">
                      {tx.reason}
                    </p>
                    <p className="mt-2 text-[13px] font-light leading-none text-black/70">
                      {formatShortDate(tx.createdAt)}
                    </p>
                  </div>

                  <span
                    className={[
                      'shrink-0 text-[18px] font-semibold leading-none',
                      tx.delta > 0 ? 'text-[#159947]' : 'text-[#D14343]',
                    ].join(' ')}
                  >
                    {tx.delta > 0 ? '+' : ''}
                    {tx.delta}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {(profileQuery.isLoading || levelQuery.isLoading || mtballsQuery.isLoading) && (
          <div className="px-6 text-center text-[14px] font-light text-black/55">
            Загружаем профиль...
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed left-1/2 top-4 z-[200] -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#0D7A43] px-5 py-2.5 text-sm font-bold text-white shadow-xl animate-slide-up">
          {toast}
        </div>
      )}
    </div>
  )
}
