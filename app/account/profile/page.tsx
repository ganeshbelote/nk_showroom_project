'use client'

import { Camera, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from '@/components/Toast'

type UserProfile = {
  fullName: string
  email: string
  mobile: string
  gender: string
  dob: string
  occupation: string
  city: string
  state: string
  budget: string
  preferredFuel: string
  preferredBody: string
}

export default function ProfilePage () {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState<UserProfile>({
    fullName: '',
    email: '',
    mobile: '',
    gender: '',
    dob: '',
    occupation: '',
    city: '',
    state: '',
    budget: '',
    preferredFuel: '',
    preferredBody: ''
  })

  useEffect(() => {
    async function fetchProfile () {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' })
        const data = await res.json()

        if (data.success) {
          const u = data.user
          setForm({
            fullName: u.fullName || '',
            email: u.email || '',
            mobile: u.mobile || '',
            gender: u.gender || '',
            dob: u.dob ? u.dob.split('T')[0] : '',
            occupation: u.occupation || '',
            city: u.city || '',
            state: u.state || '',
            budget: u.budget || '',
            preferredFuel: u.preferredFuel || '',
            preferredBody: u.preferredBody || ''
          })
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

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

  async function handleSave () {
    setSaving(true)

    try {
      const res = await fetch('/api/auth/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include'
      })

      const data = await res.json()

      if (data.success) {
        toast.success('Profile updated successfully')
      } else {
        toast.error(data.message || 'Failed to update profile')
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const initials = form.fullName
    ? form.fullName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U'

  return (
    <main className='mx-auto max-w-7xl px-4 py-8 md:px-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-white'>My Profile</h1>

        <p className='mt-2 text-zinc-400'>Manage your personal information.</p>
      </div>

      {loading ? (
        <div className='flex min-h-[400px] items-center justify-center'>
          <p className='text-zinc-400'>Loading profile...</p>
        </div>
      ) : (
        <div className='grid gap-8 lg:grid-cols-[320px_1fr]'>
          {/* Left */}

          <div className='rounded-3xl border border-zinc-800 bg-zinc-950 p-8'>
            <div className='flex flex-col items-center'>
              <div className='relative'>
                <div className='flex h-36 w-36 items-center justify-center rounded-full bg-[#2B3494] text-5xl font-bold text-white'>
                  {initials}
                </div>

                <button className='absolute bottom-2 right-2 rounded-full bg-[#2B3494] p-3 hover:bg-blue-500'>
                  <Camera size={18} className='text-white' />
                </button>
              </div>

              <h2 className='mt-6 text-2xl font-bold text-white'>
                {form.fullName}
              </h2>

              <p className='mt-2 text-zinc-400'>{form.email}</p>
            </div>

            <div className='mt-8 space-y-4'>
              <Info title='Phone' value={form.mobile} />

              <Info title='City' value={form.city} />

              <Info title='Preferred Budget' value={form.budget} />
            </div>
          </div>

          {/* Right */}

          <div className='rounded-3xl border border-zinc-800 bg-zinc-950 p-6 md:p-8'>
            <div className='grid gap-6 md:grid-cols-2'>
              <Input
                label='Full Name'
                name='fullName'
                value={form.fullName}
                onChange={handleChange}
              />

              <Input
                label='Gender'
                name='gender'
                value={form.gender}
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
                name='mobile'
                value={form.mobile}
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

            <div className='mt-6 grid gap-6 md:grid-cols-2'>
              <div>
                <label className='mb-2 block text-zinc-300'>
                  Preferred Fuel
                </label>

                <select
                  name='preferredFuel'
                  value={form.preferredFuel}
                  onChange={handleChange}
                  className='h-12 w-full rounded-xl border border-zinc-700 bg-black px-4 text-white outline-none focus:bg-[#2B3494]'
                >
                  <option value=''>Select Fuel Type</option>
                  <option value='Petrol'>Petrol</option>
                  <option value='Diesel'>Diesel</option>
                  <option value='Hybrid'>Hybrid</option>
                  <option value='Electric'>Electric</option>
                  <option value='CNG'>CNG</option>
                </select>
              </div>

              <div>
                <label className='mb-2 block text-zinc-300'>
                  Preferred Body Type
                </label>

                <select
                  name='preferredBody'
                  value={form.preferredBody}
                  onChange={handleChange}
                  className='h-12 w-full rounded-xl border border-zinc-700 bg-black px-4 text-white outline-none focus:bg-[#2B3494]'
                >
                  <option value=''>Select Body Type</option>
                  <option value='SUV'>SUV</option>
                  <option value='Sedan'>Sedan</option>
                  <option value='Hatchback'>Hatchback</option>
                  <option value='MUV'>MUV</option>
                  <option value='Coupe'>Coupe</option>
                  <option value='Convertible'>Convertible</option>
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
                  <option value=''>Select Budget</option>
                  <option value='Below ₹5 Lakh'>Below ₹5 Lakh</option>
                  <option value='₹5 - ₹8 Lakh'>₹5 - ₹8 Lakh</option>
                  <option value='₹8 - ₹12 Lakh'>₹8 - ₹12 Lakh</option>
                  <option value='₹12 - ₹20 Lakh'>₹12 - ₹20 Lakh</option>
                  <option value='Above ₹20 Lakh'>Above ₹20 Lakh</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className='mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2B3494] font-semibold text-white transition hover:bg-indigo-800 disabled:opacity-50 md:w-52'
            >
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}
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