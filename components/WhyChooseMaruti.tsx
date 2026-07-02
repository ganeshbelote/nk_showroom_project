'use client'

import { motion } from 'framer-motion'

const features = [
  {
    title: '5,900+',
    subtitle: 'Service Touchpoints',
    description: 'Nationwide support network across India.'
  },
  {
    title: 'Best Fuel',
    subtitle: 'Efficiency',
    description: 'Class-leading mileage in Petrol & S-CNG variants.'
  },
  {
    title: 'Low Cost',
    subtitle: 'Ownership',
    description: 'Affordable maintenance with genuine spare parts.'
  },
  {
    title: 'Factory Fitted',
    subtitle: 'S-CNG Technology',
    description: 'Safe, reliable and highly efficient CNG systems.'
  },
  {
    title: 'Strong',
    subtitle: 'Resale Value',
    description: 'One of the highest resale values in India.'
  },
  {
    title: 'Enhanced',
    subtitle: 'Safety',
    description: 'Multiple 4 & 5-Star rated vehicles.'
  },
  {
    title: 'Wide',
    subtitle: 'Variant Range',
    description: 'LXi to ZXi+ with Petrol & CNG options.'
  },
  {
    title: 'Pan India',
    subtitle: 'Availability',
    description: 'Sales and service reach even in smaller towns.'
  }
]

export default function WhyChooseMaruti() {
  return (
    <section className='bg-black py-12 text-white'>
      <div className='mx-auto max-w-7xl px-6'>
        {/* Heading */}

        <div className='mb-20'>
          <p className='mb-4 text-sm uppercase tracking-[0.4em] text-zinc-500'>
            Why Choose Maruti Suzuki
          </p>

          <h2 className='text-4xl font-bold uppercase'>
            Trusted By Millions
          </h2>
        </div>

        {/* Grid */}

        <div className='grid grid-cols-1 border border-zinc-800 md:grid-cols-2'>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08
              }}
              className='group relative overflow-hidden border-b border-r border-zinc-800 p-8 md:p-12'
            >
              {/* Hover glow */}

              <div className='absolute inset-0 bg-linear-to-r from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

              <div className='relative z-10'>
                <h3 className='text-3xl font-bold'>
                  {feature.title}
                </h3>

                <h4 className='mt-2 text-xl font-medium text-zinc-300'>
                  {feature.subtitle}
                </h4>

                <p className='mt-5 max-w-sm text-zinc-500'>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}