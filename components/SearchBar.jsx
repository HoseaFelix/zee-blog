'use client'

// ============================================
// src/components/SearchBar.jsx
// ============================================
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';

export default function SearchBar({ posts }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const fuse = new Fuse(posts, {
      keys: ['title', 'summary', 'tags', 'category'],
      threshold: 0.4,
      includeScore: true,
    });

    const searchResults = fuse.search(query);
    setResults(searchResults.slice(0, 5));
  }, [query, posts]);

  const handleResultClick = (slug) => {
    router.push(`/posts/${slug}`);
    setQuery('');
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-lg">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          placeholder="Search articles..."
          className="w-full px-4 py-3 pl-12 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {showResults && results.length > 0 && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowResults(false)}
          />
          <div className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {results.map(({ item }) => (
              <button
                key={item.slug}
                onClick={() => handleResultClick(item.slug)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors"
              >
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                  {item.summary}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-primary-600 dark:text-primary-400">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {item.readTime}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

