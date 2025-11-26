import React from 'react';
import Link from 'next/link';
import MainLayout from '@/layouts/MainLayout';
import { getAllPosts, getAllCategories } from '@/lib/mdx';
import { siteMetadata } from '@/lib/seo';
import PostCard from '@/components/PostCard';
import SearchBar from '@/components/SearchBar';

export default async function Home() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();

  const featuredPosts = posts.slice(0, 3);
  const recentPosts = posts.slice(3, 9);

  return (
    <MainLayout>
      

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-cent>er max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Expert Insights on Finance, Tech & Business
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              Stay informed with our comprehensive guides on personal finance, insurance, investing, and technology.
            </p>
            <div className="flex justify-center">
              <SearchBar posts={posts} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Featured Articles
            </h2>
            <Link
              href="/blog"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Ad Placeholder */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Ad removed (was AdPlaceholder) */}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Browse by Category
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {category.count} {category.count === 1 ? 'article' : 'articles'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Latest Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>

  );
}

