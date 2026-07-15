'use client'

import { useEffect, useState } from 'react'
import { toast } from '@/components/Toast'

export default function GeneralSettings() {
  const [showroomName, setShowroomName] = useState('')
  const [tagline, setTagline] = useState('')
  const [copyright, setCopyright] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings')
        const data = await res.json()
        if (data.success) {
          setShowroomName(data.settings.showroomName || '')
          setTagline(data.settings.tagline || '')
          setCopyright(data.settings.copyright || '')
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          showroomName,
          tagline,
          copyright
        })
      })
      const data = await res.json()
      if (data.success) toast.success('Settings saved')
      else toast.error(data.message)
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className='rounded-3xl border border-zinc-800 bg-zinc-900 p-6 lg:p-8'>
      <div className='h-8 w-48 animate-pulse rounded bg-zinc-800' />
    </div>
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 lg:p-8">
      <h2 className="mb-8 text-2xl font-semibold text-white">General Settings</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <Input
          label="Showroom Name"
          value={showroomName}
          onChange={setShowroomName}
          placeholder="NK Car Showroom"
        />
        <Input
          label="Tagline"
          value={tagline}
          onChange={setTagline}
          placeholder="Drive Your Dream"
        />
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-zinc-300">Footer Copyright</label>
        <textarea
          value={copyright}
          onChange={e => setCopyright(e.target.value)}
          rows={3}
          placeholder="© 2026 NK Car Showroom. All Rights Reserved."
          className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition focus:border-indigo-800"
        />
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-2xl bg-[#2B3494] px-8 py-3 font-semibold text-white transition hover:bg-indigo-800 disabled:opacity-70"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

function Input({
  label,
  value,
  onChange,
  placeholder
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  return (
    <div>
      <label className="mb-2 block text-zinc-300">{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition focus:border-indigo-800"
      />
    </div>
  )
}