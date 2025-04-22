# Next.js SaaS Scaffold Structure - Updated for 2025

This scaffold provides a complete, updated structure for a SaaS application using Next.js App Router, Supabase Auth, Drizzle ORM (with latest dependencies), and Stripe Payments.

## Project Structure

```
my-saas-app/
├── public/                     # Static assets
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Auth routes (grouped)
│   │   │   ├── sign-in/        # Sign in page
│   │   │   │   └── page.tsx
│   │   │   ├── sign-up/        # Sign up page
│   │   │   │   └── page.tsx
│   │   │   └── auth/           # Auth API routes
│   │   │       └── confirm/
│   │   │           └── route.ts
│   │   ├── (dashboard)/        # Protected/authenticated routes (grouped)
│   │   │   ├── dashboard/      # Dashboard page
│   │   │   │   └── page.tsx
│   │   │   ├── settings/       # Settings pages
│   │   │   │   ├── page.tsx
│   │   │   │   ├── account/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── billing/
│   │   │   │       └── page.tsx
│   │   │   └── premium/        # Subscription-only features
│   │   │       └── page.tsx
│   │   ├── (marketing)/        # Public marketing pages
│   │   │   ├── page.tsx        # Home page
│   │   │   ├── features/
│   │   │   │   └── page.tsx
│   │   │   └── pricing/
│   │   │       └── page.tsx
│   │   ├── api/                # API routes
│   │   │   ├── stripe/         # Stripe API endpoints
│   │   │   │   ├── create-checkout-session/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── create-portal-session/
│   │   │   │   │   └── route.ts
│   │   │   │   └── webhook/
│   │   │   │       └── route.ts
│   │   │   └── user/           # User management
│   │   │       └── route.ts
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── ui/                 # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── auth/               # Auth components
│   │   │   ├── signin-form.tsx
│   │   │   └── signup-form.tsx
│   │   ├── layout/             # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── sidebar.tsx
│   │   ├── dashboard/          # Dashboard components
│   │   │   ├── stats-card.tsx
│   │   │   └── recent-activity.tsx
│   │   └── subscription/       # Subscription components
│   │       ├── pricing-table.tsx
│   │       ├── checkout-button.tsx
│   │       └── subscription-status.tsx
│   ├── lib/                    # Utility libraries
│   │   ├── supabase/           # Supabase client
│   │   │   ├── server.ts       # Server-side client
│   │   │   ├── client.ts       # Client-side client
│   │   │   └── admin.ts        # Admin client (for webhooks)
│   │   ├── db/                 # Database (Drizzle)
│   │   │   ├── schema.ts       # Schema definitions
│   │   │   ├── index.ts        # DB client
│   │   │   └── migrations/     # Migrations
│   │   ├── stripe/             # Stripe utilities
│   │   │   ├── config.ts       # Stripe client
│   │   │   ├── checkout.ts     # Checkout helpers
│   │   │   └── webhook.ts      # Webhook handlers
│   │   └── utils/              # Helper functions
│   │       ├── formatting.ts   # Data formatting
│   │       └── auth.ts         # Auth utilities
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-auth.ts         # Auth hook
│   │   ├── use-subscription.ts # Subscription hook
│   │   └── use-webhook.ts      # Webhook utils
│   └── types/                  # TypeScript type definitions
│       ├── auth.ts             # Auth types
│       ├── database.ts         # Database types
│       └── subscription.ts     # Subscription types
├── .env                        # Environment variables (gitignored)
├── .env.example                # Example environment variables
├── .eslintrc.js                # ESLint configuration
├── .gitignore                  # Git ignore configuration
├── components.json             # Shadcn UI configuration
├── drizzle.config.ts           # Drizzle ORM configuration
├── middleware.ts               # Next.js middleware (auth)
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies
├── postcss.config.js           # PostCSS configuration
├── README.md                   # Project documentation
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## Core Implementation Files

### Package.json Dependencies (Updated)

```json
{
  "name": "my-saas-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "drizzle-kit generate",
    "db:push": "drizzle-kit push:pg",
    "db:studio": "drizzle-kit studio"
  },
  "dependencies": {
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-slot": "^1.0.2",
    "@stripe/stripe-js": "^2.2.0",
    "@supabase/ssr": "^0.1.0",
    "@supabase/supabase-js": "^2.39.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "drizzle-orm": "^0.42.0",
    "lucide-react": "^0.294.0",
    "next": "14.0.4",
    "postgres": "^3.4.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "stripe": "^14.8.0",
    "tailwind-merge": "^2.1.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@types/node": "^20.10.4",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.17",
    "autoprefixer": "^10.4.16",
    "drizzle-kit": "^0.20.6",
    "eslint": "^8.55.0",
    "eslint-config-next": "14.0.4",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.3.3"
  }
}
```

### Authentication

#### Middleware (`middleware.ts`)

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh session if it exists
  await supabase.auth.getSession()

  return response
}

// Apply middleware to authenticated routes
export const config = {
  matcher: [
    '/(dashboard|settings|premium)/:path*',
    '/api/:path*',
  ],
}
```

