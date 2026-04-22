import { useState, useRef } from 'react'
import { ITEMS_BY_CATEGORY, CATEGORIES_MAP } from '../data'

const RARITY_ORDER = ['common', 'rare', 'epic', 'legendary']

const RARITY = {
  common:    { color: '#607D8B', label: 'Обычный',     bg: '#ECEFF1', glow: 'rgba(96,125,139,0.25)' },
  rare:      { color: '#1565C0', label: 'Редкий',      bg: '#E3F2FD', glow: 'rgba(21,101,192,0.3)' },
  epic:      { color: '#6A1B9A', label: 'Эпический',   bg: '#F3E5F5', glow: 'rgba(106,27,154,0.3)' },
  legendary: { color: '#E65100', label: 'Легендарный', bg: '#FFF3E0', glow: 'rgba(230,81,0,0.4)' },
}

// Drop weights — крутые предметы редкие
const WEIGHTS = { common: 80, rare: 15, epic: 4, legendary: 1 }

function pickItem(categories) {
  const pool = []
  const activeCats = categories.length > 0 ? categories : []
  activeCats.forEach(id => {
    ;(ITEMS_BY_CATEGORY[id] || []).forEach(item => {
      const w = WEIGHTS[item.rarity] || 10
      for (let i = 0; i < w; i++) pool.push(item)
    })
  })
  ITEMS_BY_CATEGORY.default.forEach(item => {
    const w = Math.round((WEIGHTS[item.rarity] || 10) * 0.5)
    for (let i = 0; i < w; i++) pool.push(item)
  })
  return pool[Math.floor(Math.random() * pool.length)]
}

function getMergeResult(a, b) {
  if (!a || !b) return null
  if (a.rarity !== b.rarity || a.category !== b.category) return null
  const nextRarity = RARITY_ORDER[RARITY_ORDER.indexOf(a.rarity) + 1]
  if (!nextRarity) return null
  const pool = (ITEMS_BY_CATEGORY[a.category] || []).filter(i => i.rarity === nextRarity)
  if (!pool.length) return null
  return pool[Math.floor(Math.random() * pool.length)]
}

