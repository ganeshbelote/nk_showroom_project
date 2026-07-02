'use client'

import { Upload } from 'lucide-react'

export default function SeoSettings() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 lg:p-8">

      <h2 className="mb-8 text-2xl font-semibold text-white">
        SEO Settings
      </h2>

      <div className="space-y-6">

        <Input
          label="Website Title"
          placeholder="NK Car Showroom"
        />

        <div>

          <label className="mb-2 block text-zinc-300">
            Meta Description
          </label>

          <textarea
            rows={5}
            placeholder="Write a short SEO description..."
            className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition focus:border-indigo-800"
          />

        </div>

        <Input
          label="Keywords"
          placeholder="cars,suv,used cars,luxury cars..."
        />

      </div>

      <div className="mt-8">

        <label className="mb-3 block text-zinc-300">
          Open Graph Image
        </label>

        <label className="flex h-56 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-700 bg-black transition hover:border-indigo-800">

          <Upload size={42} className="text-zinc-500" />

          <p className="mt-4 text-white">
            Upload Preview Image
          </p>

          <span className="text-sm text-zinc-500">
            JPG • PNG • WEBP
          </span>

          <input hidden type="file" />

        </label>

      </div>

      <div className="mt-10 flex justify-end">

        <button className="rounded-2xl bg-[#2B3494] px-8 py-3 font-semibold text-white transition hover:bg-indigo-800">
          Save Changes
        </button>

      </div>

    </div>
  )
}

function Input({
  label,
  placeholder
}:{
  label:string
  placeholder:string
}){

  return(

    <div>

      <label className="mb-2 block text-zinc-300">
        {label}
      </label>

      <input
        placeholder={placeholder}
        className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition focus:border-indigo-800"
      />

    </div>

  )

}