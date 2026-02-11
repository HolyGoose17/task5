'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  AuthSchema,
  AuthState,
  RegisterSchema,
  RegisterState,
  SnippetsSchema,
} from '@/src/utils/types';

// export async function loginAction(data: AuthForm) {
//   const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//     cache: 'no-store',
//     redirect: 'manual',
//   });

//   if (res.status !== 200 && res.status !== 303) {
//     return { error: `Server error: ${res.status}` };
//   }

//   const setCookieHeader = res.headers.get('set-cookie');

//   let token = null;

//   if (setCookieHeader) {
//     const match = setCookieHeader.match(/token=([^;]+)/);
//     if (match && match[1]) {
//       token = match[1];
//     }
//   }

//   if (!token) {
//     return { error: 'Token not found in backend response' };
//   }

//   const cookieStore = await cookies();

//   cookieStore.set('token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     path: '/',
//     maxAge: 60 * 60 * 24,
//     // sameSite: 'lax',
//   });

//   redirect('/home');
// }

export async function testAction(_prevState: AuthState, formData: FormData): Promise<AuthState> {
  const rawData = {
    username: formData.get('username'),
    password: formData.get('password'),
  };

  const parsed = AuthSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      error: 'Проверьте правильность введенных данных',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
    cache: 'no-store',
  });

  const getCookie = response.headers.get('set-cookie');
  const cookieStore = await cookies();

  if (getCookie) {
    const tokenValue = getCookie.split(';')[0].split('=')[1];
    cookieStore.set('token', tokenValue, {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      path: '/',
    });
  }

  redirect('/home');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  redirect('/login');
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.has('token');

  if (sessionCookie) {
    return sessionCookie;
  } else {
    return null;
  }
}

// export async function registerAction({ username, password }: AuthForm) {
//   const res = await fetch(`${process.env.BACKEND_URL}/api/register`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     credentials: 'include',
//     body: JSON.stringify({ username, password }),
//     cache: 'no-store',
//   });

//   if (!res.ok) {
//     const errorText = await res.text();
//     console.error('Backend Error:', errorText);
//     throw new Error(`Server responded with ${res.status}`);
//   }

//   const data: AuthResponse = await res.json();
//   return data;
// }

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const rawData = {
    username: formData.get('username'),
    password: formData.get('password'),
    repeatPassword: formData.get('repeatPassword'),
  };

  const parsed = RegisterSchema.safeParse(rawData);

  if (!parsed.success) {
    return { error: 'Validation error on server' };
  }

  const res = await fetch(`${process.env.BACKEND_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
    credentials: 'include',
  });

  if (!res.ok) {
    return { error: 'Backend error' };
  }

  redirect('/login');
}

export async function snippetsAction() {
  const data = await fetch(`${process.env.BACKEND_URL}/api/snippets`);
  const posts = await data.json();
  const snippets = SnippetsSchema.safeParse(posts);
  return snippets;
}
