'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ExploreAllModelsButtonProps {
  href?: string
  label?: string
}

export default function ExploreAllModelsButton({
  href = '/vehicles',
  label = 'Explore All Models'
}: ExploreAllModelsButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='flex justify-center'
    >
      <Link
        href={href}
        aria-label='Explore all vehicle models'
        className='
          group
          mt-8 md:mt-10 lg:mt-12
          mb-6 md:mb-8
          inline-flex items-center gap-3
          rounded-full border border-white
          bg-transparent
          px-8 py-3.5 md:px-10 md:py-4
          text-white
          transition-all duration-300 ease-in-out
          hover:bg-[#2B3494] hover:border-[#2B3494]
          hover:scale-103
          cursor-pointer
          min-h-[48px]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B3494] focus-visible:ring-offset-2 focus-visible:ring-offset-black
        '
      >
        <span className='text-base md:text-lg font-medium tracking-wide'>
          {label}
        </span>
        <motion.span
          className='inline-flex'
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <ArrowRight
            size={20}
            className='text-white transition-transform duration-300 group-hover:translate-x-0.5'
          />
        </motion.span>
      </Link>
    </motion.div>
  )
}