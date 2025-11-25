// ============================================
// src/components/PostCard.jsx
// ============================================
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export default function PostCard({ post }) {
  if (!post) {
    return null;
  }

  const categorySlug = post.category ? post.category.toLowerCase().replace(/\s+/g, '-') : 'uncategorized';

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link href={`/posts/${post.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={post.featuredImage || '/images/placeholder.jpg'}
            alt={post.title || 'Blog post'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          {post.category && (
            <>
              <Link
                href={`/category/${categorySlug}`}
                className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 uppercase tracking-wider"
              >
                {post.category}
              </Link>
              <span className="text-gray-300 dark:text-gray-600">•</span>
            </>
          )}
          <time className="text-xs text-gray-500 dark:text-gray-400">
            {post.date ? formatDate(post.date) : 'Date unknown'}
          </time>
        </div>

        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {post.summary}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {post.tags && post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {post.readTime}
          </span>
        </div>

        <Link
          href={`/posts/${post.slug}`}
          className="inline-block mt-4 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}

