'use client'

import { useState } from 'react'
import { Plus, Trash2, Upload } from 'lucide-react'
import ImageUploader from './ImageUploader'
import VariantManager from './VariantManager'
import { toast } from '@/components/Toast'

export type VariantType = {
  name: string
  price: number
  fuel: string
  transmission: string
  alternateFuel?: string | null
  alternatePrice?: number | null
  petrolMileage?: string | null
  cngMileage?: string | null
}

export type ImageType = {
  imageUrl: string
  publicId: string
  isCover: boolean
  order: number
}

export default function VehicleForm () {
  const [features, setFeatures] = useState<string[]>(['Power Steering', 'ABS'])
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    brand: '',
    category: '',
    bodyType: '',
    description: '',

    basePrice: '',

    mileage: '',
    cityMileage: '',

    // Task 2: Multiple fuel mileage
    petrolMileage: '',
    cngMileage: '',

    fuelType: '',

    engine: '',
    power: '',
    torque: '',

    transmission: '',

    cylinders: '',
    seatingCapacity: '',

    fuelTank: '',

    bootSpace: '',

    groundClearance: '',

    featured: false,
    published: true,

    features: [] as string[],
    images: [] as ImageType[],
    variants: [] as VariantType[]
  })

  const [feature, setFeature] = useState('')

  const addFeature = () => {
    if (!feature.trim()) return

    const updated = [...features, feature]

    setFeatures(updated)

    setFormData(prev => ({
      ...prev,
      features: updated
    }))

    setFeature('')
  }

  const removeFeature = (index: number) => {
    const updated = features.filter((_, i) => i !== index)

    setFeatures(updated)

    setFormData(prev => ({
      ...prev,
      features: updated
    }))
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target

    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          ...formData,

          basePrice: Number(formData.basePrice),

          cylinders: Number(formData.cylinders),

          seatingCapacity: Number(formData.seatingCapacity)
        })
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.errors) {
          toast.error('Please check all required fields.')
        } else {
          toast.error(data.message || 'Failed to add vehicle.')
        }

        return
      }

      toast.success('Vehicle added successfully.')
    } catch (error) {
      console.error(error)

      toast.error('Something went wrong. Please try again.')
    }
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
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          <Input
            label='Vehicle Name'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            label='Slug'
            name='slug'
            value={formData.slug}
            onChange={handleChange}
          />

          <Input
            label='Brand'
            name='brand'
            value={formData.brand}
            onChange={handleChange}
          />

          <Input
            label='Category'
            name='category'
            value={formData.category}
            onChange={handleChange}
          />

          <Input
            label='Price'
            name='basePrice'
            type='number'
            value={formData.basePrice}
            onChange={handleChange}
          />

          <Input
            label='Body Type'
            name='bodyType'
            value={formData.bodyType}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label className='mb-2 block text-sm text-zinc-300'>Description</label>

        <textarea
          rows={5}
          name='description'
          value={formData.description}
          onChange={handleChange}
          className='w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none transition focus:border-indigo-800'
        />
      </div>

      {/* SPECIFICATIONS */}

      <div>
        <h2 className='mb-6 text-xl font-bold text-white sm:text-2xl'>
          Specifications
        </h2>

        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
          <Input
            label='ARAI Mileage'
            name='mileage'
            value={formData.mileage}
            onChange={handleChange}
          />

          <Input
            label='City Mileage'
            name='cityMileage'
            value={formData.cityMileage}
            onChange={handleChange}
          />

          {/* Task 2: Multiple fuel mileage */}
          <Input
            label='Petrol Mileage'
            name='petrolMileage'
            value={formData.petrolMileage}
            onChange={handleChange}
          />

          <Input
            label='CNG Mileage'
            name='cngMileage'
            value={formData.cngMileage}
            onChange={handleChange}
          />

          <Input
            label='Fuel Type'
            name='fuelType'
            value={formData.fuelType}
            onChange={handleChange}
          />

          <Input
            label='Engine'
            name='engine'
            value={formData.engine}
            onChange={handleChange}
          />

          <Input
            label='Power'
            name='power'
            value={formData.power}
            onChange={handleChange}
          />

          <Input
            label='Torque'
            name='torque'
            value={formData.torque}
            onChange={handleChange}
          />

          <Input
            label='Transmission'
            name='transmission'
            value={formData.transmission}
            onChange={handleChange}
          />

          <Input
            label='Cylinder'
            name='cylinders'
            type='number'
            value={formData.cylinders}
            onChange={handleChange}
          />

          <Input
            label='Seats'
            name='seatingCapacity'
            type='number'
            value={formData.seatingCapacity}
            onChange={handleChange}
          />

          <Input
            label='Fuel Tank'
            name='fuelTank'
            value={formData.fuelTank}
            onChange={handleChange}
          />

          <Input
            label='Boot Space'
            name='bootSpace'
            value={formData.bootSpace}
            onChange={handleChange}
          />

          <Input
            label='Ground Clearance'
            name='groundClearance'
            value={formData.groundClearance}
            onChange={handleChange}
          />
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

        <ImageUploader
          images={formData.images}
          setImages={images =>
            setFormData(prev => ({
              ...prev,
              images
            }))
          }
        />

        <div className='mt-8'>
          <VariantManager
            variants={formData.variants}
            setVariants={variants =>
              setFormData(prev => ({
                ...prev,
                variants
              }))
            }
          />
        </div>
      </div>

      {/* SAVE */}

      <div className='flex justify-center sm:justify-end'>
        <button
          className='h-12 w-full rounded-xl bg-[#2B3494] px-8 font-semibold text-white transition hover:bg-indigo-800 sm:w-auto'
          type='button'
          onClick={handleSubmit}
        >
          Save Vehicle
        </button>
      </div>
    </div>
  )
}

function Input ({
  label,
  name,
  value,
  onChange,
  type = 'text'
}: {
  label: string
  name: string
  value: string
  type?: string
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void
}) {
  return (
    <div>
      <label className='mb-2 block text-sm text-zinc-300'>{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className='h-12 w-full rounded-xl border border-zinc-700 bg-black px-4 text-white outline-none transition focus:border-indigo-800'
      />
    </div>
  )
}