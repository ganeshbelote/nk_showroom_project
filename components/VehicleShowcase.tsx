'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ColoredBtn from './ColoredBtn'

const vehicles = [
  {
    name: 'GRAND VITARA',
    price: '₹11.42L - ₹20.68L',
    image:
      'https://auto.mahindra.com/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwe61fbdd2/images/X7XO/xlarge/AX7L_624x296_RubyVelvet.png'
  },
  {
    name: 'BREZZA',
    price: '₹8.69L - ₹14.14L',
    image:
      'https://auto.mahindra.com/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw95b25431/images/TH5D/xlarge/Thar_Roxx_624x296_HP.png'
  },
  {
    name: 'FRONX',
    price: '₹7.54L - ₹13.04L',
    image:
      'https://auto.mahindra.com/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwaebe6977/images/X3XO/xlarge/S220_624x296.png'
  }
]

export default function VehicleShowcase () {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)

  const prev = active === 0 ? vehicles.length - 1 : active - 1

  const next = active === vehicles.length - 1 ? 0 : active + 1

  const handleNext = () => {
    setDirection(1)

    setActive(prev => (prev === vehicles.length - 1 ? 0 : prev + 1))
  }

  const handlePrev = () => {
    setDirection(-1)

    setActive(prev => (prev === 0 ? vehicles.length - 1 : prev - 1))
  }

  return (
    <section className='relative overflow-hidden bg-black py-12'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,.15),transparent_70%)] pointer-events-none' />

        <h2 className='text-center text-4xl font-bold uppercase tracking-wider text-white'>
          Passenger Vehicles
        </h2>

        <div className='relative h-122.5 lg:h-137.5 md:h-137.5'>
          {/* Glow */}
          <div className='absolute left-1/2 top-1/2 h-87.5 w-87.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-700/10 blur-[120px]' />

          {/* Left Preview */}
          <motion.div
            className='absolute left-0 top-1/2 hidden w-[18%] -translate-y-1/2 opacity-30 lg:block'
            animate={{ x: 0 }}
          >
            <img
              src={vehicles[prev].image}
              alt=''
              className='w-full object-contain'
            />
          </motion.div>

          {/* Right Preview */}
          <motion.div
            className='absolute right-0 top-1/2 hidden w-[18%] -translate-y-1/2 opacity-30 lg:block'
            animate={{ x: 0 }}
          >
            <img
              src={vehicles[next].image}
              alt=''
              className='w-full object-contain'
            />
          </motion.div>

          {/* Active Vehicle */}
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <AnimatePresence mode='wait' custom={direction}>
              <motion.img
                key={vehicles[active].image}
                src={vehicles[active].image}
                alt={vehicles[active].name}
                custom={direction}
                variants={{
                  enter: (direction: number) => ({
                    x: direction > 0 ? 200 : -200,
                    opacity: 0,
                    scale: 0.9
                  }),

                  center: {
                    x: 0,
                    opacity: 1,
                    scale: 1
                  },

                  exit: (direction: number) => ({
                    x: direction > 0 ? -200 : 200,
                    opacity: 0,
                    scale: 0.9
                  })
                }}
                initial='enter'
                animate='center'
                exit='exit'
                transition={{
                  duration: 0.35,
                  ease: 'easeInOut'
                }}
                className='w-[70%] md:w-[50%] lg:w-[50%] max-w-212.5 object-contain'
              />
            </AnimatePresence>

            <div className='mt-8 flex flex-col items-center gap-6 lg:flex-row'>
              <div className='flex items-center gap-3'>
                <h3 className='text-2xl font-bold tracking-wide text-white uppercase text-center'>
                  {vehicles[active].name}
                </h3>

                <div className='h-14 w-px bg-zinc-600' />

                <div className='text-center'>
                  <p className='text-sm text-zinc-400'>Ex showroom price</p>

                  <p className='text-xl font-semibold text-white'>
                    {vehicles[active].price}
                  </p>
                </div>
              </div>

              <div className='flex gap-4'>
                <ColoredBtn Content='Explore →' Border={true} Animated={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className='flex justify-center gap-5'>
          <button
            onClick={handlePrev}
            className='rounded-full border border-zinc-700 p-3'
          >
            <ArrowLeft size={16} />
          </button>

          <button
            onClick={handleNext}
            className='rounded-full border border-zinc-700 p-3'
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
