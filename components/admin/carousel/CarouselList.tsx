'use client'

import { Dispatch, SetStateAction } from 'react'
import { GripVertical, Trash2 } from 'lucide-react'
import { CarouselItem } from '@/app/admin/carousel/page'

interface Props {
  slides: CarouselItem[]
  selected: number
  setSelected: Dispatch<SetStateAction<number>>
  onDelete: (id: string) => Promise<void>
}

export default function CarouselList({
  slides,
  selected,
  setSelected,
  onDelete,
}: Props) {
  if (slides.length === 0) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4 sm:p-6">
        <h2 className="mb-6 text-xl font-semibold text-white">Slides</h2>
        <p className="text-zinc-500 text-center py-8">No slides yet. Add one!</p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4 sm:p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">Slides</h2>

      <div className="space-y-4">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => setSelected(index)}
            className={`cursor-pointer rounded-2xl border transition ${
              selected === index
                ? 'border-indigo-800 bg-zinc-800'
                : 'border-zinc-700 bg-black hover:border-zinc-500'
            }`}
          >
            <div className="flex items-center gap-3 p-3">
              <GripVertical
                size={18}
                className="hidden shrink-0 text-zinc-500 sm:block"
              />

              <img
                src={slide.image}
                alt={slide.title}
                className="h-14 w-20 shrink-0 rounded-xl object-cover sm:h-20 sm:w-32"
              />

              <div className="min-w-0 flex-1 overflow-hidden">
                <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                  {slide.title}
                </h3>
                <p className="mt-1 truncate text-xs text-zinc-400 sm:text-sm">
                  {slide.price}
                </p>
              </div>

              <button
                onClick={e => {
                  e.stopPropagation()
                  onDelete(slide.id)
                }}
                className="rounded-lg p-2 text-red-500 transition hover:bg-red-500/10"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}