// app/blog/page.jsx
import React from 'react';
import Link from 'next/link';
import MainLayout from '@/layouts/MainLayout';
import PostCard from '@/components/PostCard';
import SearchBar from '@/components/SearchBar';
import AdPlaceholder from '@/components/AdPlaceholder';
import { getAllPosts } from '@/lib/mdx';
import { paginateArray } from '@/lib/utils';
import { siteMetadata } from '@/lib/seo';

export default async function BlogPage({ searchParams }) {
  const resolved = await searchParams;
  const page = parseInt(resolved?.page || "1");
  const perPage = 6;

  const allPosts = getAllPosts();  // ✅ FIX HERE

  const { data: paginatedPosts, totalPages, currentPage } = paginateArray(
    allPosts,
    page,
    perPage
  );

  const goToPage = (page) => {
    // In App Router, you would use client-side navigation:
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('page', page);
      window.location.href = url.toString();
    }
  };

  return (
    <MainLayout
      seo={{
        title: `Blog - ${siteMetadata.title}`,
        description: 'Browse our latest articles on finance, technology, and business.',
        canonical: `${siteMetadata.siteUrl}/blog`,
      }}
    >
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Blog
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Expert insights, guides, and analysis
            </p>
          </div>
          <div className="flex justify-center">
            <SearchBar posts={allPosts} />
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginatedPosts.map((post, index) => (
              <React.Fragment key={post.slug}>
                <PostCard post={post} />
                {(index + 1) % 6 === 0 && index + 1 < paginatedPosts.length && (
                  <div className="md:col-span-2 lg:col-span-3">
                    <AdPlaceholder size="medium" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
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
          )}
        </div>
      </section>

      {/* Ad Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdPlaceholder size="large" />
        </div>
      </section>
    </MainLayout>
  );
}
