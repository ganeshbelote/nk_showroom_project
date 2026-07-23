'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Check, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import VehicleCompareCard from '@/components/compare/VehicleCompareCard'
import SpecificationSection from '@/components/compare/SpecificationSection'
import FullPageLoader from '@/components/FullPageLoader'

type Vehicle = {
  id: string
  name: string
  slug: string
  brand: string
  description: string
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
  images: { imageUrl: string; isCover: boolean }[]
  variants: { name: string; price: string; fuel: string; transmission: string }[]
  features: { name: string }[]
  _count?: { reviews: number }
}

function CompareContent () {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  const idsParam = searchParams.get('ids') || ''
  const ids = idsParam.split(',').filter(Boolean)

  useEffect(() => {
    if (ids.length < 2 || ids.length > 3) {
      router.replace('/cars')
      return
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/compare?ids=${idsParam}`)
        const data = await res.json()
        if (data.success) {
          setVehicles(data.vehicles)
        } else {
          router.replace('/cars')
        }
      } catch {
        router.replace('/cars')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [idsParam, router])

  if (loading) return <FullPageLoader message='Loading comparison...' />
  if (vehicles.length < 2) return null

  const commonSpecs = (label: string, extract: (v: Vehicle) => string | number | boolean | null | undefined, highlight?: 'higher' | 'lower') => ({
    label,
    values: vehicles.map(v => extract(v)),
    highlightBest: highlight,
  })

  const boolFeature = (featureName: string) => ({
    label: featureName,
    values: vehicles.map(v => {
      const f = v.features.find(f => f.name.toLowerCase().includes(featureName.toLowerCase()))
      return f ? true : false
    }),
  })

  const specs = [
    commonSpecs('Engine', v => v.engine),
    commonSpecs('Power', v => v.power, 'higher'),
    commonSpecs('Torque', v => v.torque, 'higher'),
    commonSpecs('Transmission', v => v.transmission),
    commonSpecs('Fuel Type', v => v.fuelType),
    commonSpecs('Mileage', v => v.mileage, 'higher'),
    commonSpecs('Seating', v => v.seatingCapacity),
    commonSpecs('Ground Clearance', v => v.groundClearance),
    commonSpecs('Boot Space', v => v.bootSpace),
    commonSpecs('Fuel Tank', v => v.fuelTank),
    commonSpecs('Price', v => `₹${Number(v.basePrice).toLocaleString('en-IN')}`),
  ]

  return (
    <div className='mx-auto max-w-7xl px-4 py-8 md:px-8 space-y-8'>
      {/* Desktop: column layout */}
      <div className='hidden md:grid md:grid-cols-[200px_repeat(auto-fill,minmax(280px,1fr))] gap-4'>
        <div className='space-y-2'>
          <div className='h-56' />
          {specs.map(s => (
            <div key={s.label} className='h-10 flex items-center px-3'>
              <span className='text-xs font-medium text-zinc-500'>{s.label}</span>
            </div>
          ))}
        </div>

        {vehicles.map((v, vi) => (
          <div key={v.id} className='space-y-2'>
            <VehicleCompareCard vehicle={v} index={vi} total={vehicles.length} />
            {specs.map(s => {
              const val = s.values[vi]
              return (
                <div key={s.label} className='h-10 flex items-center rounded-lg px-3 bg-zinc-950/80 border border-zinc-800/50'>
                  <span className='text-sm text-zinc-300'>
                    {typeof val === 'boolean' ? (
                      val ? <Check size={16} className='text-green-500' /> : <X size={16} className='text-red-500/60' />
                    ) : (
                      String(val ?? '—')
                    )}
                  </span>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Mobile: horizontal scroll */}
      <div className='md:hidden'>
        <div className='overflow-x-auto snap-x snap-mandatory scrollbar-hide flex gap-4 pb-4'>
          {vehicles.map((v, vi) => (
            <div key={v.id} className='snap-center'>
              <VehicleCompareCard vehicle={v} index={vi} total={vehicles.length} />
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <SpecificationSection title='Performance' vehicleCount={vehicles.length} rows={[
          commonSpecs('Engine', v => v.engine),
          commonSpecs('Power', v => v.power, 'higher'),
          commonSpecs('Torque', v => v.torque, 'higher'),
          commonSpecs('Transmission', v => v.transmission),
          commonSpecs('Fuel Type', v => v.fuelType),
          commonSpecs('Mileage', v => v.mileage, 'higher'),
        ]} />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <SpecificationSection title='Dimensions & Capacity' vehicleCount={vehicles.length} rows={[
          commonSpecs('Body Type', v => v.bodyType),
          commonSpecs('Seating Capacity', v => v.seatingCapacity, 'higher'),
          commonSpecs('Ground Clearance', v => v.groundClearance, 'higher'),
          commonSpecs('Boot Space', v => v.bootSpace, 'higher'),
          commonSpecs('Fuel Tank', v => v.fuelTank, 'higher'),
        ]} />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <SpecificationSection title='Price' vehicleCount={vehicles.length} rows={[
          commonSpecs('Ex-showroom Price', v => `₹${Number(v.basePrice).toLocaleString('en-IN')}`),
          { label: 'Starting Variant', values: vehicles.map(v => {
            const low = v.variants.reduce((min, c) => Number(c.price) < Number(min.price) ? c : min, v.variants[0])
            return `${low.name} — ₹${Number(low.price).toLocaleString('en-IN')}`
          }), highlightBest: undefined as any },
        ]} />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <SpecificationSection title='Features' vehicleCount={vehicles.length} rows={[
          boolFeature('ABS'), boolFeature('Airbag'), boolFeature('Rear Camera'),
          boolFeature('Parking Sensor'), boolFeature('LED'), boolFeature('Sunroof'),
          boolFeature('Touchscreen'), boolFeature('CarPlay'), boolFeature('Keyless'),
          boolFeature('Push Start'), boolFeature('Cruise Control'), boolFeature('Alloy Wheel'),
        ]} />
      </motion.div>
    </div>
  )
}

export default function ComparePage () {
  return (
    <main className='min-h-screen bg-black'>
      <div className='border-b border-zinc-800 bg-zinc-950/50'>
        <div className='mx-auto max-w-7xl px-4 py-6 md:px-8'>
          <div className='flex items-center gap-4'>
            <Link
              href='/cars'
              className='flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 text-zinc-400 transition hover:border-zinc-500 hover:text-white'
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className='text-2xl font-bold text-white'>Compare Vehicles</h1>
              <Suspense fallback={<p className='text-sm text-zinc-500'>Loading...</p>}>
                <CompareVehicleNames />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<FullPageLoader message='Loading comparison...' />}>
        <CompareContent />
      </Suspense>
    </main>
  )
}

function CompareVehicleNames () {
  const searchParams = useSearchParams()
  const idsParam = searchParams.get('ids') || ''
  return <p className='text-sm text-zinc-500'>Comparing {idsParam.split(',').length} vehicles</p>
}