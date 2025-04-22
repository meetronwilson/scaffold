import { stripe } from './config'
import { db } from '../db'
import { subscriptions } from '../db/schema'
import { eq } from 'drizzle-orm'
import type Stripe from 'stripe'

export async function handleSubscriptionChange(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription
  const userId = subscription.metadata.userId

  if (!userId) {
    throw new Error('No userId found in subscription metadata')
  }

  // Handle subscription events
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await db
        .insert(subscriptions)
        .values({
          id: subscription.id,
          userId: userId,
          status: subscription.status,
          priceId: subscription.items.data[0].price.id,
          quantity: subscription.items.data[0].quantity,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          createdAt: new Date(subscription.created * 1000),
          endedAt: subscription.ended_at
            ? new Date(subscription.ended_at * 1000)
            : null,
          canceledAt: subscription.canceled_at
            ? new Date(subscription.canceled_at * 1000)
            : null,
        })
        .onConflictDoUpdate({
          target: subscriptions.id,
          set: {
            status: subscription.status,
            priceId: subscription.items.data[0].price.id,
            quantity: subscription.items.data[0].quantity,
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            endedAt: subscription.ended_at
              ? new Date(subscription.ended_at * 1000)
              : null,
            canceledAt: subscription.canceled_at
              ? new Date(subscription.canceled_at * 1000)
              : null,
            updatedAt: new Date(),
          },
        })
      break

    case 'customer.subscription.deleted':
      await db
        .update(subscriptions)
        .set({
          status: subscription.status,
          endedAt: new Date(subscription.ended_at! * 1000),
          canceledAt: subscription.canceled_at
            ? new Date(subscription.canceled_at * 1000)
            : null,
          updatedAt: new Date(),
        })
        .where(eq(subscriptions.id, subscription.id))
      break
  }
}

export async function handlePriceChange(event: Stripe.Event) {
  const price = event.data.object as Stripe.Price
  // Handle price update logic here
  // This would typically involve updating your prices table
}

export async function handleProductChange(event: Stripe.Event) {
  const product = event.data.object as Stripe.Product
  // Handle product update logic here
  // This would typically involve updating your products table
}

export function constructWebhookEvent(
  payload: string,
  signature: string,
  webhookSecret: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
} 