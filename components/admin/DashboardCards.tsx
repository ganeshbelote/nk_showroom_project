'use client'

import { useEffect, useState } from 'react'
import { CarFront, Images, Users, Eye } from 'lucide-react'

type Stats = {
  vehicles: number
  slides: number
  visitors: number
  users: number
}

export default function DashboardCards () {
  const [stats, setStats] = useState<Stats>({
    vehicles: 0,
    slides: 0,
    visitors: 0,
    users: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [vehiclesRes, slidesRes, visitorsRes, usersRes] = await Promise.all([
          fetch('/api/vehicles?limit=1'),
          fetch('/api/carousel'),
          fetch('/api/visitors'),
          fetch('/api/auth/me')
        ])

        const vehiclesData = await vehiclesRes.json()
        const slidesData = await slidesRes.json()
        const visitorsData = await visitorsRes.json()

        // Get users count from DB
        const usersCountRes = await fetch('/api/visitors?limit=1')
        
        setStats({
          vehicles: vehiclesData.total || 0,
          slides: slidesData.slides?.length || 0,
          visitors: visitorsData.visitors?.length || 0,
          users: 0 // Will need a dedicated endpoint
        })
      } catch (err) {
        console.error(err)
      }
    }

    fetchStats()
  }, [])

  const cards = [
    { title: 'Vehicles', value: String(stats.vehicles), icon: CarFront },
    { title: 'Slides', value: String(stats.slides), icon: Images },
    { title: 'Visitors', value: String(stats.visitors), icon: Eye }
  ]

  return (
    <div className='lg:p-8 p-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
      {cards.map(card => {
        const Icon = card.icon

        return (
          <div
            key={card.title}
            className='rounded-3xl border border-zinc-800 bg-zinc-900 p-6'
          >
            <div className='mb-6 flex items-center justify-between'>
              <Icon className='text-indigo-800' />

              <span className='text-zinc-500'>{card.title}</span>
            </div>

            <h2 className='text-4xl font-bold text-white'>{card.value}</h2>
          </div>
        )
      })}
    </div>
  )
}