'use client'

import Link from 'next/link'
import { Heart, User, CarFront, ArrowRight, Clock, Eye } from 'lucide-react'

const stats = [
  {
    title: 'Wishlist',
    value: 4,
    icon: Heart,
    href: '/account/wishlist',
    color: 'text-red-500'
  },
  {
    title: 'Profile',
    value: '90%',
    icon: User,
    href: '/account/profile',
    color: 'text-indigo-800'
  },
  {
    title: 'Recently Viewed',
    value: 12,
    icon: Eye,
    href: '/cars',
    color: 'text-green-500'
  },
  {
    title: 'Test Drives',
    value: 2,
    icon: CarFront,
    href: '#',
    color: 'text-yellow-500'
  }
]

const recentActivity = [
  {
    title: 'Added Brezza to Wishlist',
    time: '2 hours ago'
  },
  {
    title: 'Viewed Fronx',
    time: 'Yesterday'
  },
  {
    title: 'Updated Mobile Number',
    time: '3 days ago'
  },
  {
    title: 'Visited Grand Vitara Details',
    time: 'Last Week'
  }
]

export default function AccountPage () {
  return (
    <main className='mx-auto min-h-screen max-w-7xl px-4 py-8 md:px-8'>
      {/* Header */}

      <div className='rounded-3xl border border-zinc-800 bg-linear-to-r from-zinc-950 via-zinc-900 to-blue-950/30 p-6 md:p-10'>
        <p className='text-zinc-400'>Welcome Back 👋</p>

        <h1 className='mt-2 text-3xl font-bold text-white md:text-5xl'>
          Ganesh Belote
        </h1>

        <p className='mt-4 max-w-2xl text-zinc-400'>
          Manage your profile, saved vehicles and keep track of your favourite
          cars.
        </p>
      </div>

      {/* Cards */}

      <section className='mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4'>
        {stats.map(item => {
          const Icon = item.icon

          return (
            <Link
              key={item.title}
              href={item.href}
              className='group rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-[#2B3494] hover:bg-zinc-900'
            >
              <div className='flex items-center justify-between'>
                <div className={`rounded-2xl bg-black p-4 ${item.color}`}>
                  <Icon size={26} />
                </div>

                <ArrowRight
                  size={18}
                  className='text-zinc-500 transition group-hover:translate-x-1'
                />
              </div>

              <h2 className='mt-6 text-lg font-semibold text-white'>
                {item.title}
              </h2>

              <p className='mt-2 text-3xl font-bold text-indigo-800'>
                {item.value}
              </p>
            </Link>
          )
        })}
      </section>

      {/* Bottom */}

      <section className='mt-8 grid gap-8 lg:grid-cols-[1fr_380px]'>
        {/* Recent */}

        <div className='rounded-3xl border border-zinc-800 bg-zinc-950 p-6'>
          <h2 className='mb-6 text-2xl font-bold text-white'>
            Recent Activity
          </h2>

          <div className='space-y-4'>
            {recentActivity.map((item, index) => (
              <div
                key={index}
                className='flex items-center justify-between rounded-2xl border border-zinc-800 bg-black p-4'
              >
                <div>
                  <p className='font-medium text-white'>{item.title}</p>

                  <div className='mt-2 flex items-center gap-2 text-sm text-zinc-500'>
                    <Clock size={15} />

                    {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile */}

        <div className='rounded-3xl border border-zinc-800 bg-zinc-950 p-6'>
          <div className='flex flex-col items-center'>
            <div className='flex h-28 w-28 items-center justify-center rounded-full bg-[#2B3494] text-4xl font-bold text-white'>
              G
            </div>

            <h2 className='mt-5 text-2xl font-bold text-white'>
              Ganesh Belote
            </h2>

            <p className='mt-1 text-zinc-400'>ganesh@gmail.com</p>
          </div>

          <div className='mt-8 space-y-4'>
            <div className='flex justify-between rounded-xl border border-zinc-800 bg-black p-4'>
              <span className='text-zinc-400'>Mobile</span>

              <span className='text-white'>+91 8421022640</span>
            </div>

            <div className='flex justify-between rounded-xl border border-zinc-800 bg-black p-4'>
              <span className='text-zinc-400'>Wishlist</span>

              <span className='text-white'>4 Cars</span>
            </div>

            <div className='flex justify-between rounded-xl border border-zinc-800 bg-black p-4'>
              <span className='text-zinc-400'>Member Since</span>

              <span className='text-white'>2026</span>
            </div>
          </div>

          <Link
            href='/account/profile'
            className='mt-8 flex h-12 items-center justify-center rounded-xl bg-[#2B3494] font-semibold text-white transition hover:bg-indigo-800'
          >
            Edit Profile
          </Link>
        </div>
      </section>
    </main>
  )
}
