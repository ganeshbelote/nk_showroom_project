'use client'

import { useMemo, useState } from 'react'
import { Star, ThumbsUp } from 'lucide-react'

type Review = {
  id: string
  rating: number
  title: string | null
  comment: string
  createdAt: string

  user: {
    fullName: string
    avatar: string | null
  }
}

type Props = {
  reviews: Review[]
}

export default function CarReviews({ reviews }: Props) {
  const [sort, setSort] = useState('Latest')

  const sortedReviews = useMemo(() => {
    const data = [...reviews]

    switch (sort) {
      case 'Highest Rating':
        return data.sort((a, b) => b.rating - a.rating)

      case 'Lowest Rating':
        return data.sort((a, b) => a.rating - b.rating)

      default:
        return data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        )
    }
  }, [reviews, sort])

  const totalReviews = reviews.length

  const averageRating =
    totalReviews === 0
      ? 0
      : (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          totalReviews
        ).toFixed(1)

  const recommendation =
    totalReviews === 0
      ? 0
      : Math.round(
          (reviews.filter(r => r.rating >= 4).length / totalReviews) * 100
        )

  return (
    <section className='mx-auto max-w-7xl px-6 py-20'>
      <div className='mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center'>
        <div>
          <h2 className='text-4xl font-bold text-white'>
            Customer Reviews
          </h2>

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
          <p className='text-6xl font-bold text-white'>
            {averageRating}
          </p>

          <div className='mt-4 flex gap-1'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={20}
                fill={
                  i < Math.round(Number(averageRating))
                    ? '#facc15'
                    : 'transparent'
                }
                className={
                  i < Math.round(Number(averageRating))
                    ? 'text-yellow-400'
                    : 'text-zinc-600'
                }
              />
            ))}
          </div>

          <p className='mt-3 text-zinc-400'>
            Based on {totalReviews} Reviews
          </p>
        </div>

        <div className='rounded-2xl border border-zinc-800 bg-black p-6'>
          <h3 className='text-lg font-semibold text-white'>
            Recommendation
          </h3>

          <p className='mt-4 text-5xl font-bold text-indigo-800'>
            {recommendation}%
          </p>

          <p className='mt-3 text-zinc-400'>
            Buyers recommend this vehicle.
          </p>
        </div>

        <div className='rounded-2xl border border-zinc-800 bg-black p-6'>
          <h3 className='text-lg font-semibold text-white'>
            Total Ratings
          </h3>

          <p className='mt-4 text-5xl font-bold text-green-500'>
            {totalReviews}
          </p>

          <p className='mt-3 text-zinc-400'>
            Verified customer reviews.
          </p>
        </div>
      </div>

      {sortedReviews.length === 0 ? (
        <div className='rounded-2xl border border-zinc-800 bg-black p-10 text-center text-zinc-400'>
          No reviews yet.
        </div>
      ) : (
        <div className='space-y-6'>
          {sortedReviews.map(review => (
            <div
              key={review.id}
              className='rounded-2xl border border-zinc-800 bg-black p-6'
            >
              <div className='flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between'>
                <div>
                  <h3 className='text-xl font-semibold text-white'>
                    {review.title || 'Customer Review'}
                  </h3>

                  <p className='mt-2 text-sm text-zinc-500'>
                    {review.user.fullName} •{' '}
                    {new Date(review.createdAt).toLocaleDateString(
                      'en-IN',
                      {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      }
                    )}
                  </p>

                  <div className='mt-4 flex gap-1'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill={
                          i < review.rating
                            ? '#facc15'
                            : 'transparent'
                        }
                        className={
                          i < review.rating
                            ? 'text-yellow-400'
                            : 'text-zinc-600'
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

              <p className='mt-6 leading-7 text-zinc-300'>
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}