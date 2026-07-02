'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ImagePlus, Star, Trash2 } from 'lucide-react'
import { useRef, useState, ChangeEvent } from 'react'

type UploadedImage = {
  file: File
  url: string
  cover: boolean
}

export default function ImageUploader() {
  const inputRef = useRef<HTMLInputElement>(null)

  const [images, setImages] = useState<UploadedImage[]>([])

  const handleUpload = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || [])

    const uploaded = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      cover: false
    }))

    setImages(prev => [...prev, ...uploaded])

    e.target.value = ''
  }

  function removeImage(index: number) {
    URL.revokeObjectURL(images[index].url)

    setImages(prev => prev.filter((_, i) => i !== index))
  }

  function setCover(index: number) {
    setImages(prev =>
      prev.map((img, i) => ({
        ...img,
        cover: i === index
      }))
    )
  }

  return (
    <section className="space-y-8">

      {/* Upload Box */}

      <div
        onClick={() => inputRef.current?.click()}
        className="group flex h-52 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-700 bg-black px-6 text-center transition hover:border-indigo-800 sm:h-60"
      >

        <ImagePlus
          size={48}
          className="text-zinc-500 transition group-hover:text-indigo-800 sm:size-14"
        />

        <p className="mt-4 text-lg font-medium text-zinc-300 sm:text-xl">
          Click to Upload Images
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          JPG • PNG • WEBP
        </p>

        <input
          hidden
          multiple
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />

      </div>

      {/* Gallery */}

      <AnimatePresence mode="popLayout">

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {images.map((img, index) => (

            <motion.div
              key={img.url}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
            >

              <Image
                src={img.url}
                alt="Vehicle"
                width={600}
                height={450}
                className="h-56 w-full object-cover"
              />

              {/* Hover Overlay */}

              <div className="absolute inset-0 bg-black/70 opacity-0 transition duration-300 group-hover:opacity-100">

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">

                  <button
                    type="button"
                    onClick={() => setCover(index)}
                    className={`rounded-xl p-3 transition ${
                      img.cover
                        ? 'bg-[#2B3494]'
                        : 'bg-zinc-800 hover:bg-[#2B3494]'
                    }`}
                  >
                    <Star
                      size={18}
                      className="text-white"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="rounded-xl bg-red-600 p-3 transition hover:bg-red-500"
                  >
                    <Trash2
                      size={18}
                      className="text-white"
                    />
                  </button>

                </div>

              </div>

              {/* Cover Badge */}

              {img.cover && (
                <div className="absolute left-4 top-4 rounded-full bg-[#2B3494] px-3 py-1 text-xs font-semibold text-white shadow-lg">
                  Cover Image
                </div>
              )}

            </motion.div>

          ))}

        </div>

      </AnimatePresence>

    </section>
  )
}