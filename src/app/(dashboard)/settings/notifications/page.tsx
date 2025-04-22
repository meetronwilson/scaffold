import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export const metadata: Metadata = {
  title: 'Notification Settings',
  description: 'Manage your notification preferences',
}

export default function NotificationSettingsPage() {
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

  // Notification categories
  const notificationCategories = [
    {
      id: 'account',
      name: 'Account',
      notifications: [
        {
          id: 'account-security',
          title: 'Security alerts',
          description: 'Get notified when there are security concerns or suspicious activity.',
          emailEnabled: true,
          pushEnabled: true,
        },
        {
          id: 'account-password',
          title: 'Password changes',
          description: 'Get notified when your password is changed.',
          emailEnabled: true,
          pushEnabled: false,
        },
        {
          id: 'account-profile',
          title: 'Profile updates',
          description: 'Get notified when your profile information is updated.',
          emailEnabled: false,
          pushEnabled: false,
        },
      ],
    },
    {
      id: 'billing',
      name: 'Billing',
      notifications: [
        {
          id: 'billing-invoice',
          title: 'New invoice',
          description: 'Get notified when a new invoice is generated.',
          emailEnabled: true,
          pushEnabled: false,
        },
        {
          id: 'billing-payment',
          title: 'Payment processed',
          description: 'Get notified when a payment is processed.',
          emailEnabled: true,
          pushEnabled: false,
        },
        {
          id: 'billing-subscription',
          title: 'Subscription changes',
          description: 'Get notified when your subscription plan changes.',
          emailEnabled: true,
          pushEnabled: true,
        },
      ],
    },
    {
      id: 'projects',
      name: 'Projects',
      notifications: [
        {
          id: 'projects-activity',
          title: 'Project activity',
          description: 'Get notified about general project activity.',
          emailEnabled: true,
          pushEnabled: true,
        },
        {
          id: 'projects-comments',
          title: 'Comments',
          description: 'Get notified when someone comments on your projects.',
          emailEnabled: true,
          pushEnabled: true,
        },
        {
          id: 'projects-mentions',
          title: 'Mentions',
          description: 'Get notified when someone mentions you.',
          emailEnabled: true,
          pushEnabled: true,
        },
        {
          id: 'projects-updates',
          title: 'Project updates',
          description: 'Get notified when projects are updated.',
          emailEnabled: false,
          pushEnabled: true,
        },
      ],
    },
    {
      id: 'team',
      name: 'Team',
      notifications: [
        {
          id: 'team-invites',
          title: 'Team invites',
          description: 'Get notified when you are invited to a team.',
          emailEnabled: true,
          pushEnabled: true,
        },
        {
          id: 'team-members',
          title: 'New team members',
          description: 'Get notified when new members join your team.',
          emailEnabled: true,
          pushEnabled: false,
        },
        {
          id: 'team-roles',
          title: 'Role changes',
          description: 'Get notified when your role in a team changes.',
          emailEnabled: true,
          pushEnabled: true,
        },
      ],
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
                    item.href === '/settings/notifications'
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
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Notification Settings</h3>
              <p className="text-sm text-muted-foreground">
                Manage how and when you receive notifications.
              </p>
            </div>
            <Separator />

            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Configure which email notifications you want to receive.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-account" className="flex flex-col space-y-1">
                    <span>Account updates</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Receive emails about your account activity and security.
                    </span>
                  </Label>
                  <Switch id="email-account" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-billing" className="flex flex-col space-y-1">
                    <span>Billing and payments</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Receive emails about your billing information and payment receipts.
                    </span>
                  </Label>
                  <Switch id="email-billing" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-marketing" className="flex flex-col space-y-1">
                    <span>Product updates and announcements</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Receive emails about new features, products, and services.
                    </span>
                  </Label>
                  <Switch id="email-marketing" defaultChecked={false} />
                </div>
                <Separator />
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-newsletter" className="flex flex-col space-y-1">
                    <span>Newsletter</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Receive our monthly newsletter with tips, trends, and insights.
                    </span>
                  </Label>
                  <Switch id="email-newsletter" defaultChecked={false} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>
                  Configure which push notifications you want to receive on your devices.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="push-all" className="flex flex-col space-y-1">
                    <span>Enable push notifications</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Allow push notifications to be sent to your browser or device.
                    </span>
                  </Label>
                  <Switch id="push-all" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="push-comments" className="flex flex-col space-y-1">
                    <span>Comments and mentions</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Receive notifications when someone mentions you or comments on your content.
                    </span>
                  </Label>
                  <Switch id="push-comments" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="push-updates" className="flex flex-col space-y-1">
                    <span>Task updates</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Receive notifications when tasks are assigned to you or updated.
                    </span>
                  </Label>
                  <Switch id="push-updates" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SMS Notifications</CardTitle>
                <CardDescription>
                  Configure which SMS notifications you want to receive.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="sms-security" className="flex flex-col space-y-1">
                    <span>Security alerts</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Receive SMS for important security updates and suspicious activities.
                    </span>
                  </Label>
                  <Switch id="sms-security" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="sms-reminders" className="flex flex-col space-y-1">
                    <span>Reminders</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Receive SMS reminders for upcoming events or deadlines.
                    </span>
                  </Label>
                  <Switch id="sms-reminders" defaultChecked={false} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Frequency</CardTitle>
                <CardDescription>
                  Choose how often you want to receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="realtime" className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="realtime" id="realtime" />
                    <Label htmlFor="realtime" className="flex flex-col">
                      <span>Real-time</span>
                      <span className="font-normal text-xs text-muted-foreground">
                        Receive notifications as soon as they happen.
                      </span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily" className="flex flex-col">
                      <span>Daily digest</span>
                      <span className="font-normal text-xs text-muted-foreground">
                        Receive a daily summary of all notifications.
                      </span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly" className="flex flex-col">
                      <span>Weekly digest</span>
                      <span className="font-normal text-xs text-muted-foreground">
                        Receive a weekly summary of all notifications.
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
              <CardFooter>
                <Button>Save Notification Preferences</Button>
              </CardFooter>
            </Card>

            {/* Notification Categories */}
            {notificationCategories.map((category) => (
              <div key={category.id} className="bg-white dark:bg-gray-800 shadow rounded-lg">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">{category.name} Notifications</h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Configure which {category.name.toLowerCase()} notifications you want to receive.
                  </p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {category.notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start justify-between border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">{notification.title}</h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{notification.description}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <label htmlFor={`email-${notification.id}`} className="mr-2 text-sm text-gray-500 dark:text-gray-400">Email</label>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                              <input 
                                type="checkbox" 
                                id={`email-${notification.id}`} 
                                className="sr-only peer"
                                defaultChecked={notification.emailEnabled}
                              />
                              <div className="w-10 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <label htmlFor={`push-${notification.id}`} className="mr-2 text-sm text-gray-500 dark:text-gray-400">Push</label>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                              <input 
                                type="checkbox" 
                                id={`push-${notification.id}`} 
                                className="sr-only peer"
                                defaultChecked={notification.pushEnabled}
                              />
                              <div className="w-10 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Do Not Disturb */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Do Not Disturb</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Set times when you don't want to receive notifications.
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="dnd-enable"
                        name="dnd-enable"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="dnd-enable" className="font-medium text-gray-700 dark:text-gray-300">Enable Do Not Disturb</label>
                      <p className="text-gray-500 dark:text-gray-400">No notifications will be sent during the specified times.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="dnd-start" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start time</label>
                      <div className="mt-1">
                        <input
                          type="time"
                          name="dnd-start"
                          id="dnd-start"
                          defaultValue="22:00"
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="dnd-end" className="block text-sm font-medium text-gray-700 dark:text-gray-300">End time</label>
                      <div className="mt-1">
                        <input
                          type="time"
                          name="dnd-end"
                          id="dnd-end"
                          defaultValue="07:00"
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="dnd-days" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Days of the week</label>
                    <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-7">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <div key={day} className="flex items-center">
                          <input
                            id={`day-${day}`}
                            name={`day-${day}`}
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                            defaultChecked={['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day)}
                          />
                          <label htmlFor={`day-${day}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            {day}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                  >
                    Save preferences
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 