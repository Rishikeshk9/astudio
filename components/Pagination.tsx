'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className='flex items-center justify-center gap-2 mt-4'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className='p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50'
      >
        ←
      </button>

      {[...Array(totalPages)].map((_, index) => {
        // Show first page, current page ±1, and last page
        if (
          index === 0 ||
          index === totalPages - 1 ||
          Math.abs(currentPage - index) <= 1
        ) {
          return (
            <button
              key={index}
              onClick={() => onPageChange(index)}
              className={`px-3 py-1 text-sm ${
                currentPage === index
                  ? 'text-black  font-bold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {index + 1}
            </button>
          );
        }

        // Show ellipsis if there's a gap
        if (Math.abs(currentPage - index) === 2) {
          return (
            <span key={index} className='text-gray-400'>
              ...
            </span>
          );
        }

        return null;
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className='p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50'
      >
        →
      </button>
    </div>
  );
}
