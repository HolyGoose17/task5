'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  AuthActionState,
  AuthForm,
  AuthResponse,
  AuthResponseSchema,
  AuthSchema,
  RegisterActionState,
  RegisterForm,
  RegisterSchema,
} from '@/src/utils/types';

export async function loginAction(
  prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const validated = AuthSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (!validated.success) {
    const errors: Partial<Record<keyof AuthForm, string>> = {};

    for (const issue of validated.error.issues) {
      const field = issue.path[0];
      if (field) {
        errors[field as keyof AuthForm] = issue.message;
      }
    }

    return { errors };
  }

  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validated.data),
    cache: 'no-store',
    redirect: 'manual',
  });

  if (!res.ok) {
    return {
      errors: {
        username: 'Registration failed',
      },
    };
  }

  // проверить работу set-cookie
  // const getCookie = res.headers.get('set-cookie');
  // const cookieStore = await cookies();
  // const responseData = await res.json();
  // const parsed = AuthResponseSchema.safeParse(responseData);
  // const userId = parsed.data?.data.id;
  // const username = parsed.data?.data.username;

  // if (username) {
  //   cookieStore.set('username', username, {
  //     secure: process.env.NODE_ENV === 'production',
  //     maxAge: 60 * 60 * 24,
  //     httpOnly: true,
  //     path: '/',
  //   });
  // }

  // if (userId) {
  //   cookieStore.set('userId', userId, {
  //     secure: process.env.NODE_ENV === 'production',
  //     maxAge: 60 * 60 * 24,
  //     httpOnly: true,
  //     path: '/',
  //   });
  // }

  // if (getCookie) {
  //   const tokenValue = getCookie.split(';')[0].split('=')[1];
  //   cookieStore.set('token', tokenValue, {
  //     secure: process.env.NODE_ENV === 'production',
  //     maxAge: 60 * 60 * 24,
  //     httpOnly: true,
  //     path: '/',
  //   });
  // }

  redirect('/');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  cookieStore.delete('userId');
  cookieStore.delete('username');
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
export async function getUsername() {
  const cookieStore = await cookies();
  const username = cookieStore.get('username');

  if (username) {
    return username.value;
  } else {
    return '';
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
      errors![issue.path[0] as keyof RegisterForm] = issue.message;
    });

    return { errors };
  }
  const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validated.data),
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
