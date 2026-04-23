'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import { RARITY_CONFIG, CATEGORY_CONFIG, BOARD_SIZE } from '@/lib/constants'
import { daysLeft } from '@/lib/game-logic'
import { RarityBadge } from '@/components/ui/RarityBadge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Modal } from '@/components/ui/Modal'
import type { GameItem, CategoryId } from '@/types'

export default function GamePage() {
  const router  = useRouter()
  const qc = useQueryClient()
  const setUser = useAuthStore((s) => s.setUser)
  const authUser = useAuthStore((s) => s.user)

  const [cells,    setCells]    = useState<(GameItem | null)[]>(Array(BOARD_SIZE).fill(null))
  const [energy,   setEnergy]   = useState(authUser?.energy ?? 0)
  const [maxEn,    setMaxEn]    = useState(authUser?.maxEnergy ?? 7)
  const [mtBalls,  setMtBalls]  = useState(authUser?.mtBalls ?? 0)
  const [selected, setSelected] = useState<GameItem | null>(null)
  const [popIdx,   setPopIdx]   = useState<number | null>(null)
  const [shakeBtn, setShakeBtn] = useState(false)
  const [toasts,   setToasts]   = useState<{ id: string; text: string; type: string }[]>([])
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>(authUser?.selectedCategories ?? [])
  const [level, setLevel] = useState(authUser?.level ?? 1)

  // drag state
  const [dragFrom, setDragFrom] = useState<number | null>(null)
  const [overIdx,  setOverIdx]  = useState<number | null>(null)
  const dragFromRef             = useRef<number | null>(null)
  const cellRefs                = useRef<(HTMLDivElement | null)[]>(Array(BOARD_SIZE).fill(null))

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const profile = await api.profile.get()
      setUser(profile)
      return profile
    },
  })

  const boardQuery = useQuery({
    queryKey: ['board'],
    queryFn: async () => {
      return api.game.board()
    },
  })

  const balanceQuery = useQuery({
    queryKey: ['mtballs'],
    queryFn: api.mtballs.balance,
  })

  useEffect(() => {
    if (typeof balanceQuery.data?.balance === 'number') {
      setMtBalls(balanceQuery.data.balance)
    }
  }, [balanceQuery.data])

  useEffect(() => {
    if (!profileQuery.data) return
    setEnergy(profileQuery.data.energy)
    setMaxEn(profileQuery.data.maxEnergy)
    setMtBalls(profileQuery.data.mtBalls)
    setSelectedCategories(profileQuery.data.selectedCategories)
    setLevel(profileQuery.data.level)
  }, [profileQuery.data])

  useEffect(() => {
    if (!boardQuery.data) return
    setCells(boardQuery.data.cells)
    if (typeof boardQuery.data.energy === 'number') setEnergy(boardQuery.data.energy)
    if (typeof boardQuery.data.maxEnergy === 'number') setMaxEn(boardQuery.data.maxEnergy)
  }, [boardQuery.data])

  /* ─── toast helper ──────────────────────────────────────────── */
  function toast(text: string, type = 'info') {
    const id = Math.random().toString(36).slice(2)
    setToasts(t => [...t, { id, text, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2400)
  }

  function pop(idx: number) {
    setPopIdx(idx)
    setTimeout(() => setPopIdx(null), 600)
  }

  async function refreshCoreData() {
    await Promise.all([
      qc.invalidateQueries({ queryKey: ['board'] }),
      qc.invalidateQueries({ queryKey: ['profile'] }),
      qc.invalidateQueries({ queryKey: ['mtballs'] }),
      qc.invalidateQueries({ queryKey: ['tasks'] }),
    ])
  }

  const createMutation = useMutation({
    mutationFn: (boardPosition: number) => api.game.createItem(boardPosition),
    onSuccess: async (result) => {
      setCells(prev => {
        const next = [...prev]
        next[result.item.boardPosition] = result.item
        return next
      })
      setEnergy(result.energyLeft)
      pop(result.item.boardPosition)
      await refreshCoreData()
    },
    onError: () => toast('Не удалось создать предмет', 'error'),
  })

  const mergeMutation = useMutation({
    mutationFn: ({ sourceItemId, targetItemId, targetPosition }: { sourceItemId: number; targetItemId: number; targetPosition: number }) =>
      api.game.merge(sourceItemId, targetItemId, targetPosition),
    onError: () => toast('Не удалось выполнить слияние', 'error'),
  })

  const moveMutation = useMutation({
    mutationFn: ({ sourceItemId, targetPosition }: { sourceItemId: number; targetPosition: number }) =>
      api.game.moveItem(sourceItemId, targetPosition),
    onSuccess: (board) => {
      setCells(board.cells)
      if (typeof board.energy === 'number') setEnergy(board.energy)
      if (typeof board.maxEnergy === 'number') setMaxEn(board.maxEnergy)
    },
    onError: () => toast('Не удалось переместить предмет', 'error'),
  })

  const activateMutation = useMutation({
    mutationFn: (itemId: number) => api.game.activateItem(itemId),
    onError: () => toast('Не удалось активировать бонус', 'error'),
  })

  const takeMtBallsMutation = useMutation({
    mutationFn: (itemId: number) => api.game.takeMtBalls(itemId),
    onError: () => toast('Не удалось забрать МТБаллы', 'error'),
  })

  const deleteMutation = useMutation({
    mutationFn: (itemId: number) => api.game.deleteItem(itemId),
    onError: () => toast('Не удалось удалить предмет', 'error'),
  })

  /* ─── game actions ──────────────────────────────────────────── */
  function handleCreate() {
    if (selectedCategories.length < level) {
      toast('Выбери все категории перед созданием предмета', 'error')
      router.push('/categories')
      return
    }
    if (energy < 1) { setShakeBtn(true); setTimeout(() => setShakeBtn(false), 500); return }
    const emptySlots = cells.map((c, i) => c === null ? i : -1).filter(i => i !== -1)
    if (!emptySlots.length) return
    const pos  = emptySlots[Math.floor(Math.random() * emptySlots.length)]
    createMutation.mutate(pos)
  }

  async function handleMerge(fromIdx: number, toIdx: number) {
    const a = cells[fromIdx], b = cells[toIdx]
    if (!a || !b) return
    const result = await mergeMutation.mutateAsync({
      sourceItemId: Number(a.id),
      targetItemId: Number(b.id),
      targetPosition: toIdx,
    })
    const merged = result.merged
    setCells(prev => { const n = [...prev]; n[fromIdx] = null; n[toIdx] = merged; return n })
    pop(toIdx)
    const cfg = RARITY_CONFIG[merged.rarity]
    toast(`✨ Слияние! ${cfg.label}`, 'merge')
    if (merged.rarity === 'LEGENDARY') toast('🏆 LEGENDARY! Нажми на предмет!', 'legendary')
    await refreshCoreData()
  }

  async function handleMove(fromIdx: number, toIdx: number) {
    const item = cells[fromIdx]
    if (!item) return
    const board = await moveMutation.mutateAsync({
      sourceItemId: Number(item.id),
      targetPosition: toIdx,
    })
    setCells(board.cells)
  }

  async function handleActivate(item: GameItem) {
    const result = await activateMutation.mutateAsync(Number(item.id))
    setCells(prev => prev.map(c =>
      c?.id === item.id ? { ...c, status: 'FROZEN', expiresAt: result.expiresAt } : c,
    ))
    setSelected(null)
    toast('✅ Бонус активирован!', 'success')
    await refreshCoreData()
  }

  async function handleTakeMtBalls(item: GameItem) {
    const result = await takeMtBallsMutation.mutateAsync(Number(item.id))
    setCells(prev => prev.map(c => c?.id === item.id ? null : c))
    setMtBalls(result.newBalance)
    setSelected(null)
    toast(`💰 +${result.mtBalls} МТБаллов!`, 'success')
    await refreshCoreData()
  }

  async function handleDelete(item: GameItem) {
    const result = await deleteMutation.mutateAsync(Number(item.id))
    setCells(prev => prev.map(c => c?.id === item.id ? null : c))
    setEnergy(result.energyLeft)
    setSelected(null)
    toast('+0.5 ⚡ за удаление', 'info')
    await refreshCoreData()
  }

  /* ─── drag & drop helpers ───────────────────────────────────── */
  function canMergeCells(a: GameItem | null, b: GameItem | null) {
    return !!a && !!b && a.rarity === b.rarity && a.category === b.category
      && a.status === 'ACTIVE' && b.status === 'ACTIVE' && a.id !== b.id
  }

  /* ── mouse/desktop drag ─────────────────────────────────────── */
  function onMouseDragStart(e: React.DragEvent, i: number) {
    if (!cells[i] || cells[i]?.status === 'FROZEN') { e.preventDefault(); return }
    dragFromRef.current = i
    setDragFrom(i)
    const ghost = document.createElement('img')
    ghost.src = cells[i]!.iconPath
    ghost.style.cssText = 'position:fixed;top:-999px;width:40px;height:40px;object-fit:contain'
    document.body.appendChild(ghost)
    e.dataTransfer.setDragImage(ghost, 20, 20)
    setTimeout(() => document.body.removeChild(ghost), 0)
  }

  function onMouseDragOver(e: React.DragEvent, i: number) {
    e.preventDefault(); setOverIdx(i)
  }

  function onMouseDrop(e: React.DragEvent, toIdx: number) {
    e.preventDefault()
    setOverIdx(null)
    const fromIdx = dragFromRef.current
    dragFromRef.current = null
    setDragFrom(null)
    if (fromIdx === null || fromIdx === toIdx) return
    if (canMergeCells(cells[fromIdx], cells[toIdx])) void handleMerge(fromIdx, toIdx)
    else void handleMove(fromIdx, toIdx)
  }

  function onMouseDragEnd() { setDragFrom(null); setOverIdx(null); dragFromRef.current = null }

  /* ── touch drag ─────────────────────────────────────────────── */
  const touchStartCell = useRef<number | null>(null)
  const touchMoved     = useRef(false)

  function getCellAtPoint(x: number, y: number): number | null {
    const el = document.elementFromPoint(x, y)
    const cell = el?.closest('[data-cell]')
    return cell ? parseInt(cell.getAttribute('data-cell') ?? '-1') : null
  }

  function onTouchStart(e: React.TouchEvent, i: number) {
    if (!cells[i] || cells[i]?.status === 'FROZEN') return
    touchStartCell.current = i
    touchMoved.current     = false
    dragFromRef.current    = i
    setDragFrom(i)
  }

  function onTouchMove(e: React.TouchEvent) {
    e.preventDefault()
    touchMoved.current = true
    const t = e.touches[0]
    const idx = getCellAtPoint(t.clientX, t.clientY)
    setOverIdx(idx)
  }

  function onTouchEnd(e: React.TouchEvent) {
    const t = e.changedTouches[0]
    const toIdx   = getCellAtPoint(t.clientX, t.clientY)
    const fromIdx = dragFromRef.current
    const moved   = touchMoved.current

    setDragFrom(null)
    setOverIdx(null)
    dragFromRef.current = null
    touchStartCell.current = null

    if (fromIdx === null) return

    if (!moved || toIdx === null || toIdx === fromIdx) {
      setSelected(cells[fromIdx])
      return
    }

    if (canMergeCells(cells[fromIdx], cells[toIdx])) void handleMerge(fromIdx, toIdx)
    else void handleMove(fromIdx, toIdx)
  }

  /* ─── derived ───────────────────────────────────────────────── */
  const emptyCount        = cells.filter(c => c === null).length
  const boardFull         = emptyCount === 0
  const categoriesNotSet  = selectedCategories.length < level

  return (
    <div className="flex flex-col gap-3 p-3 pb-4 touch-none select-none">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 rounded-3xl p-5 text-white shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-1">МТБаллы</p>
            <p className="text-3xl font-black tracking-tight">
              💰 {mtBalls.toLocaleString('ru', { minimumFractionDigits: mtBalls % 1 !== 0 ? 1 : 0 })}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="bg-white/20 text-white text-xs font-black px-2.5 py-1 rounded-full">
              Ур. {level}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-blue-200">⚡ Энергия</span>
            <span className="font-black text-white">{energy} / {maxEn}</span>
          </div>
          <ProgressBar
            value={energy}
            max={maxEn}
            color={energy / maxEn > 0.3 ? 'bg-green-400' : 'bg-yellow-400'}
            height="h-2.5"
          />
        </div>
      </div>

      {/* ── Category chips ──────────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap">
        {selectedCategories.map(id => {
          const cat = CATEGORY_CONFIG[id]
          return (
            <span
              key={id}
              className="text-xs font-bold px-3 py-1.5 rounded-full border"
              style={{ color: cat.color, background: cat.color + '18', borderColor: cat.color + '35' }}
            >
              {cat.icon} {cat.name}
            </span>
          )
        })}
      </div>

      {/* ── Board hint ──────────────────────────────────────────── */}
      <p className="text-[11px] text-gray-400 text-center leading-tight">
        Перетащи два одинаковых предмета — они сольются в более редкий
      </p>

      {/* ── 5×5 grid ────────────────────────────────────────────── */}
      <div className="grid grid-cols-5 gap-2">
        {cells.map((item, i) => {
          const cfg       = item ? RARITY_CONFIG[item.rarity] : null
          const isNew     = popIdx === i
          const frozen    = item?.status === 'FROZEN'
          const isDragged = dragFrom === i
          const isOver    = overIdx === i
          const mergeable = isOver && dragFrom !== null && canMergeCells(cells[dragFrom ?? -1], item)
          const days      = frozen && item?.expiresAt ? daysLeft(item.expiresAt) : null

          return (
            <div
              key={i}
              data-cell={i}
              ref={el => { cellRefs.current[i] = el }}
              draggable={!!item && !frozen}
              onDragStart={e => onMouseDragStart(e, i)}
              onDragOver={e => onMouseDragOver(e, i)}
              onDragLeave={() => setOverIdx(null)}
              onDrop={e => onMouseDrop(e, i)}
              onDragEnd={onMouseDragEnd}
              onTouchStart={e => onTouchStart(e, i)}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onClick={() => !dragFrom && item && setSelected(item)}
              className={[
                'relative rounded-2xl flex flex-col items-center justify-center aspect-square transition-all duration-150',
                item ? 'bg-white cursor-pointer active:scale-95' : 'bg-white/50 border-2 border-dashed border-gray-200',
                isNew     ? 'animate-pop-in'     : '',
                isDragged ? 'opacity-25 scale-90' : '',
                mergeable ? 'ring-2 ring-green-400 bg-green-50 scale-105' : '',
                isOver && !mergeable && item ? 'ring-2 ring-brand-400' : '',
                isOver && !mergeable && !item ? 'bg-brand-50 border-brand-300' : '',
                frozen    ? 'opacity-70'        : '',
                item?.rarity === 'LEGENDARY' && !frozen ? 'animate-glow-legendary' : '',
              ].join(' ')}
              style={item ? { boxShadow: `0 4px 14px ${cfg!.glow}` } : {}}
            >
              {item ? (
                <>
                  <img
                    src={item.iconPath}
                    alt={item.name}
                    className="w-8 h-8 object-contain pointer-events-none mb-0.5"
                  />
                  <RarityBadge rarity={item.rarity} />

                  {frozen && (
                    <div className="absolute inset-0 rounded-2xl bg-sky-900/25 flex flex-col items-center justify-end pb-1 pointer-events-none">
                      <span className="text-[8px] leading-none">❄️</span>
                      {days !== null && days > 0 && (
                        <span className="text-[7px] font-black text-sky-700 leading-none">{days}д</span>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <span className="text-gray-300 text-xl pointer-events-none">✦</span>
              )}
            </div>
          )
        })}
      </div>

      {/* ── Create button ───────────────────────────────────────── */}
      <button
        onClick={handleCreate}
        className={[
          'w-full py-4 rounded-2xl text-base font-black transition-all shadow-md',
          !categoriesNotSet && energy >= 1 && !boardFull
            ? 'bg-gradient-to-r from-brand-700 to-brand-500 text-white shadow-brand-500/30 active:scale-95'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none',
          shakeBtn ? 'animate-shake' : '',
        ].join(' ')}
        disabled={createMutation.isPending}
      >
        {categoriesNotSet
          ? '🏷️ Выбери категории — перейти'
          : boardFull
          ? '🚫 Доска заполнена — освободи клетку'
          : energy < 1
          ? '⚡ Нет энергии — выполни задание'
          : createMutation.isPending
          ? 'Создаём предмет...'
          : `Открыть клетку  −1 ⚡`}
      </button>

      {(boardQuery.isLoading || profileQuery.isLoading || balanceQuery.isLoading) && (
        <div className="text-center text-sm text-gray-400 py-3">Загружаем игру...</div>
      )}

      {/* ── Toasts ──────────────────────────────────────────────── */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[200] pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={[
              'text-white text-sm font-bold px-5 py-2.5 rounded-2xl shadow-xl animate-slide-up whitespace-nowrap',
              t.type === 'success'   ? 'bg-green-700' :
              t.type === 'merge'     ? 'bg-purple-700' :
              t.type === 'legendary' ? 'bg-orange-600' :
              t.type === 'error'     ? 'bg-red-600' :
                                       'bg-brand-700',
            ].join(' ')}
          >
            {t.text}
          </div>
        ))}
      </div>

      {/* ── Item modal ──────────────────────────────────────────── */}
      {selected && (
        <ItemModal
          item={selected}
          onClose={() => setSelected(null)}
          onActivate={() => handleActivate(selected)}
          onTakeMtBalls={() => handleTakeMtBalls(selected)}
          onDelete={() => handleDelete(selected)}
        />
      )}
    </div>
  )
}

/* ─── Item modal component ───────────────────────────────────── */
function ItemModal({
  item, onClose, onActivate, onTakeMtBalls, onDelete,
}: {
  item: GameItem
  onClose: () => void
  onActivate: () => void
  onTakeMtBalls: () => void
  onDelete: () => void
}) {
  const cfg    = RARITY_CONFIG[item.rarity]
  const catCfg = CATEGORY_CONFIG[item.category]
  const frozen = item.status === 'FROZEN'
  const days   = item.expiresAt ? daysLeft(item.expiresAt) : null

  const hasBonus = item.rarity !== 'DEFAULT'

  return (
    <Modal onClose={onClose}>
      {/* Icon */}
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center mb-3 shadow-inner"
        style={{ background: cfg.bg, boxShadow: `0 0 24px ${cfg.glow}` }}
      >
        <img src={item.iconPath} alt={item.name} className="w-12 h-12 object-contain" />
      </div>

      {/* Rarity badge */}
      <span
        className="text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-2"
        style={{ color: cfg.color, background: cfg.bg, border: `1.5px solid ${cfg.border}` }}
      >
        {cfg.label}
      </span>

      {/* Name */}
      <h3 className="text-lg font-black text-gray-900 mb-1 text-center">{item.name}</h3>
      <p className="text-xs text-gray-400 mb-4 flex items-center gap-1">
        <span>{catCfg.icon}</span><span>{catCfg.name}</span>
      </p>

      {/* Bonus card */}
      {hasBonus && item.description && (
        <div
          className="w-full rounded-2xl p-4 mb-4 text-center"
          style={{ background: cfg.bg }}
        >
          <p className="font-bold text-sm" style={{ color: cfg.color }}>
            {item.description}
          </p>
          {item.partnerName && (
            <p className="text-xs mt-1" style={{ color: cfg.color + 'aa' }}>
              {item.partnerName}
            </p>
          )}
          {item.timerDays !== undefined && item.timerDays > 0 && (
            <p className="text-[10px] mt-2 text-gray-400">
              Действует {item.timerDays} дней после активации
            </p>
          )}
        </div>
      )}

      {/* Frozen state */}
      {frozen ? (
        <div className="w-full bg-sky-50 border border-sky-200 rounded-2xl p-3 text-center mb-4">
          <p className="font-bold text-sm text-sky-700">❄️ Бонус активирован</p>
          {days !== null && (
            <p className="text-xs text-sky-500 mt-1">
              Истекает через {days} {days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}
            </p>
          )}
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2">
          {/* LEGENDARY: two options */}
          {item.rarity === 'LEGENDARY' && (
            <>
              <button
                onClick={onActivate}
                className="w-full py-4 rounded-2xl font-black text-white text-sm active:scale-95 transition-transform"
                style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}bb)` }}
              >
                ✨ Активировать бонус
              </button>
              <button
                onClick={onTakeMtBalls}
                className="w-full py-4 rounded-2xl font-black text-sm border-2 active:scale-95 transition-transform"
                style={{ color: cfg.color, borderColor: cfg.border, background: cfg.bg }}
              >
                💰 Забрать МТБаллы (0.5–2.0)
              </button>
            </>
          )}

          {/* COMMON / RARE / EPIC: activate */}
          {hasBonus && item.rarity !== 'LEGENDARY' && (
            <button
              onClick={onActivate}
              className="w-full py-4 rounded-2xl font-black text-white text-sm active:scale-95 transition-transform"
              style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}bb)` }}
            >
              ✨ Активировать бонус
            </button>
          )}

          {/* Keep for merge */}
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl font-bold text-gray-600 bg-gray-100 text-sm active:scale-95 transition-transform"
          >
            Оставить для слияния
          </button>

          {/* Delete */}
          <button
            onClick={onDelete}
            className="w-full py-2.5 rounded-xl text-xs text-gray-400 font-semibold"
          >
            Удалить (+0.5 ⚡)
          </button>
        </div>
      )}
    </Modal>
  )
}
