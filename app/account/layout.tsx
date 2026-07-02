import AccountNavbar from '@/components/account/AccountNavbar'

export default function AccountLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AccountNavbar />

      <main className='min-h-screen bg-black'>{children}</main>
    </>
  )
}
