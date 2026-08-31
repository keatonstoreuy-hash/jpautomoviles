'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';

export function AdminHeader({ email }: { email?: string }) {
  const router = useRouter();

  const logout = async () => {
    if (isSupabaseConfigured) {
      await createClient().auth.signOut();
    }
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <header className="border-b border-ink/[.08] bg-white">
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink font-display font-700 text-red-soft">JP</span>
          <div className="leading-none">
            <p className="font-display font-600">Panel de gestión</p>
            <p className="text-[11px] text-steel-400">JP Automóviles</p>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank" className="text-sm text-steel-600 hover:text-ink">Ver sitio ↗</Link>
          {email && <span className="hidden text-sm text-steel-400 sm:inline">{email}</span>}
          <button onClick={logout} className="btn-ghost !px-4 !py-2 text-sm">Salir</button>
        </div>
      </div>
    </header>
  );
}
