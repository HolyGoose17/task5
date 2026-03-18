'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { FaCode, FaUser } from 'react-icons/fa';

import { addReaction } from '@/src/actions/snippets';
import { FooterSnippet } from '@/src/shared/FooterSnippet';
import { Snippet, SnippetsForm } from '@/src/utils/types';

type HomePageProps = {
  data: SnippetsForm['data'];
};

export default function HomePage({ data }: HomePageProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const countMarks = (marks: Snippet['marks']) => {
    return marks.reduce(
      (acc, mark) => {
        if (mark.type === 'like') acc.likes += 1;
        if (mark.type === 'dislike') acc.dislikes += 1;
        return acc;
      },
      { likes: 0, dislikes: 0 }
    );
  };

  const handleLike = (snippetId: string) => {
    addReaction({ snippetId, type: 'like' });
  };
  const handleDislike = (snippetId: string) => {
    addReaction({ snippetId, type: 'dislike' });
  };
  const handleComments = (snippetId: string) => {
    router.push(`/snippets/${snippetId}`);
  };

  return (
    <div id="newPageRedirect" className="w-full mt-24 flex justify-center flex-col">
      <div className="flex items-center flex-col gap-6">
        <h1 className="text-2xl font-bold">{t('helloHomePage')}</h1>
        <FaCode className="w-14 h-14" />
      </div>
      <div className="mt-6 h-full w-full flex flex-col items-center gap-3">
        {data.data.map((elem) => {
          const { likes, dislikes } = countMarks(elem.marks);
          return (
            <div
              key={elem.id}
              className="w-3/4 max-w-4xl bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
            >
              <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <FaUser />
                  <span className="text-end">{elem.user.username}</span>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-700">
                  {elem.language}
                </span>
              </div>
              <div className="flex bg-gray-50">
                <div className="w-12 bg-gray-200 text-xs text-gray-500 flex items-center justify-center">
                  code
                </div>
                <pre className="p-4 text-sm font-mono overflow-x-auto">{elem.code}</pre>
              </div>
              <FooterSnippet
                likes={likes}
                dislikes={dislikes}
                count={elem.comments.length}
                onLike={() => handleLike(elem.id)}
                onDislike={() => handleDislike(elem.id)}
                addComment={() => handleComments(elem.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
