'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ImagePlus, Star, Trash2, Sparkles, Loader2 } from 'lucide-react'
import { useRef, useState, ChangeEvent } from 'react'
import { toast } from '@/components/Toast'

type UploadedImage = {
  imageUrl: string
  publicId: string
  isCover: boolean
  order: number
}

type Props = {
  images: UploadedImage[]
  setImages: (images: UploadedImage[]) => void
}

export default function ImageUploader ({ images, setImages }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [removingBg, setRemovingBg] = useState<string | null>(null)

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    if (!files.length) return

    const uploadedImages: UploadedImage[] = []

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData()

      formData.append('file', files[i])
      formData.append('folder', 'vehicles')

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (!res.ok) continue

      uploadedImages.push({
        imageUrl: data.image.url,
        publicId: data.image.publicId,
        isCover: images.length === 0 && i === 0,
        order: images.length + i
      })
    }

    setImages([...images, ...uploadedImages])

    e.target.value = ''
  }

  function removeImage (index: number) {
    setImages(images.filter((_, i) => i !== index))
  }

  function setCover (index: number) {
    setImages(
      images.map((img, i) => ({
        ...img,
        isCover: i === index
      }))
    )
  }

  async function removeBackground (index: number) {
    const img = images[index]
    if (!img) return

    setRemovingBg(img.publicId)

    try {
      const res = await fetch('/api/remove-bg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: img.imageUrl,
          publicId: img.publicId
        })
      })

      const data = await res.json()

      if (!data.success) {
        toast.error(data.message || 'Failed to remove background')
        return
      }

      // Replace the image in the list with the no-bg version
      setImages(
        images.map((im, i) =>
          i === index
            ? { ...im, imageUrl: data.image.url, publicId: data.image.publicId }
            : im
        )
      )

      toast.success('Background removed successfully')
    } catch {
      toast.error('Failed to remove background')
    } finally {
      setRemovingBg(null)
    }
  }
  return (
    <section className='space-y-8'>
      {/* Upload Box */}

      <div
        onClick={() => inputRef.current?.click()}
        className='group flex h-52 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-700 bg-black px-6 text-center transition hover:border-indigo-800 sm:h-60'
      >
        <ImagePlus
          size={48}
          className='text-zinc-500 transition group-hover:text-indigo-800 sm:size-14'
        />

        <p className='mt-4 text-lg font-medium text-zinc-300 sm:text-xl'>
          Click to Upload Images
        </p>

        <p className='mt-2 text-sm text-zinc-500'>JPG • PNG • WEBP</p>

        <input
          hidden
          multiple
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type='file'
          accept='image/*'
          onChange={handleUpload}
        />
      </div>

      {/* Gallery */}

      <AnimatePresence mode='popLayout'>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4'>
          {images.map((img, index) => (
            <motion.div
              key={img.publicId}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className='group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900'
            >
              <Image
                src={img.imageUrl}
                alt='Vehicle'
                width={600}
                height={450}
                className='h-56 w-full object-cover'
              />

              {/* Hover Overlay */}

              <div className='absolute inset-0 bg-black/70 opacity-0 transition duration-300 group-hover:opacity-100'>
                <div className='absolute bottom-4 left-4 right-4 flex items-center justify-between'>
                  {removingBg === img.publicId ? (
                    <div className='rounded-xl bg-indigo-700 p-3'>
                      <Loader2 size={18} className='animate-spin text-white' />
                    </div>
                  ) : (
                    <button
                      type='button'
                      title='Remove background (cover image)'
                      onClick={() => removeBackground(index)}
                      className='rounded-xl bg-zinc-800 p-3 transition hover:bg-indigo-700'
                    >
                      <Sparkles size={18} className='text-white' />
                    </button>
                  )}

                  <button
                    type='button'
                    onClick={() => setCover(index)}
                    className={`rounded-xl p-3 transition ${
                      img.isCover
                        ? 'bg-[#2B3494]'
                        : 'bg-zinc-800 hover:bg-[#2B3494]'
                    }`}
                  >
                    <Star size={18} className='text-white' />
                  </button>

                  <button
                    type='button'
                    onClick={() => removeImage(index)}
                    className='rounded-xl bg-red-600 p-3 transition hover:bg-red-500'
                  >
                    <Trash2 size={18} className='text-white' />
                  </button>
                </div>
              </div>

              {/* Cover Badge */}

              {img.isCover && (
                <div className='absolute left-4 top-4 rounded-full bg-[#2B3494] px-3 py-1 text-xs font-semibold text-white shadow-lg'>
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
