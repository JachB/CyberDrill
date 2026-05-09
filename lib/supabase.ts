import { createClient, type SupabaseClient } from '@supabase/supabase-js';

function getUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co';
}
function getAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key-xxxxxxxxxxxxxxxx';
}

// Lazy singleton for client-side (realtime)
let _supabase: SupabaseClient | null = null;
export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    _supabase = createClient(getUrl(), getAnonKey(), {
      realtime: { params: { eventsPerSecond: 10 } },
    });
  }
  return _supabase;
}

// Keep named export for backward compat — evaluated lazily via getter
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as any)[prop];
  },
});

export function createServerSupabase() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return createClient(getUrl(), serviceKey || getAnonKey(), {
    auth: { persistSession: false },
  });
}
