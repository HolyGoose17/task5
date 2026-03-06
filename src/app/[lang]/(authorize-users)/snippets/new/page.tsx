import { getSnippetLanguages } from '@/src/actions/snippets';
import CreateSnippet from '@/src/features/snippets/CreateSnippet';
// import { getSnippetLanguages } from '@/src/shared/api/langSnippet';
import { SnippetLanguagesForm } from '@/src/utils/types';

export default async function PostSnippets() {
  const lang: SnippetLanguagesForm = await getSnippetLanguages();
  return (
    <main>
      <CreateSnippet languages={lang} />
    </main>
  );
}
