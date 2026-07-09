'use client'

import { useState } from 'react'

import Sidebar from '@/components/admin/Sidebar'
import Topbar from '@/components/admin/Topbar'
import { Toast } from '../Toast'

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
  <div className="flex min-h-screen bg-[#09090b]">

    <Sidebar
      open={sidebarOpen}
      setOpen={setSidebarOpen}
    />

    <div className="flex min-w-0 flex-1 flex-col">

      <Topbar setOpen={setSidebarOpen} />

      <main className="flex-1 overflow-y-auto">

        <div className="mx-auto w-full max-w-450 md:p-6 lg:p-8">

          {children}

        </div>

      </main>

    </div>

    <Toast />

  </div>
)
}