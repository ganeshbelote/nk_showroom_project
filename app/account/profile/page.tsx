'use client'

import { Camera, Save } from 'lucide-react'
import { useState } from 'react'

export default function ProfilePage () {
  const [form, setForm] = useState({
    firstName: 'Ganesh',
    lastName: 'Belote',
    email: 'ganesh@gmail.com',
    phone: '+91 8421022640',
    dob: '',
    city: 'Pune',
    state: 'Maharashtra',
    address: '',
    occupation: '',
    budget: '₹8 - ₹12 Lakh',
    preferredBrand: 'Maruti Suzuki'
  })

  function handleChange (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className='mx-auto max-w-7xl px-4 py-8 md:px-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-white'>My Profile</h1>

        <p className='mt-2 text-zinc-400'>Manage your personal information.</p>
      </div>

      <div className='grid gap-8 lg:grid-cols-[320px_1fr]'>
        {/* Left */}

        <div className='rounded-3xl border border-zinc-800 bg-zinc-950 p-8'>
          <div className='flex flex-col items-center'>
            <div className='relative'>
              <div className='flex h-36 w-36 items-center justify-center rounded-full bg-[#2B3494] text-5xl font-bold text-white'>
                G
              </div>

              <button className='absolute bottom-2 right-2 rounded-full bg-[#2B3494] p-3 hover:bg-blue-500'>
                <Camera size={18} className='text-white' />
              </button>
            </div>

            <h2 className='mt-6 text-2xl font-bold text-white'>
              {form.firstName} {form.lastName}
            </h2>

            <p className='mt-2 text-zinc-400'>{form.email}</p>
          </div>

          <div className='mt-8 space-y-4'>
            <Info title='Phone' value={form.phone} />

            <Info title='City' value={form.city} />

            <Info title='Preferred Budget' value={form.budget} />
          </div>
        </div>

        {/* Right */}

        <div className='rounded-3xl border border-zinc-800 bg-zinc-950 p-6 md:p-8'>
          <div className='grid gap-6 md:grid-cols-2'>
            <Input
              label='First Name'
              name='firstName'
              value={form.firstName}
              onChange={handleChange}
            />

            <Input
              label='Last Name'
              name='lastName'
              value={form.lastName}
              onChange={handleChange}
            />

            <Input
              label='Email'
              name='email'
              type='email'
              value={form.email}
              onChange={handleChange}
            />

            <Input
              label='Mobile Number'
              name='phone'
              value={form.phone}
              onChange={handleChange}
            />

            <Input
              label='Date of Birth'
              name='dob'
              type='date'
              value={form.dob}
              onChange={handleChange}
            />

            <Input
              label='Occupation'
              name='occupation'
              value={form.occupation}
              onChange={handleChange}
            />

            <Input
              label='City'
              name='city'
              value={form.city}
              onChange={handleChange}
            />

            <Input
              label='State'
              name='state'
              value={form.state}
              onChange={handleChange}
            />
          </div>

          <div className='mt-6'>
            <label className='mb-2 block text-zinc-300'>Address</label>

            <textarea
              rows={4}
              name='address'
              value={form.address}
              onChange={handleChange}
              className='w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:bg-[#2B3494]'
            />
          </div>

          <div className='mt-6 grid gap-6 md:grid-cols-2'>
            <div>
              <label className='mb-2 block text-zinc-300'>
                Preferred Brand
              </label>

              <select
                name='preferredBrand'
                value={form.preferredBrand}
                onChange={handleChange}
                className='h-12 w-full rounded-xl border border-zinc-700 bg-black px-4 text-white outline-none focus:bg-[#2B3494]'
              >
                <option>Maruti Suzuki</option>
                <option>Mahindra</option>
                <option>Tata</option>
                <option>Hyundai</option>
                <option>Kia</option>
              </select>
            </div>

            <div>
              <label className='mb-2 block text-zinc-300'>Budget</label>

              <select
                name='budget'
                value={form.budget}
                onChange={handleChange}
                className='h-12 w-full rounded-xl border border-zinc-700 bg-black px-4 text-white outline-none focus:bg-[#2B3494]'
              >
                <option>Below ₹5 Lakh</option>
                <option>₹5 - ₹8 Lakh</option>
                <option>₹8 - ₹12 Lakh</option>
                <option>₹12 - ₹20 Lakh</option>
                <option>Above ₹20 Lakh</option>
              </select>
            </div>
          </div>

          <button className='mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2B3494] font-semibold text-white transition hover:bg-indigo-800 md:w-52'>
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </main>
  )
}

function Input ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
}) {
  return (
    <div>
      <label className='mb-2 block text-zinc-300'>{label}</label>

      <input
        {...props}
        className='h-12 w-full rounded-xl border border-zinc-700 bg-black px-4 text-white outline-none focus:bg-[#2B3494]'
      />
    </div>
  )
}

function Info ({ title, value }: { title: string; value: string }) {
  return (
    <div className='rounded-xl border border-zinc-800 bg-black p-4'>
      <p className='text-sm text-zinc-500'>{title}</p>

      <p className='mt-1 font-semibold text-white'>{value || '-'}</p>
    </div>
  )
}
