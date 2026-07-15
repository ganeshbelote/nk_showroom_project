'use client'

import AccountNavbar from '@/components/account/AccountNavbar'
import { Toast } from '@/components/Toast'

export default function AccountLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AccountNavbar />

      <main className='min-h-screen bg-black'>{children}</main>

      <Toast />
    </>
  )
}
