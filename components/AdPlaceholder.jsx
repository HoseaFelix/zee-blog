// ============================================
// src/components/AdPlaceholder.jsx
// ============================================
import React from 'react';

export default function AdPlaceholder({ size = 'medium' }) {
  const sizeClasses = {
    small: 'h-24',
    medium: 'h-60',
    large: 'h-96',
    sidebar: 'h-[600px]',
  };

  return (
    <div
      className={`${sizeClasses[size]} bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center`}
    >
      <div className="text-center p-4">
        <div className="text-gray-400 dark:text-gray-500 mb-2">
          <svg
            className="h-12 w-12 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Ad Space ({size})
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Replace with actual ad code
        </p>
      </div>
    </div>
  );
}