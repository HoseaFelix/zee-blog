// app/error.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import MainLayout from '@/layouts/MainLayout';
import { siteMetadata } from '@/lib/seo';

export default function GlobalError({ error, reset }) {
  console.error(error);

  return (
    <MainLayout
      seo={{
        title: `Server Error - ${siteMetadata.title}`,
        description: 'An error occurred on our server',
      }}
    >
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-9xl font-bold text-red-600 dark:text-red-400 mb-4">
            500
          </h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Server Error
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Something went wrong on our end. Please try again later.
          </p>
          <button
            onClick={() => reset()}
            className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-block ml-4 px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-lg transition-colors"
          >
            Go Home
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
