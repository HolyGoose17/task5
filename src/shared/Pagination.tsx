'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    router.push(createPageURL(page));
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-10 mb-10">
      <button
        className="px-4 py-2 rounded-md bg-gray-100 text-gray-700  hover:bg-gray-200 active:bg-gray-300  disabled:bg-gray-200 disabled:text-gray-400  transition cursor-pointer disabled:cursor-not-allowed"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(1)}
      >
        {t('pagination.first')}
      </button>

      <button
        className="px-4 py-2 rounded-md bg-gray-100 text-gray-700  hover:bg-gray-200 active:bg-gray-300  disabled:bg-gray-200 disabled:text-gray-400  transition cursor-pointer disabled:cursor-not-allowed"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        {t('pagination.prev')}
      </button>

      <span>
        {currentPage} / {totalPages}
      </span>

      <button
        className="px-4 py-2 rounded-md bg-gray-100 text-gray-700  hover:bg-gray-200 active:bg-gray-300  disabled:bg-gray-200 disabled:text-gray-400  transition cursor-pointer disabled:cursor-not-allowed"
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        {t('pagination.next')}
      </button>

      <button
        className="px-4 py-2 rounded-md bg-gray-100 text-gray-700  hover:bg-gray-200 active:bg-gray-300  disabled:bg-gray-200 disabled:text-gray-400  transition cursor-pointer disabled:cursor-not-allowed"
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(totalPages)}
      >
        {t('pagination.last')}
      </button>
    </div>
  );
}
