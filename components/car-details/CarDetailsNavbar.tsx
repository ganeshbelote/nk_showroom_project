'use client'

import Link from 'next/link'
import { ArrowLeft, Heart, Share2, Phone } from 'lucide-react'

interface Props {
  carName: string
}

export default function CarDetailsNavbar ({ carName }: Props) {
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
          <button className='hidden items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-white transition hover:border-indigo-800 md:flex'>
            <Heart size={18} />
            Wishlist
          </button>

          <button className='rounded-xl border border-zinc-700 p-3 text-white transition hover:border-indigo-800'>
            <Share2 size={18} />
          </button>

          <button className='rounded-xl bg-[#2B3494] px-4 py-3 text-white transition hover:bg-indigo-800 md:px-6'>
            <span className='hidden md:inline'>Contact Dealer</span>

            <Phone size={18} className='md:hidden' />
          </button>
        </div>
      </div>
    </header>
  )
}
