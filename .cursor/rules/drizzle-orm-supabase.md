# Drizzle ORM with Supabase

Follow these patterns when working with Drizzle ORM and Supabase in this SaaS scaffold:

## Connection Setup

- Always use the Supabase Transaction Pooler connection string (port 6543) for optimal performance with serverless functions
- Always URL-encode special characters in database passwords:
  - `@` → `%40`
  - `!` → `%21`
  - `#` → `%23`
  - `$` → `%24`
  - `&` → `%26`
  - `+` → `%2B`
  - `/` → `%2F`

- Use the following connection string format:
```
DATABASE_URL="postgresql://postgres.[PROJECT-ID]:[ENCODED-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

## Schema Definition

- Define all tables in `src/lib/db/schema.ts`
- Use appropriate column types from `drizzle-orm/pg-core`
- Follow this pattern for table definitions:

```typescript
export const tableName = pgTable('table_name', {
  id: uuid('id').primaryKey().defaultRandom(),
  // other columns...
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
})
```

- Use snake_case for database column names (Postgres convention)
- Use camelCase for JavaScript property names

## Relations

- Define relationships using Drizzle's relations API
- Place relation definitions after table definitions
- Follow this pattern:

```typescript
export const tableRelations = relations(tableName, ({ one, many }) => ({
  relatedTable: one(otherTable, {
    fields: [tableName.foreignKey],
    references: [otherTable.primaryKey],
  }),
}))
```

## Database Client

- Use the db client from `src/lib/db/index.ts`
- Follow connection pooling best practices
- Set appropriate client options based on environment (dev/prod)

## Queries

- Use Drizzle's SQL-like query builder for complex queries
- Use appropriate type safety with prepared statements
- Handle errors and constraints properly
- Follow this pattern for queries:

```typescript
// Example of a select query
const users = await db.select().from(usersTable).where(eq(usersTable.id, userId))

// Example of an insert
const newUser = await db.insert(usersTable).values({
  email,
  name,
}).returning()
```

## Migrations and Schema Changes

- Use `drizzle-kit push` for direct schema updates (preferred for development)
- Use `drizzle-kit generate` to create SQL migration files when needed
- Test schema changes thoroughly before deploying
- Document breaking changes

## Supabase Auth Integration

- Use the Supabase Auth tables for authentication (`auth.users`)
- Create a matching users table in the public schema for profile data
- Sync Supabase Auth events with your application database using triggers or webhooks
- Use Row Level Security (RLS) policies to secure data

## Common Issues Prevention

- Always test your connection string with encoded passwords
- Verify Row Level Security (RLS) policies when data access issues occur
- Monitor connection pool usage for performance issues
- Use the transaction pooler (`port 6543`) for serverless functions and the session pooler (`port 5432`) for long-lived connections 