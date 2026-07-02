'use client'

import { Bell, Search, Menu } from 'lucide-react'

interface TopbarProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Topbar ({ setOpen }: TopbarProps) {
  return (
    <header className='sticky top-0 z-30 flex h-20 items-center justify-between border-b border-zinc-800 bg-black/80 px-4 backdrop-blur lg:px-8'>
      {/* Left */}

      <div className='flex items-center gap-4'>
        <button
          onClick={() => setOpen(true)}
          className='rounded-lg border border-zinc-700 p-2 text-zinc-300'
        >
          <Menu size={22} />
        </button>

        <div className='relative hidden md:block'>
          <Search
            size={18}
            className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500'
          />

          <input
            placeholder='Search...'
            className='w-72 rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-12 pr-4 text-white outline-none focus:border-[#2B3494]'
          />
        </div>
      </div>

      {/* Right */}

      <div className='flex items-center gap-5'>
        <button>
          <Bell className='text-zinc-400' />
        </button>

        <div className='flex items-center gap-3'>
          <div className='h-10 w-10 rounded-full bg-[#2B3494]' />

          <div className='hidden sm:block'>
            <p className='font-semibold text-white'>Admin</p>

            <p className='text-sm text-zinc-500'>Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}
