import { createClient } from '@supabase/supabase-js'

// Admin client with direct database access
// This should only be used in secure environments (API routes, webhooks)
export function createAdminSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
} 