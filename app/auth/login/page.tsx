'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage () {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password
        })
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message)
        return
      }

      router.replace(data.redirect)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a]'>
      {/* Background Effects */}
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

            <h1 className='mt-8 text-3xl font-bold text-white tracking-tight'>
              Welcome Back
            </h1>
            <p className='mt-2 text-zinc-400'>Sign in to access your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email Field */}
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
                  placeholder='admin@example.com'
                  className='ml-3 h-full w-full bg-transparent text-white outline-none placeholder:text-zinc-500'
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className='mb-2 block text-sm font-medium text-zinc-300'>
                Password
              </label>
              <div className='flex h-12 items-center rounded-2xl border border-zinc-800 bg-zinc-900 px-4 focus-within:border-[#2B3494] transition-all'>
                <LockKeyhole size={20} className='text-zinc-500' />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
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

            {/* Options */}
            <div className='flex items-center justify-between text-sm'>
              <label className='flex items-center gap-2 text-zinc-400 cursor-pointer'>
                <input type='checkbox' className='accent-[#2B3494] w-4 h-4' />
                Remember me
              </label>

              <Link
                href='/forgot-password'
                className='text-indigo-800 hover:text-indigo-600 transition font-medium'
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button - Compact & Premium */}
            <button
              type='submit'
              disabled={loading}
              className='mt-4 w-full h-12 rounded-2xl bg-linear-to-r from-[#2B3494] to-indigo-800 text-white font-semibold text-base tracking-wide transition-all hover:brightness-110 active:scale-[0.985] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#2B3494]/30'
            >
              {loading ? (
                <div className='h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white mx-auto' />
              ) : (
                'Sign In'
              )}
            </button>

            {/* Register Link */}
            <p className='text-center text-sm text-zinc-400 mt-6'>
              Don't have an account?{' '}
              <Link
                href='/auth/register'
                className='font-medium text-indigo-800 hover:text-indigo-600 transition'
              >
                Create Account
              </Link>
            </p>
          </form>

          {/* Footer */}
          <div className='mt-10 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-500'>
            © {new Date().getFullYear()} NK Car Showroom • Maruti Suzuki
            Authorized Dealer
          </div>
        </div>
      </section>
    </main>
  )
}
