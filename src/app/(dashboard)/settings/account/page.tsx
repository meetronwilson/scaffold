import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: 'Account Settings',
  description: 'Manage your account settings and change your password',
}

export default function AccountSettingsPage() {
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
                    item.href === '/settings/account'
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
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Account Settings</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage your personal account information and security settings.
              </p>
            </div>
            <div className="p-6 space-y-8">
              <div>
                <h3 className="text-lg font-medium">Account Security</h3>
                <p className="text-sm text-muted-foreground">
                  Update your password and manage your account security preferences.
                </p>
              </div>
              <Separator />
              
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    When two-factor authentication is enabled, you'll be required to provide a verification code along with your password during login.
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sessions</CardTitle>
                  <CardDescription>
                    Manage your active sessions and sign out from other devices.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">Mac OS - Chrome Browser</p>
                        <p className="text-sm text-muted-foreground">Last active: Just now</p>
                      </div>
                      <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                        Current
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">Unknown Device</p>
                        <p className="text-sm text-muted-foreground">Windows - Firefox Browser</p>
                        <p className="text-sm text-muted-foreground">Last active: 2 days ago</p>
                      </div>
                      <Button variant="outline" size="sm">Sign Out</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="destructive">Sign Out of All Devices</Button>
                </CardFooter>
              </Card>

              {/* Profile section */}
              <div className="space-y-4">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">Profile Information</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        defaultValue="John"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        defaultValue="Doe"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue="john.doe@example.com"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Country
                    </label>
                    <div className="mt-1">
                      <select
                        id="country"
                        name="country"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Australia</option>
                        <option>Germany</option>
                        <option>France</option>
                        <option>Japan</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Timezone
                    </label>
                    <div className="mt-1">
                      <select
                        id="timezone"
                        name="timezone"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option>Pacific Time (US & Canada)</option>
                        <option>Mountain Time (US & Canada)</option>
                        <option>Central Time (US & Canada)</option>
                        <option>Eastern Time (US & Canada)</option>
                        <option>UTC</option>
                        <option>Central European Time</option>
                        <option>Japan Standard Time</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Avatar section */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">Profile Picture</h3>
                <div className="flex items-center space-x-6">
                  <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <div className="h-full w-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xl font-medium">
                      JD
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                    >
                      Upload new picture
                    </button>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      JPG, GIF or PNG. Max size 2MB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Delete account section */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                <div>
                  <h3 className="text-base font-medium text-red-600 dark:text-red-500">Delete Account</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                </div>
                <button
                  type="button"
                  className="px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                >
                  Delete my account
                </button>
              </div>

              {/* Save button */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 