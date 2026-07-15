'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { toast } from '@/components/Toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)

      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message)
        return
      }

      setSent(true)
      toast.success('Reset link sent! Check your email.')
    } catch {
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a]'>
      <div className='absolute inset-0 bg-[radial-gradient(at_center,#1a1a1a_0%,transparent_70%)]' />
      <div className='absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#2B3494]/10 blur-[120px]' />
      <div className='absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-800/10 blur-[130px]' />

      <section className='relative z-10 w-full max-w-md px-4 sm:px-6 py-12'>
        <div className='rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl'>
          {/* Logo & Header */}
          <div className='mb-10 flex flex-col items-center text-center'>
            <div className='flex h-20 w-20 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900'>
              <Image
                src='/logo.svg'
                alt='Maruti Suzuki'
                width={48}
                height={48}
                priority
              />
            </div>

            {!sent ? (
              <>
                <h1 className='mt-8 text-3xl font-bold text-white tracking-tight'>
                  Forgot Password
                </h1>
                <p className='mt-2 text-zinc-400'>
                  Enter your email and we'll send you a reset link
                </p>
              </>
            ) : (
              <>
                <div className='mt-6 text-green-500'>
                  <CheckCircle size={64} className='mx-auto' />
                </div>
                <h1 className='mt-6 text-2xl font-bold text-white tracking-tight'>
                  Check Your Email
                </h1>
                <p className='mt-2 text-zinc-400'>
                  We've sent a password reset link to <strong className='text-white'>{email}</strong>
                </p>
              </>
            )}
          </div>

          {!sent ? (
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label className='mb-2 block text-sm font-medium text-zinc-300'>
                  Email Address
                </label>
                <div className='flex h-12 items-center rounded-2xl border border-zinc-800 bg-zinc-900 px-4 focus-within:border-[#2B3494] transition-all'>
                  <Mail size={20} className='text-zinc-500' />
                  <input
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder='your@email.com'
                    className='ml-3 h-full w-full bg-transparent text-white outline-none placeholder:text-zinc-500'
                  />
                </div>
              </div>

              <button
                type='submit'
                disabled={loading}
                className='mt-4 w-full h-12 rounded-2xl bg-linear-to-r from-[#2B3494] to-indigo-800 text-white font-semibold text-base tracking-wide transition-all hover:brightness-110 active:scale-[0.985] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#2B3494]/30'
              >
                {loading ? (
                  <div className='h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white mx-auto' />
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          ) : (
            <div className='text-center'>
              <p className='text-sm text-zinc-400'>
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={() => setSent(false)}
                  className='text-indigo-800 hover:text-indigo-600 font-medium'
                >
                  try again
                </button>
              </p>
            </div>
          )}

          {/* Back to Login */}
          <div className='mt-8 text-center'>
            <Link
              href='/auth/login'
              className='inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition'
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>

          <div className='mt-8 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-500'>
            © {new Date().getFullYear()} NK Car Showroom • Maruti Suzuki Authorized Dealer
          </div>
        </div>
      </section>
    </main>
  )
}