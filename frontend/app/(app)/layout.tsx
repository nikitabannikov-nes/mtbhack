'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth'
import { ToastContainer } from '@/components/ui/Toast'
import { api } from '@/lib/api'

const TABS = [
  { path: '/game',       label: 'Игра',       icon: 'game'     },
  { path: '/categories', label: 'Категории',   icon: 'category' },
  { path: '/profile',    label: 'Профиль',     icon: 'profile'  },
] as const

function TabIcon({
                     icon,
                     active,
                 }: {
    icon: (typeof TABS)[number]['icon']
    active: boolean
}) {
    const sizeClass =
        icon === 'game'
            ? active ? 'h-7 w-7' : 'h-6 w-6'
            : active ? 'h-7 w-6' : 'h-6 w-5'

    return (
        <img
            src={`/icons/nav/${icon}.svg`}
            alt=""
            aria-hidden="true"
            className={active ? sizeClass : `${sizeClass} opacity-70`}
        />
    )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname      = usePathname()
  const router        = useRouter()
  const queryClient   = useQueryClient()
  const token         = useAuthStore((s) => s.token)
  const setAuth       = useAuthStore((s) => s.setAuth)
  const setUser       = useAuthStore((s) => s.setUser)
  const logout        = useAuthStore((s) => s.logout)
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
    return () => { cancelled = true }
  }, [token, setAuth, setUser, logout, queryClient])

  useEffect(() => {
    if (token && pathname === '/') router.replace('/game')
  }, [token, pathname, router])

  if (!token) {
    if (isBootstrapping) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#F2F4F8]">
          <div className="text-center">
            <p className="text-5xl mb-4">🎮</p>
            <p className="text-sm font-bold text-brand-700">Подключаем игру...</p>
          </div>
        </div>
      )
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F2F4F8] p-6">
        <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-lg">
          <p className="mb-2 text-lg font-black text-gray-900">Не удалось открыть приложение</p>
          <p className="mb-4 text-sm text-gray-500">Проверь, что backend доступен на `localhost:8080`.</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 py-3 font-bold text-white"
          >
            Повторить
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F2F4F8]">
      <div className="mx-auto flex w-full max-w-[430px] flex-1 overflow-y-auto px-0 pb-[112px]">
        {children}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-[430px] px-3 pb-3 pb-safe">
          <div className="overflow-hidden rounded-[28px] border border-[#E2E8FA] bg-white p-2 shadow-[0_18px_38px_rgba(26,44,108,0.16)]">
            <div className="grid grid-cols-3 gap-1">
              {TABS.map((tab) => {
                const active = pathname === tab.path
                return (
                  <button
                    key={tab.path}
                    onClick={() => router.push(tab.path)}
                    aria-label={tab.label}
                    title={tab.label}
                    className={[
                      'flex h-[62px] items-center justify-center rounded-[20px] transition-all',
                      active
                        ? 'bg-[#1737FF] shadow-[0_12px_24px_rgba(23,55,255,0.22)]'
                        : 'bg-transparent',
                    ].join(' ')}
                  >
                    <span className="sr-only">{tab.label}</span>
                    <TabIcon icon={tab.icon} active={active} />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      <ToastContainer />
    </div>
  )
}
