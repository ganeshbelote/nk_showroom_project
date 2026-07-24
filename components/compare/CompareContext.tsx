'use client'

import { createContext, useContext, useCallback, useEffect, useState, type ReactNode } from 'react'
import { toast } from '@/components/Toast'

type CompareContextType = {
  selectedIds: string[]
  toggleVehicle: (id: string) => void
  isSelected: (id: string) => boolean
  clearSelection: () => void
  count: number
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

const STORAGE_KEY = 'nk_compare_ids'
const MAX_COMPARE = 3

export function CompareProvider ({ children }: { children: ReactNode }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

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

  const toggleVehicle = useCallback((id: string) => {
    setSelectedIds(prev => {
      const idx = prev.indexOf(id)
      if (idx >= 0) {
        return prev.filter(x => x !== id)
      }
      if (prev.length >= MAX_COMPARE) {
        return prev
      }
      return [...prev, id]
    })

    // Check if we're adding and at the limit — must be outside setState updater
    // to avoid "Cannot update a component while rendering a different component"
    if (!selectedIds.includes(id) && selectedIds.length >= MAX_COMPARE) {
      toast.error(`You can compare up to ${MAX_COMPARE} vehicles only.`)
    }
  }, [selectedIds])

  const isSelected = useCallback((id: string) => {
    return selectedIds.includes(id)
  }, [selectedIds])

  const clearSelection = useCallback(() => {
    setSelectedIds([])
  }, [])

  return (
    <CompareContext.Provider
      value={{
        selectedIds,
        toggleVehicle,
        isSelected,
        clearSelection,
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
