import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

type PaginationButtonProps = {
  currentPage: number;
  maxPage: number;
  firstPage: () => Promise<void>;
  prevPage: () => Promise<void>;
  nextPage: () => Promise<void>;
  lastPage: () => Promise<void>;
};

export const PaginationButton = ({
  currentPage,
  maxPage,
  firstPage,
  prevPage,
  nextPage,
  lastPage,
}: PaginationButtonProps) => {
  const { t } = useTranslation();

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));

    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex gap-3 justify-center mt-10">
      <button
        className="px-4 py-2 rounded-md bg-gray-100 text-gray-700  hover:bg-gray-200 active:bg-gray-300  disabled:bg-gray-200 disabled:text-gray-400  transition cursor-pointer disabled:cursor-not-allowed"
        onClick={firstPage}
      >
        {t('pagination.first')}
      </button>

      <button
        className="px-4 py-2 rounded-md bg-gray-100 text-gray-700  hover:bg-gray-200 active:bg-gray-300  disabled:bg-gray-200 disabled:text-gray-400  transition cursor-pointer disabled:cursor-not-allowed"
        onClick={prevPage}
      >
        {t('pagination.prev')}
      </button>

      <button
        className="px-4 py-2 rounded-md bg-gray-100 text-gray-700  hover:bg-gray-200 active:bg-gray-300  disabled:bg-gray-200 disabled:text-gray-400  transition cursor-pointer disabled:cursor-not-allowed"
        onClick={() => goToPage(page - 1)}
      >
        {t('pagination.prev')}
      </button>

      <span className="px-4 py-2 font-medium text-gray-700 bg-gray-50 rounded-md border">
        {currentPage} / {maxPage}
      </span>

      <button
        className="px-4 py-2 rounded-md bg-gray-100 text-gray-700  hover:bg-gray-200 active:bg-gray-300  disabled:bg-gray-200 disabled:text-gray-400  transition cursor-pointer disabled:cursor-not-allowed"
        onClick={() => goToPage(page + 1)}
      >
        {t('pagination.next')}
      </button>

      <button
        className="px-4 py-2 rounded-md bg-gray-100 text-gray-700  hover:bg-gray-200 active:bg-gray-300  disabled:bg-gray-200 disabled:text-gray-400  transition cursor-pointer disabled:cursor-not-allowed"
        onClick={nextPage}
      >
        {t('pagination.next')}
      </button>

      <button
        className="px-4 py-2 rounded-md bg-gray-100 text-gray-700  hover:bg-gray-200 active:bg-gray-300  disabled:bg-gray-200 disabled:text-gray-400  transition cursor-pointer disabled:cursor-not-allowed"
        onClick={lastPage}
      >
        {t('pagination.last')}
      </button>
    </div>
  );
};
