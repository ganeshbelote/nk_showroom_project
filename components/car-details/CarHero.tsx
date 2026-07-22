'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Star,
  Heart,
  Share2,
  Fuel,
  Gauge,
  Settings2,
  Users
} from 'lucide-react'
import { toast } from '@/components/Toast'

interface Car {
  name: string
  description: string
  price: string
  rating: number
  reviews: number

  fuelType: string
  mileage: string
  transmission: string
  seatingCapacity: number

  images: {
    imageUrl: string
    isCover: boolean
  }[]
}

interface Props {
  car: Car
  vehicleId: string
}

export default function CarHero ({ car, vehicleId }: Props) {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(
    car.images.find(img => img.isCover)?.imageUrl ??
      car.images[0]?.imageUrl ??
      '/placeholder.png'
  )
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [wishlistLoading, setWishlistLoading] = useState(false)
  const [wishlistCheckLoading, setWishlistCheckLoading] = useState(true)

  // Check if vehicle is already in wishlist on mount
  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const res = await fetch(`/api/wishlist?vehicleId=${vehicleId}`, {
          credentials: 'include'
        })
        const data = await res.json()
        if (data.success) {
          setIsWishlisted(data.isWishlisted)
        }
      } catch (err) {
        console.error('Failed to check wishlist:', err)
      } finally {
        setWishlistCheckLoading(false)
      }
    }

    checkWishlist()
  }, [vehicleId])

  const toggleWishlist = useCallback(async () => {
    // If not logged in, redirect to login
    try {
      const meRes = await fetch('/api/auth/me', { credentials: 'include' })
      const meData = await meRes.json()
      if (!meData.success) {
        router.push('/auth/login')
        return
      }
    } catch {
      router.push('/auth/login')
      return
    }

    setWishlistLoading(true)

    try {
      if (isWishlisted) {
        const res = await fetch(`/api/wishlist?vehicleId=${vehicleId}`, {
          method: 'DELETE',
          credentials: 'include'
        })
        const data = await res.json()
        if (data.success) {
          setIsWishlisted(false)
          toast.success('Removed from wishlist')
        }
      } else {
        const res = await fetch('/api/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ vehicleId }),
          credentials: 'include'
        })
        const data = await res.json()
        if (data.success) {
          setIsWishlisted(true)
          toast.success('Added to wishlist')
        }
      }
    } catch (err) {
      console.error('Wishlist toggle failed:', err)
      toast.error('Something went wrong')
    } finally {
      setWishlistLoading(false)
    }
  }, [isWishlisted, vehicleId, router])

  const handleShare = useCallback(async () => {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title: car.name,
          text: `Check out ${car.name} - ${car.price}`,
          url
        })
      } catch {
        // User cancelled share dialog
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        toast.success('Link copied to clipboard')
      } catch {
        toast.error('Failed to copy link')
      }
    }
  }, [car.name, car.price])

  return (
    <section className='m-8 grid gap-12 lg:grid-cols-2'>
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
          {car.images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img.imageUrl)}
              className={`overflow-hidden rounded-xl border-2 transition ${
                selectedImage === img.imageUrl
                  ? 'border-[#2B3494]'
                  : 'border-zinc-700'
              }`}
            >
              <Image
                src={img.imageUrl}
                alt={car.name}
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

            <span className='font-medium text-white'>
              {car.rating.toFixed(1)}
            </span>

            <span className='text-zinc-400'>({car.reviews} Reviews)</span>
          </div>
        </div>

        <h1 className='mt-5 text-4xl font-bold text-white lg:text-5xl'>
          {car.name}
        </h1>

        <p className='mt-5 leading-8 text-zinc-400'>{car.description}</p>

        <div className='mt-8'>
          <p className='text-sm text-zinc-500'>Starting From</p>

          <h2 className='mt-2 text-5xl font-bold text-indigo-800'>
            {car.price}
          </h2>

          <p className='mt-2 text-zinc-500'>*Ex-showroom Price</p>
        </div>

        <div className='mt-10 grid grid-cols-2 gap-4'>
          <SpecCard
            icon={<Fuel size={20} />}
            title='Fuel'
            value={car.fuelType}
          />

          <SpecCard
            icon={<Gauge size={20} />}
            title='Mileage'
            value={car.mileage}
          />

          <SpecCard
            icon={<Settings2 size={20} />}
            title='Transmission'
            value={car.transmission}
          />

          <SpecCard
            icon={<Users size={20} />}
            title='Seats'
            value={String(car.seatingCapacity)}
          />
        </div>

        <div className='mt-10 flex flex-col gap-4 sm:flex-row'>
          <button
            className='flex-1 rounded-xl bg-[#2B3494] py-4 font-semibold text-white transition hover:bg-indigo-800'
            onClick={() => router.push('/dealer')}
          >
            Book Test Drive
          </button>

          <button
            className='flex-1 rounded-xl border border-zinc-700 py-4 font-semibold text-white transition hover:border-indigo-800'
            onClick={async () => {
              // Check if user is logged in
              try {
                const meRes = await fetch('/api/auth/me', { credentials: 'include' })
                const meData = await meRes.json()
                if (!meData.success) {
                  router.push('/auth/login')
                  return
                }
              } catch {
                router.push('/auth/login')
                return
              }
              // Scroll to on-road price section
              const el = document.getElementById('onroadprice')
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
          >
            Get On-Road Price
          </button>
        </div>

        <div className='mt-8 flex gap-4'>
          <button
            onClick={toggleWishlist}
            disabled={wishlistLoading || wishlistCheckLoading}
            className={`rounded-xl border p-4 transition ${
              isWishlisted
                ? 'border-red-500 text-red-500 hover:bg-red-500/10'
                : 'border-zinc-700 text-zinc-300 hover:border-red-500 hover:text-red-500'
            } disabled:opacity-50`}
          >
            <Heart size={20} className={isWishlisted ? 'fill-red-500' : ''} />
          </button>

          <button
            onClick={handleShare}
            className='rounded-xl border border-zinc-700 p-4 text-zinc-300 transition hover:border-indigo-800 hover:text-indigo-800'
          >
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
      {icon}

      <p className='mt-3 text-sm text-zinc-500'>{title}</p>

      <p className='mt-2 font-semibold text-white'>{value}</p>
    </div>
  )
}
