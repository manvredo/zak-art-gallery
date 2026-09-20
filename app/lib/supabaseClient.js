import { createClient } from '@supabase/supabase-js';

// Single shared Supabase client (anon key) for the whole app, so the browser
// doesn't end up with a separate GoTrueClient/auth listener per page -
// Supabase warns this can cause undefined auth behavior when several
// instances share the same storage key.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
