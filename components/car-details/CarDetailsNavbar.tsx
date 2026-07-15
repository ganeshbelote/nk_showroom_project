'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Heart, Share2, Phone } from 'lucide-react'
import { toast } from '@/components/Toast'

interface Props {
  carName: string
  vehicleId: string
}

export default function CarDetailsNavbar ({ carName, vehicleId }: Props) {
  const router = useRouter()
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
          title: carName,
          text: `Check out ${carName}`,
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
  }, [carName])

  return (
    <header className='-mx-4 w-screen lg:w-full sticky top-0 z-50 mb-8 border-b border-zinc-800 bg-black/80 backdrop-blur-xl rounded-b-2xl '>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8'>
        {/* Left */}

        <div className='flex items-center gap-4'>
          <Link
            href='/'
            className='rounded-xl border border-zinc-700 p-3 transition hover:border-indigo-800'
          >
            <ArrowLeft size={20} className='text-white' />
          </Link>

          <div>
            <h1 className='text-lg font-semibold text-white md:text-2xl'>
              {carName}
            </h1>

            <p className='hidden text-sm text-zinc-500 sm:block'>
              Vehicle Details
            </p>
          </div>
        </div>

        {/* Right */}

        <div className='flex items-center gap-3'>
          <button
            onClick={toggleWishlist}
            disabled={wishlistLoading || wishlistCheckLoading}
            className={`hidden items-center gap-2 rounded-xl border px-5 py-3 text-white transition md:flex ${
              isWishlisted
                ? 'border-red-500 text-red-500 hover:bg-red-500/10'
                : 'border-zinc-700 hover:border-indigo-800'
            } disabled:opacity-50`}
          >
            <Heart
              size={18}
              className={isWishlisted ? 'fill-red-500' : ''}
            />
            Wishlist
          </button>

          <button
            onClick={handleShare}
            className='rounded-xl border border-zinc-700 p-3 text-white transition hover:border-indigo-800'
          >
            <Share2 size={18} />
          </button>

          <Link
            href='/dealer'
            className='rounded-xl bg-[#2B3494] px-4 py-3 text-white transition hover:bg-indigo-800 md:px-6'
          >
            <span className='hidden md:inline'>Contact Dealer</span>

            <Phone size={18} className='md:hidden' />
          </Link>
        </div>
      </div>
    </header>
  )
}