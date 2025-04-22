interface StatsCardProps {
  title: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  description?: string
}

export function StatsCard({ title, value, change, trend = 'neutral', description }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
          </div>
        </div>
        {(change || description) && (
          <div className="mt-4">
            {change && (
              <div className={`inline-flex items-center text-sm ${
                trend === 'up' 
                  ? 'text-green-600 dark:text-green-500' 
                  : trend === 'down' 
                  ? 'text-red-600 dark:text-red-500' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {trend === 'up' ? (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                ) : trend === 'down' ? (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                ) : null}
                <span>{change}</span>
              </div>
            )}
            {description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 