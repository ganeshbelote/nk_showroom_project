'use client'

import { Upload } from 'lucide-react'

interface Props {
  image: string
  onChange: (url: string) => void
}

export default function ImageUploader({
  image,
  onChange,
}: Props) {
  return (
    <div>

      <label className="mb-3 block text-sm text-zinc-300">
        Hero Image
      </label>

      <label className="group relative flex h-44 w-full cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-zinc-700 bg-black transition hover:border-indigo-800 sm:h-56 lg:h-80">

        {image ? (
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

        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100">

          <div className="rounded-xl bg-[#2B3494] px-5 py-2 text-sm text-white sm:px-6 sm:py-3">
            Change Image
          </div>

        </div>

        <input
          hidden
          type="file"
          accept="image/*"
          onChange={e => {
            const file = e.target.files?.[0]
            if (!file) return

            onChange(URL.createObjectURL(file))
          }}
        />

      </label>

    </div>
  )
}