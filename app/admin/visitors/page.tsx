'use client'

import { useEffect, useState } from 'react'
import { Search, Phone, Mail, Calendar, Users, CheckCircle } from 'lucide-react'
import { toast } from '@/components/Toast'

type Visitor = {
  id: string
  name: string
  phone: string
  email: string
  interested: string
  message: string | null
  status: string
  city: string | null
  state: string | null
  createdAt: string
}

export default function VisitorsPage () {
  const [search, setSearch] = useState('')
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [loading, setLoading] = useState(true)

  const fetchVisitors = async () => {
    try {
      const res = await fetch('/api/visitors')
      const data = await res.json()
      if (data.success) {
        setVisitors(data.visitors || [])
      } else {
        toast.error(data.message || 'Failed to load visitors')
      }
    } catch (err) {
      console.error('Visitors fetch error:', err)
      toast.error('Failed to load visitors. Check console.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchVisitors() }, [])

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/visitors', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      })
      const data = await res.json()
      if (data.success) {
        setVisitors(prev => prev.map(v => v.id === id ? { ...v, status } : v))
        toast.success('Status updated')
      }
    } catch {
      toast.error('Failed to update status')
    }
  }

  const filtered = visitors.filter(visitor =>
    visitor.name.toLowerCase().includes(search.toLowerCase()) ||
    visitor.email.toLowerCase().includes(search.toLowerCase()) ||
    visitor.phone.includes(search)
  )

  const badgeColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-[#2B3494]'
      case 'Contacted': return 'bg-yellow-600'
      case 'Visited': return 'bg-green-600'
      case 'Closed': return 'bg-zinc-600'
      default: return 'bg-zinc-700'
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    })
  }

  if (loading) {
    return (
      <section className='space-y-6 p-6 lg:p-0'>
        <div className='h-8 w-48 animate-pulse rounded bg-zinc-800' />
        <div className='h-64 animate-pulse rounded-3xl bg-zinc-900' />
      </section>
    )
  }

  return (
    <section className='space-y-6 p-6 lg:p-0'>
      <div className='flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-white sm:text-3xl'>Visitors</h1>
          <p className='mt-2 text-sm text-zinc-400 sm:text-base'>
            Registered users interested in purchasing vehicles.
          </p>
        </div>

        <div className='relative w-full lg:w-80'>
          <Search size={18} className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500' />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='Search visitor...'
            className='h-12 w-full rounded-xl border border-zinc-700 bg-black pl-11 pr-4 text-white outline-none transition focus:border-indigo-800'
          />
        </div>
      </div>

      {loading ? (
        <div className='h-64 animate-pulse rounded-3xl bg-zinc-900' />
      ) : filtered.length === 0 ? (
        <div className='flex flex-col items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-950 py-20 text-zinc-500'>
          <Users size={48} className='mb-4 text-zinc-700' />
          <p className='text-lg font-medium'>No visitors found</p>
          <p className='mt-1 text-sm text-zinc-600'>
            {visitors.length === 0
              ? 'No users have registered yet.'
              : 'Try a different search term.'}
          </p>
        </div>
      ) : (
        <>
          {/* MOBILE */}
          <div className='space-y-4 lg:hidden'>
            {filtered.map(visitor => (
              <div key={visitor.id} className='rounded-2xl border border-zinc-800 bg-zinc-950 p-5'>
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <h2 className='text-lg font-semibold text-white'>{visitor.name}</h2>
                    <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium text-white ${badgeColor(visitor.status)}`}>
                      {visitor.status}
                    </span>
                  </div>
                </div>

                <div className='mt-5 space-y-3 text-sm text-zinc-400'>
                  <div className='flex items-center gap-3'><Phone size={16} />{visitor.phone}</div>
                  <div className='flex items-center gap-3 break-all'><Mail size={16} />{visitor.email}</div>
                  <div className='flex items-center gap-3'>🚗 {visitor.interested}</div>
                  {visitor.message && <div className='flex items-center gap-3'>💬 {visitor.message}</div>}
                  <div className='flex items-center gap-3'><Calendar size={16} />{formatDate(visitor.createdAt)}</div>
                </div>

                <div className='mt-4 flex gap-2'>
                  {['New', 'Contacted'].map(s => (
                    <button
                      key={s}
                      onClick={() => updateStatus(visitor.id, s)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                        visitor.status === s
                          ? badgeColor(s) + ' text-white'
                          : 'bg-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {s === 'Contacted' ? <span className='flex items-center gap-1'><CheckCircle size={14} /> Contacted</span> : s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP */}
          <div className='hidden overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 lg:block'>
            <div className='overflow-x-auto'>
              <table className='min-w-full'>
                <thead>
                  <tr className='border-b border-zinc-800 text-left text-sm text-zinc-400'>
                    <th className='px-6 py-5'>Visitor</th>
                    <th>Interested</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th className='w-40'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(visitor => (
                    <tr key={visitor.id} className='border-b border-zinc-800 transition hover:bg-zinc-900'>
                      <td className='px-6 py-5'>
                        <h3 className='font-semibold text-white'>{visitor.name}</h3>
                        <div className='mt-2 space-y-1 text-sm text-zinc-400'>
                          <div className='flex items-center gap-2'><Phone size={14} />{visitor.phone}</div>
                          <div className='flex items-center gap-2'><Mail size={14} />{visitor.email}</div>
                        </div>
                      </td>
                      <td className='font-medium text-white'>{visitor.interested}</td>
                      <td>
                        <div className='flex items-center gap-2 text-zinc-300'>
                          <Calendar size={16} />{formatDate(visitor.createdAt)}
                        </div>
                      </td>
                      <td>
                        <span className={`rounded-full px-2 py-1 text-sm font-medium text-white ${badgeColor(visitor.status)}`}>
                          {visitor.status}
                        </span>
                      </td>
                      <td>
                        <div className='flex gap-1'>
                          {['New', 'Contacted'].map(s => (
                            <button
                              key={s}
                              onClick={() => updateStatus(visitor.id, s)}
                              className={`rounded-lg px-2 py-1.5 text-xs font-medium transition ${
                                visitor.status === s
                                  ? badgeColor(s) + ' text-white'
                                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
                              }`}
                            >
                              {s === 'Contacted' ? 'Mark Contacted' : s}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </section>
  )
}