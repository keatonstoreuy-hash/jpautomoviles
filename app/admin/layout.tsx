import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE, ADMIN_USER, verifyToken } from '@/lib/auth';
import { AdminHeader } from '@/components/admin/AdminHeader';

export const metadata: Metadata = {
  title: 'Panel de gestión',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // La página de login se muestra sin cabecera ni verificación.
  const pathname = headers().get('x-pathname') || '';
  const isLogin = pathname.endsWith('/admin/login');

  const valid = verifyToken(cookies().get(ADMIN_COOKIE)?.value);
  if (!valid && !isLogin) {
    // El middleware ya cubre el caso "sin cookie"; esto cubre "cookie inválida".
    redirect('/admin/login');
  }

  if (isLogin || !valid) {
    return (
      <div className="min-h-screen bg-steel-50">
        <main className="wrap py-8">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-steel-50">
      <AdminHeader email={ADMIN_USER} />
      <main className="wrap py-8">{children}</main>
    </div>
  );
}
