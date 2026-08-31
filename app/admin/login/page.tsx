'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isSupabaseConfigured) {
      setError('La base de datos todavía no está conectada. Seguí los pasos del archivo LEEME-CONFIGURACION.md.');
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError('Email o contraseña incorrectos.');
      return;
    }
    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-sm py-6">
      <div className="card p-7">
        <h1 className="font-display text-2xl font-600">Ingresar al panel</h1>
        <p className="mt-1 text-sm text-steel-600">Gestioná el catálogo de JP Automóviles.</p>

        <form onSubmit={submit} className="mt-6 grid gap-4">
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input id="email" type="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </div>
          <div>
            <label className="label" htmlFor="pass">Contraseña</label>
            <input id="pass" type="password" className="field" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
          </div>
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}
