'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCompare } from '@/components/compare/CompareContext'
import { Plus, Minus, ArrowRight } from 'lucide-react'

type VehicleSummary = {
  id: string
  name: string
  brand: string
  basePrice: number
  bodyType: string
  fuelType: string
  transmission: string
  images: { imageUrl: string; isCover: boolean }[]
}

type Props = {
  currentVehicleId: string
  currentVehicleName: string
}

export default function CompareSuggestion ({ currentVehicleId, currentVehicleName }: Props) {
  const { selectedIds, toggleVehicle, isSelected } = useCompare()
  const [vehicles, setVehicles] = useState<VehicleSummary[]>([])
  const [loading, setLoading] = useState(true)

  const thisCarSelected = isSelected(currentVehicleId)
  const remainingSlots = 3 - selectedIds.length

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch('/api/vehicles?limit=50&published=true')
        const data = await res.json()
        if (data.success) {
          // Exclude current vehicle
          const others = (data.vehicles as VehicleSummary[]).filter(
            (v: VehicleSummary) => v.id !== currentVehicleId
          )
          setVehicles(others)
        }
      } catch (err) {
        console.error('Failed to fetch vehicles for compare suggestion:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [currentVehicleId])

  // Don't show anything if this car isn't selected for comparison
  if (!thisCarSelected) return null

  return (
    <section className='mx-auto max-w-7xl px-6 pb-20'>
      <div className='rounded-3xl border border-zinc-800 bg-zinc-950 p-6 md:p-8'>
        <div className='mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
          <div>
            <h2 className='text-2xl font-bold text-white md:text-3xl'>
              Compare <span className='text-indigo-400'>{currentVehicleName}</span>
            </h2>
            <p className='mt-1 text-zinc-400'>
              {remainingSlots > 0
                ? `Select up to ${remainingSlots} more vehicle${remainingSlots > 1 ? 's' : ''} to compare`
                : 'Comparison limit reached (max 3 vehicles)'}
            </p>
          </div>

          {selectedIds.length >= 2 && (
            <Link
              href={`/compare?ids=${selectedIds.join(',')}`}
              className='flex items-center gap-2 rounded-xl bg-[#2B3494] px-5 py-3 font-semibold text-white transition hover:bg-indigo-800'
            >
              View Comparison <ArrowRight size={18} />
            </Link>
          )}
        </div>

        {loading ? (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className='animate-pulse rounded-2xl border border-zinc-800 bg-black p-4'
              >
                <div className='aspect-video w-full rounded-xl bg-zinc-800' />
                <div className='mt-4 h-5 w-3/4 rounded bg-zinc-800' />
                <div className='mt-2 h-4 w-1/2 rounded bg-zinc-800' />
                <div className='mt-4 h-10 w-full rounded-xl bg-zinc-800' />
              </div>
            ))}
          </div>
        ) : vehicles.length === 0 ? (
          <p className='py-8 text-center text-zinc-500'>No other vehicles available.</p>
        ) : (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {vehicles.slice(0, 6).map(vehicle => {
              const selected = isSelected(vehicle.id)
              const cannotSelect = !selected && remainingSlots <= 0 && thisCarSelected

              return (
                <div
                  key={vehicle.id}
                  className={`rounded-2xl border bg-black p-4 transition ${
                    selected
                      ? 'border-emerald-500'
                      : cannotSelect
                        ? 'border-zinc-800 opacity-50'
                        : 'border-zinc-800 hover:border-indigo-800'
                  }`}
                >
                  <Link href={`/car/${vehicle.id}`}>
                    <div className='overflow-hidden rounded-xl'>
                      <Image
                        src={
                          vehicle.images.find(img => img.isCover)?.imageUrl ??
                          vehicle.images[0]?.imageUrl ??
                          '/placeholder.png'
                        }
                        alt={vehicle.name}
                        width={400}
                        height={250}
                        className='aspect-video w-full object-cover'
                      />
                    </div>
                  </Link>

                  <div className='mt-4'>
                    <Link href={`/car/${vehicle.id}`}>
                      <h3 className='text-lg font-semibold text-white hover:text-indigo-400 transition'>
                        {vehicle.brand} {vehicle.name}
                      </h3>
                    </Link>
                    <p className='mt-1 text-sm text-zinc-400'>
                      ₹{Number(vehicle.basePrice).toLocaleString('en-IN')} • {vehicle.bodyType}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleVehicle(vehicle.id)}
                    disabled={cannotSelect}
                    className={`mt-4 w-full rounded-xl border-2 py-2.5 text-sm font-medium transition flex items-center justify-center gap-2 ${
                      selected
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                        : cannotSelect
                          ? 'border-zinc-700 text-zinc-600 cursor-not-allowed'
                          : 'border-zinc-700 text-zinc-400 hover:border-indigo-500 hover:text-indigo-400'
                    }`}
                  >
                    {selected ? (
                      <><Minus size={16} /> Remove</>
                    ) : (
                      <><Plus size={16} /> Add to Compare</>
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {selectedIds.length >= 2 && (
          <div className='mt-6 flex justify-center'>
            <Link
              href={`/compare?ids=${selectedIds.join(',')}`}
              className='flex items-center gap-2 rounded-xl bg-[#2B3494] px-8 py-3 font-semibold text-white transition hover:bg-indigo-800'
            >
              View Full Comparison <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}