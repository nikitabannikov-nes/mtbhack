import { useState } from 'react'
import { TASKS } from '../data'

function TaskCard({ task, claimed, onClaim }) {
  const done = task.progress >= task.total
  const pct  = Math.round((task.progress / task.total) * 100)

  return (
    <div style={{
      background: 'white', borderRadius: 16, padding: '14px 16px',
      display: 'flex', gap: 12, alignItems: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      opacity: claimed ? 0.6 : 1,
      transition: 'opacity 0.3s',
    }}>
      <div style={{
        fontSize: 26, flexShrink: 0,
        width: 48, height: 48, borderRadius: 14,
        background: '#F2F4F8',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {task.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: '#1A1A2E', marginBottom: 6, lineHeight: 1.3 }}>
          {task.name}
        </div>
        <div style={{ background: '#ECEEF2', borderRadius: 10, height: 6, marginBottom: 4, overflow: 'hidden' }}>
          <div style={{
            background: done ? 'linear-gradient(90deg,#43A047,#66BB6A)' : 'linear-gradient(90deg,#0033A0,#0066CC)',
            borderRadius: 10, height: 6,
            width: `${pct}%`,
            transition: 'width 0.4s ease',
          }} />
        </div>
        <div style={{ fontSize: 11, color: '#999' }}>{task.progress} / {task.total}</div>
      </div>
      <button
        onClick={onClaim}
        disabled={!done || claimed}
        style={{
          background: claimed
            ? '#E0E0E0'
            : done
              ? 'linear-gradient(135deg,#2E7D32,#43A047)'
              : '#F5F5F5',
          color: claimed ? '#9E9E9E' : done ? 'white' : '#BDBDBD',
          border: 'none', borderRadius: 12,
          padding: '8px 12px', cursor: done && !claimed ? 'pointer' : 'default',
          fontWeight: 800, fontSize: 13, flexShrink: 0,
          whiteSpace: 'nowrap',
          boxShadow: done && !claimed ? '0 4px 12px rgba(46,125,50,0.3)' : 'none',
          transition: 'all 0.2s',
        }}
      >
        {claimed ? '✓ Получено' : `+${task.energy} ⚡`}
      </button>
    </div>
  )
}

export default function ProfileScreen({ mtballs, energy, setEnergy }) {
  const [tasks, ]          = useState(TASKS)
  const [claimed, setClaimed] = useState(new Set())

  function claimTask(task) {
    if (claimed.has(task.id) || task.progress < task.total) return
    setEnergy(e => Math.min(10, e + task.energy))
    setClaimed(prev => new Set([...prev, task.id]))
  }

  const weeklyTasks   = tasks.filter(t => t.type === 'weekly')
  const referralTasks = tasks.filter(t => t.type === 'referral')

  const LEVEL = mtballs >= 5000 ? 'Золотой' : mtballs >= 2000 ? 'Серебряный' : 'Базовый'
  const LEVEL_COLOR = mtballs >= 5000 ? '#F57F17' : mtballs >= 2000 ? '#607D8B' : '#0033A0'

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Profile card */}
      <div style={{
        background: 'linear-gradient(135deg, #001F6B 0%, #0047CC 100%)',
        borderRadius: 24, padding: '20px 20px 18px', color: 'white',
      }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
          <div style={{
            width: 60, height: 60,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, border: '2px solid rgba(255,255,255,0.25)',
          }}>
            👤
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 19 }}>Никита Банников</div>
            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>МТБанк • Карта МТБ Pay</div>
            <div style={{
              display: 'inline-block', marginTop: 6,
              background: LEVEL_COLOR,
              color: 'white',
              borderRadius: 10, padding: '2px 10px',
              fontSize: 11, fontWeight: 800,
            }}>
              {LEVEL} уровень
            </div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 14, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, opacity: 0.75, marginBottom: 4 }}>МОИ МТБАЛЛЫ</div>
          <div style={{ fontSize: 26, fontWeight: 800 }}>💰 {mtballs.toLocaleString('ru')}</div>
        </div>
      </div>

      {/* Energy card */}
      <div style={{
        background: 'white', borderRadius: 18, padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}>
        <div style={{ fontSize: 30 }}>⚡</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>Энергия: {energy} / 10</div>
          <div style={{ background: '#ECEEF2', borderRadius: 10, height: 8, overflow: 'hidden' }}>
            <div style={{
              background: energy > 3
                ? 'linear-gradient(90deg,#43A047,#66BB6A)'
                : 'linear-gradient(90deg,#FFA726,#FFCA28)',
              borderRadius: 10, height: 8,
              width: `${energy * 10}%`,
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>
      </div>

      {/* Weekly tasks */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <h3 style={{ fontWeight: 800, fontSize: 16, color: '#1A1A2E' }}>📅 Еженедельные задания</h3>
          <div style={{
            background: '#F0F4FF', color: '#0033A0',
            borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700,
          }}>
            Сбрасываются в пн
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {weeklyTasks.map(t => (
            <TaskCard key={t.id} task={t} claimed={claimed.has(t.id)} onClaim={() => claimTask(t)} />
          ))}
        </div>
      </div>

      {/* Referral tasks */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <h3 style={{ fontWeight: 800, fontSize: 16, color: '#1A1A2E' }}>👥 Реферальные задания</h3>
          <div style={{
            background: '#FFF8E1', color: '#F57F17',
            borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700,
          }}>
            Разовые
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {referralTasks.map(t => (
            <TaskCard key={t.id} task={t} claimed={claimed.has(t.id)} onClaim={() => claimTask(t)} />
          ))}
        </div>
      </div>

      <div style={{ height: 8 }} />
    </div>
  )
}
