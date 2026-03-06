'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { FaCode, FaComment, FaUser } from 'react-icons/fa';

import { addReaction } from '@/src/actions/snippets';
import { useSnippetsStore } from '@/src/store/snippets.store';
import { Snippet } from '@/src/utils/types';

export default function HomePage() {
  const { t } = useTranslation();
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

  const { page, meta, isLoading, loadPage, nextPage, prevPage, firstPage, lastPage, pages } =
    useSnippetsStore();

  const currentData = pages[page]?.data ?? [];

  const handleLike = (snippetId: string) => {
    addReaction({ snippetId, type: 'like' });
  };
  const handleDislike = (snippetId: string) => {
    addReaction({ snippetId, type: 'dislike' });
  };
  const handleComments = (snippetId: string) => {
    redirect(`/snippets/${snippetId}`);
  };

  useEffect(() => {
    if (!pages[1]) {
      loadPage(1);
    }
  }, []);

  return (
    <div id="newPageRedirect" className="w-full mt-24 flex justify-center flex-col">
      <div className="flex items-center flex-col gap-6">
        <h1 className="text-2xl font-bold">{t('helloHomePage')}</h1>
        <FaCode className="w-14 h-14" />
      </div>
      <div className="mt-6 h-full w-full flex flex-col items-center gap-3">
        {currentData.map((elem) => {
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

      <div className="flex justify-center items-center gap-4 mt-10 mb-20">
        {meta && (
          <div className="flex gap-3 justify-center mt-10">
            <button
              className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300  disabled:bg-gray-200 disabled:text-gray-400  transition cursor-pointer disabled:cursor-not-allowed"
              onClick={firstPage}
              disabled={page === 1 || isLoading}
            >
              <a href="#newPageRedirect">{t('pagination.first')}</a>
            </button>

            <button
              className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300  disabled:bg-gray-200 disabled:text-gray-400  transition cursor-pointer disabled:cursor-not-allowed"
              onClick={prevPage}
              disabled={page === 1 || isLoading}
            >
              <a href="#newPageRedirect">{t('pagination.prev')}</a>
            </button>

            <span className="px-4 py-2 font-medium text-gray-700 bg-gray-50 rounded-md border">
              {page} / {meta.totalPages}
            </span>

            <button
              className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300  disabled:bg-gray-200 disabled:text-gray-400  transition cursor-pointer disabled:cursor-not-allowed"
              onClick={nextPage}
              disabled={page >= meta.totalPages || isLoading}
            >
              <a href="#newPageRedirect">{t('pagination.next')}</a>
            </button>

            <button
              className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300  disabled:bg-gray-200 disabled:text-gray-400  transition cursor-pointer disabled:cursor-not-allowed"
              onClick={lastPage}
              disabled={page >= meta.totalPages || isLoading}
            >
              <a href="#newPageRedirect">{t('pagination.last')}</a>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
