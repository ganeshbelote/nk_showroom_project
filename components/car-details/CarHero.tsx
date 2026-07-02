'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Star,
  Heart,
  Share2,
  Fuel,
  Gauge,
  Settings2,
  Users
} from 'lucide-react'

interface Spec {
  label: string
  value: string
}

interface Car {
  name: string
  description: string
  price: string
  rating: number
  reviews: number
  image: string
  specs: Spec[]
}

interface Props {
  car: Car
}

export default function CarHero ({ car }: Props) {
  const [selectedImage] = useState(car.image)

  return (
    <section className='grid gap-10 lg:grid-cols-2'>
      {/* LEFT */}

      <div>
        <div className='overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950'>
          <Image
            src={selectedImage}
            alt={car.name}
            width={900}
            height={600}
            className='aspect-16/10 w-full object-cover'
          />
        </div>

        <div className='mt-4 grid grid-cols-4 gap-3'>
          {[1, 2, 3, 4].map(item => (
            <button
              key={item}
              className='overflow-hidden rounded-xl border-2 border-[#2B3494]'
            >
              <Image
                src={car.image}
                alt=''
                width={200}
                height={150}
                className='aspect-video w-full object-cover'
              />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT */}

      <div>
        <div className='flex flex-wrap items-center gap-3'>
          <span className='rounded-full bg-[#2B3494] px-4 py-1 text-sm text-white'>
            New
          </span>

          <div className='flex items-center gap-1'>
            <Star size={18} fill='#facc15' className='text-yellow-400' />

            <span className='font-medium text-white'>{car.rating}</span>

            <span className='text-zinc-400'>({car.reviews} Reviews)</span>
          </div>
        </div>

        <h1 className='mt-5 text-4xl font-bold text-white lg:text-5xl'>
          {car.name}
        </h1>

        <p className='mt-5 leading-8 text-zinc-400'>{car.description}</p>

        <div className='mt-8'>
          <p className='text-sm text-zinc-500'>Starting From</p>

          <h2 className='mt-2 text-5xl font-bold text-indigo-800'>{car.price}</h2>

          <p className='mt-2 text-zinc-500'>*Ex-showroom Price</p>
        </div>

        <div className='mt-10 grid grid-cols-2 gap-4'>
          <SpecCard
            icon={<Fuel size={20} />}
            title='Fuel'
            value={car.specs.find(s => s.label === 'Fuel Type')?.value || '-'}
          />

          <SpecCard
            icon={<Gauge size={20} />}
            title='Mileage'
            value={car.specs.find(s => s.label === 'Mileage')?.value || '-'}
          />

          <SpecCard
            icon={<Settings2 size={20} />}
            title='Transmission'
            value={
              car.specs.find(s => s.label === 'Transmission')?.value || '-'
            }
          />

          <SpecCard
            icon={<Users size={20} />}
            title='Seats'
            value={car.specs.find(s => s.label === 'Seats')?.value || '-'}
          />
        </div>

        <div className='mt-10 flex flex-col gap-4 sm:flex-row'>
          <button className='flex-1 rounded-xl bg-[#2B3494] py-4 font-semibold text-white transition hover:bg-indigo-800'>
            Book Test Drive
          </button>

          <button className='flex-1 rounded-xl border border-zinc-700 py-4 font-semibold text-white transition hover:border-indigo-800'>
            Get On-Road Price
          </button>
        </div>

        <div className='mt-8 flex gap-4'>
          <button className='rounded-xl border border-zinc-700 p-4 text-zinc-300 transition hover:border-red-500 hover:text-red-500'>
            <Heart size={20} />
          </button>

          <button className='rounded-xl border border-zinc-700 p-4 text-zinc-300 transition hover:border-indigo-800 hover:text-indigo-800'>
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}

function SpecCard ({
  icon,
  title,
  value
}: {
  icon: React.ReactNode
  title: string
  value: string
}) {
  return (
    <div className='rounded-2xl border border-zinc-800 bg-zinc-950 p-5'>
      <div className='mb-4 inline-flex rounded-xl bg-[#2B3494]/10 p-3 text-indigo-800'>
        {icon}
      </div>

      <p className='text-sm text-zinc-500'>{title}</p>

      <p className='mt-2 font-semibold text-white'>{value}</p>
    </div>
  )
}
