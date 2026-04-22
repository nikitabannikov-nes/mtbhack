'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { RARITY_CONFIG, CATEGORY_CONFIG, BOARD_SIZE } from '@/lib/constants'
import { pickItem, getMergeResult, randomMtBalls, randomTimer, daysLeft } from '@/lib/game-logic'
import { MOCK_BOARD, MOCK_PROFILE } from '@/lib/mock-data'
import { RarityBadge } from '@/components/ui/RarityBadge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Modal } from '@/components/ui/Modal'
import type { GameItem, CategoryId } from '@/types'

/* ─── initial state ─────────────────────────────────────────── */
const INIT_CELLS    = MOCK_BOARD
const INIT_ENERGY   = MOCK_PROFILE.energy
const INIT_MAX      = MOCK_PROFILE.maxEnergy
const INIT_MTBALLS  = MOCK_PROFILE.mtBalls
const INIT_CATS     = MOCK_PROFILE.selectedCategories as CategoryId[]
const INIT_LEVEL    = MOCK_PROFILE.level

export default function GamePage() {
  const [cells,    setCells]    = useState<(GameItem | null)[]>(INIT_CELLS)
  const [energy,   setEnergy]   = useState(INIT_ENERGY)
  const [maxEn,    setMaxEn]    = useState(INIT_MAX)
  const [mtBalls,  setMtBalls]  = useState(INIT_MTBALLS)
  const [selected, setSelected] = useState<GameItem | null>(null)
  const [popIdx,   setPopIdx]   = useState<number | null>(null)
  const [shakeBtn, setShakeBtn] = useState(false)
  const [toasts,   setToasts]   = useState<{ id: string; text: string; type: string }[]>([])

  // drag state
  const [dragFrom, setDragFrom] = useState<number | null>(null)
  const [overIdx,  setOverIdx]  = useState<number | null>(null)
  const dragFromRef             = useRef<number | null>(null)
  const cellRefs                = useRef<(HTMLDivElement | null)[]>(Array(BOARD_SIZE).fill(null))

  // Clean up expired frozen items on mount
  useEffect(() => {
    setCells(prev => prev.map(c =>
      c?.status === 'FROZEN' && c.expiresAt && daysLeft(c.expiresAt) === 0
        ? null : c,
    ))
  }, [])

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

  /* ─── game actions ──────────────────────────────────────────── */
  function handleCreate() {
    if (energy < 1) { setShakeBtn(true); setTimeout(() => setShakeBtn(false), 500); return }
    const emptySlots = cells.map((c, i) => c === null ? i : -1).filter(i => i !== -1)
    if (!emptySlots.length) return
    const pos  = emptySlots[Math.floor(Math.random() * emptySlots.length)]
    const item = pickItem(INIT_CATS, pos)
    setCells(prev => { const n = [...prev]; n[pos] = item; return n })
    setEnergy(e => Math.max(0, e - 1))
    pop(pos)
  }

  function handleMerge(fromIdx: number, toIdx: number) {
    const a = cells[fromIdx], b = cells[toIdx]
    if (!a || !b) return
    const merged = getMergeResult(a, b, toIdx)
    if (!merged) {
      // just swap
      setCells(prev => {
        const n = [...prev]; n[fromIdx] = b; n[toIdx] = a; return n
      })
      return
    }
    setCells(prev => { const n = [...prev]; n[fromIdx] = null; n[toIdx] = merged; return n })
    pop(toIdx)
    const cfg = RARITY_CONFIG[merged.rarity]
    toast(`✨ Слияние! ${cfg.label}`, 'merge')
    if (merged.rarity === 'LEGENDARY') toast('🏆 LEGENDARY! Нажми на предмет!', 'legendary')
  }

  function handleMove(fromIdx: number, toIdx: number) {
    setCells(prev => {
      const n = [...prev]; n[toIdx] = { ...prev[fromIdx]!, boardPosition: toIdx }; n[fromIdx] = null; return n
    })
  }

  function handleActivate(item: GameItem) {
    const t   = item.timerMinDays ?? 1
    const max = item.timerMaxDays ?? 3
    const exp = randomTimer(t, max)
    setCells(prev => prev.map(c =>
      c?.id === item.id ? { ...c, status: 'FROZEN', expiresAt: exp } : c,
    ))
    setSelected(null)
    toast('✅ Бонус активирован!', 'success')
  }

  function handleTakeMtBalls(item: GameItem) {
    const mb = randomMtBalls()
    setCells(prev => prev.map(c => c?.id === item.id ? null : c))
    setMtBalls(m => Math.round((m + mb) * 10) / 10)
    setSelected(null)
    toast(`💰 +${mb} МТБаллов!`, 'success')
  }

  function handleDelete(item: GameItem) {
    setCells(prev => prev.map(c => c?.id === item.id ? null : c))
    setEnergy(e => Math.round(Math.min(maxEn, e + 0.5) * 10) / 10)
    setSelected(null)
    toast('+0.5 ⚡ за удаление', 'info')
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
    const ghost = document.createElement('div')
    ghost.style.cssText = 'position:fixed;top:-999px;font-size:40px'
    ghost.textContent   = cells[i]!.icon
    document.body.appendChild(ghost)
    e.dataTransfer.setDragImage(ghost, 24, 24)
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
    if (canMergeCells(cells[fromIdx], cells[toIdx])) handleMerge(fromIdx, toIdx)
    else if (!cells[toIdx]) handleMove(fromIdx, toIdx)
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

    if (canMergeCells(cells[fromIdx], cells[toIdx])) handleMerge(fromIdx, toIdx)
    else if (!cells[toIdx]) handleMove(fromIdx, toIdx)
  }

  /* ─── derived ───────────────────────────────────────────────── */
  const emptyCount = cells.filter(c => c === null).length
  const boardFull  = emptyCount === 0

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
              Ур. {INIT_LEVEL}
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
        {INIT_CATS.map(id => {
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
                  <span className="text-2xl pointer-events-none leading-none mb-0.5">
                    {item.icon}
                  </span>
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
          energy >= 1 && !boardFull
            ? 'bg-gradient-to-r from-brand-700 to-brand-500 text-white shadow-brand-500/30 active:scale-95'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none',
          shakeBtn ? 'animate-shake' : '',
        ].join(' ')}
      >
        {boardFull
          ? '🚫 Доска заполнена — освободи клетку'
          : energy < 1
          ? '⚡ Нет энергии — выполни задание'
          : `Открыть клетку  −1 ⚡`}
      </button>

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
        className="w-20 h-20 rounded-3xl flex items-center justify-center text-5xl mb-3 shadow-inner"
        style={{ background: cfg.bg, boxShadow: `0 0 24px ${cfg.glow}` }}
      >
        {item.icon}
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
      {hasBonus && item.bonusDescription && (
        <div
          className="w-full rounded-2xl p-4 mb-4 text-center"
          style={{ background: cfg.bg }}
        >
          <p className="font-bold text-sm" style={{ color: cfg.color }}>
            {item.bonusDescription}
          </p>
          {item.partnerName && (
            <p className="text-xs mt-1" style={{ color: cfg.color + 'aa' }}>
              {item.partnerName}
            </p>
          )}
          {item.timerMinDays !== undefined && item.timerMinDays > 0 && (
            <p className="text-[10px] mt-2 text-gray-400">
              Действует {item.timerMinDays}–{item.timerMaxDays} дней после активации
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
