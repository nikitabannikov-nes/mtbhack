'use client'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import { useGameStore } from '@/store/game'
import { CATEGORY_CONFIG, ENERGY_MAX_BY_LEVEL } from '@/lib/constants'
import type { CategoryId } from '@/types'

const ALL_CATEGORIES = Object.keys(CATEGORY_CONFIG) as CategoryId[]

export default function CategoriesPage() {
  const qc       = useQueryClient()
  const setUser  = useAuthStore(s => s.setUser)
  const user     = useAuthStore(s => s.user)
  const addToast = useGameStore(s => s.addToast)

  const [selected, setSelected] = useState<CategoryId[]>([])

  const slots      = user?.level ?? 1
  const maxEnergy  = ENERGY_MAX_BY_LEVEL[user?.level ?? 1]
  const pool       = (user?.availableCategories?.length ?? 0) > 0
    ? user!.availableCategories
    : ALL_CATEGORIES
  const isLocked   = !!user?.categoriesLockedUntil

  const lockedUntilLabel = user?.categoriesLockedUntil
    ? new Date(user.categoriesLockedUntil).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
    : null

  useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const p = await api.profile.get()
      setUser(p)
      setSelected(p.selectedCategories)
      return p
    },
  })

  const saveMutation = useMutation({
    mutationFn: (ids: CategoryId[]) => api.profile.setCategories(ids),
    onSuccess: (updated) => {
      setUser(updated)
      addToast('✅ Категории сохранены', 'success')
      qc.invalidateQueries({ queryKey: ['board'] })
    },
    onError: (err: unknown) => {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      if (msg?.includes('once per month')) {
        addToast('Категории уже изменены в этом месяце', 'error')
      } else {
        addToast('Не удалось сохранить', 'error')
      }
    },
  })

  function toggle(id: CategoryId) {
    if (isLocked) return
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id))
    } else if (selected.length < slots) {
      setSelected([...selected, id])
    }
  }

  const changed = !isLocked && JSON.stringify(selected.slice().sort()) !== JSON.stringify((user?.selectedCategories ?? []).slice().sort())

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="pt-2">
        <h1 className="text-2xl font-black text-gray-900">Категории</h1>
        <p className="text-sm text-gray-400 mt-1">
          Уровень {slots} — доступно {slots} {slots === 1 ? 'категория' : 'категории'} из 6 на этот месяц
        </p>
      </div>

      {/* Level info */}
      <div className="bg-gradient-to-r from-brand-700 to-brand-500 rounded-2xl p-4 text-white flex items-center gap-3">
        <div className="text-3xl">🏆</div>
        <div>
          <p className="font-black text-base">Уровень {slots}</p>
          <p className="text-xs text-blue-200 mt-0.5">
            Трать больше для повышения · Макс. ⚡ {maxEnergy}
          </p>
        </div>
      </div>

      {/* Monthly lock banner */}
      {isLocked && (
        <div className="rounded-2xl p-4 bg-amber-50 border border-amber-200 flex items-start gap-3">
          <span className="text-2xl">🔒</span>
          <div>
            <p className="font-black text-sm text-amber-800">Категории уже изменены в этом месяце</p>
            <p className="text-xs text-amber-600 mt-0.5">
              Следующее изменение доступно с {lockedUntilLabel}
            </p>
          </div>
        </div>
      )}

      {/* Pool info */}
      <div className="rounded-2xl p-3 bg-blue-50 border border-blue-100">
        <p className="text-xs text-blue-600 font-semibold">
          🎲 Твои 6 категорий на этот месяц — выбери {slots} {slots === 1 ? 'из них' : 'из них'}
        </p>
      </div>

      {/* Grid — only pool categories */}
      <div className="grid grid-cols-2 gap-3">
        {pool.map(id => {
          const cat        = CATEGORY_CONFIG[id]
          const isSelected = selected.includes(id)
          const locked     = isLocked || (!isSelected && selected.length >= slots)

          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              disabled={locked}
              className={`
                relative text-left rounded-2xl p-4 flex flex-col gap-2 transition-all
                ${isSelected
                  ? 'shadow-md'
                  : locked
                  ? 'bg-white opacity-40'
                  : 'bg-white shadow-sm active:scale-95'}
              `}
              style={isSelected ? {
                background: cat.color + '12',
                border: `2px solid ${cat.color}40`,
                boxShadow: `0 4px 14px ${cat.color}25`,
              } : { border: '2px solid transparent' }}
            >
              {isSelected && (
                <div
                  className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: cat.color }}
                >
                  <span className="text-white text-[10px] font-black">✓</span>
                </div>
              )}
              <span className="text-3xl">{cat.icon}</span>
              <div>
                <p className="font-black text-sm text-gray-900">{cat.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{cat.desc}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Status bar */}
      <div
        className={`rounded-2xl p-4 ${
          selected.length >= slots ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'
        }`}
      >
        <p className={`font-bold text-sm ${selected.length >= slots ? 'text-green-700' : 'text-brand-700'}`}>
          {selected.length >= slots ? '✅ Все слоты заполнены!' : `Выбрано ${selected.length} из ${slots}`}
        </p>
        {selected.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-2">
            {selected.map(id => {
              const cat = CATEGORY_CONFIG[id]
              return (
                <span
                  key={id}
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: cat.color + '20', color: cat.color }}
                >
                  {cat.icon} {cat.name}
                </span>
              )
            })}
          </div>
        )}
      </div>

      {/* Save button */}
      {!isLocked && (
        <button
          onClick={() => saveMutation.mutate(selected)}
          disabled={saveMutation.isPending || !changed || selected.length < slots}
          className="w-full py-4 rounded-2xl font-black text-white text-base bg-gradient-to-r from-brand-700 to-brand-500 shadow-lg active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saveMutation.isPending
            ? 'Сохраняем...'
            : selected.length < slots
            ? `Выбери ещё ${slots - selected.length} ${slots - selected.length === 1 ? 'категорию' : 'категории'}`
            : 'Сохранить категории'}
        </button>
      )}
    </div>
  )
}
