'use client'
import { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import { useGameStore } from '@/store/game'
import { CATEGORY_CONFIG, ENERGY_MAX_BY_LEVEL } from '@/lib/constants'
import { EnergyIcon } from '@/components/ui/EnergyIcon'
import type { CategoryId } from '@/types'

const ALL_CATEGORIES = Object.keys(CATEGORY_CONFIG) as CategoryId[]

export default function CategoriesPage() {
  const qc       = useQueryClient()
  const setUser  = useAuthStore(s => s.setUser)
  const user     = useAuthStore(s => s.user)
  const addToast = useGameStore(s => s.addToast)

  // Initialize from Zustand store so revisiting the page shows the saved state
  // even when React Query serves from cache (queryFn wouldn't re-run).
  const [selected, setSelected] = useState<CategoryId[]>(user?.selectedCategories ?? [])
  const syncedRef = useRef(false)

  const slots      = user?.level ?? 1
  const maxEnergy  = ENERGY_MAX_BY_LEVEL[user?.level ?? 1]
  const pool       = (user?.availableCategories?.length ?? 0) > 0
    ? user!.availableCategories
    : ALL_CATEGORIES
  const isLocked   = !!user?.categoriesLockedUntil

  const lockedUntilLabel = user?.categoriesLockedUntil
    ? new Date(user.categoriesLockedUntil).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
    : null

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const p = await api.profile.get()
      setUser(p)
      return p
    },
  })

  // Sync selected once from profile data (handles both cached and fresh-fetch cases).
  // Using a ref so user's in-progress changes aren't overridden by background refetches.
  useEffect(() => {
    if (!syncedRef.current && profileQuery.data) {
      setSelected(profileQuery.data.selectedCategories)
      syncedRef.current = true
    }
  }, [profileQuery.data])

  const saveMutation = useMutation({
    mutationFn: (ids: CategoryId[]) => api.profile.setCategories(ids),
    onSuccess: (updated) => {
      setUser(updated)
      qc.setQueryData(['profile'], updated)
      addToast('✅ Категории сохранены', 'success')
      qc.invalidateQueries({ queryKey: ['board'] })
      qc.invalidateQueries({ queryKey: ['profile'] })
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
  const missingCount = Math.max(0, slots - selected.length)
  const canSave = !isLocked && !saveMutation.isPending && changed && selected.length >= slots

  return (
    <div className="w-full bg-[#F3F5FB] px-4 pb-6 pt-4">
      <section className="rounded-[30px] bg-gradient-to-br from-[#001C92] via-[#0039D0] to-[#245DFF] px-5 pt-4 pb-5 text-white shadow-[0_16px_32px_rgba(22,58,189,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-black leading-none tracking-[-0.03em]">Категории</h1>
            <p className="mt-2 text-[13px] font-medium text-white/80">
              Выбери {slots} {slots === 1 ? 'категорию' : 'категории'}
            </p>
          </div>
          <div className="rounded-full border border-white/15 bg-white/18 px-3 py-1 text-[12px] font-extrabold tracking-[-0.02em]">
            Ур.{slots}
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-white/70">
            <span>Прогресс выбора</span>
            <span>{selected.length} / {slots}</span>
          </div>
          <div className="h-4 rounded-full bg-white/28 p-[3px] shadow-inner">
            <div
              className="h-full rounded-full bg-[#4E89FF] transition-all"
              style={{ width: `${Math.max(12, (selected.length / slots) * 100)}%` }}
            />
          </div>
          <p className="mt-2 flex items-center justify-center gap-1 text-[11px] font-medium text-white/[0.68]">
            Макс. энергия {maxEnergy}
            <EnergyIcon className="h-2.5 w-2.5 opacity-70" />
          </p>
        </div>
      </section>

      <div className="flex flex-col gap-4 pt-4">
        {isLocked && (
          <div className="rounded-[24px] border border-[#FFE0A6] bg-[#FFF6E5] px-4 py-3 text-[#A06000] shadow-[0_12px_24px_rgba(245,183,67,0.16)]">
            <p className="text-[13px] font-extrabold">Категории уже сохранены</p>
            <p className="mt-1 text-[12px] font-medium text-[#C08114]">
              Следующее изменение доступно с {lockedUntilLabel}
            </p>
          </div>
        )}

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
              className={[
                'relative min-h-[90px] rounded-[20px] bg-white px-3.5 py-3 text-left transition-all duration-150',
                'shadow-[0_12px_28px_rgba(51,71,133,0.08)]',
                isSelected
                  ? 'border-2 border-[#7D95FF] bg-[#FAFBFF]'
                  : 'border border-[#EEF2FF]',
                locked ? 'opacity-45' : 'active:scale-[0.98]',
              ].join(' ')}
            >
              {isSelected && (
                <div
                  className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#E9EEFF]"
                >
                  <span className="text-[11px] font-black text-[#5073FF]">✓</span>
                </div>
              )}

              <div className="flex h-full items-start gap-3">
                <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F4F7FF]">
                  <img
                    src={`/icons/categories/${id}.svg`}
                    alt=""
                    className="h-7 w-7 object-contain"
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[14px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#202C52]">
                    {cat.name}
                  </p>
                  <p className="mt-1 text-[11px] font-medium leading-[1.2] text-[#9AA6C8]">
                    {cat.desc}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
        </div>

        <div className="rounded-[28px] bg-white px-4 py-4 shadow-[0_18px_40px_rgba(51,71,133,0.12)]">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF3FF]">
              <span className="text-[15px] font-black text-[#5073FF]">{selected.length >= slots ? '✓' : '•'}</span>
            </div>
            <div className="min-w-0">
              <p className="text-[14px] font-extrabold leading-tight text-[#202C52]">
                {selected.length >= slots
                  ? 'Категории готовы к сохранению'
                  : `Нужно выбрать ещё ${missingCount} ${missingCount === 1 ? 'категорию' : 'категории'}`}
              </p>
              <p className="mt-1 text-[12px] font-medium leading-[1.35] text-[#9AA6C8]">
                {isLocked
                  ? 'Набор категорий уже зафиксирован на этот месяц.'
                  : 'Функционал выбора остаётся прежним: можно менять отметки до сохранения.'}
              </p>
            </div>
          </div>

          {selected.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {selected.map(id => {
                const cat = CATEGORY_CONFIG[id]
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-2 rounded-full bg-[#F4F7FF] px-3 py-1.5 text-[11px] font-bold text-[#4F65B5]"
                  >
                    <img
                      src={`/icons/categories/${id}.svg`}
                      alt=""
                      className="h-4 w-4 object-contain"
                      aria-hidden="true"
                    />
                    <span>{cat.name}</span>
                  </span>
                )
              })}
            </div>
          )}

          {!isLocked && (
            <button
              onClick={() => saveMutation.mutate(selected)}
              disabled={!canSave}
              className={[
                'mt-4 w-full rounded-[18px] py-3.5 text-[15px] font-extrabold tracking-[-0.02em] transition-all',
                canSave
                  ? 'bg-[#1737FF] text-white shadow-[0_14px_24px_rgba(23,55,255,0.28)] active:scale-[0.99]'
                  : 'bg-[#EAF0FF] text-[#8EA1D7] disabled:cursor-not-allowed',
              ].join(' ')}
            >
              {saveMutation.isPending
                ? 'Сохраняем...'
                : missingCount > 0
                ? `Выбери ещё ${missingCount}`
                : 'Сохранить категории'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
