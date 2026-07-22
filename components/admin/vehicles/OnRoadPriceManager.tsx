'use client'

import { useEffect, useState } from 'react'
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
  vehicleName: string
  basePrice: number
}

export default function OnRoadPriceManager ({ vehicleId, vehicleName, basePrice }: Props) {
  const [priceData, setPriceData] = useState<PriceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

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
          // Initialize defaults
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
        toast.error('Failed to load on-road price')
      } finally {
        setLoading(false)
      }
    }
    fetchPrice()
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
    setSaving(true)
    try {
      const res = await fetch('/api/on-road-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ vehicleId, ...priceData })
      })
      const data = await res.json()
      if (data.success) {
        toast.success('On-Road Price saved for ' + vehicleName)
      } else {
        toast.error(data.message || 'Failed to save')
      }
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className='h-32 animate-pulse rounded-2xl bg-zinc-900' />
  }

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

  return (
    <div className='mt-5 rounded-2xl border border-zinc-800 bg-black p-5'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-white'>On-Road Price: {vehicleName}</h3>
        <button
          onClick={handleSave}
          disabled={saving}
          className='rounded-xl bg-[#2B3494] px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-800 disabled:opacity-50'
        >
          {saving ? 'Saving...' : 'Save Price'}
        </button>
      </div>

      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {fields.map(({ label, field }) => {
          const value = priceData[field]
          const isTotal = field === 'totalBeforeDiscount' || field === 'finalOnRoadPrice'
          const isDiscount = field === 'discount'
          return (
            <div key={field}>
              <label className='mb-1 block text-xs text-zinc-500'>{label}</label>
              <input
                type='number'
                value={value}
                onChange={(e) => handleChange(field, e.target.value)}
                className={`h-10 w-full rounded-lg border px-3 text-sm outline-none transition ${
                  isTotal
                    ? 'border-indigo-800/50 bg-indigo-950/30 text-indigo-300'
                    : isDiscount
                    ? 'border-green-800/50 bg-green-950/30 text-green-300'
                    : 'border-zinc-700 bg-zinc-900 text-white'
                } focus:border-indigo-800`}
                readOnly={isTotal}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}