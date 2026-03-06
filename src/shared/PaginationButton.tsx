type PaginationButtonProps = {
  text: string;
  status: boolean;
  onClick: () => Promise<void>;
};

export const PaginationButton = ({ text, status, onClick }: PaginationButtonProps) => {
  return (
    <>
      <button
        className="px-4 py-2 rounded-md bg-gray-100 text-gray-700  hover:bg-gray-200 active:bg-gray-300  disabled:bg-gray-200 disabled:text-gray-400  transition cursor-pointer disabled:cursor-not-allowed"
        onClick={onClick}
        disabled={status}
      >
        {text}
      </button>
    </>
  );
};
