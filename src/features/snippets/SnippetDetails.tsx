'use client';

import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { FaCode, FaComment, FaUser } from 'react-icons/fa';

import { Snippet } from '@/src/utils/types';

interface Props {
  snippet: Snippet;
}

export default function SnippetDetails({ snippet }: Props) {
  const countMarks = () => {
    return snippet.marks.reduce(
      (acc, mark) => {
        if (mark.type === 'like') acc.likes += 1;
        if (mark.type === 'dislike') acc.dislikes += 1;
        return acc;
      },
      { likes: 0, dislikes: 0 }
    );
  };

  const { likes, dislikes } = countMarks();

  return (
    <div className="min-h-screen flex justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 bg-gray-100 border-b">
          <div className="flex items-center gap-3 text-gray-700">
            <FaUser />
            <span className="font-semibold">{snippet.user.username}</span>
            <span className="text-xs text-gray-400">({snippet.user.role})</span>
          </div>

          <span className="text-sm font-medium px-3 py-1 rounded-lg bg-blue-100 text-blue-700">
            {snippet.language}
          </span>
        </div>

        <div className="flex bg-gray-50">
          <div className="w-14 bg-gray-200 flex items-center justify-center text-gray-500">
            <FaCode />
          </div>
          <pre className="p-6 text-sm font-mono overflow-x-auto w-full">{snippet.code}</pre>
        </div>

        <div className="flex items-center gap-8 px-6 py-4 border-t">
          <div className="flex items-center gap-2 text-green-500">
            <AiFillLike size={20} />
            <span className="font-medium">{likes}</span>
          </div>

          <div className="flex items-center gap-2 text-red-500">
            <AiFillDislike size={20} />
            <span className="font-medium">{dislikes}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-500">
            <FaComment />
            <span>{snippet.comments.length} comments</span>
          </div>
        </div>

        <div className="px-6 py-6 border-t bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">Комментарии</h3>

          {snippet.comments.length === 0 && (
            <div className="text-gray-400">Комментариев пока нет</div>
          )}

          <div className="flex flex-col gap-4">
            {snippet.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                <p className="text-sm text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
