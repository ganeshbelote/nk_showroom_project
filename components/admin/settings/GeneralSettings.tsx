'use client'

import { Upload } from 'lucide-react'

export default function GeneralSettings() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 lg:p-8">

      <h2 className="mb-8 text-2xl font-semibold text-white">
        General Settings
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">

        <Input
          label="Showroom Name"
          placeholder="NK Car Showroom"
        />

        <Input
          label="Tagline"
          placeholder="Drive Your Dream"
        />

      </div>

      <div className="mt-6">

        <label className="mb-2 block text-zinc-300">
          Footer Copyright
        </label>

        <textarea
          rows={3}
          placeholder="© 2026 NK Car Showroom. All Rights Reserved."
          className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition focus:border-indigo-800"
        />

      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">

        <UploadCard title="Website Logo" />

        <UploadCard title="Favicon" />

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
}: {
  label: string
  placeholder: string
}) {
  return (
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

function UploadCard({
  title
}: {
  title: string
}) {
  return (
    <div>

      <label className="mb-3 block text-zinc-300">
        {title}
      </label>

      <label className="flex h-56 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-700 bg-black transition hover:border-indigo-800">

        <Upload
          size={46}
          className="text-zinc-500"
        />

        <p className="mt-4 text-white">
          Click to Upload
        </p>

        <span className="mt-1 text-sm text-zinc-500">
          PNG • SVG • WEBP
        </span>

        <input
          hidden
          type="file"
        />

      </label>

    </div>
  )
}