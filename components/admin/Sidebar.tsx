'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  CarFront,
  Images,
  Settings,
  LogOut,
  X,
  Users
} from 'lucide-react'

const menus = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    name: 'Vehicles',
    href: '/admin/vehicles',
    icon: CarFront
  },
  {
    name: 'Visitors',
    href: '/admin/visitors',
    icon: Users
  },
  {
    name: 'Carousel',
    href: '/admin/carousel',
    icon: Images
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings
  }
]

interface SidebarProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar ({ open, setOpen }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout () {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.replace('/auth/login')
      router.refresh()
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  return (
    <>
      {/* Overlay */}

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-72 flex-col
          border-r border-zinc-800
          bg-black
          transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          `}
      >
        <div className='flex items-center justify-between border-b border-zinc-800 p-6'>
          <h1 className='text-2xl font-bold text-white'>NK Admin</h1>

          <button onClick={() => setOpen(false)}>
            <X className='text-zinc-400' />
          </button>
        </div>

        <nav className='flex-1 p-4'>
          {menus.map(menu => {
            const Icon = menu.icon

            return (
              <Link
                key={menu.name}
                href={menu.href}
                onClick={() => setOpen(false)}
                className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition

                ${
                  pathname === menu.href
                    ? 'bg-[#2B3494] text-white'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {menu.name}
              </Link>
            )
          })}
        </nav>

        <button
          onClick={handleLogout}
          className='m-4 flex items-center gap-3 rounded-xl border border-zinc-700 p-4 text-zinc-300 transition hover:bg-zinc-900'
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>
    </>
  )
}
