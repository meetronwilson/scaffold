import { Sidebar } from '@/components/dashboard/sidebar'
import { Toaster } from 'sonner'
import { requireAuth } from '@/lib/utils/auth'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  // Protect dashboard routes
  await requireAuth()

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {children}
        </main>
      </div>

      <Toaster />
    </div>
  )
} 