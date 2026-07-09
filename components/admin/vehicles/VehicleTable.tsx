'use client'

import Image from 'next/image'
import { Pencil, Trash2, Search, Plus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

type Vehicle = {
  id: string
  name: string
  slug: string

  basePrice: number

  featured: boolean
  published: boolean

  transmission: string
  fuelType: string

  images: {
    imageUrl: string
    isCover: boolean
  }[]
}

export default function VehicleTable () {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  const fetchVehicles = async () => {
    try {
      const res = await fetch('/api/vehicles')

      const data = await res.json()

      if (!res.ok) return

      setVehicles(data.vehicles)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  return (
    <section className='space-y-8'>
      {/* Header */}

      <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
        <h2 className='text-2xl font-bold text-white lg:text-3xl'>Vehicles</h2>

        <div className='flex flex-col gap-3 sm:flex-row'>
          <div className='relative flex-1'>
            <Search
              size={18}
              className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500'
            />

            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder='Search vehicle...'
              className='w-full rounded-xl border border-zinc-700 bg-black py-3 pl-11 pr-4 text-white outline-none focus:border-[#2B3494]'
            />
          </div>

          <button
            className='flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2B3494] px-5 font-medium text-white transition hover:bg-indigo-800'
            onClick={() => router.push('/admin/vehicles')}
          >
            <Plus size={18} />
            Add Vehicle
          </button>
        </div>
      </div>

      {/* Desktop Table */}

      <div className='hidden overflow-x-auto lg:block'>
        <table className='min-w-full'>
          <thead>
            <tr className='border-b border-zinc-800 text-left text-zinc-400'>
              <th className='py-4'>Vehicle</th>
              <th>Price</th>
              <th>Fuel</th>
              <th>Transmission</th>
              <th>Featured</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map(vehicle => (
              <tr
                key={vehicle.id}
                className='border-b border-zinc-800 transition hover:bg-zinc-950'
              >
                <td className='py-5'>
                  <div className='flex items-center gap-4'>
                    <Image
                      src={
                        vehicle.images.find(img => img.isCover)?.imageUrl ||
                        '/placeholder.png'
                      }
                      alt={vehicle.name}
                      width={90}
                      height={60}
                      className='rounded-xl'
                    />

                    <div>
                      <p className='font-semibold text-white'>{vehicle.name}</p>

                      <p className='text-sm text-zinc-500'>#{vehicle.id}</p>
                    </div>
                  </div>
                </td>

                <td>₹{Number(vehicle.basePrice).toLocaleString('en-IN')}</td>

                <td>{vehicle.fuelType}</td>

                <td>{vehicle.transmission}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-sm text-white ${
                      vehicle.featured ? 'bg-[#2B3494]' : 'bg-zinc-700'
                    }`}
                  >
                    {vehicle.featured ? 'Featured' : 'Normal'}
                  </span>
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-sm text-white ${
                      vehicle.published ? 'bg-green-600' : 'bg-red-600'
                    }`}
                  >
                    {vehicle.published ? 'Published' : 'Draft'}
                  </span>
                </td>

                <td>
                  <div className='flex gap-2'>
                    <button className='rounded-lg bg-zinc-800 p-3 hover:bg-[#2B3494]'>
                      <Pencil size={18} className='text-white' />
                    </button>

                    <button className='rounded-lg bg-zinc-800 p-3 hover:bg-red-600'>
                      <Trash2 size={18} className='text-white' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}

      <div className='grid gap-5 lg:hidden'>
        {vehicles.map(vehicle => (
          <div
            key={vehicle.id}
            className='rounded-2xl border border-zinc-800 bg-zinc-950 p-4'
          >
            <div className='flex gap-4'>
              <Image
                src={
                  vehicle.images.find(img => img.isCover)?.imageUrl ||
                  '/placeholder.png'
                }
                alt={vehicle.name}
                width={110}
                height={75}
                className='rounded-xl'
              />

              <div className='flex-1'>
                <h3 className='font-semibold text-white'>{vehicle.name}</h3>

                <p className='text-sm text-zinc-500'>#{vehicle.id}</p>

                <p className='mt-2 text-lg font-bold text-white'>
                  ₹{Number(vehicle.basePrice).toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <div className='mt-5 grid grid-cols-2 gap-4 text-sm'>
              <div>
                <p className='text-zinc-500'>Fuel</p>

                <p className='text-white'>{vehicle.fuelType}</p>
              </div>

              <div>
                <p className='text-zinc-500'>Transmission</p>

                <p className='text-white'>{vehicle.transmission}</p>
              </div>
            </div>

            <div className='mt-5 flex flex-wrap gap-2'>
              <span
                className={`rounded-full px-3 py-1 text-xs text-white ${
                  vehicle.featured ? 'bg-[#2B3494]' : 'bg-zinc-700'
                }`}
              >
                {vehicle.featured ? 'Featured' : 'Normal'}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs text-white ${
                  vehicle.published ? 'bg-green-600' : 'bg-red-600'
                }`}
              >
                {vehicle.published ? 'Published' : 'Draft'}
              </span>
            </div>

            <div className='mt-5 flex justify-end gap-3'>
              <button className='rounded-lg bg-zinc-800 p-3 hover:bg-[#2B3494]'>
                <Pencil size={18} className='text-white' />
              </button>

              <button className='rounded-lg bg-zinc-800 p-3 hover:bg-red-600'>
                <Trash2 size={18} className='text-white' />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
