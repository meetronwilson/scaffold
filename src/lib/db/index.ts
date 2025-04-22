import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

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