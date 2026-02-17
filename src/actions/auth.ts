'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import z from 'zod';

import {
  AuthResponse,
  AuthSchema,
  RegisterActionState,
  RegisterFormType,
  RegisterSchema,
} from '@/src/utils/types';

type AuthState = {
  error?: string;
  fieldErrors?: {
    username?: string[];
    password?: string[];
  };
};

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

export async function testAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const rawData = {
    username: formData.get('username'),
    password: formData.get('password'),
  };

  const parsed = AuthSchema.safeParse(rawData);

  if (!parsed.success) {
    const flattenError = z.flattenError(parsed.error);
    return {
      error: '',
      fieldErrors: flattenError.fieldErrors,
    };
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
    cache: 'no-store',
  });

  if (!response.ok) {
    return {
      error: 'Invalidate login or password',
    };
  }

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

export async function registerUser(
  prevState: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> {
  const validated = RegisterSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
    repeatPassword: formData.get('repeatPassword'),
  });

  if (!validated.success) {
    const errors: RegisterActionState['errors'] = {};

    validated.error.issues.forEach((issue) => {
      errors![issue.path[0] as keyof RegisterFormType] = issue.message;
    });

    return { errors };
  }
  const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: validated.data.username,
      password: validated.data.password,
    }),
  });

  if (!response.ok) {
    return {
      errors: {
        username: 'Registration failed',
      },
    };
  }

  const auth: AuthResponse = await response.json();

  return { auth };
}
