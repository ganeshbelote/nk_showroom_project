'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import SwipeableSheet from '@/components/ui/swipeable-sheet'

type PriceData = {
  exShowroomPrice: number
  insurance: number
  rtoTax: number
  registrationFees: number
  fastag: number
  extendedWarranty: number
  autoCard: number
  numberPlateGarnish: number
  accessories: number
  tcs: number
  discount: number
  totalBeforeDiscount: number
  finalOnRoadPrice: number
}

type Props = {
  open: boolean
  onClose: () => void
  vehicleId: string
  variantId?: string | null
  variantName?: string
  basePrice: number
}

export default function OnRoadPriceSheet ({
  open,
  onClose,
  vehicleId,
  variantId,
  variantName,
  basePrice
}: Props) {
  const router = useRouter()
  const [priceData, setPriceData] = useState<PriceData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchPrice = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ vehicleId })
      params.set('variantId', variantId || '')

      const res = await fetch(`/api/on-road-price?${params.toString()}`, {
        credentials: 'include'
      })
      const data = await res.json()
      if (data.success && data.price) {
        setPriceData(data.price)
      } else {
        // Fallback with defaults
        const defaultInsurance = Math.round(basePrice * 0.05)
        const defaultRto = Math.round(basePrice * 0.08)
        const defaultReg = 600
        const defaultFastag = 500
        const defaultTcs = Math.round(basePrice * 0.01)
        const totalBefore = basePrice + defaultInsurance + defaultRto + defaultReg + defaultFastag + defaultTcs
        setPriceData({
          exShowroomPrice: basePrice,
          insurance: defaultInsurance,
          rtoTax: defaultRto,
          registrationFees: defaultReg,
          fastag: defaultFastag,
          extendedWarranty: 0,
          autoCard: 0,
          numberPlateGarnish: 0,
          accessories: 0,
          tcs: defaultTcs,
          discount: 0,
          totalBeforeDiscount: totalBefore,
          finalOnRoadPrice: totalBefore
        })
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [vehicleId, variantId, basePrice])

  useEffect(() => {
    if (open) {
      // Check auth first
      const checkAuth = async () => {
        try {
          const meRes = await fetch('/api/auth/me', { credentials: 'include' })
          const meData = await meRes.json()
          if (!meData.success) {
            onClose()
            router.push('/auth/login')
            return
          }
          fetchPrice()
        } catch {
          onClose()
          router.push('/auth/login')
        }
      }
      checkAuth()
    }
  }, [open, fetchPrice, onClose, router])

  const title = variantName
    ? `On-Road Price — ${variantName}`
    : 'On-Road Price'

  const fields: { label: string; field: keyof PriceData }[] = [
    { label: 'Ex-showroom Price', field: 'exShowroomPrice' },
    { label: 'Insurance', field: 'insurance' },
    { label: 'RTO Tax', field: 'rtoTax' },
    { label: 'Registration Fees', field: 'registrationFees' },
    { label: 'FASTag', field: 'fastag' },
    { label: 'Extended Warranty', field: 'extendedWarranty' },
    { label: 'Auto Card', field: 'autoCard' },
    { label: 'Number Plate Garnish', field: 'numberPlateGarnish' },
    { label: 'Accessories', field: 'accessories' },
    { label: 'TCS (Tax Collected at Source)', field: 'tcs' },
    { label: 'Discount', field: 'discount' },
    { label: 'Total Before Discount', field: 'totalBeforeDiscount' },
    { label: 'Final On-Road Price', field: 'finalOnRoadPrice' }
  ]

  const fieldColor = (field: keyof PriceData) => {
    if (field === 'discount') return 'text-green-500'
    if (field === 'finalOnRoadPrice' || field === 'totalBeforeDiscount') return 'text-indigo-400'
    return 'text-zinc-300'
  }

  return (
    <SwipeableSheet open={open} onClose={onClose} title={title}>
      {loading ? (
        <div className='space-y-3 py-8'>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className='h-12 animate-pulse rounded-xl bg-zinc-800' />
          ))}
        </div>
      ) : priceData ? (
        <div className='space-y-3'>
          {fields.map(({ label, field }) => {
            const value = priceData[field]
            return (
              <div
                key={field}
                className='flex items-center justify-between rounded-xl border border-zinc-800 bg-black px-5 py-3.5'
              >
                <span className='text-sm text-zinc-400'>{label}</span>
                <span className={`text-sm font-semibold ${fieldColor(field)}`}>
                  ₹{Number(value).toLocaleString('en-IN')}
                </span>
              </div>
            )
          })}
        </div>
      ) : (
        <p className='py-8 text-center text-zinc-500'>Unable to load price data.</p>
      )}
    </SwipeableSheet>
  )
}