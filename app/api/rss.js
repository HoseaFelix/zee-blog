
// ============================================
// src/pages/api/rss.js
// ============================================
import RSS from 'rss';
import { getAllPosts } from '@/lib/mdx';
import { siteMetadata } from '@/lib/seo';

export default function handler(req, res) {
  const posts = getAllPosts();
  const siteUrl = siteMetadata.siteUrl;

  const feed = new RSS({
    title: siteMetadata.title,
    description: siteMetadata.description,
    feed_url: `${siteUrl}/rss.xml`,
    site_url: siteUrl,
    image_url: `${siteUrl}/logo.png`,
    language: 'en',
    pubDate: new Date(),
    ttl: 60,
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.summary,
      url: `${siteUrl}/posts/${post.slug}`,
      categories: [post.category, ...(post.tags || [])],
      author: post.author,
      date: post.date,
      enclosure: post.featuredImage
        ? {
            url: `${siteUrl}${post.featuredImage}`,
            type: 'image/jpeg',
          }
        : undefined,
    });
  });

  res.setHeader('Content-Type', 'application/rss+xml; charset=UTF-8');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.write(feed.xml());
  res.end();
}