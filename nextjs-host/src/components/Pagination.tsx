'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { searchUsers } from '@/services/githubApi';

export default function Pagination({ 
  totalCount, 
  currentPage, 
  perPage = 12 
}: { 
  totalCount: number; 
  currentPage: number; 
  perPage?: number; 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalCount / perPage);

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    
    router.push(`/?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;
    const halfShow = Math.floor(showPages / 2);

    let start = Math.max(1, currentPage - halfShow);
    let end = Math.min(totalPages, currentPage + halfShow);

    if (currentPage <= halfShow) {
      end = Math.min(totalPages, showPages);
    }
    if (currentPage > totalPages - halfShow) {
      start = Math.max(1, totalPages - showPages + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 bg-github-light border border-github-border rounded-md text-sm 
                   text-github-text hover:bg-github-hover disabled:opacity-50 
                   disabled:cursor-not-allowed transition-colors"
      >
        Anterior
      </button>

      <div className="flex gap-1">
        {getPageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-md text-sm transition-colors ${
                page === currentPage
                  ? 'bg-github-link text-white'
                  : 'bg-github-light border border-github-border text-github-text hover:bg-github-hover'
              }`}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="px-3 py-2 text-gray-500"
            >
              {page}
            </span>
          )
        )}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 bg-github-light border border-github-border rounded-md text-sm 
                   text-github-text hover:bg-github-hover disabled:opacity-50 
                   disabled:cursor-not-allowed transition-colors"
      >
        Siguiente
      </button>
    </div>
  );
}
