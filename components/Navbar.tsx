'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import MenuBtn from './MenuBtn'
import { useRouter } from 'next/navigation'
import { toast } from './Toast'

const Navbar = ({
  setShowPopup
}: {
  setShowPopup: Dispatch<SetStateAction<boolean>>
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setIsLoggedIn(data.success))
      .catch(() => setIsLoggedIn(false))
  }, [])

  const handleShare = async () => {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'NK Car Showroom',
          text: 'Check out NK Car Showroom - Maruti Suzuki',
          url
        })
      } catch {
        // User cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        toast.success('Link copied to clipboard')
      } catch {
        toast.error('Failed to copy link')
      }
    }
  }

  const menuOptions = [
    {
      name: 'profile',
      action: () => router.push(isLoggedIn ? '/account' : '/auth/login')
    },
    { name: 'share', action: handleShare },
    { name: 'contact', action: () => router.push('/dealer') }
  ]

  return (
    <nav className='w-full px-4 pt-4'>
      <div className='mx-auto max-w-7xl'>
        {/* Top Navbar */}
        <div className='relative'>
          <div className='flex items-center justify-between gap-20 sm:gap-0 lg:gap-0 md:gap-0 rounded-full bg-black px-6 py-4'>
            {/* Logo */}
            <div className='flex items-center gap-3'>
              {/* Replace with your SVG */}
              <img src='/logo.svg' alt='Maruti Suzuki' className='h-6 w-auto' />
            </div>

            {/* Menu Button */}
            <MenuBtn active={showMenu} onToggle={setShowMenu} />
          </div>

          {/* Menu */}
          <div
            className={`absolute left-0 right-0 z-50 mt-4 overflow-hidden rounded-4xl bg-black transition-all duration-300 ${
              showMenu
                ? 'translate-y-0 opacity-100'
                : '-translate-y-4 pointer-events-none opacity-0'
            }`}
          >
            <ul className='p-6'>
              {menuOptions.map(option => (
                <li key={option.name}>
                  <button
                    onClick={() => {
                      option.action()
                      setShowMenu(false)
                    }}
                    className='w-full rounded-2xl px-6 py-4 text-left text-xl text-white transition hover:bg-zinc-900 active:bg-zinc-900'
                  >
                    {option.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar