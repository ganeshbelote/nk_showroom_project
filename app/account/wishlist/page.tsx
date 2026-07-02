'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Fuel, Gauge, Settings2, Trash2, ArrowRight } from 'lucide-react'

const wishlist = [
  {
    id: 1,
    slug: 'brezza',
    name: 'Maruti Brezza',
    image: '/cars/brezza.webp',
    price: '₹8.69 Lakh',
    fuel: 'Petrol',
    mileage: '19.8 kmpl',
    transmission: 'Automatic'
  },
  {
    id: 2,
    slug: 'fronx',
    name: 'Maruti Fronx',
    image: '/cars/fronx.webp',
    price: '₹7.52 Lakh',
    fuel: 'Petrol',
    mileage: '21.5 kmpl',
    transmission: 'Manual'
  },
  {
    id: 3,
    slug: 'grand-vitara',
    name: 'Grand Vitara',
    image: '/cars/grand-vitara.webp',
    price: '₹11.42 Lakh',
    fuel: 'Hybrid',
    mileage: '27.9 kmpl',
    transmission: 'Automatic'
  }
]

export default function WishlistPage () {
  return (
    <main className='mx-auto max-w-7xl px-4 py-8 md:px-8'>
      {/* Header */}

      <div className='mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white'>My Wishlist</h1>

          <p className='mt-2 text-zinc-400'>Vehicles you've saved for later.</p>
        </div>

        <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2B3494]'>
          <Heart className='fill-white text-white' size={24} />
        </div>
      </div>

      {/* Cards */}

      <div className='grid gap-6 lg:grid-cols-2'>
        {wishlist.map(car => (
          <div
            key={car.id}
            className='overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 transition hover:border-[#2B3494]'
          >
            <div className='relative h-56'>
              <Image
                src={car.image}
                alt={car.name}
                fill
                className='object-cover'
              />

              <button className='absolute right-4 top-4 rounded-full bg-black/80 p-3 transition hover:bg-red-600'>
                <Trash2 size={18} className='text-white' />
              </button>
            </div>

            <div className='p-6'>
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <h2 className='text-2xl font-bold text-white'>{car.name}</h2>

                  <p className='mt-2 text-2xl font-semibold text-indigo-800'>
                    {car.price}
                  </p>
                </div>
              </div>

              <div className='mt-6 grid grid-cols-3 gap-3'>
                <div className='rounded-xl border border-zinc-800 bg-black p-4 text-center'>
                  <Fuel size={20} className='mx-auto text-indigo-800' />

                  <p className='mt-2 text-xs text-zinc-500'>Fuel</p>

                  <p className='mt-1 text-sm font-semibold text-white'>
                    {car.fuel}
                  </p>
                </div>

                <div className='rounded-xl border border-zinc-800 bg-black p-4 text-center'>
                  <Gauge size={20} className='mx-auto text-indigo-800' />

                  <p className='mt-2 text-xs text-zinc-500'>Mileage</p>

                  <p className='mt-1 text-sm font-semibold text-white'>
                    {car.mileage}
                  </p>
                </div>

                <div className='rounded-xl border border-zinc-800 bg-black p-4 text-center'>
                  <Settings2 size={20} className='mx-auto text-indigo-800' />

                  <p className='mt-2 text-xs text-zinc-500'>Gearbox</p>

                  <p className='mt-1 text-sm font-semibold text-white'>
                    {car.transmission}
                  </p>
                </div>
              </div>

              <Link
                href={`/cars/${car.slug}`}
                className='mt-6 flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2B3494] font-semibold text-white transition hover:bg-indigo-800'
              >
                View Details
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (show when wishlist.length === 0) */}

      {/*

      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-700">

        <Heart
          size={60}
          className="text-zinc-600"
        />

        <h2 className="mt-6 text-2xl font-bold text-white">
          Wishlist is Empty
        </h2>

        <p className="mt-2 text-zinc-500">
          Save your favourite cars to compare later.
        </p>

        <Link
          href="/cars"
          className="mt-8 rounded-xl bg-[#2B3494] px-8 py-3 font-semibold text-white hover:bg-indigo-800"
        >
          Browse Cars
        </Link>

      </div>

      */}
    </main>
  )
}
