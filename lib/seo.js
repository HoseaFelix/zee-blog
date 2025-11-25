// ============================================
// src/lib/seo.js
// ============================================

export const siteMetadata = {
  title: 'ZEE BlOG - Insights on Finance, Tech & Business',
  description: 'Expert insights and guides on personal finance, insurance, investing, SaaS, and business growth.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourblog.com',
  author: 'ZEE BlOG Team',
  social: {
    twitter: '@yourblog',
    facebook: 'yourblog',
    linkedin: 'company/yourblog',
  },
  defaultImage: '/images/og-default.jpg',
};

export function generateSEO({
  title,
  description,
  canonical,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags = [],
  author,
}) {
  const seo = {
    title: title ? `${title} | ${siteMetadata.title}` : siteMetadata.title,
    description: description || siteMetadata.description,
    canonical: canonical || siteMetadata.siteUrl,
    openGraph: {
      type: type,
      locale: 'en_US',
      url: canonical || siteMetadata.siteUrl,
      title: title || siteMetadata.title,
      description: description || siteMetadata.description,
      images: [
        {
          url: image || siteMetadata.defaultImage,
          width: 1200,
          height: 630,
          alt: title || siteMetadata.title,
        },
      ],
      site_name: siteMetadata.title,
    },
    twitter: {
      handle: siteMetadata.social.twitter,
      site: siteMetadata.social.twitter,
      cardType: 'summary_large_image',
    },
  };

  if (type === 'article' && publishedTime) {
    seo.openGraph.article = {
      publishedTime,
      modifiedTime: modifiedTime || publishedTime,
      authors: [author || siteMetadata.author],
      tags,
    };
  }

  return seo;
}

export function generateArticleSchema(post, siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    image: `${siteUrl}${post.featuredImage}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.title,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/posts/${post.slug}`,
    },
    keywords: post.tags ? post.tags.join(', ') : '',
  };
}

export function generateBreadcrumbSchema(items, siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function generateOrganizationSchema(siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteMetadata.title,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      `https://twitter.com/${siteMetadata.social.twitter.replace('@', '')}`,
      `https://facebook.com/${siteMetadata.social.facebook}`,
      `https://linkedin.com/${siteMetadata.social.linkedin}`,
    ],
  };
}