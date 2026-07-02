'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import CarouselList from '@/components/admin/carousel/CarouselList'
import CarouselEditor from '@/components/admin/carousel/CarouselEditor'

export interface CarouselItem {
  id: number
  title: string
  subtitle: string
  price: string
  button: string
  image: string
}

export default function CarouselPage () {
  const [slides, setSlides] = useState<CarouselItem[]>([
    {
      id: 1,
      title: 'Mahindra XUV700',
      subtitle: 'Luxury Meets Performance',
      price: '₹19.49 Lakh',
      button: 'Explore',
      image: '/cars/car1.webp'
    }
  ])

  const [selected, setSelected] = useState(0)

  const addSlide = () => {
    setSlides(prev => [
      ...prev,
      {
        id: Date.now(),
        title: 'New Vehicle',
        subtitle: '',
        price: '',
        button: 'Explore',
        image: '/cars/car1.webp'
      }
    ])

    setSelected(slides.length)
  }

  return (
    <div className='space-y-6'>
      {/* Header */}

      <div className='p-5 lg:p-0 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='min-w-0'>
          <h1 className='text-2xl font-bold text-white sm:text-3xl lg:text-4xl'>
            Carousel Manager
          </h1>

          <p className='mt-2 text-sm text-zinc-400 sm:text-base'>
            Manage Hero Section Slides
          </p>
        </div>

        <button
          onClick={addSlide}
          className='flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2B3494] px-5 text-sm font-medium text-white transition hover:bg-indigo-800 sm:h-12 sm:w-auto'
        >
          <Plus size={18} />
          Add Slide
        </button>
      </div>

      {/* Content */}

      <div className='grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)] overflow-hidden'>
        <CarouselList
          slides={slides}
          selected={selected}
          setSelected={setSelected}
          setSlides={setSlides}
        />

        <CarouselEditor
          slides={slides}
          selected={selected}
          setSlides={setSlides}
        />
      </div>
    </div>
  )
}
