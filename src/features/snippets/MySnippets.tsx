'use client';

import { redirect } from 'next/navigation';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { FaComment, FaUser } from 'react-icons/fa';

import { addReaction } from '@/src/actions/snippets';
import { Snippet, SnippetsForm } from '@/src/utils/types';

export default function MySnippets({ data }: { data: SnippetsForm['data'] }) {
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
    redirect(`/snippets/${snippetId}`);
  };
  return (
    <div className="mt-20 h-full w-full flex flex-col items-center gap-5">
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
            <div className="flex items-center justify-between gap-6 px-4 py-3 border-t">
              <div className="flex items-center gap-6">
                <div
                  onClick={() => handleLike(elem.id)}
                  className="flex items-center gap-2 text-green-300 cursor-pointer hover:opacity-80"
                >
                  <AiFillLike size={18} />
                  <span>{likes}</span>
                </div>
                <div
                  onClick={() => handleDislike(elem.id)}
                  className="flex items-center gap-2 text-red-400 cursor-pointer hover:opacity-80"
                >
                  <AiFillDislike size={18} />
                  <span>{dislikes}</span>
                </div>
              </div>
              <div
                onClick={() => {
                  handleComments(elem.id);
                }}
                className="flex items-center gap-2 text-red-400 cursor-pointer hover:opacity-80"
              >
                <FaComment size={18} />
                <span>{elem.comments.length}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
