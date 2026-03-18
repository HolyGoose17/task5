'use client';

import { useTranslation } from 'react-i18next';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { FaCode, FaComment, FaUser } from 'react-icons/fa';

import { addReaction } from '@/src/actions/snippets';
import { Button } from '@/src/shared/Button';
import { Comment } from '@/src/shared/Comment';
import { Input } from '@/src/shared/Input';
import { SnippetDetailsForm } from '@/src/utils/types';

interface Props {
  snippet: SnippetDetailsForm;
}

export default function SnippetDetails({ snippet }: Props) {
  const { t } = useTranslation();
  const testCounter = snippet.data.marks.reduce(
    (acc, elem) => {
      if (elem.type === 'like') {
        acc.like += 1;
      }
      if (elem.type === 'dislike') {
        acc.dislike += 1;
      }
      return acc;
    },
    { like: 0, dislike: 0 }
  );

  const handleLike = (snippetId: string) => {
    addReaction({ snippetId, type: 'like' });
  };
  const handleDislike = (snippetId: string) => {
    addReaction({ snippetId, type: 'dislike' });
  };
  return (
    <div className="mt-16 flex justify-center px-4 py-12">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 bg-gray-100 border-b">
          <div className="flex items-center gap-3 text-gray-700">
            <FaUser />
            <span className="font-semibold">{snippet.data.user.username}</span>
            <span className="text-xs text-gray-400">({snippet.data.user.role})</span>
          </div>

          <span className="text-sm font-medium px-3 py-1 rounded-lg bg-blue-100 text-blue-700">
            {snippet.data.language}
          </span>
        </div>

        <div className="flex bg-gray-50">
          <div className="w-14 bg-gray-200 flex items-center justify-center text-gray-500">
            <FaCode />
          </div>
          <pre className="p-6 text-sm font-mono overflow-x-auto w-full">{snippet.data.code}</pre>
        </div>

        <div className="flex items-center gap-8 px-6 py-4 border-t">
          <div
            className="flex items-center gap-2 text-green-500 cursor-pointer"
            onClick={() => handleLike(snippet.data.id)}
          >
            <AiFillLike size={20} />
            <span className="font-medium">{testCounter.like}</span>
          </div>

          <div
            className="flex items-center gap-2 text-red-500 cursor-pointer"
            onClick={() => handleDislike(snippet.data.id)}
          >
            <AiFillDislike size={20} />
            <span className="font-medium">{testCounter.dislike}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-500">
            <FaComment />
            <span>
              {snippet.data.comments.length} {t('comments.comments').toLowerCase()}
            </span>
          </div>
        </div>

        <div className="px-6 py-6 border-t bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">{t('comments.comments')}</h3>

          {snippet.data.comments.length === 0 && (
            <div className="text-gray-400">{t('comments.noComments')}</div>
          )}

          <div className="flex flex-col gap-4">
            {snippet.data.comments.map((comment) => (
              <Comment
                key={comment.id}
                username={comment.user.username}
                content={comment.content}
              />
            ))}
          </div>
          <form className="mt-6 flex items-center gap-2">
            <Input name={t('comments.addComment')} placeholder={t('comments.addComment')} />
            <Button className="text-xs">{t('comments.addComment')}</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
