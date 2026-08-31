export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// true cuando el sitio puede LEER datos reales desde Supabase.
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// true cuando el panel puede ESCRIBIR (crear/editar/borrar) en Supabase.
export const isSupabaseWritable = Boolean(SUPABASE_URL && SUPABASE_SERVICE_KEY);

export const VEHICLES_BUCKET = 'vehiculos';
