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

type VariantInfo = {
  id: string
  name: string
  price: number
}

type Props = {
  vehicleId: string
  vehicleName: string
  basePrice: number
  variants?: VariantInfo[]
}

export default function OnRoadPriceManager ({ vehicleId, vehicleName, basePrice, variants = [] }: Props) {
  const [priceData, setPriceData] = useState<PriceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [variantPrices, setVariantPrices] = useState<Record<string, PriceData | null>>({})

  const effectiveBasePrice = selectedVariant
    ? variants.find(v => v.id === selectedVariant)?.price ?? basePrice
    : basePrice

  const currentPriceData = selectedVariant ? variantPrices[selectedVariant] ?? null : priceData

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const params = new URLSearchParams({ vehicleId })
        if (selectedVariant) params.set('variantId', selectedVariant)

        const res = await fetch(`/api/on-road-price?${params.toString()}`, {
          credentials: 'include'
        })
        const data = await res.json()
        if (data.success && data.price) {
          if (selectedVariant) {
            setVariantPrices(prev => ({ ...prev, [selectedVariant]: data.price }))
          } else {
            setPriceData(data.price)
          }
        } else {
          // Initialize defaults
          const defaultInsurance = Math.round(effectiveBasePrice * 0.05)
          const defaultRto = Math.round(effectiveBasePrice * 0.08)
          const defaultReg = 600
          const defaultFastag = 500
          const defaultTcs = Math.round(effectiveBasePrice * 0.01)
          const totalBefore = effectiveBasePrice + defaultInsurance + defaultRto + defaultReg + defaultFastag + defaultTcs
          const defaults: PriceData = {
            exShowroomPrice: effectiveBasePrice,
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
          }
          if (selectedVariant) {
            setVariantPrices(prev => ({ ...prev, [selectedVariant]: defaults }))
          } else {
            setPriceData(defaults)
          }
        }
      } catch {
        toast.error('Failed to load on-road price')
      } finally {
        setLoading(false)
      }
    }
    fetchPrice()
  }, [vehicleId, selectedVariant, effectiveBasePrice])

  const handleChange = (field: keyof PriceData, value: string) => {
    const data = selectedVariant ? variantPrices[selectedVariant] : priceData
    if (!data) return
    const num = Number(value) || 0
    const updated = { ...data, [field]: num }

    const sum = updated.exShowroomPrice + updated.insurance + updated.rtoTax +
      updated.registrationFees + updated.fastag + updated.extendedWarranty +
      updated.autoCard + updated.numberPlateGarnish + updated.accessories + updated.tcs

    updated.totalBeforeDiscount = sum
    updated.finalOnRoadPrice = sum - updated.discount

    if (selectedVariant) {
      setVariantPrices(prev => ({ ...prev, [selectedVariant]: updated }))
    } else {
      setPriceData(updated)
    }
  }

  const handleSave = async () => {
    const data = selectedVariant ? variantPrices[selectedVariant] : priceData
    if (!data) return
    setSaving(true)
    try {
      const res = await fetch('/api/on-road-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          vehicleId,
          variantId: selectedVariant || '',
          ...data
        })
      })
      const result = await res.json()
      if (result.success) {
        const label = selectedVariant
          ? `${vehicleName} - ${variants.find(v => v.id === selectedVariant)?.name}`
          : vehicleName
        toast.success('On-Road Price saved for ' + label)
      } else {
        toast.error(result.message || 'Failed to save')
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

  if (!priceData && !selectedVariant) return null

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
    <div className='mt-5 space-y-5'>
      {/* Vehicle-level price */}
      <div className='rounded-2xl border border-zinc-800 bg-black p-5'>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='text-lg font-semibold text-white'>
            Base On-Road Price: {vehicleName}
          </h3>
          <button
            onClick={() => {
              setSelectedVariant(null)
              // Fetch vehicle-level if not loaded
              if (!priceData) {
                setLoading(true)
              }
            }}
            className={`rounded-xl px-4 py-1.5 text-sm font-medium transition ${
              !selectedVariant
                ? 'bg-[#2B3494] text-white'
                : 'border border-zinc-700 text-zinc-400 hover:border-indigo-800'
            }`}
          >
            Base Price
          </button>
        </div>

        {!selectedVariant && priceData && (
          <>
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
            <div className='mt-4 flex justify-end'>
              <button
                onClick={handleSave}
                disabled={saving}
                className='rounded-xl bg-[#2B3494] px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-800 disabled:opacity-50'
              >
                {saving ? 'Saving...' : 'Save Base Price'}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Per-variant prices */}
      {variants.length > 0 && (
        <div className='rounded-2xl border border-zinc-800 bg-black p-5'>
          <h3 className='mb-4 text-lg font-semibold text-white'>
            Variant-Specific On-Road Prices
          </h3>

          <div className='mb-4 flex flex-wrap gap-2'>
            {variants.map(v => (
              <button
                key={v.id}
                onClick={() => {
                  setSelectedVariant(v.id)
                  if (!variantPrices[v.id]) {
                    setLoading(true)
                  }
                }}
                className={`rounded-xl px-4 py-1.5 text-sm font-medium transition ${
                  selectedVariant === v.id
                    ? 'bg-[#2B3494] text-white'
                    : 'border border-zinc-700 text-zinc-400 hover:border-indigo-800'
                }`}
              >
                {v.name}
                {variantPrices[v.id] && (
                  <span className='ml-1.5 text-xs text-emerald-400'>✓</span>
                )}
              </button>
            ))}
          </div>

          {selectedVariant && currentPriceData && (
            <>
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                {fields.map(({ label, field }) => {
                  const value = currentPriceData[field]
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
              <div className='mt-4 flex justify-end'>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className='rounded-xl bg-[#2B3494] px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-800 disabled:opacity-50'
                >
                  {saving ? 'Saving...' : `Save ${variants.find(v => v.id === selectedVariant)?.name} Price`}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}