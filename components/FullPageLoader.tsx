'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Loader from './Loader'

type FullPageLoaderProps = {
  loading?: boolean
  message?: string
}

export default function FullPageLoader({
  loading = true,
  message = 'Loading...'
}: FullPageLoaderProps) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className='fixed inset-0 z-9999 flex items-center justify-center bg-zinc-950/95 backdrop-blur-md'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Background Glow */}
          <motion.div
            className='absolute h-100 w-100 rounded-full bg-[#2B3494]/20 blur-[120px]'
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          <div className='relative flex flex-col items-center gap-8'>
            {/* Rotating Ring */}
            <motion.div
              className='absolute h-36 w-36 rounded-full border border-[#2B3494]/40'
              animate={{ rotate: 360 }}
              transition={{
                duration: 5,
                ease: 'linear',
                repeat: Infinity
              }}
            />

            <Loader.VideoLoader size='lg' />

            <div className='flex flex-col items-center gap-2'>
              <h2 className='text-xl font-semibold text-white'>
                {message}
              </h2>

              <p className='text-sm text-zinc-400'>
                Please wait...
              </p>
            </div>

            <Loader.IndeterminateBar />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}