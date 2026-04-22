'use client'
import { useEffect } from 'react'

interface Props {
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ onClose, children }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-[100] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-sm max-h-[85vh] overflow-y-auto p-6 flex flex-col items-center shadow-2xl animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
