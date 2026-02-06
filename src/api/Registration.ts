import { AuthForm, AuthResponse } from '../utils/types';

export async function Registration({ username, password }: AuthForm) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Backend Error:', errorText);
    throw new Error(`Server responded with ${res.status}`);
  }

  const data: AuthResponse = await res.json();
  return data;
}
