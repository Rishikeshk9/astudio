'use client';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
  skip: number;
}

export default function Pagination({
  currentPage,
  onPageChange,
  totalItems,
  pageSize,
  skip,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 8; // Show max 8 page numbers as in the image

    // Always show page 1
    pages.push(1);

    // Calculate the range around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, startPage + 3);

    // Add ellipsis after page 1 if needed
    if (startPage > 2) {
      pages.push('...');
    }

    // Add pages in the middle
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push('...');
    }

    // Always show last page if there is more than one page
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className='flex items-center justify-center gap-1 mt-4'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className='p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50'
      >
        ←
      </button>

      {getPageNumbers().map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className='px-2 text-gray-400'>
              {page}
            </span>
          );
        }

        const pageNum = Number(page) - 1; // Convert to 0-based index
        return (
          <button
            key={page}
            onClick={() => onPageChange(pageNum)}
            className={`px-3 py-1 text-sm rounded ${
              currentPage === pageNum
                ? 'text-black font-bold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {page}
          </button>
        );
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
