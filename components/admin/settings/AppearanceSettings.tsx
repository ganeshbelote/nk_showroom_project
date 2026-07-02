'use client'

import { MoonStar } from 'lucide-react'

export default function AppearanceSettings() {

  return (

    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 lg:p-8">

      <h2 className="mb-8 text-2xl font-semibold text-white">
        Appearance
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">

        <ColorPicker
          title="Primary Color"
          color="#2563eb"
        />

        <ColorPicker
          title="Secondary Color"
          color="#18181b"
        />

      </div>

      <div className="mt-10 space-y-6">

        <Toggle
          title="Dark Mode"
          enabled
        />

        <Toggle
          title="Hero Auto Slide"
          enabled
        />

      </div>

      <div className="mt-10">

        <label className="mb-2 block text-zinc-300">
          Auto Slide Duration
        </label>

        <input
          type="number"
          defaultValue={5}
          className="w-40 rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none focus:border-indigo-800"
        />

      </div>

      <div className="mt-10 flex justify-end">

        <button className="rounded-2xl bg-[#2B3494] px-8 py-3 font-semibold text-white transition hover:bg-indigo-800">
          Save Changes
        </button>

      </div>

    </div>

  )

}

function ColorPicker({
  title,
  color
}:{
  title:string
  color:string
}){

  return(

    <div>

      <label className="mb-2 block text-zinc-300">
        {title}
      </label>

      <div className="flex items-center gap-4 rounded-2xl border border-zinc-700 bg-black p-4">

        <input
          type="color"
          defaultValue={color}
          className="h-14 w-14 cursor-pointer rounded-lg border-none bg-transparent"
        />

        <span className="text-zinc-300">
          {color}
        </span>

      </div>

    </div>

  )

}

function Toggle({
  title,
  enabled
}:{
  title:string
  enabled?:boolean
}){

  return(

    <div className="flex items-center justify-between rounded-2xl border border-zinc-700 bg-black p-5">

      <div className="flex items-center gap-3">

        <MoonStar
          size={20}
          className="text-indigo-800"
        />

        <span className="text-white">
          {title}
        </span>

      </div>

      <button
        className={`relative h-7 w-14 rounded-full transition ${
          enabled
            ? 'bg-[#2B3494]'
            : 'bg-zinc-700'
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            enabled
              ? 'left-8'
              : 'left-1'
          }`}
        />
      </button>

    </div>

  )

}