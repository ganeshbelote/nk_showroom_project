'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  User,
  Heart,
  CarFront,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

const menus = [
  {
    name: 'Dashboard',
    href: '/account',
    icon: LayoutDashboard
  },
  {
    name: 'Profile',
    href: '/account/profile',
    icon: User
  },
  {
    name: 'Wishlist',
    href: '/account/wishlist',
    icon: Heart
  }
]

export default function AccountNavbar () {
  const pathname = usePathname()

  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Header */}

      <header className='sticky top-0 z-50 border-b border-zinc-800 bg-black/95 backdrop-blur'>
        <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8'>
          <Link href='/' className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#2B3494]'>
              <CarFront size={20} className='text-white' />
            </div>

            <div>
              <h2 className='font-bold text-white'>NK Cars</h2>

              <p className='text-xs text-zinc-500'>Customer Portal</p>
            </div>
          </Link>

          {/* Desktop */}

          <nav className='hidden items-center gap-2 lg:flex'>
            {menus.map(menu => {
              const Icon = menu.icon

              const active = pathname === menu.href

              return (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className={`flex items-center gap-2 rounded-xl px-5 py-3 transition ${
                    active
                      ? 'bg-[#2B3494] text-white'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {menu.name}
                </Link>
              )
            })}
          </nav>

          {/* Right */}

          <div className='flex items-center gap-3'>
            <button className='hidden rounded-xl border border-zinc-700 px-5 py-2 text-zinc-300 transition hover:bg-zinc-900 lg:flex'>
              Logout
            </button>

            <button
              onClick={() => setOpen(true)}
              className='rounded-xl border border-zinc-700 p-2 text-white lg:hidden'
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/70 transition lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-72 flex-col border-l border-zinc-800 bg-black transition-transform duration-300 lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between border-b border-zinc-800 p-5'>
          <h2 className='text-xl font-bold text-white'>My Account</h2>

          <button onClick={() => setOpen(false)}>
            <X className='text-white' />
          </button>
        </div>

        <nav className='flex-1 p-4'>
          {menus.map(menu => {
            const Icon = menu.icon

            const active = pathname === menu.href

            return (
              <Link
                key={menu.href}
                href={menu.href}
                onClick={() => setOpen(false)}
                className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  active
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

        <button className='m-4 flex items-center justify-center gap-2 rounded-xl border border-zinc-700 py-3 text-zinc-300 transition hover:bg-zinc-900'>
          <LogOut size={18} />
          Logout
        </button>
      </aside>
    </>
  )
}
