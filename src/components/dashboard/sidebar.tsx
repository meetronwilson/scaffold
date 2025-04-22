'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Settings,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const sidebarNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    title: 'Products',
    href: '/dashboard/products',
    icon: Package,
  },
  {
    title: 'Billing',
    href: '/dashboard/billing',
    icon: CreditCard,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
  {
    title: 'Support',
    href: '/dashboard/support',
    icon: LifeBuoy,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-56 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package className="h-5 w-5" />
          <span>SaaS Platform</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {sidebarNavItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={index}
                href={item.href}
              >
                <span
                  className={cn(
                    'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                    pathname === item.href ? 'bg-accent' : 'transparent'
                  )}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  <span>{item.title}</span>
                </span>
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <div className="flex items-center gap-2 rounded-lg border p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-1 flex-col overflow-hidden">
            <p className="truncate text-sm font-medium">{user?.email}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.id ? user.id.substring(0, 8) : 'User'}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={signOut}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span className="sr-only">Sign out</span>
          </Button>
        </div>
      </div>
    </aside>
  )
} 