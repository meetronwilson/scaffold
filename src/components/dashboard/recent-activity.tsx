interface ActivityItem {
  id: string
  title: string
  description: string
  date: string
  icon: React.ReactNode
}

interface RecentActivityProps {
  title?: string
  description?: string
  items: ActivityItem[]
  viewAllUrl?: string
}

export function RecentActivity({ 
  title = "Recent Activity", 
  description = "Activity from the past week", 
  items, 
  viewAllUrl 
}: RecentActivityProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="px-6 py-4 flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-50 dark:bg-gray-700">
                  {item.icon}
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
                <span className="text-xs text-gray-400 dark:text-gray-500">{item.date}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
          </div>
        )}
      </div>
      
      {viewAllUrl && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <a 
            href={viewAllUrl} 
            className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
          >
            View all activity →
          </a>
        </div>
      )}
    </div>
  )
} 