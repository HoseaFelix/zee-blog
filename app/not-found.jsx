// ============================================
// src/pages/404.jsx
// ============================================
import React from 'react';
import Link from 'next/link';
import MainLayout from '@/layouts/MainLayout';
import { siteMetadata } from '@/lib/seo';

export default function Custom404() {
  return (
    <MainLayout
      seo={{
        title: `Page Not Found - ${siteMetadata.title}`,
        description: 'The page you are looking for does not exist',
      }}
    >
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            404
          </h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors"
            >
              View Blog
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

