'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

type SpecRow = {
  label: string
  values: (string | number | boolean | null | undefined)[]
  highlightBest?: 'higher' | 'lower' | boolean
  format?: (val: string | number | boolean | null | undefined) => string
}

type Props = {
  title: string
  rows: SpecRow[]
  vehicleCount: number
}

export default function SpecificationSection ({ title, rows, vehicleCount }: Props) {
  if (rows.length === 0) return null

  return (
    <div className='rounded-2xl border border-zinc-800 bg-zinc-950 p-5 md:p-6'>
      <h3 className='mb-5 text-lg font-bold text-white'>{title}</h3>

      <div className='space-y-1'>
        {rows.map((row, idx) => {
          const numericValues = row.values.map(v => {
            if (typeof v === 'boolean') return null
            const num = Number(v)
            return isNaN(num) ? null : num
          })

          let bestIndex = -1
          if (row.highlightBest && numericValues.some(n => n !== null)) {
            const valid = numericValues.map((n, i) => ({ n, i })).filter(x => x.n !== null)
            if (valid.length > 0) {
              if (row.highlightBest === 'higher') {
                bestIndex = valid.reduce((a, b) => a.n! > b.n! ? a : b).i
              } else if (row.highlightBest === 'lower') {
                bestIndex = valid.reduce((a, b) => a.n! < b.n! ? a : b).i
              }
            }
          }

          const allSame = row.values.every((v, _, arr) => {
            const first = arr[0]
            if (v === first) return true
            if (String(v) === String(first)) return true
            return false
          })

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className={`grid grid-cols-[120px_repeat(${vehicleCount},1fr)] md:grid-cols-[180px_repeat(${vehicleCount},1fr)] gap-3 rounded-xl px-3 py-2.5 text-sm ${
                !allSame ? 'bg-[#2B3494]/5' : ''
              } ${idx % 2 === 0 ? 'bg-black/40' : ''}`}
            >
              <span className={`text-xs font-medium ${
                !allSame ? 'text-indigo-400' : 'text-zinc-500'
              }`}>
                {row.label}
              </span>

              {row.values.map((val, vi) => {
                const isBest = vi === bestIndex
                const displayVal = row.format ? row.format(val) : val

                return (
                  <span
                    key={vi}
                    className={`text-xs md:text-sm ${
                      isBest ? 'text-emerald-400 font-semibold' : 'text-zinc-300'
                    } ${typeof val === 'boolean' ? 'flex justify-center' : ''}`}
                  >
                    {typeof val === 'boolean' ? (
                      val ? (
                        <Check size={16} className='text-green-500' />
                      ) : (
                        <X size={16} className='text-red-500/60' />
                      )
                    ) : displayVal ?? '—'}
                  </span>
                )
              })}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}