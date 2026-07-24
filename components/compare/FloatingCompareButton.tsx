'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { useCompare } from './CompareContext'

export default function FloatingCompareButton () {
  const router = useRouter()
  const { selectedIds, count, clearSelection } = useCompare()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  const canCompare = count >= 2

  return (
    <div className='fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2'>
      <AnimatePresence>
        {count > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            onClick={clearSelection}
            className='flex items-center gap-1.5 rounded-full bg-zinc-800 px-3 py-1.5 text-xs text-zinc-400 shadow-lg hover:bg-zinc-700 hover:text-white transition'
          >
            <X size={14} />
            Clear ({count})
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={canCompare ? { scale: 1.05 } : {}}
        whileTap={canCompare ? { scale: 0.95 } : {}}
        onClick={() => {
          if (canCompare) {
            router.push(`/compare?ids=${selectedIds.join(',')}`)
          }
        }}
        className={`flex items-center gap-3 rounded-full px-6 py-3.5 font-semibold shadow-2xl transition md:px-7 md:py-3.5 md:text-base ${
          canCompare
            ? 'bg-[#2B3494] text-white shadow-[#2B3494]/30 hover:bg-indigo-800 cursor-pointer'
            : 'bg-zinc-800 text-zinc-500 cursor-default'
        }`}
      >
        <span>Compare {count > 0 ? `(${count})` : ''}</span>
        <ArrowRight size={18} className={canCompare ? '' : 'opacity-40'} />
      </motion.button>

      {!canCompare && (
        <p className='text-[10px] text-zinc-600 text-right max-w-[140px] leading-tight'>
          Select 2-3 variants from any car page to compare
        </p>
      )}
    </div>
  )
}