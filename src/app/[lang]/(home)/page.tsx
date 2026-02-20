'use server';
import HomePage from '@/src/features/HomePage/HomePage';
import { fetchSnippets } from '@/src/shared/api/snippets';
import { Snippet } from '@/src/utils/types';

export default async function MainPage() {
  const snippets: Snippet[] = await fetchSnippets();
  return (
    <main>
      <HomePage data={snippets} />
    </main>
  );
}
