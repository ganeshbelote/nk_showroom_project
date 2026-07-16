'use client'

import { useState } from 'react'
import { Upload, Loader2 } from 'lucide-react'
import { toast } from '@/components/Toast'

interface Props {
  image: string
  onChange: (url: string) => void
}

export default function ImageUploader({
  image,
  onChange,
}: Props) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'carousel')

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        toast.error(data.message || 'Upload failed')
        return
      }

      onChange(data.image.url)
      toast.success('Image uploaded')
    } catch {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div>

      <label className="mb-3 block text-sm text-zinc-300">
        Hero Image
      </label>

      <label className="group relative flex h-44 w-full cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-zinc-700 bg-black transition hover:border-indigo-800 sm:h-56 lg:h-80">

        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={36} className="animate-spin text-indigo-500" />
            <p className="text-sm text-zinc-400">Uploading...</p>
          </div>
        ) : image ? (
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="text-center">
            <Upload
              size={36}
              className="mx-auto text-zinc-500 sm:size-[42px]"
            />
            <p className="mt-4 px-4 text-center text-base text-white sm:text-lg">
              Upload Hero Image
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              JPG • PNG • WEBP
            </p>
          </div>
        )}

        {!uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100">
            <div className="rounded-xl bg-[#2B3494] px-5 py-2 text-sm text-white sm:px-6 sm:py-3">
              {image ? 'Change Image' : 'Upload'}
            </div>
          </div>
        )}

        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
        />

      </label>

    </div>
  )
}
