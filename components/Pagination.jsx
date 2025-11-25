"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Pagination({ currentPage = 1, totalPages = 1 }) {
  const router = useRouter();

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    // Keep existing query params but update page
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('page', page);
      router.push(url.toString());
    } catch (err) {
      // fallback: navigate using location
      window.location.href = `?page=${page}`;
    }
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center items-center gap-2">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        if (
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 1 && page <= currentPage + 1)
        ) {
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                page === currentPage
                  ? 'bg-primary-600 text-white'
                  : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {page}
            </button>
          );
        } else if (
          (page === currentPage - 2 && currentPage > 3) ||
          (page === currentPage + 2 && currentPage < totalPages - 2)
        ) {
          return (
            <span key={page} className="px-2 text-gray-500">
              ...
            </span>
          );
        }
        return null;
      })}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </nav>
  );
}
