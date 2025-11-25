// app/posts/[slug]/page.jsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import MainLayout from '@/layouts/MainLayout';
import PostCard from '@/components/PostCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/mdx';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { marked } from 'marked';
import { formatDate } from '@/lib/utils';
import { generateArticleSchema, generateBreadcrumbSchema, siteMetadata } from '@/lib/seo';

// Optional MDX React components mapping (used when MDX imports default render)
const MDXComponents = {
  h1: (props) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
  h2: (props) => <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h3: (props) => <h3 className="text-2xl font-bold mt-6 mb-3" {...props} />,
  p: (props) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
  a: (props) => <a className="text-primary-600 dark:text-primary-400 hover:underline" {...props} />,
  blockquote: (props) => <blockquote className="border-l-4 border-primary-500 pl-4 italic my-4" {...props} />,
};

export default async function PostPage({ params }) {
  // params is a Promise in app router, so we already await above in the call signature
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  if (!slug) return <div>Post not found</div>;

  const postData = getPostBySlug(slug);
  if (!postData) return <div>Post not found</div>;

  // Ensure defaults
  const post = {
    ...postData,
    category: postData.category || 'Uncategorized',
    author: postData.author || 'Unknown Author',
  };

  // Instead of attempting a dynamic import (which Next's bundler can't
  // statically analyze for arbitrary slugs), serialize the MDX content we
  // already read in `getPostBySlug` using `next-mdx-remote` and render it
  // with `MDXRemote`. This avoids bundler issues and works server-side.
  let mdxSource = null;
  if (postData?.content) {
    mdxSource = await serialize(postData.content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    });
  }

  // Use `marked` for a robust Markdown -> HTML fallback render.
  function mdToHtml(md) {
    if (!md) return '';
    try {
      return marked.parse(md);
    } catch (err) {
      return '<pre>' + String(md) + '</pre>';
    }
  }

  // debug: log post metadata (remove in production)
  console.log(post)

  // expose simple debug flags in the rendered page to help diagnose MDX rendering
  const debugInfo = {
    hasMdxSource: !!mdxSource,
    mdxCompiledLength: mdxSource ? (mdxSource.compiledSource ? mdxSource.compiledSource.length : null) : null,
  };

  const relatedPosts = getRelatedPosts(post);
  const categorySlug = (post.category || 'uncategorized').toLowerCase().replace(/\s+/g, '-');
  const authorSlug = (post.author || 'unknown').toLowerCase().replace(/\s+/g, '-');

  const articleSchema = generateArticleSchema(post, siteMetadata.siteUrl);
  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/posts/${post.slug}` },
    ],
    siteMetadata.siteUrl
  );

  return (
    <MainLayout
      seo={{
        title: `${post.title} - ${siteMetadata.title}`,
        description: post.summary,
        canonical: `${siteMetadata.siteUrl}/posts/${post.slug}`,
        image: `${siteMetadata.siteUrl}${post.featuredImage}`,
        type: 'article',
        jsonLd: [articleSchema, breadcrumbSchema],
      }}
    >
      <article className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Home</Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Blog</Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link href={`/category/${categorySlug}`} className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                  {post.category}
                </Link>
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Link href={`/category/${categorySlug}`} className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 uppercase">
                {post.category}
              </Link>
              <span className="text-gray-300">•</span>
              <time className="text-sm text-gray-600 dark:text-gray-400">{formatDate(post.date)}</time>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{post.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{post.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{post.summary}</p>

            <div className="flex items-center gap-4">
              <Link href={`/author/${authorSlug}`} className="font-medium text-gray-900 dark:text-white hover:text-primary-600">
                By {post.author}
              </Link>
            </div>
          </header>

          {/* Featured image */}
          <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
            <Image src={post.featuredImage} alt={post.title} fill className="object-cover" priority />
          </div>

          {/* Ad */}
          <div className="mb-8"><AdPlaceholder size="medium" /></div>

          {/* Article content: render imported MDX component if available */}
          <div className="mb-4">
            <div className="text-xs text-gray-500">Debug: MDX serialized? {String(debugInfo.hasMdxSource)}</div>
            {debugInfo.mdxCompiledLength !== null && (
              <div className="text-xs text-gray-500">MDX compiled length: {debugInfo.mdxCompiledLength}</div>
            )}
          </div>
          <div className="prose prose-lg dark:prose-dark max-w-none">
            {mdxSource ? (
              <MDXRemote {...mdxSource} components={MDXComponents} />
            ) : (
              // Fallback: show raw MDX/plain text so it's visible while debugging
              <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">{post.content}</pre>
            )}
          </div>
          {/* Always include a collapsed raw-content view for debugging visibility */}
          <details className="mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded">
            <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-300">Show raw MDX content (debug)</summary>
            <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 mt-2">{post.content}</pre>
          </details>

          {/* HTML fallback (server-side) rendered from the raw markdown for visibility */}
          <div className="mt-6">
            <div className="text-sm text-gray-500 mb-2">Fallback HTML (server-rendered) — visible if MDX didn't render:</div>
            <div
              className="prose prose-lg dark:prose-dark max-w-none bg-white dark:bg-gray-900 p-4 rounded"
              dangerouslySetInnerHTML={{ __html: mdToHtml(post.content) }}
            />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">#{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Advertisement */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><AdPlaceholder size="large" /></div>
      </section>

      {/* Related posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">{relatedPosts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
          </div>
        </section>
      )}
    </MainLayout>
  );
}

// static params for app router
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}
