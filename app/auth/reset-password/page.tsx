'use client'

import { useState, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, LockKeyhole, CheckCircle } from 'lucide-react'
import { toast } from '@/components/Toast'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    try {
      setLoading(true)

      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message)
        return
      }

      setSuccess(true)
      toast.success('Password reset successful!')
    } catch {
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className='text-center'>
        <p className='text-red-500 mb-6'>Invalid or missing reset link.</p>
        <Link
          href='/auth/forgot-password'
          className='inline-flex items-center gap-2 text-indigo-800 hover:text-indigo-600 font-medium'
        >
          Request a new reset link
        </Link>
      </div>
    )
  }

  if (success) {
    return (
      <div className='text-center'>
        <div className='text-green-500 mb-6'>
          <CheckCircle size={64} className='mx-auto' />
        </div>
        <h2 className='text-2xl font-bold text-white mb-4'>Password Reset!</h2>
        <p className='text-zinc-400 mb-8'>
          Your password has been successfully reset.
        </p>
        <Link
          href='/auth/login'
          className='inline-flex h-12 px-8 items-center justify-center rounded-2xl bg-linear-to-r from-[#2B3494] to-indigo-800 text-white font-semibold hover:brightness-110'
        >
          Go to Login
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <label className='mb-2 block text-sm font-medium text-zinc-300'>
          New Password
        </label>
        <div className='flex h-12 items-center rounded-2xl border border-zinc-800 bg-zinc-900 px-4 focus-within:border-[#2B3494] transition-all'>
          <LockKeyhole size={20} className='text-zinc-500' />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={8}
            placeholder='••••••••'
            className='ml-3 h-full w-full bg-transparent text-white outline-none placeholder:text-zinc-500'
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='text-zinc-500 hover:text-white transition'
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div>
        <label className='mb-2 block text-sm font-medium text-zinc-300'>
          Confirm Password
        </label>
        <div className='flex h-12 items-center rounded-2xl border border-zinc-800 bg-zinc-900 px-4 focus-within:border-[#2B3494] transition-all'>
          <LockKeyhole size={20} className='text-zinc-500' />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            placeholder='••••••••'
            className='ml-3 h-full w-full bg-transparent text-white outline-none placeholder:text-zinc-500'
          />
          <button
            type='button'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className='text-zinc-500 hover:text-white transition'
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
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
          'Reset Password'
        )}
      </button>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <main className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a]'>
      <div className='absolute inset-0 bg-[radial-gradient(at_center,#1a1a1a_0%,transparent_70%)]' />
      <div className='absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#2B3494]/10 blur-[120px]' />
      <div className='absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-800/10 blur-[130px]' />

      <section className='relative z-10 w-full max-w-md px-4 sm:px-6 py-12'>
        <div className='rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl'>
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
            <h1 className='mt-8 text-3xl font-bold text-white tracking-tight'>
              Reset Password
            </h1>
            <p className='mt-2 text-zinc-400'>
              Enter your new password below
            </p>
          </div>

          <Suspense fallback={<div className='text-center text-zinc-400'>Loading...</div>}>
            <ResetPasswordForm />
          </Suspense>

          <div className='mt-8 text-center'>
            <Link
              href='/auth/login'
              className='inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition'
            >
              Back to Login
            </Link>
          </div>

          <div className='mt-8 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-500'>
            © {new Date().getFullYear()} NK Car Showroom
          </div>
        </div>
      </section>
    </main>
  )
}