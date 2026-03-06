import { getSnippetDetails } from '@/src/actions/snippets';
import SnippetDetails from '@/src/features/snippets/SnippetDetails';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetDetailsPage({ params }: Props) {
  const { id } = await params;
  const snippet = await getSnippetDetails(id);
  return <SnippetDetails snippet={snippet} />;
}
