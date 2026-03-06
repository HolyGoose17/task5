import { cookies } from 'next/headers';

import { fetchSnippets } from '@/src/actions/snippets';
import MySnippets from '@/src/features/snippets/MySnippets';
import { SnippetsForm } from '@/src/utils/types';

export default async function MySnippetsPage() {
  const userId = (await cookies()).get('userId')?.value;
  const data: SnippetsForm['data'] = await fetchSnippets(1, userId);

  return (
    <main className="mt-6">
      <MySnippets data={data} />
    </main>
  );
}
