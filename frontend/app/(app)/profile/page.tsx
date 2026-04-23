'use client'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import { LEVEL_SPEND_THRESHOLDS } from '@/lib/constants'
import { ProgressBar } from '@/components/ui/ProgressBar'

export default function ProfilePage() {
  const qc = useQueryClient()
  const setUser = useAuthStore((s) => s.setUser)
  const [toast,    setToast]    = useState<string | null>(null)

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

  function showToast(msg: string) {
    setToast(msg); setTimeout(() => setToast(null), 2500)
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
  const level = profile?.level ?? 1
  const spend = profile?.monthlySpend ?? 0
  const maxEn = profile?.maxEnergy ?? 7
  const current = LEVEL_SPEND_THRESHOLDS[Math.max(0, level - 1)]
  const next = LEVEL_SPEND_THRESHOLDS[level] ?? null
  const progress = next ? spend - current.min : current.max
  const target = next ? next.min - current.min : current.max - current.min

  function handleWithdraw() {
    if (mtBalls <= 0 || withdrawMutation.isPending) return
    withdrawMutation.mutate()
  }

  const txHistory = mtballsQuery.data?.transactions ?? []

  return (
    <div className="flex flex-col gap-4 p-4">

      {/* Profile card */}
      <div className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 rounded-3xl p-5 text-white shadow-lg">
        <div className="flex gap-4 items-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl border-2 border-white/25">
            👤
          </div>
          <div>
            <p className="font-black text-lg leading-tight">{profile?.username ?? 'Профиль'}</p>
            <p className="text-blue-200 text-xs mt-0.5">МТБанк</p>
            <span className="inline-block mt-1.5 bg-white/20 text-white text-xs font-black px-2.5 py-0.5 rounded-full">
              Уровень {level}
            </span>
          </div>
        </div>

        {/* MT-balls */}
        <div className="bg-white/15 rounded-2xl p-3 mb-3">
          <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider mb-1">МТБаллы</p>
          <p className="text-2xl font-black">
            💰 {mtBalls.toLocaleString('ru', { minimumFractionDigits: mtBalls % 1 !== 0 ? 1 : 0 })}
          </p>
        </div>

        {/* Level progress */}
        {next ? (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-blue-200">
              <span>До уровня {level + 1}</span>
              <span className="text-white font-bold">{levelQuery.data?.spendCurrent ?? spend} / {levelQuery.data?.spendRequired ?? next.min} BYN</span>
            </div>
            <ProgressBar value={progress} max={target} color="bg-white/90" height="h-2" />
            <p className="text-[10px] text-blue-200">Макс. энергия: ⚡ {maxEn}</p>
          </div>
        ) : (
          <p className="text-xs text-blue-200 text-center">🏆 Максимальный уровень!</p>
        )}
      </div>

      {/* Level info */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="font-black text-sm text-gray-900 mb-3">Уровни и категории</p>
        <div className="flex flex-col gap-2">
          {LEVEL_SPEND_THRESHOLDS.map(l => (
            <div
              key={l.level}
              className={`flex items-center justify-between rounded-xl px-3 py-2 ${
                l.level === level ? 'bg-brand-50 border border-brand-200' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`text-xs font-black w-16 ${l.level === level ? 'text-brand-600' : 'text-gray-500'}`}>
                  Ур. {l.level}
                </span>
                <span className="text-xs text-gray-400">
                  {l.min}–{l.max === Infinity ? '∞' : l.max} BYN
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">{l.level} {l.level === 1 ? 'категория' : 'категории'}</span>
                {l.level === level && <span className="text-[10px] text-brand-500 font-black ml-1">← ты</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MT-balls withdraw */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-black text-sm text-gray-900">Вывести МТБаллы</p>
            <p className="text-xs text-gray-400 mt-0.5">На бонусный счёт пакета</p>
          </div>
          <button
            onClick={handleWithdraw}
            disabled={mtBalls <= 0 || withdrawMutation.isPending}
            className="bg-brand-600 text-white text-xs font-black px-4 py-2.5 rounded-xl disabled:opacity-40 active:scale-95 transition-transform"
          >
            {withdrawMutation.isPending ? 'Выводим...' : 'Вывести'}
          </button>
        </div>
      </div>

      {/* Referral */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="font-black text-sm text-gray-900 mb-2">Реферальный код</p>
        <div className="bg-gray-50 rounded-xl px-4 py-3 font-mono text-sm font-bold text-gray-800 text-center tracking-[0.2em] border border-gray-200">
          {profile?.referralCode ?? '--------'}
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Поделись кодом — друг подключит пакет, ты получишь ⚡
        </p>
      </div>

      {/* MT-balls history */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="font-black text-sm text-gray-900 mb-3">История МТБаллов</p>
        <div className="flex flex-col gap-2">
          {txHistory.length === 0 && (
            <p className="text-xs text-gray-400">Пока нет операций по МТБаллам</p>
          )}
          {txHistory.map(tx => (
            <div key={tx.id} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-xs font-semibold text-gray-700">{tx.reason}</p>
                <p className="text-[10px] text-gray-400">{new Date(tx.createdAt).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })}</p>
              </div>
              <span className={`text-sm font-black ${tx.delta > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {tx.delta > 0 ? '+' : ''}{tx.delta}
              </span>
            </div>
          ))}
        </div>
      </div>

      {(profileQuery.isLoading || levelQuery.isLoading || mtballsQuery.isLoading) && (
        <div className="text-center text-sm text-gray-400 py-4">Загружаем профиль...</div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-700 text-white text-sm font-bold px-5 py-2.5 rounded-2xl shadow-xl animate-slide-up z-[200] whitespace-nowrap">
          {toast}
        </div>
      )}

      <div className="h-4" />
    </div>
  )
}
