'use client'

import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import CarouselList from '@/components/admin/carousel/CarouselList'
import CarouselEditor from '@/components/admin/carousel/CarouselEditor'
import { toast } from '@/components/Toast'

export interface CarouselItem {
  id: string
  title: string
  subtitle: string
  price: string
  button: string
  image: string
  order: number
  active: boolean
}

export default function CarouselPage () {
  const [slides, setSlides] = useState<CarouselItem[]>([])
  const [selected, setSelected] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchSlides = async () => {
    try {
      const res = await fetch('/api/carousel')
      const data = await res.json()
      if (data.success) {
        setSlides(data.slides)
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to load slides')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSlides()
  }, [])

  const addSlide = async () => {
    try {
      const res = await fetch('/api/carousel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'New Vehicle',
          subtitle: '',
          price: '',
          button: 'Explore',
          image: '/cars/car1.webp'
        })
      })

      const data = await res.json()
      if (data.success) {
        setSlides(prev => [...prev, data.slide])
        setSelected(slides.length)
        toast.success('Slide added')
      }
    } catch {
      toast.error('Failed to add slide')
    }
  }

  const updateSlide = async (id: string, updates: Partial<CarouselItem>) => {
    try {
      const res = await fetch('/api/carousel', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates })
      })

      const data = await res.json()
      if (data.success) {
        setSlides(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
        toast.success('Slide updated')
      }
    } catch {
      toast.error('Failed to update slide')
    }
  }

  const deleteSlide = async (id: string) => {
    try {
      const res = await fetch(`/api/carousel?id=${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setSlides(prev => prev.filter(s => s.id !== id))
        if (selected >= slides.length - 1) {
          setSelected(Math.max(0, slides.length - 2))
        }
        toast.success('Slide deleted')
      }
    } catch {
      toast.error('Failed to delete slide')
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white' />
      </div>
    )
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
          onDelete={deleteSlide}
        />

        <CarouselEditor
          slides={slides}
          selected={selected}
          onUpdate={updateSlide}
        />
      </div>
    </div>
  )
}