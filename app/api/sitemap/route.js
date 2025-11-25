// App Router route handler for /api/sitemap
import { getAllPosts, getAllCategories, getAllAuthors } from '@/lib/mdx';
import { siteMetadata } from '@/lib/seo';

export async function GET() {
  try {
    // Call each helper once and coerce to arrays to avoid `.some`/`.map` errors
    const postsRaw = getAllPosts();
    const categoriesRaw = getAllCategories();
    const authorsRaw = getAllAuthors();

    const posts = Array.isArray(postsRaw) ? postsRaw : [];
    const categories = Array.isArray(categoriesRaw) ? categoriesRaw : [];
    const authors = Array.isArray(authorsRaw) ? authorsRaw : [];
    const siteUrl = siteMetadata && typeof siteMetadata.siteUrl === 'string' ? siteMetadata.siteUrl : '';

    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'daily' },
      { url: '/blog', priority: '0.9', changefreq: 'daily' },
      { url: '/about', priority: '0.7', changefreq: 'monthly' },
      { url: '/contact', priority: '0.6', changefreq: 'monthly' },
      { url: '/advertise', priority: '0.6', changefreq: 'monthly' },
      { url: '/resources', priority: '0.7', changefreq: 'weekly' },
      { url: '/authors', priority: '0.7', changefreq: 'weekly' },
      { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
      { url: '/terms', priority: '0.3', changefreq: 'yearly' },
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${staticPages
      .map(
        (page) => `  <url>\n    <loc>${siteUrl}${page.url}</loc>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`
      )
      .join('\n')}
${posts
      .map((post) => {
        const loc = `${siteUrl}/posts/${post.slug}`;
        const lastmod = post && post.date ? `<lastmod>${post.date}</lastmod>` : '';
        return `  <url>\n    <loc>${loc}</loc>\n    ${lastmod}\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
      })
      .join('\n')}
${categories
      .map(
        (category) => `  <url>\n    <loc>${siteUrl}/category/${category.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`
      )
      .join('\n')}
${authors
      .map(
        (author) => `  <url>\n    <loc>${siteUrl}/author/${author.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>`
      )
      .join('\n')}
</urlset>`;

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
        'Cache-Control': 's-maxage=86400, stale-while-revalidate',
      },
    });
  } catch (err) {
    // If anything goes wrong during prerender/build time, return a minimal sitemap
    console.error('Failed to generate sitemap:', err);
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;
    return new Response(fallback, {
      status: 200,
      headers: { 'Content-Type': 'text/xml' },
    });
  }
}

// default export alias for bundlers that expect it
export default GET;
