// app/blog/page.jsx
import React from 'react';
import Link from 'next/link';
import MainLayout from '@/layouts/MainLayout';
import PostCard from '@/components/PostCard';
import SearchBar from '@/components/SearchBar';
import AdPlaceholder from '@/components/AdPlaceholder';
import Pagination from '@/components/Pagination';
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

  // Pagination navigation is handled in a client component (components/Pagination.jsx)

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
            <Pagination currentPage={currentPage} totalPages={totalPages} />
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
