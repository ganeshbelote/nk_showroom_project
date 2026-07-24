'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, SlidersHorizontal, Fuel, Gauge, Settings2, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCompare } from '@/components/compare/CompareContext'
import CompareBadge from '@/components/compare/CompareBadge'

type Vehicle = {
  id: string
  name: string
  slug: string
  brand: string
  bodyType: string
  fuelType: string
  transmission: string
  mileage: string
  basePrice: number
  seatingCapacity: number
  description: string
  images: { imageUrl: string; isCover: boolean }[]
  variants: { id: string; name: string; price: string; fuel: string; transmission: string }[]
  _count: { reviews: number; wishlists: number }
}

export default function CarsPage () {
  const router = useRouter()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedFuel, setSelectedFuel] = useState('')
  const [selectedBody, setSelectedBody] = useState('')
  const [selectedTransmission, setSelectedTransmission] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [total, setTotal] = useState(0)

  async function fetchVehicles () {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('limit', '50')
      if (search) params.set('search', search)
      if (selectedFuel) params.set('category', selectedFuel)

      const res = await fetch(`/api/vehicles?${params.toString()}`)
      const data = await res.json()
      if (data.success) {
        setVehicles(data.vehicles)
        setTotal(data.total)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  // Client-side filtering for fuel, body, transmission since API only supports search
  const filtered = vehicles.filter(v => {
    if (selectedFuel && v.fuelType !== selectedFuel) return false
    if (selectedBody && v.bodyType !== selectedBody) return false
    if (selectedTransmission && v.transmission !== selectedTransmission) return false
    return true
  })

  const fuelTypes = [...new Set(vehicles.map(v => v.fuelType))]
  const bodyTypes = [...new Set(vehicles.map(v => v.bodyType))]
  const transmissions = [...new Set(vehicles.map(v => v.transmission))]

  function clearFilters () {
    setSelectedFuel('')
    setSelectedBody('')
    setSelectedTransmission('')
    setSearch('')
    setShowFilters(false)
  }

  const hasActiveFilters = selectedFuel || selectedBody || selectedTransmission || search

  const { isSelected, toggleVehicle, count } = useCompare()

  return (
    <main className='min-h-screen bg-black'>
      {/* Header */}
      <div className='border-b border-zinc-800 bg-zinc-950/50'>
        <div className='mx-auto max-w-7xl px-4 py-12 md:px-8'>
          <div className='flex flex-col items-center text-center'>
            <h1 className='text-4xl font-bold text-white md:text-5xl'>
              Browse Cars
            </h1>

            <p className='mt-4 max-w-2xl text-zinc-400'>
              Explore our complete range of vehicles. Find the perfect car that
              matches your style and needs.
            </p>
          </div>

          {/* Search Bar */}
          <div className='mx-auto mt-8 flex max-w-2xl gap-3'>
            <div className='relative flex-1'>
              <Search size={20} className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500' />

              <input
                type='text'
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') fetchVehicles() }}
                placeholder='Search cars by name or brand...'
                className='h-14 w-full rounded-2xl border border-zinc-700 bg-black pl-12 pr-4 text-white outline-none transition focus:border-[#2B3494]'
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition ${
                showFilters || hasActiveFilters
                  ? 'border-[#2B3494] bg-[#2B3494] text-white'
                  : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
              }`}
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>

          {/* Filters Dropdown */}
          {showFilters && (
            <div className='mx-auto mt-4 max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-950 p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='font-semibold text-white'>Filters</h3>

                <button
                  onClick={clearFilters}
                  className='flex items-center gap-1 text-sm text-zinc-400 hover:text-white'
                >
                  <X size={16} />
                  Clear all
                </button>
              </div>

              <div className='grid gap-4 sm:grid-cols-3'>
                <div>
                  <label className='mb-2 block text-sm text-zinc-400'>Fuel Type</label>

                  <select
                    value={selectedFuel}
                    onChange={e => setSelectedFuel(e.target.value)}
                    className='h-11 w-full rounded-xl border border-zinc-700 bg-black px-3 text-white outline-none transition focus:border-[#2B3494]'
                  >
                    <option value=''>All Fuels</option>

                    {fuelTypes.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='mb-2 block text-sm text-zinc-400'>Body Type</label>

                  <select
                    value={selectedBody}
                    onChange={e => setSelectedBody(e.target.value)}
                    className='h-11 w-full rounded-xl border border-zinc-700 bg-black px-3 text-white outline-none transition focus:border-[#2B3494]'
                  >
                    <option value=''>All Bodies</option>

                    {bodyTypes.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='mb-2 block text-sm text-zinc-400'>Transmission</label>

                  <select
                    value={selectedTransmission}
                    onChange={e => setSelectedTransmission(e.target.value)}
                    className='h-11 w-full rounded-xl border border-zinc-700 bg-black px-3 text-white outline-none transition focus:border-[#2B3494]'
                  >
                    <option value=''>All Transmissions</option>

                    {transmissions.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <p className='mt-6 text-center text-sm text-zinc-500'>
            {loading ? 'Loading...' : `${filtered.length} vehicle${filtered.length !== 1 ? 's' : ''} found`}
          </p>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className='mx-auto max-w-7xl px-4 py-12 md:px-8'>
        {loading ? (
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {[...Array(6)].map((_, i) => (
              <div key={i} className='rounded-3xl border border-zinc-800 bg-zinc-950 overflow-hidden'>
                <div className='h-56 animate-pulse bg-zinc-800/50' />

                <div className='p-6 space-y-4'>
                  <div className='h-6 w-3/4 animate-pulse rounded-2xl bg-zinc-800' />

                  <div className='h-4 w-1/2 animate-pulse rounded-2xl bg-zinc-800' />

                  <div className='grid grid-cols-3 gap-3'>
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className='h-16 animate-pulse rounded-xl bg-zinc-800' />
                    ))}
                  </div>

                  <div className='h-12 w-full animate-pulse rounded-2xl bg-zinc-800' />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className='flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-700'>
            <Search size={60} className='text-zinc-600' />

            <h2 className='mt-6 text-2xl font-bold text-white'>
              No cars found
            </h2>

            <p className='mt-2 text-zinc-500'>
              Try adjusting your search or filters.
            </p>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className='mt-6 rounded-xl bg-[#2B3494] px-8 py-3 font-semibold text-white transition hover:bg-indigo-800'
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {filtered.map(vehicle => {
              const coverImage = vehicle.images.find(i => i.isCover)?.imageUrl || vehicle.images[0]?.imageUrl || '/placeholder.png'
              const price = `₹${Number(vehicle.basePrice).toLocaleString('en-IN')}`

              const selected = isSelected(vehicle.id)

              return (
                <motion.div
                  key={vehicle.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Link
                    href={`/car/${vehicle.slug}`}
                    className={`group relative overflow-hidden rounded-3xl border transition block ${
                      selected
                        ? 'border-[#2B3494] ring-2 ring-[#2B3494]/50'
                        : 'border-zinc-800 hover:border-[#2B3494]'
                    } bg-zinc-950`}
                  >
                    <div className='relative h-56 overflow-hidden'>
                      <Image
                        src={coverImage}
                        alt={vehicle.name}
                        fill
                        className='object-cover transition duration-500 group-hover:scale-110'
                      />

                      <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent' />

                      <div className='absolute bottom-4 left-4 flex items-center gap-2'>
                        <span className='rounded-full bg-[#2B3494]/90 px-3 py-1 text-xs font-medium text-white backdrop-blur'>
                          {vehicle.bodyType}
                        </span>
                      </div>

                      {/* Compare badge
                      <div className='absolute right-3 top-3 z-10'>
                        <CompareBadge vehicleId={vehicle.id} />
                      </div> */}

                      {/* Selected indicator */}
                      {selected && (
                        <div className='absolute inset-0 bg-[#2B3494]/10 border-2 border-[#2B3494] rounded-3xl' />
                      )}
                    </div>

                    <div className='p-5'>
                      <div className='flex items-start justify-between'>
                        <div className='flex-1'>
                          <h2 className='text-xl font-bold text-white group-hover:text-indigo-400 transition'>
                            {vehicle.name}
                          </h2>

                          <p className='mt-1 text-2xl font-bold text-indigo-800'>
                            {price}
                          </p>

                          <p className='text-[11px] text-zinc-500'>*Ex-showroom price</p>
                        </div>

                        {/* Desktop compare checkbox */}
                        <div className='hidden md:flex flex-col items-center gap-1 ml-2'>
                          <CompareBadge vehicleId={vehicle.id} />
                          <span className='text-[10px] text-zinc-600'>Compare</span>
                        </div>
                      </div>

                      <div className='mt-4 grid grid-cols-3 gap-2'>
                        <div className='rounded-xl border border-zinc-800 bg-black p-3 text-center'>
                          <Fuel size={16} className='mx-auto text-indigo-800' />
                          <p className='mt-1 text-[11px] text-zinc-500'>Fuel</p>
                          <p className='mt-0.5 text-xs font-semibold text-white truncate'>
                            {vehicle.fuelType}
                          </p>
                        </div>

                        <div className='rounded-xl border border-zinc-800 bg-black p-3 text-center'>
                          <Gauge size={16} className='mx-auto text-indigo-800' />
                          <p className='mt-1 text-[11px] text-zinc-500'>Mileage</p>
                          <p className='mt-0.5 text-xs font-semibold text-white truncate'>
                            {vehicle.mileage}
                          </p>
                        </div>

                        <div className='rounded-xl border border-zinc-800 bg-black p-3 text-center'>
                          <Settings2 size={16} className='mx-auto text-indigo-800' />
                          <p className='mt-1 text-[11px] text-zinc-500'>Gearbox</p>
                          <p className='mt-0.5 text-xs font-semibold text-white truncate'>
                            {vehicle.transmission}
                          </p>
                        </div>
                      </div>

                      <div className='mt-4 flex h-11 items-center justify-center rounded-xl bg-[#2B3494] font-semibold text-white transition group-hover:bg-indigo-800'>
                        View Details
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}