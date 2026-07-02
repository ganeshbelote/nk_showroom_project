'use client'

import { useState } from 'react'
import { Building2, Phone, Globe, Palette, Search } from 'lucide-react'

import GeneralSettings from '@/components/admin/settings/GeneralSettings'
import ContactSettings from '@/components/admin/settings/ContactSettings'
import SocialSettings from '@/components/admin/settings/SocialSettings'
import SeoSettings from '@/components/admin/settings/SeoSettings'
import AppearanceSettings from '@/components/admin/settings/AppearanceSettings'

const tabs = [
  {
    name: 'General',
    icon: Building2
  },
  {
    name: 'Contact',
    icon: Phone
  },
  {
    name: 'Social',
    icon: Globe
  },
  {
    name: 'SEO',
    icon: Search
  },
  {
    name: 'Appearance',
    icon: Palette
  }
]

export default function SettingsPage () {
  const [tab, setTab] = useState('General')

  return (
    <div className='space-y-8'>
      <div className='space-y-6 p-6 lg:p-8'>
        <div>
          <h1 className='text-4xl font-bold text-white'>Settings</h1>

          <p className='mt-2 text-zinc-400'>Manage website settings.</p>
        </div>

        <div className='flex gap-3 overflow-x-auto'>
          {tabs.map(item => {
            const Icon = item.icon

            return (
              <button
                key={item.name}
                onClick={() => setTab(item.name)}
                className={`flex items-center gap-2 rounded-2xl px-5 py-3 transition ${
                  tab === item.name
                    ? 'bg-[#2B3494] text-white'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            )
          })}
        </div>
      </div>

      {tab === 'General' && <GeneralSettings />}
      {tab === 'Contact' && <ContactSettings />}
      {tab === 'Social' && <SocialSettings />}
      {tab === 'SEO' && <SeoSettings />}
      {tab === 'Appearance' && <AppearanceSettings />}
    </div>
  )
}
