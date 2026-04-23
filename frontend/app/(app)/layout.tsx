'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth'
import { ToastContainer } from '@/components/ui/Toast'
import { api } from '@/lib/api'

const TABS = [
  { path: '/game',       label: 'Игра',       icon: '🎮' },
  { path: '/tasks',      label: 'Задания',     icon: '📋' },
  { path: '/categories', label: 'Категории',   icon: '🏷️' },
  { path: '/profile',    label: 'Профиль',     icon: '👤' },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router   = useRouter()
  const queryClient = useQueryClient()
  const token    = useAuthStore((s) => s.token)
  const setAuth  = useAuthStore((s) => s.setAuth)
  const setUser  = useAuthStore((s) => s.setUser)
  const logout   = useAuthStore((s) => s.logout)
  const [isBootstrapping, setIsBootstrapping] = useState(!token)

  useEffect(() => {
    let cancelled = false

    async function bootstrap() {
      setIsBootstrapping(true)

      try {
        if (token) {
          const profile = await api.auth.me()
          if (!cancelled) {
            setUser(profile)
            queryClient.clear()
            setIsBootstrapping(false)
          }
          return
        }

        const session = await api.auth.ensureSession()
        if (!cancelled) {
          setAuth(session.token, session.user)
          queryClient.clear()
          setIsBootstrapping(false)
        }
      } catch (error) {
        try {
          const session = await api.auth.ensureSession()
          if (!cancelled) {
            setAuth(session.token, session.user)
            queryClient.clear()
            setIsBootstrapping(false)
          }
        } catch (sessionError) {
          if (!cancelled) {
            logout()
            queryClient.clear()
            setIsBootstrapping(false)
            console.error('Failed to bootstrap session', sessionError ?? error)
          }
        }
      }
    }

    void bootstrap()

    return () => {
      cancelled = true
    }
  }, [token, setAuth, setUser, logout, queryClient])

  useEffect(() => {
    if (token && pathname === '/') router.replace('/game')
  }, [token, pathname, router])

  if (!token) {
    if (isBootstrapping) {
      return (
        <div className="min-h-screen bg-[#F2F4F8] flex items-center justify-center">
          <div className="text-center">
            <p className="text-5xl mb-4">🎮</p>
            <p className="text-sm font-bold text-brand-700">Подключаем игру...</p>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-[#F2F4F8] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg text-center max-w-sm w-full">
          <p className="text-lg font-black text-gray-900 mb-2">Не удалось открыть приложение</p>
          <p className="text-sm text-gray-500 mb-4">Проверь, что backend доступен на `localhost:8080`.</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-brand-700 to-brand-500 text-white font-bold py-3 rounded-xl"
          >
            Повторить
          </button>
        </div>
      </div>
    )
  }

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
