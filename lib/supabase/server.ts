import { createClient } from '@supabase/supabase-js';

// Server-side client — used in Route Handlers and Server Components
export function getSupabaseServer() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