#### Server Supabase Client (`src/lib/supabase/server.ts`)

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}
```

#### Client Supabase Client (`src/lib/supabase/client.ts`)

```typescript
'use client'

import { createBrowserClient } from '@supabase/ssr'

export function createClientSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### Database (Drizzle ORM) - Updated with Latest Practices

#### Database Client (`src/lib/db/index.ts`)

```typescript
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Based on the latest documentation for connecting to Supabase with Drizzle

// For development: Direct connection
// For production with long-lived connections: Session pooler (port 5432)
// For serverless/edge: Transaction pooler (port 6543)
const connectionString = process.env.DATABASE_URL!

// Set prepare to false when using transaction pooler for serverless environments
// This is because transaction pooler does not support prepared statements
const clientOptions = { 
  prepare: process.env.DATABASE_CONNECTION_TYPE === 'transaction_pooler' ? false : true,
  ssl: process.env.NODE_ENV === 'production',
}

// Create postgres client
const client = postgres(connectionString, clientOptions)

// Create and export the Drizzle ORM instance
export const db = drizzle(client, { schema })
```

#### Drizzle Configuration (`drizzle.config.ts`)

```typescript
import { defineConfig } from 'drizzle-kit'
import * as dotenv from 'dotenv'

// Load environment variables from .env.local for local development
dotenv.config({ path: '.env.local' })

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './src/lib/db/migrations',
  driver: 'pg', // PostgreSQL driver
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  // PostgreSQL specific options
  verbose: true, // Display detailed logs during migration
  strict: true,  // Ensure schema integrity
})
```

#### Database Schema (`src/lib/db/schema.ts`)

```typescript
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
```

### Environment Setup

#### `.env.example`

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Database
# Connection type options: direct, session_pooler, transaction_pooler
DATABASE_CONNECTION_TYPE=direct

# Choose one of these connection strings based on your environment:
# Direct connection (development)
DATABASE_URL=postgres://postgres:password@localhost:5432/your-db-name
# Session pooler connection (production with persistent connections) - port 5432
# DATABASE_URL=postgres://postgres.yourproject:[YOUR-PASSWORD]@aws-0-region.pooler.supabase.com:5432/postgres
# Transaction pooler connection (serverless/edge functions) - port 6543
# DATABASE_URL=postgres://postgres.yourproject:[YOUR-PASSWORD]@aws-0-region.pooler.supabase.com:6543/postgres

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

## Getting Started

### Initial Setup

1. Clone the scaffold repository
   ```bash
   git clone https://github.com/your-username/my-saas-app.git
   cd my-saas-app
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Copy environment variables
   ```bash
   cp .env.example .env.local
   ```

4. Fill in your environment variables in `.env.local`

5. Create database schema
   ```bash
   npm run db:push
   ```

6. Start the development server
   ```bash
   npm run dev
   ```

### Supabase Setup

1. Create a new Supabase project from [supabase.com](https://supabase.com)
2. Get your API keys from the project dashboard under Settings > API
3. Update your `.env.local` file with the Supabase URL and keys
4. Set up email auth in the Supabase dashboard under Authentication > Providers > Email

### Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe dashboard
3. Update your `.env.local` file with the Stripe keys
4. Set up products and prices in the Stripe dashboard
5. Set up webhooks to point to your `/api/stripe/webhook` endpoint

### Deployment

1. Deploy to Vercel or similar platform
   ```bash
   vercel
   ```

2. Set up environment variables in your deployment platform
3. Set up the Stripe webhook endpoint to point to your deployed URL