'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

const INITIAL_CAROUSEL_DATA = [
  {
    id: 1,
    image: '/Fronx.png',
    tag: 'GALLERY',
    tagColor: 'orange',
    title: 'Board Review: John John Florence and Jon Pyzel',
    date: 'Yesterday'
  },
  {
    id: 2,
    image: '/Vitara.png',
    tag: 'NEWS',
    tagColor: 'red',
    title: 'Ultimate Guide to Understanding Neoprene',
    date: 'Yesterday'
  },
  {
    id: 3,
    image: '/Brezza.png',
    tag: 'NEWS',
    tagColor: 'red',
    title: 'Hawaii Is the Place to Be (During Quarantine)',
    date: '2 days ago'
  }
  // If you have more than 3 items, they will seamlessly cycle here too!
]

const Carousel = () => {
  // We keep the dynamic visible items order in state to rotate seamlessly
  const [items, setItems] = useState(INITIAL_CAROUSEL_DATA)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right

  // Handle Next Slide (Shift first item to the end)
  const handleNext = useCallback(() => {
    setDirection(1)
    setItems(prevItems => {
      const [first, ...rest] = prevItems
      return [...rest, first]
    })
  }, [])

  // Handle Prev Slide (Shift last item to the front)
  const handlePrev = useCallback(() => {
    setDirection(-1)
    setItems(prevItems => {
      const last = prevItems[prevItems.length - 1]
      const rest = prevItems.slice(0, -1)
      return [last, ...rest]
    })
  }, [])

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(handleNext, 4500)
    return () => clearInterval(interval)
  }, [handleNext])

  return (
    <div className='carousel w-full text-white px-4 min-h-165 flex flex-col justify-center overflow-hidden'>
      <div className='max-w-6xl mx-auto w-full overflow-hidden'>
        {/* Carousel Viewport Container */}
        <div className='relative h-140 w-full flex items-center justify-center clean-viewport'>
          <div className='flex items-center justify-center gap-6 w-full max-w-5xl h-full'>
            {/* Display exactly 3 items at a time based on our rotated state */}
            {items.slice(0, 3).map((card, index) => {
              // Index 1 is ALWAYS the middle element in a 3-wide display
              const isCenter = index === 1

              return (
                <motion.div
                  key={card.id}
                  layout // Smoothly morphs layout/sizing changes
                  initial={{ opacity: 0.8 }}
                  animate={{
                    opacity: 1,
                    // Center card is dominant widthwise, side cards are standard
                    width: isCenter ? '85%' : '20%',
                    height: isCenter ? '480px' : '460px',
                    zIndex: isCenter ? 10 : 1,
                  }}
                  exit={{ opacity: 0.8 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    zIndex: { duration: 0 }
                  }}
                  className='relative rounded-3xl overflow-hidden shadow-2xl shrink-0 bg-zinc-900 border border-zinc-800'
                >
                  {/* Image Background */}
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes='(max-w-768px) 100vw, 420px'
                    className='object-cover transition-transform duration-700 group-hover:scale-110'
                    priority={isCenter}
                  />

                  {/* Overlay Gradient */}
                  <div className='absolute inset-0 bg-linear-to-b from-black/10 via-black/40 to-black/95' />

                  {/* Content Container */}
                  <div className='absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end'>
                    <h3
                      className={`font-bold text-white leading-tight mb-3 transition-all duration-300 ${
                        isCenter ? 'text-2xl' : 'text-lg line-clamp-2'
                      }`}
                    >
                      {card.title}
                    </h3>
                    <p className='text-zinc-400 text-sm mb-6'>{card.date}</p>

                    <a
                      href='#'
                      className='inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-emerald-400 transition-colors w-fit'
                    >
                      Read more <span className='text-base'>→</span>
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className='flex justify-center items-center mb-8 px-4'>
          <div className='flex gap-3'>
            <button
              onClick={handlePrev}
              className='p-3 rounded-full bg-black border border-zinc-800 hover:bg-zinc-800 transition-colors group'
              aria-label='Previous slide'
            >
              <ChevronLeft className='w-5 h-5 text-zinc-400 group-hover:text-white transition-colors' />
            </button>
            <button
              onClick={handleNext}
              className='p-3 rounded-full bg-black border border-zinc-800 hover:bg-zinc-800 transition-colors group'
              aria-label='Next slide'
            >
              <ChevronRight className='w-5 h-5 text-zinc-400 group-hover:text-white transition-colors' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel
