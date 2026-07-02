'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const reviews = [
  {
    name: 'Rahul Sharma',
    car: 'Brezza ZXi+ Owner',
    review:
      'Excellent experience from booking to delivery. Highly recommended.'
  },
  {
    name: 'Amit Patil',
    car: 'Swift VXi Owner',
    review:
      'Very professional and transparent. Explained everything clearly.'
  },
  {
    name: 'Neha Deshmukh',
    car: 'Baleno Owner',
    review:
      'Smooth process and excellent support throughout the purchase.'
  },
  {
    name: 'Sagar More',
    car: 'Ertiga Owner',
    review:
      'Great knowledge about all variants and financing options.'
  }
]

export default function TestimonialsCarousel() {
  return (
    <section className='bg-black pb-24'>
      <div className='mx-auto max-w-7xl px-6'>
        <h2 className='mb-14 text-center text-4xl font-bold uppercase text-white'>
          What Our Customers Say
        </h2>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.5
              }}
              className='rounded-3xl border border-zinc-800 bg-zinc-950 p-6'
            >
              <div className='mb-4 flex gap-1'>
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={18}
                    className='fill-indigo-800 text-indigo-800'
                  />
                ))}
              </div>

              <p className='min-h-30 text-zinc-300'>
                {review.review}
              </p>

              <div className='mt-6 border-t border-zinc-800 pt-4'>
                <h4 className='font-semibold text-white'>
                  {review.name}
                </h4>

                <p className='text-sm text-zinc-500'>
                  {review.car}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}