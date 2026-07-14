import { motion, AnimatePresence } from 'framer-motion'

type SizeType = 'sm' | 'md' | 'lg'

const sizes: Record<SizeType, number> = {
  sm: 36,
  md: 54,
  lg: 80
}

export default class Loader {
  private static getDim (size: SizeType = 'md'): number {
    return sizes[size] || sizes.md
  }

  static Progressbar ({
    loading = true,
    progress = null
  }: {
    loading?: boolean
    progress?: number | null
  }) {
    return (
      <AnimatePresence>
        {loading && (
          <div>
            {typeof progress === 'number' && (
              <div className='w-48 mt-2'>
                <div className='h-2 w-full rounded-full bg-white/10 overflow-hidden'>
                  <motion.div
                    className='h-full rounded-full bg-linear-to-r from-blue-400 to-indigo-500'
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.max(0, Math.min(100, progress))}%`
                    }}
                    transition={{ ease: 'easeOut', duration: 0.6 }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    )
  }

  static IndeterminateBar({ loading = true }: { loading?: boolean }) {
  return (
    <AnimatePresence>
      {loading && (
        <div className="w-48 mt-2">
          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-blue-400 to-indigo-500"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              style={{ width: '50%' }}
            />
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

  static VideoLoader ({
    loading = true,
    size = 'md'
  }: {
    loading?: boolean
    size?: SizeType
  }) {
    const dim = Loader.getDim(size)

    return (
      <AnimatePresence>
        {loading && (
          <div
            className='flex items-center justify-center rounded-full bg-white/6 p-2'
            style={{ width: dim + 24, height: dim + 24 }}
          >
            <motion.div
              className='flex items-center justify-center rounded-full bg-white/9'
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              style={{ width: dim, height: dim }}
            >
              <motion.svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='text-white/90 w-2/3 h-2/3'
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path d='M4.5 3.9v16.2L19.2 12 4.5 3.9z' />
              </motion.svg>
            </motion.div>

            <motion.span
              aria-hidden
              className='absolute rounded-full'
              style={{
                width: dim + 40,
                height: dim + 40,
                border: '1px solid rgba(255,255,255,0.06)'
              }}
              animate={{ opacity: [0.14, 0.04, 0.14], scale: [1, 1.08, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </div>
        )}
      </AnimatePresence>
    )
  }

  static BarLoader ({ loading = true }: { loading?: boolean }) {
    return (
      <AnimatePresence>
        {loading && (
          <div className='flex items-center justify-center gap-1'>
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className='block w-2 rounded-sm bg-white/80'
                initial={{ height: 8 }}
                animate={{ height: [8, 22, 8] }}
                transition={{
                  duration: 0.8 + i * 0.12,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.08
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    )
  }
}