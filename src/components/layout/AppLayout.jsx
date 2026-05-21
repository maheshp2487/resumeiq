import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}