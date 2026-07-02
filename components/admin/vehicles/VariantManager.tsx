'use client'

import { ChangeEvent, ReactNode, useState } from 'react'
import { Plus, Trash2, Pencil } from 'lucide-react'

type Variant = {
  id: number
  name: string
  price: string
  fuel: string
  transmission: string
}

export default function VariantManager() {
  const [variants, setVariants] = useState<Variant[]>([
    {
      id: 1,
      name: 'LXi',
      price: '₹8.69 Lakh',
      fuel: 'Petrol',
      transmission: 'Manual'
    }
  ])

  const [form, setForm] = useState({
    name: '',
    price: '',
    fuel: '',
    transmission: ''
  })

  function addVariant() {
    if (!form.name.trim() || !form.price.trim()) return

    setVariants(prev => [
      ...prev,
      {
        id: Date.now(),
        ...form
      }
    ])

    setForm({
      name: '',
      price: '',
      fuel: '',
      transmission: ''
    })
  }

  function removeVariant(id: number) {
    setVariants(prev => prev.filter(v => v.id !== id))
  }

  return (
    <section className="mt-12">

      {/* Header */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Vehicle Variants
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Manage all available variants of this vehicle.
          </p>
        </div>

        <button
          onClick={addVariant}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2B3494] px-6 font-medium text-white transition hover:bg-indigo-800"
        >
          <Plus size={18} />
          Add Variant
        </button>

      </div>

      {/* Form */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <Input
          placeholder="Variant Name"
          value={form.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <Input
          placeholder="Price"
          value={form.price}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <Input
          placeholder="Fuel"
          value={form.fuel}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, fuel: e.target.value })
          }
        />

        <Input
          placeholder="Transmission"
          value={form.transmission}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setForm({
              ...form,
              transmission: e.target.value
            })
          }
        />

      </div>

      {/* Variants */}

      <div className="mt-8 space-y-5">

        {variants.map(v => (
          <div
            key={v.id}
            className="flex flex-col gap-5 rounded-2xl border border-zinc-800 bg-black p-5 transition hover:border-[#2B3494] lg:flex-row lg:items-center lg:justify-between"
          >

            <div className="flex-1">

              <h3 className="text-xl font-semibold text-white">
                {v.name}
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">

                <Badge>{v.price}</Badge>

                <Badge>{v.fuel}</Badge>

                <Badge>{v.transmission}</Badge>

              </div>

            </div>

            <div className="flex justify-end gap-3">

              <button className="rounded-xl bg-zinc-800 p-3 transition hover:bg-[#2B3494]">
                <Pencil
                  size={18}
                  className="text-white"
                />
              </button>

              <button
                onClick={() => removeVariant(v.id)}
                className="rounded-xl bg-zinc-800 p-3 transition hover:bg-red-600"
              >
                <Trash2
                  size={18}
                  className="text-white"
                />
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  )
}

function Badge({
  children
}: {
  children: ReactNode
}) {
  return (
    <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
      {children}
    </span>
  )
}

type InputProps = {
  placeholder: string
  value: string
  onChange: (
    e: ChangeEvent<HTMLInputElement>
  ) => void
}

function Input({
  placeholder,
  value,
  onChange
}: InputProps) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="h-12 w-full rounded-xl border border-zinc-700 bg-black px-4 text-white outline-none transition focus:border-indigo-800"
    />
  )
}