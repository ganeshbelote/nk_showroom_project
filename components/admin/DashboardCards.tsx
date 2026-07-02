import { CarFront, Images, Users, Eye } from 'lucide-react'

const cards = [
  {
    title: 'Vehicles',
    value: '12',
    icon: CarFront
  },
  {
    title: 'Slides',
    value: '5',
    icon: Images
  },
  {
    title: 'Visitors',
    value: '14K',
    icon: Eye
  },
  {
    title: 'Users',
    value: '1.2K',
    icon: Users
  }
]

export default function DashboardCards () {
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
