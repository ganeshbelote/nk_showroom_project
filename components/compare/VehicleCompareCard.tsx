'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

type Vehicle = {
  id: string
  name: string
  slug: string
  basePrice: number
  mileage: string
  engine: string
  power: string
  torque: string
  transmission: string
  fuelType: string
  bodyType: string
  seatingCapacity: number
  groundClearance: string
  bootSpace: string
  fuelTank: string
  description: string
  images: { imageUrl: string; isCover: boolean }[]
  variants: { name: string; price: string; fuel: string; transmission: string }[]
  features: { name: string }[]
  _count?: { reviews: number }
}

type Props = {
  vehicle: Vehicle
  index: number
  total: number
}

export default function VehicleCompareCard ({ vehicle, index, total }: Props) {
  const coverImage = vehicle.images.find(i => i.isCover)?.imageUrl ||
    vehicle.images[0]?.imageUrl || '/placeholder.png'
  const price = `₹${Number(vehicle.basePrice).toLocaleString('en-IN')}`
  const lowVariant = vehicle.variants.reduce((min, v) =>
    Number(v.price) < Number(min.price) ? v : min, vehicle.variants[0])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className='flex-shrink-0 w-[85vw] md:w-auto rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden'
    >
      {/* Image */}
      <div className='relative h-48 md:h-56 bg-black'>
        <Image
          src={coverImage}
          alt={vehicle.name}
          fill
          className='object-contain p-4'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent' />
      </div>

      {/* Price */}
      <div className='px-4 pt-4 pb-2'>
        <div className='flex items-start justify-between'>
          <div>
            <h3 className='text-lg font-bold text-white'>{vehicle.name}</h3>
            {lowVariant && (
              <p className='text-xs text-zinc-500 mt-0.5'>{lowVariant.name} variant</p>
            )}
          </div>
          <div className='text-right'>
            <p className='text-xl font-bold text-white'>{price}</p>
            <p className='text-[10px] text-zinc-500'>Ex-showroom</p>
          </div>
        </div>

        {vehicle._count && (
          <div className='flex items-center gap-1 mt-1'>
            <Star size={12} className='text-yellow-500 fill-yellow-500' />
            <span className='text-xs text-zinc-500'>{vehicle._count.reviews} reviews</span>
          </div>
        )}
      </div>

      {/* Specs grid */}
      <div className='px-4 pb-4 grid grid-cols-2 gap-2 text-xs'>
        <SpecItem label='Mileage' value={vehicle.mileage} />
        <SpecItem label='Engine' value={vehicle.engine} />
        <SpecItem label='Power' value={vehicle.power} />
        <SpecItem label='Torque' value={vehicle.torque} />
        <SpecItem label='Transmission' value={vehicle.transmission} />
        <SpecItem label='Fuel' value={vehicle.fuelType} />
        <SpecItem label='Body' value={vehicle.bodyType} />
        <SpecItem label='Seats' value={`${vehicle.seatingCapacity}`} />
        <SpecItem label='Ground Clearance' value={vehicle.groundClearance} />
        <SpecItem label='Boot Space' value={vehicle.bootSpace} />
        <SpecItem label='Fuel Tank' value={vehicle.fuelTank} />
      </div>
    </motion.div>
  )
}

function SpecItem ({ label, value }: { label: string; value: string }) {
  return (
    <div className='rounded-lg border border-zinc-800 bg-black/60 px-2.5 py-2'>
      <p className='text-[10px] text-zinc-500'>{label}</p>
      <p className='text-xs font-medium text-white truncate'>{value || '—'}</p>
    </div>
  )
}