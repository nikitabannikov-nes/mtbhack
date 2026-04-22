'use client'
import { create } from 'zustand'
import type { GameItem } from '@/types'

interface Toast {
  id: string
  text: string
  type: 'success' | 'error' | 'info' | 'merge'
}

interface GameStore {
  cells: (GameItem | null)[]
  energy: number
  maxEnergy: number
  mtBalls: number
  selectedItem: GameItem | null
  toasts: Toast[]
  setCells: (cells: (GameItem | null)[]) => void
  setEnergy: (energy: number, maxEnergy?: number) => void
  setMtBalls: (v: number) => void
  setSelectedItem: (item: GameItem | null) => void
  addToast: (text: string, type?: Toast['type']) => void
  removeToast: (id: string) => void
}

export const useGameStore = create<GameStore>((set) => ({
  cells: Array(25).fill(null),
  energy: 0,
  maxEnergy: 7,
  mtBalls: 0,
  selectedItem: null,
  toasts: [],

  setCells: (cells) => set({ cells }),
  setEnergy: (energy, maxEnergy) =>
    set((s) => ({ energy, maxEnergy: maxEnergy ?? s.maxEnergy })),
  setMtBalls: (mtBalls) => set({ mtBalls }),
  setSelectedItem: (selectedItem) => set({ selectedItem }),

  addToast: (text, type = 'info') => {
    const id = Math.random().toString(36).slice(2)
    set((s) => ({ toasts: [...s.toasts, { id, text, type }] }))
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
    }, 2500)
  },
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
