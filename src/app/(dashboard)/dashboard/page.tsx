import { Metadata } from 'next'
import { StatsCard } from '@/components/dashboard/stats-card'
import { RecentActivity } from '@/components/dashboard/recent-activity'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard overview of your account',
}

export default function DashboardPage() {
  // Mock data for stats
  const stats = [
    {
      title: 'Total Users',
      value: '3,245',
      change: '+12.5%',
      trend: 'up',
      description: 'Compared to last month',
    },
    {
      title: 'Active Projects',
      value: '24',
      change: '+3.2%',
      trend: 'up',
      description: 'Compared to last month',
    },
    {
      title: 'Revenue',
      value: '$24,780',
      change: '+8.1%',
      trend: 'up',
      description: 'Compared to last month',
    },
    {
      title: 'Conversion Rate',
      value: '2.4%',
      change: '-0.5%',
      trend: 'down',
      description: 'Compared to last month',
    },
  ]

  // Mock data for recent activity
  const activity = [
    {
      id: '1',
      title: 'New user signup',
      description: 'User john@example.com created an account',
      date: '2 hours ago',
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
        </svg>
      ),
    },
    {
      id: '2',
      title: 'Subscription upgraded',
      description: 'User sarah@example.com upgraded to Pro plan',
      date: '4 hours ago',
      icon: (
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
    },
    {
      id: '3',
      title: 'New project created',
      description: 'Project "E-commerce Platform" was created',
      date: '1 day ago',
      icon: (
        <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      ),
    },
    {
      id: '4',
      title: 'Invoice paid',
      description: 'Invoice #12345 was paid ($249.00)',
      date: '2 days ago',
      icon: (
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's an overview of your account.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatsCard 
            key={i}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend as 'up' | 'down' | 'neutral'}
            description={stat.description}
          />
        ))}
      </div>

      {/* Recent activity */}
      <RecentActivity 
        items={activity}
        viewAllUrl="#"
      />
    </div>
  )
} 