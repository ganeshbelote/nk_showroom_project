import DashboardCards from '@/components/admin/DashboardCards'
import VehicleTable from '@/components/admin/vehicles/VehicleTable'

export default function AdminPage () {
  return (
    <div className='space-y-8'>
      <DashboardCards />

      <div className='rounded-3xl border border-zinc-800 bg-zinc-900 p-6 lg:p-8'>
        <VehicleTable />
      </div>
    </div>
  )
}
