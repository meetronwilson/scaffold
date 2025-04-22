import { 
  pgTable, 
  text, 
  uuid, 
  timestamp, 
  boolean, 
  integer 
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Users table (in sync with Supabase Auth)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().notNull(),
  email: text('email').notNull().unique(),
  fullName: text('full_name'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Customers for Stripe
export const customers = pgTable('customers', {
  id: uuid('id').primaryKey().references(() => users.id),
  stripeCustomerId: text('stripe_customer_id').unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Products from Stripe
export const products = pgTable('products', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  active: boolean('active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Prices from Stripe
export const prices = pgTable('prices', {
  id: text('id').primaryKey().notNull(),
  productId: text('product_id').references(() => products.id),
  active: boolean('active').default(true).notNull(),
  currency: text('currency').notNull(),
  description: text('description'),
  type: text('type').notNull(), // one_time or recurring
  unitAmount: integer('unit_amount'),
  interval: text('interval'), // month, year, etc.
  intervalCount: integer('interval_count'),
  trialPeriodDays: integer('trial_period_days'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Subscriptions
export const subscriptions = pgTable('subscriptions', {
  id: text('id').primaryKey().notNull(),
  userId: uuid('user_id').notNull().references(() => users.id),
  status: text('status').notNull(),
  priceId: text('price_id').references(() => prices.id),
  quantity: integer('quantity'),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),
  currentPeriodStart: timestamp('current_period_start'),
  currentPeriodEnd: timestamp('current_period_end'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  endedAt: timestamp('ended_at'),
  canceledAt: timestamp('canceled_at'),
})

// Relations - using the new relations API for better type safety
export const usersRelations = relations(users, ({ one, many }) => ({
  customer: one(customers, {
    fields: [users.id],
    references: [customers.id],
  }),
  subscriptions: many(subscriptions),
}))

export const customersRelations = relations(customers, ({ one }) => ({
  user: one(users, {
    fields: [customers.id],
    references: [users.id],
  }),
}))

export const productsRelations = relations(products, ({ many }) => ({
  prices: many(prices),
}))

export const pricesRelations = relations(prices, ({ one, many }) => ({
  product: one(products, {
    fields: [prices.productId],
    references: [products.id],
  }),
  subscriptions: many(subscriptions),
}))

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
  price: one(prices, {
    fields: [subscriptions.priceId],
    references: [prices.id],
  }),
})) 