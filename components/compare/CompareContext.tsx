'use client'

import { createContext, useContext, useCallback, useEffect, useState, type ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { toast } from '@/components/Toast'

type CompareContextType = {
  selectedIds: string[]
  compareMode: boolean
  toggleVehicle: (id: string) => void
  isSelected: (id: string) => boolean
  clearSelection: () => void
  setCompareMode: (mode: boolean) => void
  count: number
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

const STORAGE_KEY = 'nk_compare_ids'
const MAX_COMPARE = 3

export function CompareProvider ({ children }: { children: ReactNode }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [compareMode, setCompareMode] = useState(false)
  const pathname = usePathname()

  // Load from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as string[]
        if (Array.isArray(parsed)) {
          setSelectedIds(parsed)
        }
      }
    } catch {
      // silent
    }
  }, [])

  // Persist to sessionStorage
  useEffect(() => {
    try {
      if (selectedIds.length > 0) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIds))
      } else {
        sessionStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      // silent
    }
  }, [selectedIds])

  // Clear selection when navigating away from /cars or /compare
  useEffect(() => {
    const paths = ['/cars', '/compare']
    const isRelevant = paths.some(p => pathname.startsWith(p))
    if (!isRelevant && selectedIds.length > 0) {
      setSelectedIds([])
      setCompareMode(false)
    }
  }, [pathname])

  const toggleVehicle = useCallback((id: string) => {
    setSelectedIds(prev => {
      const idx = prev.indexOf(id)
      if (idx >= 0) {
        const updated = prev.filter(x => x !== id)
        if (updated.length === 0) setCompareMode(false)
        return updated
      }
      if (prev.length >= MAX_COMPARE) {
        toast.error(`You can compare up to ${MAX_COMPARE} vehicles only.`)
        return prev
      }
      return [...prev, id]
    })
  }, [])

  const isSelected = useCallback((id: string) => {
    return selectedIds.includes(id)
  }, [selectedIds])

  const clearSelection = useCallback(() => {
    setSelectedIds([])
    setCompareMode(false)
  }, [])

  return (
    <CompareContext.Provider
      value={{
        selectedIds,
        compareMode,
        toggleVehicle,
        isSelected,
        clearSelection,
        setCompareMode,
        count: selectedIds.length
      }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare () {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be used within CompareProvider')
  return ctx
}