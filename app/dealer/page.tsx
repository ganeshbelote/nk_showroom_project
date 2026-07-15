'use client'

import { motion } from 'framer-motion'
import { Star, ShieldCheck, Users, ArrowLeft } from 'lucide-react'
import ColoredBtn from '@/components/ColoredBtn'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function DealerPage() {
  return (
    <main className='min-h-screen bg-black'>
      {/* Sticky Header */}
      <header className='sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-xl'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8'>
          <Link
            href='/'
            className='rounded-xl border border-zinc-700 p-3 transition hover:border-indigo-800'
          >
            <ArrowLeft size={20} className='text-white' />
          </Link>

          <div>
            <h1 className='text-lg font-semibold text-white md:text-2xl'>
              Contact Dealer
            </h1>
            <p className='hidden text-sm text-zinc-500 sm:block text-right'>
              Get in touch with our expert
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className='bg-black py-12'>
        <div className='mx-auto max-w-7xl px-6'>
          <div className='overflow-hidden rounded-4xl border border-zinc-800 bg-linear-to-b from-zinc-950 to-black p-8 lg:p-12'>
            <div className='grid gap-12 lg:grid-cols-[420px_1fr]'>
              {/* IMAGE */}
              <motion.div
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                <div className='overflow-hidden rounded-[28px] border border-zinc-800'>
                  <img
                    src='/nik.png'
                    alt='Nikhil Kane - Sales Consultant'
                    className='h-86 lg:h-140 w-full object-cover'
                  />
                </div>
              </motion.div>

              {/* CONTENT */}
              <motion.div
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                <p className='mb-4 text-sm uppercase tracking-[0.35em] text-indigo-800'>
                  Meet Your Vehicle Expert
                </p>

                <h2 className='text-3xl font-bold text-white'>Nikhil Kane</h2>

                <p className='mt-3 text-2xl text-zinc-400'>Sales Consultant</p>

                <div className='mt-8 flex flex-wrap items-center gap-4 text-white'>
                  <div className='flex items-center gap-2'>
                    <Star className='fill-indigo-800 text-indigo-800' size={24} />
                    <span className='text-2xl font-bold'>4.9</span>
                    <span className='text-zinc-500'>/ 5</span>
                  </div>

                  <div className='h-8 w-px bg-zinc-700' />

                  <span className='text-xl text-zinc-400'>
                    127 Happy Customers
                  </span>
                </div>

                <p className='mt-8 max-w-2xl text-lg leading-8 text-zinc-400'>
                  Helping families choose the perfect Maruti Suzuki vehicle with
                  transparent pricing, expert guidance and personalized support
                  from enquiry to delivery.
                </p>

                {/* STATS */}
                <div className='mt-10 grid gap-4 md:grid-cols-3'>
                  <StatCard
                    icon={<Users size={24} />}
                    value='127+'
                    label='Reviews'
                  />

                  <StatCard
                    icon={<Star size={24} />}
                    value='4.9★'
                    label='Rating'
                  />

                  <StatCard
                    icon={<ShieldCheck size={24} />}
                    value='5 Years+'
                    label='Experience'
                  />
                </div>

                {/* Contact Info */}
                <div className='mt-10 space-y-4'>
                  <div className='rounded-2xl border border-zinc-800 bg-zinc-950 p-6'>
                    <p className='text-sm text-zinc-400'>Phone</p>
                    <p className='mt-1 text-xl font-semibold text-white'>
                      +91 98765 43210
                    </p>
                  </div>

                  <div className='rounded-2xl border border-zinc-800 bg-zinc-950 p-6'>
                    <p className='text-sm text-zinc-400'>Email</p>
                    <p className='mt-1 text-xl font-semibold text-white break-all'>
                      nikhil.kane@marutisuzuki.com
                    </p>
                  </div>

                  <div className='rounded-2xl border border-zinc-800 bg-zinc-950 p-6'>
                    <p className='text-sm text-zinc-400'>Address</p>
                    <p className='mt-1 text-xl font-semibold text-white'>
                      Maruti Suzuki Showroom, Shirur, Maharashtra
                    </p>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className='mt-10 flex flex-wrap gap-4'>
                  <a
                    href='tel:+919876543210'
                    className='inline-flex'
                  >
                    <ColoredBtn
                      Content='Call Now'
                      Border={true}
                      Animated={true}
                      Color='blue'
                    />
                  </a>

                  <a
                    href='https://wa.me/919876543210'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex'
                  >
                    <ColoredBtn
                      Content='WhatsApp'
                      Border={true}
                      Animated={true}
                      Color='green'
                    />
                  </a>

                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function StatCard({
  icon,
  value,
  label
}: {
  icon: React.ReactNode
  value: string
  label: string
}) {
  return (
    <div className='rounded-2xl border border-zinc-800 bg-zinc-950 p-6'>
      <div className='mb-4 text-indigo-800'>{icon}</div>

      <div className='text-3xl font-bold text-white'>{value}</div>

      <div className='text-zinc-400'>{label}</div>
    </div>
  )
}