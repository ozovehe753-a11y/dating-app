import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me-in-production');

export async function createSession(userId) {
  const token = await new SignJWT({ userId }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(secret);
  const store = await cookies();
  store.set('heartly_session', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 7, path: '/' });
}

export async function getSession() {
  const store = await cookies();
  const token = store.get('heartly_session')?.value;
  if (!token) return null;
  try { return (await jwtVerify(token, secret)).payload; } catch { return null; }
}
