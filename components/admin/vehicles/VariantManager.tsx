'use client'

import { ChangeEvent, ReactNode, useState } from 'react'
import { Plus, Trash2, Pencil, X, Check } from 'lucide-react'

type Variant = {
  name: string
  price: number
  fuel: string
  transmission: string
  alternateFuel?: string | null
  alternatePrice?: number | null
  petrolMileage?: string | null
  cngMileage?: string | null
}

type Props = {
  variants: Variant[]
  setVariants: (variants: Variant[]) => void
}

export default function VariantManager ({ variants, setVariants }: Props) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    fuel: '',
    transmission: '',
    alternateFuel: '',
    alternatePrice: '',
    petrolMileage: '',
    cngMileage: ''
  })

  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    fuel: '',
    transmission: '',
    alternateFuel: '',
    alternatePrice: '',
    petrolMileage: '',
    cngMileage: ''
  })

  function addVariant () {
    if (!form.name.trim() || !form.price.trim()) return

    setVariants([
      ...variants,
      {
        name: form.name,
        price: Number(form.price),
        fuel: form.fuel,
        transmission: form.transmission,
        alternateFuel: form.alternateFuel || null,
        alternatePrice: form.alternatePrice ? Number(form.alternatePrice) : null,
        petrolMileage: form.petrolMileage || null,
        cngMileage: form.cngMileage || null
      }
    ])

    setForm({
      name: '',
      price: '',
      fuel: '',
      transmission: '',
      alternateFuel: '',
      alternatePrice: '',
      petrolMileage: '',
      cngMileage: ''
    })
  }

  function removeVariant (index: number) {
    setVariants(variants.filter((_, i) => i !== index))
    if (editingIndex === index) setEditingIndex(null)
  }

  function startEdit (index: number) {
    const v = variants[index]
    setEditingIndex(index)
    setEditForm({
      name: v.name,
      price: String(v.price),
      fuel: v.fuel,
      transmission: v.transmission,
      alternateFuel: v.alternateFuel || '',
      alternatePrice: v.alternatePrice ? String(v.alternatePrice) : '',
      petrolMileage: v.petrolMileage || '',
      cngMileage: v.cngMileage || ''
    })
  }

  function cancelEdit () {
    setEditingIndex(null)
  }

  function saveEdit (index: number) {
    const updated = [...variants]
    updated[index] = {
      name: editForm.name,
      price: Number(editForm.price),
      fuel: editForm.fuel,
      transmission: editForm.transmission,
      alternateFuel: editForm.alternateFuel || null,
      alternatePrice: editForm.alternatePrice ? Number(editForm.alternatePrice) : null,
      petrolMileage: editForm.petrolMileage || null,
      cngMileage: editForm.cngMileage || null
    }
    setVariants(updated)
    setEditingIndex(null)
  }

  return (
    <section className='mt-12'>
      {/* Header */}

      <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-white sm:text-3xl'>
            Vehicle Variants
          </h2>

          <p className='mt-1 text-sm text-zinc-500'>
            Manage all available variants of this vehicle. Supports dual-fuel (Petrol + CNG).
          </p>
        </div>

        <button
          onClick={addVariant}
          className='flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2B3494] px-6 font-medium text-white transition hover:bg-indigo-800'
        >
          <Plus size={18} />
          Add Variant
        </button>
      </div>

      {/* Add Form */}
      <div className='rounded-2xl border border-zinc-800 bg-black p-5'>
        <h3 className='mb-4 text-lg font-semibold text-white'>New Variant</h3>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          <Input
            placeholder='Variant Name *'
            value={form.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <Input
            placeholder='Price *'
            value={form.price}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <Input
            placeholder='Fuel (Petrol/Diesel/CNG)'
            value={form.fuel}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, fuel: e.target.value })
            }
          />

          <Input
            placeholder='Transmission'
            value={form.transmission}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, transmission: e.target.value })
            }
          />
        </div>

        {/* Dual fuel & mileage fields */}
        <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          <Input
            placeholder='Alternate Fuel (e.g. CNG)'
            value={form.alternateFuel}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, alternateFuel: e.target.value })
            }
          />
          <Input
            placeholder='Alternate Fuel Price'
            value={form.alternatePrice}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, alternatePrice: e.target.value })
            }
          />
          <Input
            placeholder='Petrol Mileage'
            value={form.petrolMileage}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, petrolMileage: e.target.value })
            }
          />
          <Input
            placeholder='CNG Mileage'
            value={form.cngMileage}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, cngMileage: e.target.value })
            }
          />
        </div>
      </div>

      {/* Variants List */}
      <div className='mt-8 space-y-5'>
        {variants.map((v, index) => (
          <div
            key={index}
            className='flex flex-col gap-5 rounded-2xl border border-zinc-800 bg-black p-5 transition hover:border-[#2B3494]'
          >
            {editingIndex === index ? (
              /* Edit Mode */
              <div className='space-y-4'>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                  <Input
                    placeholder='Variant Name'
                    value={editForm.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                  />
                  <Input
                    placeholder='Price'
                    value={editForm.price}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                  />
                  <Input
                    placeholder='Fuel'
                    value={editForm.fuel}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEditForm({ ...editForm, fuel: e.target.value })
                    }
                  />
                  <Input
                    placeholder='Transmission'
                    value={editForm.transmission}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEditForm({ ...editForm, transmission: e.target.value })
                    }
                  />
                  <Input
                    placeholder='Alternate Fuel'
                    value={editForm.alternateFuel}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEditForm({ ...editForm, alternateFuel: e.target.value })
                    }
                  />
                  <Input
                    placeholder='Alternate Fuel Price'
                    value={editForm.alternatePrice}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEditForm({ ...editForm, alternatePrice: e.target.value })
                    }
                  />
                  <Input
                    placeholder='Petrol Mileage'
                    value={editForm.petrolMileage}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEditForm({ ...editForm, petrolMileage: e.target.value })
                    }
                  />
                  <Input
                    placeholder='CNG Mileage'
                    value={editForm.cngMileage}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEditForm({ ...editForm, cngMileage: e.target.value })
                    }
                  />
                </div>
                <div className='flex justify-end gap-3'>
                  <button
                    onClick={() => cancelEdit()}
                    className='rounded-xl bg-zinc-800 p-3 transition hover:bg-zinc-700'
                  >
                    <X size={18} className='text-white' />
                  </button>
                  <button
                    onClick={() => saveEdit(index)}
                    className='rounded-xl bg-green-600 p-3 transition hover:bg-green-700'
                  >
                    <Check size={18} className='text-white' />
                  </button>
                </div>
              </div>
            ) : (
              /* View Mode */
              <>
                <div className='flex-1'>
                  <h3 className='text-xl font-semibold text-white'>{v.name}</h3>

                  <div className='mt-3 flex flex-wrap gap-2'>
                    <Badge>₹{Number(v.price).toLocaleString('en-IN')}</Badge>
                    <Badge>{v.fuel}</Badge>
                    <Badge>{v.transmission}</Badge>
                    {v.alternateFuel && <Badge>Alt: {v.alternateFuel} ₹{Number(v.alternatePrice).toLocaleString('en-IN')}</Badge>}
                    {v.petrolMileage && <Badge>Petrol: {v.petrolMileage}</Badge>}
                    {v.cngMileage && <Badge>CNG: {v.cngMileage}</Badge>}
                  </div>
                </div>

                <div className='flex justify-end gap-3'>
                  <button
                    onClick={() => startEdit(index)}
                    className='rounded-xl bg-zinc-800 p-3 transition hover:bg-[#2B3494]'
                  >
                    <Pencil size={18} className='text-white' />
                  </button>

                  <button
                    onClick={() => removeVariant(index)}
                    className='rounded-xl bg-zinc-800 p-3 transition hover:bg-red-600'
                  >
                    <Trash2 size={18} className='text-white' />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function Badge ({ children }: { children: ReactNode }) {
  return (
    <span className='rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300'>
      {children}
    </span>
  )
}

type InputProps = {
  placeholder: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function Input ({ placeholder, value, onChange }: InputProps) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className='h-12 w-full rounded-xl border border-zinc-700 bg-black px-4 text-white outline-none transition focus:border-indigo-800'
    />
  )
}