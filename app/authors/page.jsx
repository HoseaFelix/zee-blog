// app/authors/page.jsx
import React from 'react';
import Link from 'next/link';
import MainLayout from '@/layouts/MainLayout';
import { getAllAuthors } from '@/lib/mdx';
import { siteMetadata } from '@/lib/seo';

export default async function AuthorsPage() {
  const authors = getAllAuthors();

  return (
    <MainLayout
      seo={{
        title: `Authors - ${siteMetadata.title}`,
        description: 'Meet our team of expert writers',
        canonical: `${siteMetadata.siteUrl}/authors`,
      }}
    >
      <section className="py-16 bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Authors
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Meet the experts behind our content
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.map((author) => (
              <Link
                key={author.slug}
                href={`/author/${author.slug}`}
                className="group p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-2">
                  {author.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {author.count} {author.count === 1 ? 'article' : 'articles'}
                </p>
                <span className="text-primary-600 dark:text-primary-400 font-medium">
                  View articles →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
