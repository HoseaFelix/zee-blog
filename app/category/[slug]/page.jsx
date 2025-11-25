// app/category/[slug]/page.jsx
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import PostCard from '@/components/PostCard';
import { getAllCategories, getPostsByCategory } from '@/lib/mdx';
import { siteMetadata } from '@/lib/seo';

export default function CategoryPage({ params }) {
  const posts = getPostsByCategory(params.slug);
  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <MainLayout
      seo={{
        title: `${category.name} - ${siteMetadata.title}`,
        description: `Browse all articles in ${category.name}`,
        canonical: `${siteMetadata.siteUrl}/category/${category.slug}`,
      }}
    >
      <section className="py-16 bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this category
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

// App Router: generate static params
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}
