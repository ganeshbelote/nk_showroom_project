'use client'

import { useState } from 'react'
import { Plus, Trash2, Upload } from 'lucide-react'
import ImageUploader from './ImageUploader'
import VariantManager from './VariantManager'

export default function VehicleForm () {
  const [features, setFeatures] = useState<string[]>(['Power Steering', 'ABS'])

  const [feature, setFeature] = useState('')

  const addFeature = () => {
    if (!feature.trim()) return

    setFeatures(prev => [...prev, feature])
    setFeature('')
  }

  const removeFeature = (index: number) => {
    setFeatures(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className='space-y-10 rounded-3xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6 lg:p-8'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold text-white sm:text-3xl'>
          Add Vehicle
        </h1>

        <p className='text-sm text-zinc-500'>Fill vehicle information below.</p>
      </div>

      {/* BASIC */}

      <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        <Input label='Vehicle Name' />
        <Input label='Slug' />
        <Input label='Brand' />
        <Input label='Category' />
        <Input label='Price' />
        <Input label='Body Type' />
      </div>

      <div>
        <label className='mb-2 block text-sm text-zinc-300'>Description</label>

        <textarea
          rows={5}
          className='w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none transition focus:border-indigo-800'
        />
      </div>

      {/* SPECIFICATIONS */}

      <div>
        <h2 className='mb-6 text-xl font-bold text-white sm:text-2xl'>
          Specifications
        </h2>

        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
          <Input label='ARAI Mileage' />
          <Input label='City Mileage' />
          <Input label='Fuel Type' />
          <Input label='Engine' />
          <Input label='Power' />
          <Input label='Torque' />
          <Input label='Transmission' />
          <Input label='Cylinder' />
          <Input label='Seats' />
          <Input label='Fuel Tank' />
          <Input label='Boot Space' />
          <Input label='Ground Clearance' />
        </div>
      </div>

      {/* FEATURES */}

      <div>
        <h2 className='mb-6 text-xl font-bold text-white sm:text-2xl'>
          Features
        </h2>

        <div className='flex flex-col gap-3 sm:flex-row'>
          <input
            value={feature}
            onChange={e => setFeature(e.target.value)}
            placeholder='Enter feature...'
            className='h-12 flex-1 rounded-xl border border-zinc-700 bg-black px-4 text-white outline-none transition focus:border-indigo-800'
          />

          <button
            type='button'
            onClick={addFeature}
            className='flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2B3494] px-6 font-medium text-white transition hover:bg-indigo-800'
          >
            <Plus size={18} />
            Add
          </button>
        </div>

        <div className='mt-5 flex flex-wrap gap-3'>
          {features.map((item, index) => (
            <div
              key={index}
              className='flex items-center gap-3 rounded-full border border-zinc-700 bg-black px-4 py-2'
            >
              <span className='text-sm text-white'>{item}</span>

              <button onClick={() => removeFeature(index)}>
                <Trash2 size={16} className='text-red-500' />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* GALLERY */}

      <div>
        <h2 className='mb-6 text-xl font-bold text-white sm:text-2xl'>
          Vehicle Gallery
        </h2>

        <ImageUploader />

        <div className='mt-8'>
          <VariantManager />
        </div>

        <div className='mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {[1, 2, 3].map(i => (
            <label
              key={i}
              className='flex h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-700 transition hover:border-indigo-800'
            >
              <Upload size={34} className='text-zinc-500' />

              <span className='mt-3 text-sm text-zinc-400'>Upload Image</span>

              <input type='file' hidden />
            </label>
          ))}
        </div>
      </div>

      {/* SAVE */}

      <div className='flex justify-center sm:justify-end'>
        <button className='h-12 w-full rounded-xl bg-[#2B3494] px-8 font-semibold text-white transition hover:bg-indigo-800 sm:w-auto'>
          Save Vehicle
        </button>
      </div>
    </div>
  )
}

function Input ({ label }: { label: string }) {
  return (
    <div>
      <label className='mb-2 block text-sm font-medium text-zinc-300'>
        {label}
      </label>

      <input className='h-12 w-full rounded-xl border border-zinc-700 bg-black px-4 text-white outline-none transition focus:border-indigo-800' />
    </div>
  )
}
