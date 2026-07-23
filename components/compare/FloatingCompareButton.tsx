'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useCompare } from './CompareContext'

export default function FloatingCompareButton () {
  const router = useRouter()
  const { selectedIds, count, clearSelection } = useCompare()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {count >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className='fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2'
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(`/compare?ids=${selectedIds.join(',')}`)}
            className='flex items-center gap-3 rounded-full bg-[#2B3494] px-6 py-3.5 font-semibold text-white shadow-2xl shadow-[#2B3494]/30 transition hover:bg-indigo-800 md:px-7 md:py-3.5 md:text-base'
          >
            <span>Compare ({count})</span>
            <ArrowRight size={18} />
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={clearSelection}
            className='text-xs text-zinc-500 underline underline-offset-2 hover:text-zinc-300 transition'
          >
            Clear selection
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}