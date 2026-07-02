'use client'

import { Gauge, Fuel, Cog, Users, Car, ShieldCheck, Check } from 'lucide-react'

interface Props {
  car: {
    mileage: string
    engine: string
    power: string
    torque: string
    transmission: string
    fuel: string
    seats: string
    bodyType: string
    bootSpace: string
    groundClearance: string
    features: string[]
  }
}

export default function CarHighlights ({ car }: Props) {
  const specs = [
    {
      icon: Gauge,
      label: 'Mileage',
      value: car.mileage
    },
    {
      icon: Fuel,
      label: 'Fuel Type',
      value: car.fuel
    },
    {
      icon: Cog,
      label: 'Engine',
      value: car.engine
    },
    {
      icon: ShieldCheck,
      label: 'Power',
      value: car.power
    },
    {
      icon: ShieldCheck,
      label: 'Torque',
      value: car.torque
    },
    {
      icon: Cog,
      label: 'Transmission',
      value: car.transmission
    },
    {
      icon: Users,
      label: 'Seats',
      value: car.seats
    },
    {
      icon: Car,
      label: 'Body Type',
      value: car.bodyType
    },
    {
      icon: Car,
      label: 'Boot Space',
      value: car.bootSpace
    },
    {
      icon: Car,
      label: 'Ground Clearance',
      value: car.groundClearance
    }
  ]

  return (
    <section className='space-y-10 rounded-3xl border border-zinc-800 bg-zinc-950 p-5 md:p-8'>
      <div>
        <h2 className='mb-6 text-2xl font-bold text-white'>Specifications</h2>

        <div className='grid gap-4 sm:grid-cols-2'>
          {specs.map(spec => {
            const Icon = spec.icon

            return (
              <div
                key={spec.label}
                className='flex items-center gap-4 rounded-2xl border border-zinc-800 bg-black p-4'
              >
                <div className='rounded-xl bg-[#2B3494]/20 p-3'>
                  <Icon size={20} className='text-indigo-800' />
                </div>

                <div className='min-w-0'>
                  <p className='text-sm text-zinc-400'>{spec.label}</p>

                  <p className='truncate font-semibold text-white'>
                    {spec.value}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className='mb-6 text-2xl font-bold text-white'>Features</h2>

        <div className='grid gap-3 sm:grid-cols-2'>
          {car.features.map(feature => (
            <div
              key={feature}
              className='flex items-center justify-between rounded-xl border border-zinc-800 bg-black px-5 py-4'
            >
              <span className='text-zinc-200'>{feature}</span>

              <Check size={18} className='text-green-500' />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
