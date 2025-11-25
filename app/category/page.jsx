// app/category/page.jsx
import React from 'react';
import Link from 'next/link';
import MainLayout from '@/layouts/MainLayout';
import { getAllCategories } from '@/lib/mdx';
import { siteMetadata } from '@/lib/seo';

export default function CategoriesIndexPage() {
  const categories = getAllCategories();

  return (
    <MainLayout
      seo={{
        title: `Categories - ${siteMetadata.title}`,
        description: 'Browse articles by category',
        canonical: `${siteMetadata.siteUrl}/category`,
      }}
    >
      <section className="py-16 bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Categories</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">Browse articles grouped by topic</p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`} className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{cat.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{cat.count} {cat.count === 1 ? 'article' : 'articles'}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
