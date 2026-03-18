'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  DataSnippetsSchema,
  NewSnippetForm,
  PostSnippetSchema,
  SnippetDetailsForm,
  SnippetDetailsSchema,
  SnippetLanguagesForm,
  SnippetsForm,
} from '../utils/types';

export async function fetchSnippets(page?: number, userId?: string): Promise<SnippetsForm['data']> {
  const baseUserId = userId ? `userId=${userId}&` : '';
  const basePage = !page ? 1 : page;
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/snippets?${baseUserId}page=${basePage}&limit=15&sortBy=id:ASC`,
    { cache: 'no-store' }
  );

  if (!res.ok) throw new Error('Failed to fetch snippets');

  const data = await res.json();
  const validated = DataSnippetsSchema.safeParse(data);
  if (!validated.success) {
    console.error(validated.error);
    throw new Error('Data validation failed');
  }
  return validated.data?.data;
}

export async function addReaction({
  snippetId,
  type,
}: {
  snippetId: string;
  type: 'like' | 'dislike';
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const res = await fetch(`${process.env.BACKEND_URL}/api/snippets/${snippetId}/mark`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({ mark: type }),
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to add reaction');

  return res.json();
}

export async function getSnippetLanguages(): Promise<SnippetLanguagesForm> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const res = await fetch(`${process.env.BACKEND_URL}/api/snippets/languages`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Cookie: cookieStore.toString(),
    },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch snippet languages');

  const data = await res.json();
  return data;
}

export async function getSnippetDetails(id: string): Promise<SnippetDetailsForm> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const res = await fetch(`${process.env.BACKEND_URL}/api/snippets/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Cookie: cookieStore.toString(),
    },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch snippet details');

  const data = await res.json();
  const validated = SnippetDetailsSchema.safeParse(data);
  if (!validated.success) {
    console.error(validated.error);
    throw new Error('Data validation failed');
  }
  return validated.data;
}

export async function addNewSnippet(prevState: unknown, data: NewSnippetForm) {
  const validated = PostSnippetSchema.safeParse(data);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const res = await fetch(`${process.env.BACKEND_URL}/api/snippets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(validated.data),
    cache: 'no-store',
  });

  if (!res.ok) {
    return {
      success: false,
    };
  }

  redirect('/');
}
