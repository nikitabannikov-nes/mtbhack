'use client'
import { useGameStore } from '@/store/game'

const COLORS = {
  success: 'bg-green-800',
  error:   'bg-red-700',
  merge:   'bg-purple-800',
  info:    'bg-brand-700',
}

export function ToastContainer() {
  const toasts = useGameStore((s) => s.toasts)

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-[200] pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`${COLORS[t.type]} text-white text-sm font-bold px-5 py-2.5 rounded-2xl shadow-xl animate-slide-up whitespace-nowrap`}
        >
          {t.text}
        </div>
      ))}
    </div>
  )
}
