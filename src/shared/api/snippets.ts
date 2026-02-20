import 'server-only';

import { Snippet, SnippetsSchema } from '@/src/utils/types';

interface FetchSnippetsOptions {
  page?: number;
  limit?: number;
}

export async function fetchSnippets({ page = 1, limit = 15 }: FetchSnippetsOptions = {}): Promise<
  Snippet[]
> {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/snippets?page=${page}&limit=${limit}&sortBy=id:ASC`
    );

    if (!res.ok) throw new Error('Failed to fetch snippets');

    const data = await res.json();
    const validated = SnippetsSchema.parse(data);
    return validated.data.data;
  } catch {
    return [];
  }
}
