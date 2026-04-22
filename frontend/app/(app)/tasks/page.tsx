'use client'
import { useState } from 'react'
import { MOCK_TASKS_DAILY, MOCK_TASKS_WEEKLY, MOCK_TASKS_REFERRAL, MOCK_PROFILE } from '@/lib/mock-data'
import { ProgressBar } from '@/components/ui/ProgressBar'
import type { Task } from '@/types'

const GROUP_META = {
  DAILY:    { title: '☀️ Ежедневные',   badge: 'Сбрасываются в полночь', badgeColor: 'bg-amber-100 text-amber-700' },
  WEEKLY:   { title: '📅 Еженедельные', badge: 'Сбрасываются в пн',      badgeColor: 'bg-blue-100 text-blue-700'  },
  REFERRAL: { title: '👥 Реферальные',  badge: 'Разовые',                badgeColor: 'bg-purple-100 text-purple-700' },
}

export default function TasksPage() {
  const [daily,    setDaily]    = useState(MOCK_TASKS_DAILY)
  const [weekly,   setWeekly]   = useState(MOCK_TASKS_WEEKLY)
  const [referral]              = useState(MOCK_TASKS_REFERRAL)
  const [energy,   setEnergy]   = useState(MOCK_PROFILE.energy)
  const [maxEn]                 = useState(MOCK_PROFILE.maxEnergy)
  const [claimed,  setClaimed]  = useState<Set<string>>(new Set())
  const [toast,    setToast]    = useState<string | null>(null)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2200)
  }

  function claim(task: Task) {
    if (!task.completed || claimed.has(task.id)) return
    setEnergy(e => Math.min(maxEn, e + task.energyReward))
    setClaimed(s => { const n = new Set(s); n.add(task.id); return n })
    showToast(`+${task.energyReward} ⚡ получено!`)
  }

  const groups = [
    { key: 'DAILY'    as const, tasks: daily    },
    { key: 'WEEKLY'   as const, tasks: weekly   },
    { key: 'REFERRAL' as const, tasks: referral },
  ]

  return (
    <div className="flex flex-col gap-4 p-4">

      {/* Energy header */}
      <div className="bg-gradient-to-br from-brand-700 to-brand-500 rounded-3xl p-4 text-white">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mb-1">Энергия</p>
            <p className="text-2xl font-black">⚡ {energy} / {maxEn}</p>
          </div>
          <div className="text-4xl">📋</div>
        </div>
        <ProgressBar value={energy} max={maxEn} color="bg-yellow-400" height="h-2.5" />
      </div>

      {groups.map(({ key, tasks }) => {
        const meta   = GROUP_META[key]
        const claimable = tasks.filter(t => t.completed && !claimed.has(t.id)).length

        return (
          <section key={key}>
            <div className="flex items-center gap-2 mb-2.5">
              <h2 className="font-black text-gray-900 text-base">{meta.title}</h2>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${meta.badgeColor}`}>
                {meta.badge}
              </span>
              {claimable > 0 && (
                <span className="ml-auto text-[10px] font-black text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                  {claimable} готово!
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              {tasks.map(task => {
                const isClaimed = claimed.has(task.id)
                const done      = task.completed
                const pct       = Math.min(100, Math.round(task.currentCount / Math.max(task.targetCount, 1) * 100))

                return (
                  <div
                    key={task.id}
                    className={`bg-white rounded-2xl p-4 flex gap-3 items-center shadow-sm transition-opacity ${isClaimed ? 'opacity-50' : ''}`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-2xl flex-shrink-0">
                      {task.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 leading-snug mb-2">
                        {task.title}
                      </p>
                      <ProgressBar
                        value={task.currentCount}
                        max={task.targetCount}
                        color={done ? 'bg-green-500' : 'bg-brand-500'}
                        height="h-1.5"
                      />
                      <p className="text-[10px] text-gray-400 mt-1">
                        {task.currentCount} / {task.targetCount}
                      </p>
                    </div>

                    <button
                      onClick={() => claim(task)}
                      disabled={!done || isClaimed}
                      className={[
                        'flex-shrink-0 rounded-xl px-3 py-2.5 text-xs font-black transition-all',
                        isClaimed
                          ? 'bg-gray-100 text-gray-400'
                          : done
                          ? 'bg-green-500 text-white shadow-md shadow-green-200 active:scale-95'
                          : 'bg-gray-100 text-gray-300 cursor-not-allowed',
                      ].join(' ')}
                    >
                      {isClaimed ? '✓' : `+${task.energyReward} ⚡`}
                    </button>
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-700 text-white text-sm font-bold px-5 py-2.5 rounded-2xl shadow-xl animate-slide-up z-[200] whitespace-nowrap">
          {toast}
        </div>
      )}

      <div className="h-2" />
    </div>
  )
}
