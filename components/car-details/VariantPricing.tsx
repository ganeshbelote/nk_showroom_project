'use client'

import { useMemo, useState } from 'react'
import { Circle, Fuel, Gauge, Check, ScrollText } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Variant {
  id: string
  name: string
  fuel: string
  transmission: string
  price: string
  onRoadPrice?: string | null
  mileage?: string | null
  hybridMileage?: string | null
  features?: string[]
}

interface Props {
  variants: Variant[]
  vehicleId: string
}

export default function VariantPricing ({ variants, vehicleId }: Props) {
  const router = useRouter()
  const [fuel, setFuel] = useState('All')
  const [transmission, setTransmission] = useState('All')

  // Collect unique fuel types from variants
  const fuelTypes = useMemo(() => {
    const set = new Set(variants.map(v => v.fuel))
    return ['All', ...Array.from(set)]
  }, [variants])

  const filtered = useMemo(() => {
    return variants.filter(v => {
      const fuelMatch = fuel === 'All' || v.fuel === fuel
      const transMatch =
        transmission === 'All' || v.transmission === transmission
      return fuelMatch && transMatch
    })
  }, [variants, fuel, transmission])

  const scrollToOnRoadPrice = () => {
    const el = document.getElementById('onroadprice')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className='mt-5 rounded-3xl border border-zinc-800 bg-zinc-950 p-4 md:p-8'>
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-white md:text-3xl'>
          Variant Pricing
        </h2>

        <p className='mt-2 text-zinc-400'>
          Compare every available variant before booking.
        </p>
      </div>

      <div className='mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
        <div className='flex flex-wrap gap-3'>
          {fuelTypes.map(item => (
            <button
              key={item}
              onClick={() => setFuel(item)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition ${
                fuel === item
                  ? 'bg-[#2B3494] text-white'
                  : 'border border-zinc-700 bg-black text-zinc-300 hover:border-indigo-800'
              }`}
            >
              <Circle size={10} fill='currentColor' />
              {item}
            </button>
          ))}
        </div>

        <div className='flex flex-wrap gap-3'>
          <button
            onClick={() => setTransmission('All')}
            className={`rounded-xl px-4 py-2 text-sm ${
              transmission === 'All'
                ? 'bg-[#2B3494] text-white'
                : 'border border-zinc-700 bg-black text-zinc-300'
            }`}
          >
            All
          </button>

          <button
            onClick={() => setTransmission('Manual')}
            className={`rounded-xl px-4 py-2 text-sm ${
              transmission === 'Manual'
                ? 'bg-[#2B3494] text-white'
                : 'border border-zinc-700 bg-black text-zinc-300'
            }`}
          >
            Manual
          </button>

          <button
            onClick={() => setTransmission('Automatic')}
            className={`rounded-xl px-4 py-2 text-sm ${
              transmission === 'Automatic'
                ? 'bg-[#2B3494] text-white'
                : 'border border-zinc-700 bg-black text-zinc-300'
            }`}
          >
            Automatic
          </button>
        </div>
      </div>

      <div className='space-y-4'>
        {filtered.map((variant, index) => (
          <div
            key={index}
            className='rounded-2xl border border-zinc-800 bg-black p-5 transition hover:border-indigo-800'
          >
            <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between'>
              <div className='flex-1'>
                <h3 className='text-xl font-semibold text-white'>
                  {variant.name}
                </h3>

                <div className='mt-3 flex flex-wrap gap-2'>
                  <span className='flex items-center gap-1.5 rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300'>
                    <Fuel size={14} />
                    {variant.fuel}
                  </span>

                  <span className='flex items-center gap-1.5 rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300'>
                    <Gauge size={14} />
                    {variant.transmission}
                  </span>
                </div>

                {/* Mileage info */}
                {(variant.mileage || variant.hybridMileage) && (
                  <div className='mt-4 flex flex-wrap gap-3 text-sm'>
                    {variant.mileage && (
                      <span className='text-zinc-400'>
                        Mileage: <strong className='text-white'>{variant.mileage}</strong>
                      </span>
                    )}
                    {variant.hybridMileage && (
                      <span className='text-zinc-400'>
                        Hybrid Mileage: <strong className='text-emerald-400'>{variant.hybridMileage}</strong>
                      </span>
                    )}
                  </div>
                )}

                {/* Features */}
                {variant.features && variant.features.length > 0 && (
                  <div className='mt-4'>
                    <details className='group'>
                      <summary className='flex cursor-pointer items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300'>
                        <ScrollText size={14} />
                        <span>Features ({variant.features.length})</span>
                      </summary>
                      <div className='mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2'>
                        {variant.features.map((f, i) => (
                          <span key={i} className='flex items-center gap-2 text-sm text-zinc-400'>
                            <Check size={12} className='text-green-500 shrink-0' />
                            {f}
                          </span>
                        ))}
                      </div>
                    </details>
                  </div>
                )}
              </div>

              <div className='flex flex-col items-start gap-3 lg:items-end lg:text-right'>
                <p className='text-3xl font-bold text-white'>{variant.price}</p>

                {variant.onRoadPrice && variant.price !== variant.onRoadPrice && (
                  <p className='text-sm text-zinc-500 line-through'>{variant.onRoadPrice}</p>
                )}

                <button
                  onClick={scrollToOnRoadPrice}
                  className='rounded-lg border border-indigo-800/50 px-4 py-1.5 text-sm font-medium text-indigo-400 transition hover:bg-indigo-800/20'
                >
                  Get On-Road Price
                </button>
              </div>
            </div>

            <div className='mt-5 border-t border-zinc-800 pt-5 space-y-3'>
              <button
                className='w-full rounded-xl bg-[#2B3494] py-3 font-semibold text-white transition hover:bg-indigo-800'
                onClick={() => router.push('/dealer')}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
