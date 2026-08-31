'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'No se pudo iniciar sesión.');
        setLoading(false);
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Error de conexión. Intentá de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm py-6">
      <div className="card p-7">
        <h1 className="font-display text-2xl font-800 uppercase">Ingresar al panel</h1>
        <p className="mt-1 text-sm text-steel-600">Gestioná el catálogo de JP Automóviles.</p>

        <form onSubmit={submit} className="mt-6 grid gap-4">
          <div>
            <label className="label" htmlFor="user">Usuario</label>
            <input id="user" className="field" value={username} onChange={(e) => setUsername(e.target.value)} required autoComplete="username" placeholder="jpautomoviles" />
          </div>
          <div>
            <label className="label" htmlFor="pass">Contraseña</label>
            <input id="pass" type="password" className="field" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
          </div>
          {error && <p className="rounded-md bg-[#fdecec] px-3 py-2 text-sm text-[#b3161f]">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}
