'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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
  vehicleId: string
  basePrice: number
}

export default function OnRoadPriceSection ({ vehicleId, basePrice }: Props) {
  const router = useRouter()
  const [priceData, setPriceData] = useState<PriceData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(`/api/on-road-price?vehicleId=${vehicleId}`, {
          credentials: 'include'
        })
        const data = await res.json()
        if (data.success && data.price) {
          setPriceData(data.price)
        } else {
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
        // silently fail - just won't show price
      } finally {
        setLoading(false)
      }
    }
    fetchPrice()
  }, [vehicleId, basePrice])

  if (loading) return null
  if (!priceData) return null

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
    <section id='onroadprice' className='mt-5 rounded-3xl border border-zinc-800 bg-zinc-950 p-5 md:p-8'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-white md:text-3xl'>
          On-Road Price
        </h2>
        <p className='mt-2 text-zinc-400'>
          Complete price breakdown for this vehicle.
        </p>
      </div>

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
    </section>
  )
}
