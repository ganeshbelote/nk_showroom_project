'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { Copy, Link as LinkIcon, X } from 'lucide-react'

const Popup = ({
  showPopup,
  setShowPopup
}: {
  showPopup: boolean
  setShowPopup: Dispatch<SetStateAction<boolean>>
}) => {
  const [copied, setCopied] = useState(false)
  const link = 'https://marinabudarina.design'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link')
      const textarea = document.createElement('textarea')
      textarea.value = window.location.href

      document.body.appendChild(textarea)
      textarea.select()

      document.execCommand('copy')

      document.body.removeChild(textarea)
    }
  }

  if (!showPopup) return null

  return (
    <div className='bg-zinc-900 w-full max-w-95 mx-4 rounded-3xl shadow-2xl border border-zinc-700 relative'>
      {/* Top Link Icon */}
      <div className='flex justify-center -mt-8 relative z-10'>
        <div className='w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center border-[6px] border-zinc-900'>
          <LinkIcon className='w-8 h-8 text-white' />
        </div>
      </div>

      {/* Close Button */}
      <button
        type='button'
        onClick={() => setShowPopup(false)}
        className='absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors z-20'
      >
        <X className='w-6 h-6' />
      </button>

      <div className='px-6 sm:px-8 pt-6 pb-10'>
        {/* Title & Subtitle */}
        <div className='text-center mb-8'>
          <h2 className='text-2xl sm:text-3xl font-bold text-white mb-3'>
            Share with Friends
          </h2>
          <p className='text-zinc-400 text-[15px] sm:text-[17px] leading-tight'>
            Trading is more effective when
            <br />
            you connect with friends!
          </p>
        </div>

        {/* Share Link Section */}
        <div>
          <p className='text-white text-sm font-medium mb-3'>Share your link</p>

          <div className='relative flex items-center bg-zinc-800 rounded-2xl border border-zinc-700 p-1.5 overflow-hidden'>
            <input
              type='text'
              value={link}
              readOnly
              className='bg-transparent text-white px-4 py-3 outline-none text-sm font-mono truncate'
            />
            <button
              onClick={handleCopy}
              className='absolute top-1 right-1 bg-zinc-700 hover:bg-zinc-600 active:bg-emerald-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 font-medium whitespace-nowrap'
            >
              <Copy className='w-4 h-4' />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup
