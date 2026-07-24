'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, AnimatePresence, PanInfo } from 'motion/react'
import { cn } from '@/lib/utils'

type SwipeableSheetProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  className?: string
}

const SHEET_HEIGHT = '85vh'
const DRAG_THRESHOLD = 100

export default function SwipeableSheet ({
  open,
  onClose,
  children,
  title,
  className
}: SwipeableSheetProps) {
  const [y, setY] = useState(0)
  const sheetRef = useRef<HTMLDivElement>(null)

  const handleDragEnd = useCallback(
    (_: any, info: PanInfo) => {
      if (info.offset.y > DRAG_THRESHOLD) {
        onClose()
      }
      setY(0)
    },
    [onClose]
  )

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            ref={sheetRef}
            className={cn(
              'fixed bottom-0 left-0 right-0 z-51 mx-auto w-full max-w-2xl rounded-t-3xl bg-zinc-950 border border-zinc-800 border-b-0 shadow-2xl',
              'flex flex-col',
              className
            )}
            style={{ height: SHEET_HEIGHT }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag='y'
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={handleDragEnd}
            onDrag={(_, info) => setY(info.offset.y)}
          >
            {/* Drag handle */}
            <div className='flex justify-center pt-3 pb-2'>
              <div
                className='h-1.5 w-12 rounded-full bg-zinc-600'
                style={{ transform: `translateY(${Math.min(y * 0.5, 20)}px)` }}
              />
            </div>

            {/* Title */}
            {title && (
              <div className='px-6 pb-4 border-b border-zinc-800'>
                <h2 className='text-xl font-bold text-white'>{title}</h2>
              </div>
            )}

            {/* Content */}
            <div className='flex-1 overflow-y-auto px-6 py-4'>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}