'use client'

import { Search, Phone, Mail, Calendar, Eye } from 'lucide-react'
import { useState } from 'react'

const visitors = [
  {
    id: 1,
    name: 'Ganesh Belote',
    phone: '+91 8421022640',
    email: 'ganesh@gmail.com',
    interested: 'Brezza',
    date: '07 Jul 2026',
    status: 'New'
  },
  {
    id: 2,
    name: 'Rahul Patil',
    phone: '+91 9876543210',
    email: 'rahul@gmail.com',
    interested: 'Swift',
    date: '06 Jul 2026',
    status: 'Contacted'
  },
  {
    id: 3,
    name: 'Abhishek Magar',
    phone: '+91 9765432109',
    email: 'abhishek@gmail.com',
    interested: 'Fronx',
    date: '05 Jul 2026',
    status: 'Visited'
  }
]

export default function VisitorsPage () {
  const [search, setSearch] = useState('')

  const filtered = visitors.filter(visitor =>
    visitor.name.toLowerCase().includes(search.toLowerCase())
  )

  const badgeColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-[#2B3494]'
      case 'Contacted':
        return 'bg-yellow-600'
      case 'Visited':
        return 'bg-green-600'
      default:
        return 'bg-zinc-700'
    }
  }

  return (
    <section className='space-y-6 p-6 lg:p-0'>
      {/* Header */}

      <div className='flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-white sm:text-3xl'>
            Visitors
          </h1>

          <p className='mt-2 text-sm text-zinc-400 sm:text-base'>
            Customers interested in purchasing vehicles.
          </p>
        </div>

        <div className='relative w-full lg:w-80'>
          <Search
            size={18}
            className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500'
          />

          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='Search visitor...'
            className='h-12 w-full rounded-xl border border-zinc-700 bg-black pl-11 pr-4 text-white outline-none transition focus:border-indigo-800'
          />
        </div>
      </div>

      {/* ================= MOBILE ================= */}

      <div className='space-y-4 lg:hidden'>
        {filtered.map(visitor => (
          <div
            key={visitor.id}
            className='rounded-2xl border border-zinc-800 bg-zinc-950 p-5'
          >
            <div className='flex items-start justify-between gap-4'>
              <div>
                <h2 className='text-lg font-semibold text-white'>
                  {visitor.name}
                </h2>

                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium text-white ${badgeColor(
                    visitor.status
                  )}`}
                >
                  {visitor.status}
                </span>
              </div>

              <button className='rounded-xl bg-zinc-800 p-3 transition hover:bg-[#2B3494]'>
                <Eye size={18} className='text-white' />
              </button>
            </div>

            <div className='mt-5 space-y-3 text-sm text-zinc-400'>
              <div className='flex items-center gap-3'>
                <Phone size={16} />
                {visitor.phone}
              </div>

              <div className='flex items-center gap-3 break-all'>
                <Mail size={16} />
                {visitor.email}
              </div>

              <div className='flex items-center gap-3'>
                🚗 {visitor.interested}
              </div>

              <div className='flex items-center gap-3'>
                <Calendar size={16} />
                {visitor.date}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP ================= */}

      <div className='hidden overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 lg:block'>
        <div className='overflow-x-auto'>
          <table className='min-w-full'>
            <thead>
              <tr className='border-b border-zinc-800 text-left text-sm text-zinc-400'>
                <th className='px-6 py-5'>Visitor</th>

                <th>Interested</th>

                <th>Date</th>

                <th>Status</th>

                <th className='w-24'></th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(visitor => (
                <tr
                  key={visitor.id}
                  className='border-b border-zinc-800 transition hover:bg-zinc-900'
                >
                  <td className='px-6 py-5'>
                    <h3 className='font-semibold text-white'>{visitor.name}</h3>

                    <div className='mt-2 space-y-1 text-sm text-zinc-400'>
                      <div className='flex items-center gap-2'>
                        <Phone size={14} />
                        {visitor.phone}
                      </div>

                      <div className='flex items-center gap-2'>
                        <Mail size={14} />
                        {visitor.email}
                      </div>
                    </div>
                  </td>

                  <td className='font-medium text-white'>
                    {visitor.interested}
                  </td>

                  <td>
                    <div className='flex items-center gap-2 text-zinc-300'>
                      <Calendar size={16} />
                      {visitor.date}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium text-white ${badgeColor(
                        visitor.status
                      )}`}
                    >
                      {visitor.status}
                    </span>
                  </td>

                  <td>
                    <button className='rounded-xl bg-zinc-800 p-3 transition hover:bg-[#2B3494]'>
                      <Eye size={18} className='text-white' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