function Modal({ children, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 100, padding: 20,
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white', borderRadius: 28,
          padding: '36px 24px 24px',
          maxWidth: 360, width: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          maxHeight: '85vh', overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default function GameScreen({ categories, energy, setEnergy, mtballs, setMtballs }) {
  const COLS = 4
  const TOTAL = 12

  const [cells, setCells]       = useState(() => Array(TOTAL).fill(null))
  const [popIdx, setPopIdx]     = useState(null)
  const [selected, setSelected] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  const [toast, setToast]       = useState(null)
  const [overIdx, setOverIdx]   = useState(null)
  const [noEnergy, setNoEnergy] = useState(false)
  const dragFrom                = useRef(null)

  const emptyIdxs = cells.map((c, i) => c === null ? i : -1).filter(i => i !== -1)
  const canPlay   = energy > 0 && emptyIdxs.length > 0
  const allFull   = emptyIdxs.length === 0

  function showToast(text, type = 'merge') {
    setToast({ text, type })
    setTimeout(() => setToast(null), 2200)
  }

  function pop(idx) {
    setPopIdx(idx)
    setTimeout(() => setPopIdx(null), 600)
  }

  function play() {
    if (energy <= 0) {
      setNoEnergy(true)
      setTimeout(() => setNoEnergy(false), 500)
      return
    }
    if (!canPlay) return
    const idx  = emptyIdxs[Math.floor(Math.random() * emptyIdxs.length)]
    const item = pickItem(categories)
    setEnergy(e => e - 1)
    setMtballs(m => m + item.mtballs)
    setCells(prev => { const n = [...prev]; n[idx] = item; return n })
    pop(idx)
  }

  function reset() {
    setCells(Array(TOTAL).fill(null))
  }

  // ── Drag and drop ──────────────────────────────────────────────
  function onDragStart(e, i) {
    if (!cells[i]) { e.preventDefault(); return }
    dragFrom.current = i
    e.dataTransfer.effectAllowed = 'move'
    // Ghost image: transparent so the emoji stays as-is
    const ghost = document.createElement('div')
    ghost.style.cssText = 'position:fixed;top:-999px;font-size:40px'
    ghost.textContent = cells[i].icon
    document.body.appendChild(ghost)
    e.dataTransfer.setDragImage(ghost, 24, 24)
    setTimeout(() => document.body.removeChild(ghost), 0)
  }

  function onDragOver(e, i) {
    e.preventDefault()
    if (dragFrom.current === i) return
    setOverIdx(i)
  }

  function onDragLeave() {
    setOverIdx(null)
  }

  function onDrop(e, toIdx) {
    e.preventDefault()
    setOverIdx(null)
    const fromIdx = dragFrom.current
    dragFrom.current = null
    if (fromIdx === null || fromIdx === toIdx) return

    const fromItem = cells[fromIdx]
    const toItem   = cells[toIdx]
    if (!fromItem) return

    const merged = getMergeResult(fromItem, toItem)

    setCells(prev => {
      const n = [...prev]
      if (merged) {
        n[fromIdx] = null
        n[toIdx]   = merged
      } else {
        // просто swap
        n[fromIdx] = toItem
        n[toIdx]   = fromItem
      }
      return n
    })

    if (merged) {
      const bonus = merged.mtballs
      setMtballs(m => m + bonus)
      pop(toIdx)
      showToast(`🎊 Слияние! +${bonus} МТБаллов`, 'merge')
    }
  }

  function onDragEnd() {
    dragFrom.current = null
    setOverIdx(null)
  }

  // Цвет подсветки ячейки при перетаскивании
  function getOverStyle(i) {
    if (overIdx !== i) return {}
    const fromItem = cells[dragFrom.current]
    const toItem   = cells[i]
    const canMerge = !!getMergeResult(fromItem, toItem)
    if (canMerge) return { outline: '3px solid #43A047', background: '#E8F5E9' }
    return { outline: '3px solid #1565C0', background: '#E3F2FD' }
  }

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #001F6B 0%, #0047CC 100%)',
        borderRadius: 24, padding: '20px 20px 18px', color: 'white',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 4, letterSpacing: 0.5 }}>МОИ МТБАЛЛЫ</div>
            <div style={{ fontSize: 30, fontWeight: 800 }}>💰 {mtballs.toLocaleString('ru')}</div>
          </div>
          <button
            onClick={() => setShowInfo(true)}
            style={{
              background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 20, color: 'white', padding: '6px 14px',
              cursor: 'pointer', fontSize: 13, fontWeight: 600,
            }}
          >
            Как играть?
          </button>
        </div>
        <div style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: 0.85, marginBottom: 7 }}>
            <span>⚡ Энергия</span>
            <span style={{ fontWeight: 700 }}>{energy} / 10</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 10, height: 9, overflow: 'hidden' }}>
            <div style={{
              height: 9, borderRadius: 10,
              background: energy > 3 ? 'linear-gradient(90deg,#66BB6A,#A5D6A7)' : 'linear-gradient(90deg,#FFA726,#FFCA28)',
              width: `${energy * 10}%`,
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>
      </div>

      {/* Category chips */}
      {categories.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {categories.map(id => {
            const cat = CATEGORIES_MAP[id]
            if (!cat) return null
            return (
              <div key={id} style={{
                background: cat.color + '18', color: cat.color,
                borderRadius: 20, padding: '5px 12px',
                fontSize: 12, fontWeight: 700, border: `1px solid ${cat.color}30`,
              }}>
                {cat.icon} {cat.name}
              </div>
            )
          })}
        </div>
      )}

      {/* Hint */}
      <div style={{ fontSize: 12, color: '#888', textAlign: 'center' }}>
        Перетащи два одинаковых предмета друг на друга — они сольются в&nbsp;более редкий
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, 1fr)`, gap: 8 }}>
        {cells.map((item, i) => {
          const r    = item ? RARITY[item.rarity] : null
          const isNew = popIdx === i
          const isDragging = dragFrom.current === i
          return (
            <div
              key={i}
              draggable={!!item}
              onDragStart={e => onDragStart(e, i)}
              onDragEnd={onDragEnd}
              onDragOver={e => onDragOver(e, i)}
              onDragLeave={onDragLeave}
              onDrop={e => onDrop(e, i)}
              onClick={() => item && setSelected(item)}
              style={{
                borderRadius: 14,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                minHeight: 78,
                cursor: item ? 'grab' : 'default',
                background: item ? 'white' : '#E4E8F0',
                border: item ? `2px solid ${r.color}25` : '2px dashed #C0C8D8',
                transition: 'all 0.15s',
                animation: isNew ? 'popIn 0.55s cubic-bezier(.36,.07,.19,.97)' : 'none',
                boxShadow: item ? `0 4px 14px ${r.glow}` : 'none',
                opacity: isDragging ? 0.35 : 1,
                userSelect: 'none',
                ...getOverStyle(i),
              }}
            >
              {item ? (
                <>
                  <div style={{ fontSize: 30, pointerEvents: 'none' }}>{item.icon}</div>
                  <div style={{
                    fontSize: 9, fontWeight: 800, color: r.color,
                    textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4,
                    background: r.bg, borderRadius: 6, padding: '2px 5px',
                    pointerEvents: 'none',
                  }}>
                    {r.label}
                  </div>
                </>
              ) : (
                <div style={{ fontSize: 18, color: '#B0BAD0' }}>✦</div>
              )}
            </div>
          )
        })}
      </div>

      {/* Action button */}
      {allFull ? (
        <button onClick={reset} style={{
          background: 'white', border: '2px solid #0033A0', color: '#0033A0',
          borderRadius: 18, padding: 16, fontSize: 16, fontWeight: 700, cursor: 'pointer',
        }}>
          🔄 Новая игра
        </button>
      ) : (
        <button
          onClick={play}
          style={{
            background: canPlay ? 'linear-gradient(135deg,#001F6B,#0047CC)' : '#E0E0E0',
            color: canPlay ? 'white' : '#9E9E9E',
            border: 'none', borderRadius: 18, padding: 16,
            fontSize: 16, fontWeight: 700, cursor: canPlay ? 'pointer' : 'default',
            transition: 'all 0.2s',
            animation: noEnergy ? 'shake 0.4s' : 'none',
            boxShadow: canPlay ? '0 6px 20px rgba(0,51,160,0.35)' : 'none',
          }}
        >
          {energy === 0 ? '⚡ Нет энергии — выполни задания!' : 'Открыть клетку  −1⚡'}
        </button>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)',
          background: '#1B5E20', color: 'white',
          borderRadius: 20, padding: '10px 22px',
          fontSize: 15, fontWeight: 700, zIndex: 200,
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          animation: 'popIn 0.4s ease',
          whiteSpace: 'nowrap',
        }}>
          {toast.text}
        </div>
      )}

      {/* Item detail modal */}
      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <div style={{ fontSize: 64, marginBottom: 6 }}>{selected.icon}</div>
          <div style={{
            background: RARITY[selected.rarity].bg, color: RARITY[selected.rarity].color,
            borderRadius: 20, padding: '4px 18px',
            fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14,
          }}>
            {RARITY[selected.rarity].label}
          </div>
          <div style={{ fontSize: 21, fontWeight: 800, marginBottom: 10, whiteSpace: 'pre-line', textAlign: 'center', color: '#1A1A2E' }}>
            {selected.name}
          </div>
          <div style={{ color: '#666', fontSize: 14, textAlign: 'center', marginBottom: 18, lineHeight: 1.6, paddingInline: 8 }}>
            {selected.desc}
          </div>
          <div style={{
            background: '#F0F4FF', borderRadius: 14, padding: '12px 24px',
            fontSize: 18, fontWeight: 800, color: '#0033A0', marginBottom: 22,
          }}>
            +{selected.mtballs} МТБаллов
          </div>
          <button
            onClick={() => setSelected(null)}
            style={{
              background: 'linear-gradient(135deg,#001F6B,#0047CC)',
              color: 'white', border: 'none', borderRadius: 14,
              padding: '15px 0', fontSize: 16, fontWeight: 700,
              cursor: 'pointer', width: '100%',
            }}
          >
            Закрыть
          </button>
        </Modal>
      )}

      {/* Info modal */}
      {showInfo && (
        <Modal onClose={() => setShowInfo(false)}>
          <div style={{ fontSize: 52, marginBottom: 6 }}>🎮</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 18, color: '#1A1A2E' }}>Как играть?</div>
          <div style={{ alignSelf: 'stretch', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 22 }}>
            {[
              ['⚡', 'Трать энергию, чтобы открывать новые клетки'],
              ['🖱️', 'Перетаскивай предметы между клетками'],
              ['🔀', 'Два одинаковых предмета → слияние в более редкий!'],
              ['🏷️', 'Категории влияют на то, что выпадает'],
              ['📋', 'Выполняй задания в Профиле, чтобы пополнять энергию'],
            ].map(([icon, text]) => (
              <div key={icon} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22, flexShrink: 0, lineHeight: 1.3 }}>{icon}</span>
                <span style={{ fontSize: 14, color: '#444', lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowInfo(false)}
            style={{
              background: 'linear-gradient(135deg,#001F6B,#0047CC)',
              color: 'white', border: 'none', borderRadius: 14,
              padding: '15px 0', fontSize: 16, fontWeight: 700,
              cursor: 'pointer', width: '100%',
            }}
          >
            Понятно!
          </button>
        </Modal>
      )}
    </div>
  )
}
