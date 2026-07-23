'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useCompare } from './CompareContext'

type Props = {
  vehicleId: string
  className?: string
}

export default function CompareBadge ({ vehicleId, className = '' }: Props) {
  const { isSelected, toggleVehicle } = useCompare()

  const selected = isSelected(vehicleId)

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleVehicle(vehicleId)
      }}
      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition ${
        selected
          ? 'border-[#2B3494] bg-[#2B3494] text-white'
          : 'border-zinc-600 bg-black/60 text-transparent hover:border-zinc-400'
      } ${className}`}
      aria-label={selected ? 'Remove from compare' : 'Add to compare'}
    >
      {selected ? (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        >
          <Check size={16} />
        </motion.span>
      ) : (
        <span className='text-xs font-bold text-zinc-400'>+</span>
      )}
    </motion.button>
  )
}