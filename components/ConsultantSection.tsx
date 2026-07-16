'use client'

import { motion } from 'framer-motion'
import { Star, ShieldCheck, Users } from 'lucide-react'
import ColoredBtn from './ColoredBtn'
import { useRouter } from 'next/navigation'

export default function ConsultantSection () {
  const router = useRouter()

  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/919322608402?text=Hi%20I%20want%20to%20know%20more%20about%20your%20cars.',
      '_blank'
    )
  }

  return (
    <section className='bg-black py-12'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='overflow-hidden rounded-4xl border border-zinc-800 bg-linear-to-b from-zinc-950 to-black p-8 lg:p-12'>
          <div className='grid gap-12 lg:grid-cols-[420px_1fr]'>
            {/* IMAGE */}

            <motion.div
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className='overflow-hidden rounded-[28px] border border-zinc-800'>
                <img
                  src='/nik.png'
                  alt='consultant'
                  className='h-86 lg:h-140 w-full object-cover'
                />
              </div>
            </motion.div>

            {/* CONTENT */}

            <motion.div
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className='mb-4 text-sm uppercase tracking-[0.35em] text-indigo-800'>
                Meet Your Vehicle Expert
              </p>

              <h2 className='text-3xl font-bold text-white'>Nikhil Kane</h2>

              <p className='mt-3 text-2xl text-zinc-400'>Sales Consultant</p>

              {/* BUTTONS */}

              <div className='mt-10 flex flex-wrap gap-4'>
                <ColoredBtn
                  onClick={() => router.push('/dealer')}
                  Content='Book Test Drive'
                  Border={true}
                  Animated={true}
                  Color='blue'
                />

                <ColoredBtn
                  onClick={handleWhatsApp}
                  Content='WhatsApp'
                  Border={true}
                  Animated={true}
                  Color='green'
                />
              </div>

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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard ({
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
