import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_SERVICE_KEY, SUPABASE_URL } from './config';

// Cliente con service role — SOLO servidor. Salta RLS para las escrituras del panel.
export function createAdminClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error('Supabase no está configurado para escritura (falta SUPABASE_SERVICE_ROLE_KEY).');
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
