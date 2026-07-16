'use client'

import { createContext, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export type ToastType = {
  id: number
  message: string
  type: 'success' | 'info' | 'error' | 'warning'
}

export type ToastContextType = {
  addToast: (message: string, type: ToastType['type']) => void
  removeToast: (id: number) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

// external reference for toast.* functions
let addToastExternal: ToastContextType['addToast']

export const Toast = ({
  position = 'top-right',
  duration = 3000
}: {
  position?: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right'
  duration?: number
}) => {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const addToast = useCallback(
    (message: string, type: ToastType['type']) => {
      const id = Date.now()
      setToasts(prev => [...prev, { id, message, type }])

      // Auto remove after duration
      setTimeout(() => removeToast(id), duration)
    },
    [duration, removeToast]
  )

  // Expose to external toast functions
  addToastExternal = addToast

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {/* Toast container */}
      <div className={`z-999 fixed ${getPosition(position)} space-y-2`}>
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className='overflow-hidden relative w-screen max-w-85 flex gap-5 items-start justify-between px-4 py-2.5 rounded-xl shadow-lg bg-neutral-900 text-white'
            >
              {/* Left Section */}
              <div className='flex items-start gap-3'>
                {/* Icon */}
                <div className='pt-1 shrink-0'>
                  {(() => {
                    switch (toast.type) {
                      case 'success':
                        return (
                          <svg
                            className='w-5 h-5 text-green-400'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                        )
                      case 'error':
                        return (
                          <svg
                            className='w-5 h-5 text-red-500'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            viewBox='0 0 24 24'
                          >
                            <circle cx='12' cy='12' r='9' />
                            <path d='M15 9l-6 6m0-6l6 6' />
                          </svg>
                        )
                      case 'info':
                        return (
                          <svg
                            width='20px'
                            height='20px'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                          >
                            <g id='SVGRepo_bgCarrier' stroke-width='0' />

                            <g
                              id='SVGRepo_tracerCarrier'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                            />

                            <g id='SVGRepo_iconCarrier'>
                              {' '}
                              <path
                                fill='#2B7FFF'
                                fill-rule='evenodd'
                                d='M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm8-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm.01 8a1 1 0 102 0V9a1 1 0 10-2 0v5z'
                              />{' '}
                            </g>
                          </svg>
                        )
                      case 'warning':
                        return (
                          <svg
                            width='20px'
                            height='20px'
                            viewBox='0 0 32 32'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                          >
                            <g id='SVGRepo_bgCarrier' stroke-width='0' />

                            <g
                              id='SVGRepo_tracerCarrier'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                            />

                            <g id='SVGRepo_iconCarrier'>
                              {' '}
                              <path
                                stroke='#F0B100'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M15.12 4.623a1 1 0 011.76 0l11.32 20.9A1 1 0 0127.321 27H4.679a1 1 0 01-.88-1.476l11.322-20.9zM16 18v-6'
                              />{' '}
                              <path
                                fill='#F0B100'
                                d='M17.5 22.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z'
                              />{' '}
                            </g>
                          </svg>
                        )
                      default:
                        return null
                    }
                  })()}
                </div>

                {/* Content */}
                <div>
                  <h4 className='flex gap-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5 blink'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M12 2l1.7 5.3 5.3 1.7-5.3 1.7-1.7 5.3-1.7-5.3-5.3-1.7 5.3-1.7L12 2z' />
                      <path d='M4 12l1 .3.3 1L4 13l-1-.3-.3-1L4 12zm16 0l1 .3.3 1L20 13l-1-.3-.3-1L20 12zM12 20l.3 1 1 .3-1 .3-.3 1-.3-1-1-.3 1-.3.3-1z' />
                    </svg>
                    <span className='font-medium text-sm lg:text-[16px]'>
                      {capitalize(toast.type)} notification
                    </span>
                  </h4>
                  <p className='mt-1 text-xs text-gray-400'>{toast.message}</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => removeToast(toast.id)}
                className='cursor-pointer pt-1 text-gray-400 hover:text-gray-200'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>

              {/* Progress bar */}
              <motion.div
                className={`absolute left-0 bottom-0 h-0.5 ${getBgColor(
                  toast.type
                )}`}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

// Exposed toast functions
export const toast = {
  success: (msg: string) => addToastExternal(msg, 'success'),
  error: (msg: string) => addToastExternal(msg, 'error'),
  info: (msg: string) => addToastExternal(msg, 'info'),
  warning: (msg: string) => addToastExternal(msg, 'warning')
}

// Helpers
function getPosition (
  pos: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right'
) {
  const map = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  }
  return map[pos] || map['top-right']
}

function getBgColor (type: 'success' | 'info' | 'error' | 'warning') {
  const map = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500 text-black'
  }
  return map[type] || 'bg-gray-800'
}

function capitalize (str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
