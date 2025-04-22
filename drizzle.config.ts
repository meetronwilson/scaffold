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