# Supabase and Drizzle Integration Guide

This document provides a comprehensive guide for setting up, configuring, and using Supabase with Drizzle ORM in this project.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Environment Setup](#environment-setup)
4. [Database Schema](#database-schema)
5. [Database Operations](#database-operations)
6. [Authentication Integration](#authentication-integration)
7. [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)
8. [Best Practices](#best-practices)

## Overview

This project uses Supabase as the backend database service and Drizzle ORM for database schema management and querying. Drizzle provides a type-safe way to interact with the Supabase PostgreSQL database with minimal boilerplate.

### Key Benefits

- **Type Safety**: Full TypeScript support through Drizzle's schema definition
- **Schema Migrations**: Easy schema management using Drizzle Kit
- **Performance**: Lightweight ORM with minimal overhead
- **Integration**: Seamless integration with Supabase's PostgreSQL database

## Prerequisites

- Node.js 16+
- npm or yarn
- Supabase account and project
- PostgreSQL knowledge (basic)

## Environment Setup

### Required Environment Variables

Add the following to your `.env.local` file:

```
# Supabase Connection (use pooler for better connection management)
DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-ID]:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres"

# Supabase API (for authentication and storage)
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
```

> **Critical**: You MUST URL-encode special characters in your password:
> - `@` becomes `%40`
> - `!` becomes `%21`
> - `#` becomes `%23`
> - `$` becomes `%24`
> - `&` becomes `%26`
> - `+` becomes `%2B`
> - `/` becomes `%2F`
>
> Example: If your password is `Admin@123!`, your connection string should use `Admin%40123%21`

### Installation

Install required packages:

```bash
npm install drizzle-orm pg
npm install -D drizzle-kit @types/pg
```

## Database Schema

Our database schema is defined in `src/lib/db/schema.ts`. The schema currently includes the following tables:

1. **users** - User profiles
2. **customers** - Stripe customer information
3. **products** - Subscription products
4. **prices** - Pricing information for products
5. **subscriptions** - User subscription details

### Schema Example

```typescript
// Example from our schema.ts
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  full_name: text('full_name'),
  avatar_url: text('avatar_url'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const customers = pgTable('customers', {
  id: uuid('id').primaryKey().references(() => users.id),
  stripe_customer_id: text('stripe_customer_id').unique(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Relations are defined using Drizzle's relations helper
export const usersRelations = relations(users, ({ one }) => ({
  customer: one(customers, {
    fields: [users.id],
    references: [customers.id],
  }),
}));
```

## Database Operations

### Configuration

The database client is configured in `src/lib/db/index.ts`:

```typescript
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create Drizzle ORM instance
export const db = drizzle(pool);
```

### Using Drizzle with Next.js

For server components and API routes:

```typescript
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function getUserById(id: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      customer: true,
    }
  });
  
  return user;
}
```

### Schema Migrations

This project uses Drizzle Kit for schema migrations.

#### Available Commands

- `npm run db:push` - Push schema changes directly to the database (uses `drizzle-kit push`)
- `npm run db:generate` - Generate migration files without applying them
- `npm run db:studio` - Open Drizzle Studio to view and edit data

> **Note**: We previously used `drizzle-kit push:pg` but have updated to the newer `drizzle-kit push` command format which provides better support and compatibility with Supabase.

## Authentication Integration

This project combines Supabase Auth with Drizzle ORM:

1. Supabase handles authentication (sign-up, sign-in, session management)
2. User profiles are stored in the `users` table managed by Drizzle

### Auth Setup

The Supabase client is configured in `src/lib/supabase/client.ts`:

```typescript
import { createBrowserClient } from '@supabase/ssr';

export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
```

## Common Issues and Troubleshooting

### Connection Issues

**Problem**: `getaddrinfo ENOTFOUND` error when running Drizzle commands.

**Solution**: 
1. Check that your `DATABASE_URL` format is correct
2. Ensure special characters in password are URL-encoded (see Environment Setup section)
3. Verify you're using the correct pooler endpoint (transaction pooler on port 6543 is recommended)
4. Use the complete connection string from Supabase dashboard > Project Settings > Database

### Schema Push Failures

**Problem**: Schema push fails with SQL errors.

**Solution**:
1. Check for conflicts with existing tables
2. Ensure your Drizzle schema matches expected PostgreSQL types
3. Try `db:generate` and examine the SQL before pushing

### Authentication Issues

**Problem**: Auth works but user data isn't accessible via Drizzle.

**Solution**:
1. Ensure user IDs match between Supabase Auth and your users table
2. Check Row Level Security (RLS) policies in Supabase
3. Verify correct permissions for your database user

## Best Practices

### Security

1. **RLS Policies**: Implement Row Level Security policies in Supabase
2. **Environment Variables**: Never commit secrets or credentials to version control
3. **Input Validation**: Validate all inputs before using them in queries

### Performance

1. **Connection Pooling**: Use Supabase's pooler for optimal connection management
2. **Indexes**: Add indexes for frequently queried columns
3. **Query Optimization**: Use Drizzle's prepared statements for better performance

### Development Workflow

1. Schema changes in `schema.ts`
2. Run `npm run db:generate` to create migration files
3. Review generated SQL in the migration files
4. Run `npm run db:push` to apply changes to development database
5. Commit both schema and migration files to source control

## Additional Resources

- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) 