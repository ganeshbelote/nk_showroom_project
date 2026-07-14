'use client'

import Carousel from '@/components/Carousel'
import ConsultantSection from '@/components/ConsultantSection'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Popup from '@/components/Popup'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import { BackgroundBeams } from '@/components/ui/background-beams'
import VehicleShowcase from '@/components/VehicleShowcase'
import WhyChooseMaruti from '@/components/WhyChooseMaruti'
import { apiFetch } from '@/lib/apiFetch'
import { useEffect, useState } from 'react'

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

type VehiclesResponse = {
  success: boolean
  vehicles: Vehicle[]
}

export default function Home ({}) {
  const [showPopup, setShowPopup] = useState(false)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await apiFetch<VehiclesResponse>('/api/vehicles')
        setVehicles(data.vehicles)
      } catch (err) {
        console.error(err)
      }
    }

    loadVehicles()
  }, [])

  return (
    <div className='relative w-full'>
      <div className='relative min-h-screen overflow-hidden'>
        <BackgroundBeams className='absolute inset-0' />

        <div className='relative z-10'>
          <Navbar setShowPopup={setShowPopup} />
          <Carousel />
        </div>
      </div>
      {showPopup && (
        <div className='z-50 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800/50'>
          <Popup showPopup={showPopup} setShowPopup={setShowPopup} />
        </div>
      )}
      <VehicleShowcase vehicles={vehicles} />
      <WhyChooseMaruti />
      <ConsultantSection />
      <TestimonialsCarousel />
      <Footer />
    </div>
  )
}
