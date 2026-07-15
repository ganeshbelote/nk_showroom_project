'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, Circle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Variant {
  name: string
  fuel: string
  transmission: string
  price: string
}

interface Props {
  variants: Variant[]
}

export default function VariantPricing ({ variants }: Props) {
  const router = useRouter()
  const [fuel, setFuel] = useState('All')
  const [transmission, setTransmission] = useState('All')

  const filtered = useMemo(() => {
    return variants.filter(v => {
      const fuelMatch = fuel === 'All' || v.fuel === fuel
      const transMatch =
        transmission === 'All' || v.transmission === transmission

      return fuelMatch && transMatch
    })
  }, [variants, fuel, transmission])

  return (
    <section className='rounded-3xl border border-zinc-800 bg-zinc-950 p-4 md:p-8'>
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
          {['All', 'Petrol', 'Diesel', 'CNG'].map(item => (
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

          <button className='flex items-center gap-2 rounded-xl border border-zinc-700 bg-black px-4 py-2 text-zinc-300 hover:border-indigo-800'>
            Price
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className='space-y-4'>
        {filtered.map((variant, index) => (
          <div
            key={index}
            className='flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-black p-5 transition hover:border-indigo-800 lg:flex-row lg:items-center lg:justify-between'
          >
            <div>
              <h3 className='text-xl font-semibold text-white'>
                {variant.name}
              </h3>

              <div className='mt-3 flex flex-wrap gap-2'>
                <span className='rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300'>
                  {variant.fuel}
                </span>

                <span className='rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300'>
                  {variant.transmission}
                </span>
              </div>
            </div>

            <div className='text-left lg:text-center'>
              <p className='text-3xl font-bold text-white'>{variant.price}</p>

              <p className='mt-1 text-sm text-indigo-800'>Get On-Road Price</p>
            </div>

            <button
              className='rounded-xl bg-[#2B3494] px-8 py-3 font-semibold text-white transition hover:bg-indigo-800'
              onClick={() => router.push('/dealer')}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
