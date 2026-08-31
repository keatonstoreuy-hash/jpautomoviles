import { NextResponse, type NextRequest } from 'next/server';

// Inline (sin imports) para máxima compatibilidad con el runtime Edge.
const ADMIN_COOKIE = 'jp_admin';

// Gate liviano: si no hay cookie de sesión, al login. La verificación real
// del token (HMAC) ocurre en el layout del panel y en las rutas de escritura.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);
  const pass = NextResponse.next({ request: { headers: requestHeaders } });

  if (pathname === '/admin/login') return pass;

  const hasCookie = Boolean(request.cookies.get(ADMIN_COOKIE)?.value);
  if (!hasCookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  return pass;
}

export const config = {
  matcher: ['/admin/:path*'],
};
