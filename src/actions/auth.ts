'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AuthForm, AuthResponseSchema } from '@/src/utils/types';

export async function loginAction(data: AuthForm) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    cache: 'no-store',
    // set-cookie.token
  });

  if (!res.ok) {
    return { error: 'Invalid username or password' };
  }

  const user = await res.json();

  const parsed = AuthResponseSchema.safeParse(user);

  if (!parsed.success) {
    console.error('Zod Error:', parsed.error);
    return { error: 'Server response format is invalid' };
  }

  const cookieStore = await cookies();

  cookieStore.set('session_user', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60,
    path: '/',
  });

  redirect('/home');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('session_user');
  redirect('/login');
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session_user');

  if (!sessionCookie?.value) return null;

  try {
    const parsedUser = JSON.parse(sessionCookie.value);

    const result = AuthResponseSchema.safeParse(parsedUser);

    if (result.success) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error('Failed to parse session cookie', error);
    return null;
  }
}
