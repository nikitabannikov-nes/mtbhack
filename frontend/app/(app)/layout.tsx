'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth'
import { ToastContainer } from '@/components/ui/Toast'

const TABS = [
  { path: '/game',       label: 'Игра',       icon: '🎮' },
  { path: '/tasks',      label: 'Задания',     icon: '📋' },
  { path: '/categories', label: 'Категории',   icon: '🏷️' },
  { path: '/profile',    label: 'Профиль',     icon: '👤' },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router   = useRouter()
  const token    = useAuthStore((s) => s.token)

  useEffect(() => {
    if (!token) router.replace('/login')
  }, [token, router])

  if (!token) return null

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F8]">
      <div className="flex-1 overflow-y-auto pb-20 max-w-[430px] w-full mx-auto">
        {children}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-[430px] mx-auto bg-white border-t border-gray-200 flex pb-safe">
          {TABS.map(tab => {
            const active = pathname === tab.path
            return (
              <button
                key={tab.path}
                onClick={() => router.push(tab.path)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2 transition-colors ${
                  active ? 'text-brand-600' : 'text-gray-400'
                }`}
              >
                <span className="text-2xl leading-none">{tab.icon}</span>
                <span className={`text-[10px] leading-tight ${active ? 'font-bold' : 'font-normal'}`}>
                  {tab.label}
                </span>
                {active && <div className="w-1 h-1 rounded-full bg-brand-600 mt-0.5" />}
              </button>
            )
          })}
        </div>
      </nav>

      <ToastContainer />
    </div>
  )
}
