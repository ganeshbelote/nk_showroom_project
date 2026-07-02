'use client'

import { useState } from 'react'
import { Star, ThumbsUp } from 'lucide-react'

interface Review {
  id: number
  name: string
  rating: number
  date: string
  title: string
  review: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Rahul Patil',
    rating: 5,
    date: '12 Jul 2026',
    title: 'Excellent Family SUV',
    review:
      'Very comfortable ride quality, smooth engine and amazing mileage. Interior feels premium and the feature list is excellent.'
  },
  {
    id: 2,
    name: 'Ganesh Belote',
    rating: 4,
    date: '09 Jul 2026',
    title: 'Value For Money',
    review:
      'Overall a great package. Looks amazing, good performance and enough features for daily driving.'
  },
  {
    id: 3,
    name: 'Abhishek Magar',
    rating: 5,
    date: '03 Jul 2026',
    title: 'Loved It',
    review:
      'Purchased recently and the driving experience is fantastic. Cabin is silent and suspension is very comfortable.'
  }
]

export default function CarReviews () {
  const [sort, setSort] = useState('Latest')

  return (
    <section className='rounded-3xl border border-zinc-800 bg-zinc-950 p-5 md:p-8'>
      <div className='mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between'>
        <div>
          <h2 className='text-3xl font-bold text-white'>Customer Reviews</h2>

          <p className='mt-2 text-zinc-400'>
            Real experiences shared by our customers.
          </p>
        </div>

        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className='rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none'
        >
          <option>Latest</option>
          <option>Highest Rating</option>
          <option>Lowest Rating</option>
        </select>
      </div>

      <div className='mb-10 grid gap-5 md:grid-cols-3'>
        <div className='rounded-2xl border border-zinc-800 bg-black p-6'>
          <p className='text-6xl font-bold text-white'>4.8</p>

          <div className='mt-4 flex gap-1'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={20}
                fill='#facc15'
                className='text-yellow-400'
              />
            ))}
          </div>

          <p className='mt-3 text-zinc-400'>Based on 315 Reviews</p>
        </div>

        <div className='rounded-2xl border border-zinc-800 bg-black p-6'>
          <h3 className='text-lg font-semibold text-white'>Recommendation</h3>

          <p className='mt-4 text-5xl font-bold text-indigo-800'>96%</p>

          <p className='mt-3 text-zinc-400'>Buyers recommend this vehicle.</p>
        </div>

        <div className='rounded-2xl border border-zinc-800 bg-black p-6'>
          <h3 className='text-lg font-semibold text-white'>Total Ratings</h3>

          <p className='mt-4 text-5xl font-bold text-green-500'>315</p>

          <p className='mt-3 text-zinc-400'>Verified customer reviews.</p>
        </div>
      </div>

      <div className='space-y-6'>
        {reviews.map(review => (
          <div
            key={review.id}
            className='rounded-2xl border border-zinc-800 bg-black p-6'
          >
            <div className='flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between'>
              <div>
                <h3 className='text-xl font-semibold text-white'>
                  {review.title}
                </h3>

                <p className='mt-2 text-sm text-zinc-500'>
                  {review.name} • {review.date}
                </p>

                <div className='mt-4 flex gap-1'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < review.rating ? '#facc15' : 'transparent'}
                      className={
                        i < review.rating ? 'text-yellow-400' : 'text-zinc-600'
                      }
                    />
                  ))}
                </div>
              </div>

              <button className='flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2 text-zinc-300 transition hover:border-indigo-800 hover:text-white'>
                <ThumbsUp size={18} />
                Helpful
              </button>
            </div>

            <p className='mt-6 leading-7 text-zinc-300'>{review.review}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
