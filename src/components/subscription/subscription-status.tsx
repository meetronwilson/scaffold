'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { subscriptions } from '@/lib/db/schema'

interface SubscriptionStatusProps {
  subscription: typeof subscriptions.$inferSelect | null
}

export function SubscriptionStatus({ subscription }: SubscriptionStatusProps) {
  const [loading, setLoading] = useState(false)

  const handlePortalAccess = async () => {
    try {
      setLoading(true)

      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
      })

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!subscription) {
    return (
      <div className="rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">No active subscription</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">
          Status: <span className="capitalize">{subscription.status}</span>
        </p>
        {subscription.cancelAtPeriodEnd && (
          <p className="text-sm text-muted-foreground">
            Your subscription will end on{' '}
            {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
          </p>
        )}
        <Button
          onClick={handlePortalAccess}
          disabled={loading}
          variant="outline"
          className="mt-4"
        >
          {loading ? 'Loading...' : 'Manage Subscription'}
        </Button>
      </div>
    </div>
  )
} 