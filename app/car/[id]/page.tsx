'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

import CarHero from '@/components/car-details/CarHero'
import CarHighlights from '@/components/car-details/CarHighlights'
import VariantPricing from '@/components/car-details/VariantPricing'
import CarReviews from '@/components/car-details/CarReviews'
import CompareSuggestion from '@/components/car-details/CompareSuggestion'
import OnRoadPriceSection from '@/components/car-details/OnRoadPriceSection'
import FullPageLoader from '@/components/FullPageLoader'
import CarDetailsNavbar from '@/components/car-details/CarDetailsNavbar'

type Vehicle = {
  id: string
  name: string
  description: string
  basePrice: number
  mileage: string
  petrolMileage: string | null
  cngMileage: string | null
  engine: string
  power: string
  torque: string
  transmission: string
  fuelType: string
  seatingCapacity: number
  bodyType: string
  bootSpace: string
  groundClearance: string
  features: {
    name: string
  }[]

  images: {
    imageUrl: string
    isCover: boolean
  }[]

  variants: {
    id: string
    name: string
    price: string
    fuel: string
    transmission: string
    alternateFuel: string | null
    petrolMileage: string | null
    cngMileage: string | null
    hybridMileage: string | null
    features: string[]
  }[]

  reviews: {
    id: string
    rating: number
    title: string | null
    comment: string
    createdAt: string

    user: {
      fullName: string
      avatar: string | null
    }
  }[]
}

export default function CarDetailsPage () {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchVehicle = async () => {
      try {
        const res = await fetch(`/api/vehicles/${id}`)

        if (!res.ok) {
          router.replace('/404')
          return
        }

        const data = await res.json()

        setVehicle(data.vehicle)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicle()
  }, [id, router])

  if (loading) {
    return <FullPageLoader message='Loading Vehicle...' />
  }

  if (!vehicle) {
    return null
  }

  const avgRating =
    vehicle.reviews.length === 0
      ? 0
      : (
          vehicle.reviews.reduce((sum, r) => sum + r.rating, 0) /
          vehicle.reviews.length
        ).toFixed(1)

  // Build mileage display for highlights
  const mileageDisplay = vehicle.petrolMileage
    ? `Petrol: ${vehicle.petrolMileage}` + (vehicle.cngMileage ? ` | CNG: ${vehicle.cngMileage}` : '')
    : vehicle.mileage

  return (
    <main className='bg-black'>
      <CarDetailsNavbar carName={vehicle.name} vehicleId={vehicle.id} />

      <CarHero
        vehicleId={vehicle.id}
        car={{
          name: vehicle.name,
          description: vehicle.description,
          price: `₹${Number(vehicle.basePrice).toLocaleString('en-IN')}`,
          rating: Number(avgRating),
          reviews: vehicle.reviews.length,

          fuelType: vehicle.fuelType,
          mileage: mileageDisplay,
          transmission: vehicle.transmission,
          seatingCapacity: vehicle.seatingCapacity,

          images: vehicle.images
        }}
      />

      <CarHighlights
        car={{
          mileage: mileageDisplay,
          engine: vehicle.engine,
          power: vehicle.power,
          torque: vehicle.torque,
          transmission: vehicle.transmission,
          fuel: vehicle.fuelType,
          seats: String(vehicle.seatingCapacity),
          bodyType: vehicle.bodyType,
          bootSpace: vehicle.bootSpace,
          groundClearance: vehicle.groundClearance,
          features: vehicle.features.map((f: { name: string }) => f.name)
        }}
      />

      <VariantPricing
        vehicleId={vehicle.id}
        variants={vehicle.variants.map(v => ({
          ...v,
          price: `₹${Number(v.price).toLocaleString('en-IN')}`,
          features: v.features
        }))}
      />

      <div id='onroadprice' className='px-4 md:px-8 pb-8'>
        <OnRoadPriceSection vehicleId={vehicle.id} basePrice={Number(vehicle.basePrice)} />
      </div>

      <CarReviews reviews={vehicle.reviews} />

      <CompareSuggestion
        currentVehicleId={vehicle.id}
        currentVehicleName={vehicle.name}
      />
    </main>
  )
}