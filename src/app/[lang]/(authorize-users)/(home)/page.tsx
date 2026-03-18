'use server';
import { fetchSnippets } from '@/src/actions/snippets';
import HomePage from '@/src/features/HomePage/HomePage';
import Pagination from '@/src/shared/Pagination';
import { SnippetsForm } from '@/src/utils/types';

export default async function MainPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // const pageNumber = Number(searchParams.page ?? 1);
  // const snippets: SnippetsForm['data'] = await fetchSnippets(pageNumber);
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  const snippets: SnippetsForm['data'] = await fetchSnippets(currentPage);
  const totalPages = snippets.meta.totalPages;
  return (
    <main>
      {/* <HomePage data={snippets} />
      <Pagination totalPages={snippets.meta.totalPages} /> */}
      <HomePage data={snippets} />
      <Pagination totalPages={totalPages} />
    </main>
  );
}
