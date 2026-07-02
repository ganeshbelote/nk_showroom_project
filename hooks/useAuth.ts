'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  fullName: string
  email: string
  mobile: string
  role: 'USER' | 'ADMIN'
  avatar: string | null
  city: string | null
  state: string | null
}

export function useAuth() {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)

  const [loading, setLoading] = useState(true)

  async function fetchUser() {
    try {
      const res = await fetch('/api/auth/me', {
        credentials: 'include'
      })

      const data = await res.json()

      if (data.success) {
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    await fetch('/api/auth/logout', {
      method: 'POST'
    })

    setUser(null)

    router.replace('/auth/login')

    router.refresh()
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return {
    user,
    loading,
    logout,
    refresh: fetchUser
  }
}