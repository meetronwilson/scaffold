import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your account settings',
}

export default function SettingsPage() {
  // Define the settings navigation items
  const settingsNavItems = [
    { 
      name: 'General', 
      href: '/settings', 
      description: 'View and update your account details' 
    },
    { 
      name: 'Account', 
      href: '/settings/account', 
      description: 'Update your account email and password' 
    },
    { 
      name: 'Billing', 
      href: '/settings/billing', 
      description: 'Manage billing and view payment history' 
    },
    { 
      name: 'Notifications', 
      href: '/settings/notifications', 
      description: 'Configure how you receive notifications' 
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Settings navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="p-1">
              {settingsNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col space-y-1 px-4 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    item.href === '/settings'
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-500'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Settings content */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">General Settings</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Update your profile and account preferences.
              </p>
            </div>
            <div className="p-6 space-y-6">
              {/* Profile section */}
              <div className="space-y-4">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="your.email@example.com"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="about" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    About
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    placeholder="A brief description about yourself"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
              </div>

              {/* Timezone section */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">Timezone</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Choose your preferred timezone.
                </p>
                <div className="mt-4">
                  <select
                    id="timezone"
                    name="timezone"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option>Pacific Standard Time (PST)</option>
                    <option>Eastern Standard Time (EST)</option>
                    <option>Coordinated Universal Time (UTC)</option>
                    <option>Central European Time (CET)</option>
                  </select>
                </div>
              </div>

              {/* Save button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 