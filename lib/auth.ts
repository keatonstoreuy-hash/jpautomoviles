import 'server-only';
import crypto from 'crypto';
export { ADMIN_COOKIE } from './auth-constants';

// Credenciales del panel. Por defecto: usuario "jpautomoviles" / contraseña "jpautos".
// En Vercel se pueden cambiar con las variables ADMIN_USER y ADMIN_PASS.
export const ADMIN_USER = process.env.ADMIN_USER || 'jpautomoviles';
const ADMIN_PASS = process.env.ADMIN_PASS || 'jpautos';
const SECRET = process.env.ADMIN_SESSION_SECRET || `${ADMIN_USER}:${ADMIN_PASS}:jp-automoviles-salt`;

export function checkCredentials(username: string, password: string): boolean {
  return username === ADMIN_USER && password === ADMIN_PASS;
}

// Token de sesión determinístico (HMAC). Se guarda en una cookie httpOnly.
export function sessionToken(): string {
  return crypto.createHmac('sha256', SECRET).update(`admin:${ADMIN_USER}`).digest('hex');
}

export function verifyToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const expected = sessionToken();
  if (token.length !== expected.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}
