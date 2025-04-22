'use client'

import { CheckoutButton } from './checkout-button'
import { products, prices } from '@/lib/db/schema'
import { Check } from 'lucide-react'

interface PricingTableProps {
  products: (typeof products.$inferSelect & {
    prices: (typeof prices.$inferSelect)[]
  })[]
  userId?: string | null
}

export function PricingTable({ products, userId }: PricingTableProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const price = product.prices[0]
        if (!price) return null

        return (
          <div
            key={product.id}
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-bold">{product.name}</h3>
              <div className="space-y-2">
                <p className="text-3xl font-bold">
                  ${(price.unitAmount || 0) / 100}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{price.interval}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </div>
              <div className="space-y-2">
                {product.name === 'Pro' ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      <span className="text-sm">Unlimited projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      <span className="text-sm">Priority support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      <span className="text-sm">Advanced features</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      <span className="text-sm">5 projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      <span className="text-sm">Basic support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      <span className="text-sm">Essential features</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="p-6 pt-0">
              <CheckoutButton priceId={price.id}>
                Get Started
              </CheckoutButton>
            </div>
          </div>
        )
      })}
    </div>
  )
} 