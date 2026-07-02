'use client'

import { Dispatch, SetStateAction } from 'react'
import ImageUploader from './ImageUploader'
import { CarouselItem } from '@/app/admin/carousel/page'

interface Props {
  slides: CarouselItem[]
  selected: number
  setSlides: Dispatch<SetStateAction<CarouselItem[]>>
}

export default function CarouselEditor({
  slides,
  selected,
  setSlides,
}: Props) {
  const slide = slides[selected]

  if (!slide) return null

  const update = (key: keyof CarouselItem, value: string) => {
    setSlides(prev =>
      prev.map((item, i) =>
        i === selected
          ? {
              ...item,
              [key]: value,
            }
          : item
      )
    )
  }

  return (
    <div className="min-w-0 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-4 sm:p-6 lg:p-8">

      <h2 className="mb-8 text-2xl font-semibold text-white">
        Edit Slide
      </h2>

      <div className="space-y-5">

        <Input
          label="Title"
          value={slide.title}
          onChange={v => update('title', v)}
        />

        <Input
          label="Subtitle"
          value={slide.subtitle}
          onChange={v => update('subtitle', v)}
        />

        <Input
          label="Price"
          value={slide.price}
          onChange={v => update('price', v)}
        />

        <Input
          label="Button Text"
          value={slide.button}
          onChange={v => update('button', v)}
        />

      </div>

      <div className="mt-10">
        <ImageUploader
          image={slide.image}
          onChange={url => update('image', url)}
        />
      </div>

      <div className="mt-10">

        <h3 className="mb-5 text-lg font-semibold text-white sm:text-xl">
          Live Preview
        </h3>

        <div className="relative overflow-hidden rounded-3xl border border-zinc-800">

          <img
            src={slide.image}
            alt=""
            className="h-64 w-full object-cover sm:h-80 lg:h-[420px]"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

          <div className="absolute left-4 top-1/2 max-w-[85%] -translate-y-1/2 sm:left-8 lg:left-10">

            <p className="text-sm text-zinc-300 sm:text-base">
              {slide.subtitle}
            </p>

            <h2 className="mt-2 break-words text-xl font-bold leading-tight text-white sm:text-3xl lg:text-5xl">
              {slide.title}
            </h2>

            <p className="mt-3 break-words text-base font-semibold text-indigo-600 sm:text-xl lg:text-3xl">
              {slide.price}
            </p>

            <button className="mt-5 rounded-xl bg-[#2B3494] px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-800 sm:px-6 sm:py-3">
              {slide.button}
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

interface InputProps {
  label: string
  value: string
  onChange: (v: string) => void
}

function Input({ label, value, onChange }: InputProps) {
  return (
    <div>

      <label className="mb-2 block text-zinc-300">
        {label}
      </label>

      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        className="h-12 w-full rounded-xl border border-zinc-700 bg-black px-4 text-white outline-none transition focus:border-indigo-800"
      />

    </div>
  )
}