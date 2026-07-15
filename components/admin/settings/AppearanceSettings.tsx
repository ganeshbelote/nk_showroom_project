'use client'

import { useEffect, useState } from 'react'
import { toast } from '@/components/Toast'

const themes = [
  { name: 'Dark', value: 'dark', color: '#09090b' },
  { name: 'Blue', value: 'blue', color: '#1e3a5f' },
  { name: 'Purple', value: 'purple', color: '#1a1a2e' }
]

export default function AppearanceSettings() {
  const [primaryColor, setPrimaryColor] = useState('#2B3494')
  const [theme, setTheme] = useState('dark')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings')
        const data = await res.json()
        if (data.success) {
          setPrimaryColor(data.settings.primaryColor || '#2B3494')
          setTheme(data.settings.theme || 'dark')
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
        body: JSON.stringify({ primaryColor, theme })
      })
      const data = await res.json()
      if (data.success) toast.success('Appearance settings saved')
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
      <h2 className="mb-8 text-2xl font-semibold text-white">Appearance</h2>

      <div className="space-y-8">
        <div>
          <label className="mb-4 block text-zinc-300">Theme</label>
          <div className="flex gap-4">
            {themes.map(t => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={`flex items-center gap-3 rounded-2xl border px-6 py-4 transition ${
                  theme === t.value
                    ? 'border-indigo-800 bg-zinc-800'
                    : 'border-zinc-700 hover:border-zinc-500'
                }`}
              >
                <div className="h-6 w-6 rounded-full" style={{ backgroundColor: t.color }} />
                <span className="text-white font-medium">{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-zinc-300">Primary Color</label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={primaryColor}
              onChange={e => setPrimaryColor(e.target.value)}
              className="h-12 w-20 rounded-xl border border-zinc-700 bg-black p-1"
            />
            <input
              value={primaryColor}
              onChange={e => setPrimaryColor(e.target.value)}
              className="h-12 flex-1 rounded-xl border border-zinc-700 bg-black px-4 text-white outline-none focus:border-indigo-800"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button onClick={handleSave} disabled={saving} className="rounded-2xl bg-[#2B3494] px-8 py-3 font-semibold text-white transition hover:bg-indigo-800 disabled:opacity-70">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}