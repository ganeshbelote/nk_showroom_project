'use client'

import { ChangeEvent, ReactNode, useState } from 'react'
import { Plus, Trash2, Pencil, X, Check } from 'lucide-react'

type Variant = {
  name: string
  price: number
  fuel: string
  transmission: string
  alternateFuel?: string | null
  petrolMileage?: string | null
  cngMileage?: string | null
  hybridMileage?: string | null
  features?: string[]
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
    petrolMileage: '',
    cngMileage: '',
    hybridMileage: '',
    featureInput: ''
  })

  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    fuel: '',
    transmission: '',
    alternateFuel: '',
    petrolMileage: '',
    cngMileage: '',
    hybridMileage: '',
    features: [] as string[],
    featureInput: ''
  })

  function addVariant () {
    if (!form.name.trim() || !form.price.trim()) return
    const features = form.featureInput
      .split(',')
      .map(f => f.trim())
      .filter(Boolean)

    setVariants([
      ...variants,
      {
        name: form.name,
        price: Number(form.price),
        fuel: form.fuel,
        transmission: form.transmission,
        alternateFuel: form.alternateFuel || null,
        petrolMileage: form.petrolMileage || null,
        cngMileage: form.cngMileage || null,
        hybridMileage: form.hybridMileage || null,
        features: features.length > 0 ? features : undefined
      }
    ])

    setForm({
      name: '',
      price: '',
      fuel: '',
      transmission: '',
      alternateFuel: '',
      petrolMileage: '',
      cngMileage: '',
      hybridMileage: '',
      featureInput: ''
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
      petrolMileage: v.petrolMileage || '',
      cngMileage: v.cngMileage || '',
      hybridMileage: v.hybridMileage || '',
      features: v.features || [],
      featureInput: ''
    })
  }

  function cancelEdit () {
    setEditingIndex(null)
  }

  function addEditFeature () {
    if (!editForm.featureInput.trim()) return
    setEditForm(prev => ({
      ...prev,
      features: [...prev.features, prev.featureInput.trim()],
      featureInput: ''
    }))
  }

  function removeEditFeature (i: number) {
    setEditForm(prev => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== i)
    }))
  }

  function saveEdit (index: number) {
    const updated = [...variants]
    updated[index] = {
      name: editForm.name,
      price: Number(editForm.price),
      fuel: editForm.fuel,
      transmission: editForm.transmission,
      alternateFuel: editForm.alternateFuel || null,
      petrolMileage: editForm.petrolMileage || null,
      cngMileage: editForm.cngMileage || null,
      hybridMileage: editForm.hybridMileage || null,
      features: editForm.features.length > 0 ? editForm.features : undefined
    }
    setVariants(updated)
    setEditingIndex(null)
  }

  return (
    <section className='mt-12'>
      <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-white sm:text-3xl'>
            Vehicle Variants
          </h2>
          <p className='mt-1 text-sm text-zinc-500'>
            Manage all available variants. Supports dual-fuel, mileage info, and variant-specific features.
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
          <Input placeholder='Variant Name *' value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <Input placeholder='Price *' value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <Input placeholder='Fuel (Petrol/Diesel/CNG)' value={form.fuel} onChange={e => setForm({ ...form, fuel: e.target.value })} />
          <Input placeholder='Transmission' value={form.transmission} onChange={e => setForm({ ...form, transmission: e.target.value })} />
        </div>
        <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          <Input placeholder='Alternate Fuel (e.g. CNG)' value={form.alternateFuel} onChange={e => setForm({ ...form, alternateFuel: e.target.value })} />
          <Input placeholder='Petrol Mileage' value={form.petrolMileage} onChange={e => setForm({ ...form, petrolMileage: e.target.value })} />
          <Input placeholder='CNG Mileage' value={form.cngMileage} onChange={e => setForm({ ...form, cngMileage: e.target.value })} />
          <Input placeholder='Hybrid Mileage' value={form.hybridMileage} onChange={e => setForm({ ...form, hybridMileage: e.target.value })} />
          <Input placeholder='Features (comma separated)' value={form.featureInput} onChange={e => setForm({ ...form, featureInput: e.target.value })} />
        </div>
      </div>

      {/* Variants List */}
      <div className='mt-8 space-y-5'>
        {variants.map((v, index) => (
          <div key={index} className='flex flex-col gap-5 rounded-2xl border border-zinc-800 bg-black p-5 transition hover:border-[#2B3494]'>
            {editingIndex === index ? (
              <div className='space-y-4'>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                  <Input placeholder='Variant Name' value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                  <Input placeholder='Price' value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })} />
                  <Input placeholder='Fuel' value={editForm.fuel} onChange={e => setEditForm({ ...editForm, fuel: e.target.value })} />
                  <Input placeholder='Transmission' value={editForm.transmission} onChange={e => setEditForm({ ...editForm, transmission: e.target.value })} />
                  <Input placeholder='Alternate Fuel' value={editForm.alternateFuel} onChange={e => setEditForm({ ...editForm, alternateFuel: e.target.value })} />
                  <Input placeholder='Petrol Mileage' value={editForm.petrolMileage} onChange={e => setEditForm({ ...editForm, petrolMileage: e.target.value })} />
                  <Input placeholder='CNG Mileage' value={editForm.cngMileage} onChange={e => setEditForm({ ...editForm, cngMileage: e.target.value })} />
                  <Input placeholder='Hybrid Mileage' value={editForm.hybridMileage} onChange={e => setEditForm({ ...editForm, hybridMileage: e.target.value })} />
                </div>

                {/* Features editor */}
                <div className='rounded-xl border border-zinc-800 bg-zinc-950 p-4'>
                  <label className='mb-2 block text-sm text-zinc-400'>Variant Features</label>
                  <div className='flex gap-2'>
                    <input
                      placeholder='Add feature...'
                      value={editForm.featureInput}
                      onChange={e => setEditForm({ ...editForm, featureInput: e.target.value })}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addEditFeature() } }}
                      className='h-10 flex-1 rounded-lg border border-zinc-700 bg-black px-3 text-sm text-white outline-none focus:border-indigo-800'
                    />
                    <button type='button' onClick={addEditFeature} className='rounded-lg bg-[#2B3494] px-3 text-white transition hover:bg-indigo-800'>
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className='mt-2 flex flex-wrap gap-2'>
                    {editForm.features.map((f, i) => (
                      <span key={i} className='flex items-center gap-1.5 rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300'>
                        {f}
                        <button onClick={() => removeEditFeature(i)}><X size={12} className='text-red-400' /></button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className='flex justify-end gap-3'>
                  <button onClick={() => cancelEdit()} className='rounded-xl bg-zinc-800 p-3 transition hover:bg-zinc-700'><X size={18} className='text-white' /></button>
                  <button onClick={() => saveEdit(index)} className='rounded-xl bg-green-600 p-3 transition hover:bg-green-700'><Check size={18} className='text-white' /></button>
                </div>
              </div>
            ) : (
              <>
                <div className='flex-1'>
                  <h3 className='text-xl font-semibold text-white'>{v.name}</h3>
                  <div className='mt-3 flex flex-wrap gap-2'>
                    <Badge>₹{Number(v.price).toLocaleString('en-IN')}</Badge>
                    <Badge>{v.fuel}</Badge>
                    <Badge>{v.transmission}</Badge>
                    {v.alternateFuel && <Badge>Alt: {v.alternateFuel}</Badge>}
                    {v.petrolMileage && <Badge>Petrol: {v.petrolMileage}</Badge>}
                    {v.cngMileage && <Badge>CNG: {v.cngMileage}</Badge>}
                    {v.hybridMileage && <Badge className='border-emerald-800 text-emerald-400'>Hybrid: {v.hybridMileage}</Badge>}
                  </div>
                  {v.features && v.features.length > 0 && (
                    <div className='mt-3 flex flex-wrap gap-1.5'>
                      {v.features.map((f, i) => (
                        <span key={i} className='rounded-md bg-zinc-900 px-2 py-0.5 text-xs text-zinc-400'>{f}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className='flex justify-end gap-3'>
                  <button onClick={() => startEdit(index)} className='rounded-xl bg-zinc-800 p-3 transition hover:bg-[#2B3494]'><Pencil size={18} className='text-white' /></button>
                  <button onClick={() => removeVariant(index)} className='rounded-xl bg-zinc-800 p-3 transition hover:bg-red-600'><Trash2 size={18} className='text-white' /></button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function Badge ({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300 ${className}`}>{children}</span>
}

type InputProps = { placeholder: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void }

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