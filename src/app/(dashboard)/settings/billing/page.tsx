import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: 'Billing Settings',
  description: 'Manage your subscription and payment methods',
}

export default function BillingSettingsPage() {
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

  // Sample payment methods
  const paymentMethods = [
    {
      id: 'pm_1',
      type: 'card',
      brand: 'visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2024,
      isDefault: true,
    },
    {
      id: 'pm_2',
      type: 'card',
      brand: 'mastercard',
      last4: '5555',
      expiryMonth: 8,
      expiryYear: 2025,
      isDefault: false,
    },
  ]

  // Sample invoices
  const invoices = [
    {
      id: 'INV-001',
      date: 'Mar 1, 2023',
      amount: '$24.99',
      status: 'Paid',
    },
    {
      id: 'INV-002',
      date: 'Feb 1, 2023',
      amount: '$24.99',
      status: 'Paid',
    },
    {
      id: 'INV-003',
      date: 'Jan 1, 2023',
      amount: '$24.99',
      status: 'Paid',
    },
  ]

  // Sample plans
  const plans = [
    {
      id: 'plan_free',
      name: 'Free',
      price: '$0',
      description: 'Basic access with limited features',
      features: [
        '5 projects',
        '2 team members',
        '5GB storage',
        'Basic support',
      ],
      isCurrent: false,
    },
    {
      id: 'plan_pro',
      name: 'Pro',
      price: '$29',
      description: 'For professionals and growing teams',
      features: [
        'Unlimited projects',
        '10 team members',
        '100GB storage',
        'Priority support',
        'Advanced analytics',
      ],
      isCurrent: true,
    },
    {
      id: 'plan_enterprise',
      name: 'Enterprise',
      price: '$99',
      description: 'For larger organizations with advanced needs',
      features: [
        'Unlimited projects',
        'Unlimited team members',
        '1TB storage',
        '24/7 dedicated support',
        'Advanced analytics',
        'Custom integrations',
        'SSO authentication',
      ],
      isCurrent: false,
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
                    item.href === '/settings/billing'
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
              <h3 className="text-lg font-medium">Billing & Subscription</h3>
              <p className="text-sm text-muted-foreground">
                Manage your subscription plan and payment methods.
              </p>
            </div>
            <Separator />
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>
                      You are currently on the Pro plan.
                    </CardDescription>
                  </div>
                  <Badge variant="default">Pro</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Billing period</span>
                  <span>Monthly</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Next billing date</span>
                  <span>April 1, 2023</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Amount</span>
                  <span>$24.99 / month</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2 items-start">
                <Button variant="outline" className="w-full sm:w-auto">Change Plan</Button>
                <Button variant="link" className="text-destructive px-0 h-auto">Cancel Subscription</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your payment methods and billing details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <line x1="2" x2="22" y1="10" y2="10" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/2024</p>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Add Payment Method</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Update your billing address and information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" defaultValue="Acme Inc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="billing@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Main St" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="San Francisco" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State / Province</Label>
                    <Input id="state" defaultValue="CA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP / Postal Code</Label>
                    <Input id="zip" defaultValue="94103" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="vat">VAT Number (Optional)</Label>
                    <Input id="vat" placeholder="VAT Number" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Billing Information</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>
                  View and download your past invoices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Invoice #INV-001</p>
                      <p className="text-sm text-muted-foreground">Mar 1, 2023</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">$24.99</Badge>
                      <Button variant="ghost" size="sm">Download</Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Invoice #INV-002</p>
                      <p className="text-sm text-muted-foreground">Feb 1, 2023</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">$24.99</Badge>
                      <Button variant="ghost" size="sm">Download</Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Invoice #INV-003</p>
                      <p className="text-sm text-muted-foreground">Jan 1, 2023</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">$24.99</Badge>
                      <Button variant="ghost" size="sm">Download</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 