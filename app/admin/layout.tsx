import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { AdminHeader } from '@/components/admin/AdminHeader';

export const metadata: Metadata = {
  title: 'Panel de gestión',
  robots: { index: false, follow: false },
};

// El panel nunca se pre-genera: siempre se renderiza por solicitud.
export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let email: string | undefined;
  if (isSupabaseConfigured) {
    try {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      email = data.user?.email ?? undefined;
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="min-h-screen bg-steel-50">
      <AdminHeader email={email} />
      <main className="wrap py-8">{children}</main>
    </div>
  );
}
