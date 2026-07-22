'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/Toast'

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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [priceData, setPriceData] = useState<PriceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
        const meRes = await fetch('/api/auth/me', { credentials: 'include' })
        const meData = await meRes.json()
        if (!meData.success) {
          setIsLoggedIn(false)
          setLoading(false)
          return
        }
        setIsLoggedIn(true)
        setIsAdmin(meData.user.role === 'ADMIN')

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
        setIsLoggedIn(false)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [vehicleId, basePrice])

  const handleChange = (field: keyof PriceData, value: string) => {
    if (!priceData) return
    const num = Number(value) || 0
    const updated = { ...priceData, [field]: num }

    const sum = updated.exShowroomPrice + updated.insurance + updated.rtoTax +
      updated.registrationFees + updated.fastag + updated.extendedWarranty +
      updated.autoCard + updated.numberPlateGarnish + updated.accessories + updated.tcs

    updated.totalBeforeDiscount = sum
    updated.finalOnRoadPrice = sum - updated.discount

    setPriceData(updated)
  }

  const handleSave = async () => {
    if (!priceData) return
    try {
      const res = await fetch('/api/on-road-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ vehicleId, ...priceData })
      })
      const data = await res.json()
      if (data.success) {
        toast.success('On-Road Price saved')
        setEditing(false)
      } else {
        toast.error(data.message || 'Failed to save')
      }
    } catch {
      toast.error('Failed to save')
    }
  }

  if (loading) return null
  if (isLoggedIn === false) return null

  if (!priceData) return null

  const fields: { label: string; field: keyof PriceData; editable?: boolean }[] = [
    { label: 'Ex-showroom Price', field: 'exShowroomPrice', editable: true },
    { label: 'Insurance', field: 'insurance', editable: true },
    { label: 'RTO Tax', field: 'rtoTax', editable: true },
    { label: 'Registration Fees', field: 'registrationFees', editable: true },
    { label: 'FASTag', field: 'fastag', editable: true },
    { label: 'Extended Warranty', field: 'extendedWarranty', editable: true },
    { label: 'Auto Card', field: 'autoCard', editable: true },
    { label: 'Number Plate Garnish', field: 'numberPlateGarnish', editable: true },
    { label: 'Accessories', field: 'accessories', editable: true },
    { label: 'TCS (Tax Collected at Source)', field: 'tcs', editable: true },
    { label: 'Discount', field: 'discount', editable: true },
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
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-white md:text-3xl'>
            On-Road Price
          </h2>
          <p className='mt-2 text-zinc-400'>
            Complete price breakdown for this vehicle.
          </p>
        </div>
        {/* Only admins can edit on the car detail page */}
        {isAdmin && (
          <div className='flex gap-3'>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className='rounded-xl bg-[#2B3494] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-800'
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={() => setEditing(false)}
                  className='rounded-xl border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-500'
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className='rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700'
                >
                  Save
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className='space-y-3'>
        {fields.map(({ label, field, editable }) => {
          const value = priceData[field]
          return (
            <div
              key={field}
              className='flex items-center justify-between rounded-xl border border-zinc-800 bg-black px-5 py-3.5'
            >
              <span className='text-sm text-zinc-400'>{label}</span>
              {isAdmin && editing && editable ? (
                <input
                  type='number'
                  value={value}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className='w-40 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-right text-sm text-white outline-none focus:border-indigo-800'
                />
              ) : (
                <span className={`text-sm font-semibold ${fieldColor(field)}`}>
                  ₹{Number(value).toLocaleString('en-IN')}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}