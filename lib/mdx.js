// lib/mdx.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/posts');

function ensureMeta(data, slug) {
  return {
    title: data.title || slug,
    date: data.date || null,
    summary: data.summary || '',
    featuredImage: data.featuredImage || '/images/placeholder.svg',
    tags: data.tags || [],
    category: data.category || 'Uncategorized',
    author: data.author || 'Unknown Author',
    ...data,
  };
}

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
  const allPostsData = fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  // Some editors or tools add comment headers before the YAML frontmatter (e.g. // ---).
  // gray-matter expects the frontmatter to start at the top of the file. If there is
  // any content before the leading `---` separator, the frontmatter will not be parsed.
  // To be robust, trim any content that appears before the first `---` so frontmatter
  // is still detected.
  const firstSep = fileContents.indexOf('---');
  const fmSource = firstSep > -1 ? fileContents.slice(firstSep) : fileContents;
  const { data, content } = matter(fmSource);
      const meta = ensureMeta(data, slug);
      const readTime = readingTime(content || '');
      return {
        slug,
        content, // keep raw content if you need it; server components can import MDX instead
        readTime: readTime?.text || '1 min read',
        ...meta,
      };
    });

  return allPostsData.sort((a, b) => {
    // If either date missing, push it to end
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
  });
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    // try .md fallback
    const alt = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(alt)) return null;
  const fileContents = fs.readFileSync(alt, 'utf8');
  const firstSep = fileContents.indexOf('---');
  const fmSource = firstSep > -1 ? fileContents.slice(firstSep) : fileContents;
  const { data, content } = matter(fmSource);
    const readTime = readingTime(content || '');
    const meta = ensureMeta(data, slug);
    return { slug, content, readTime: readTime.text, ...meta };
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const firstSep = fileContents.indexOf('---');
  const fmSource = firstSep > -1 ? fileContents.slice(firstSep) : fileContents;
  const { data, content } = matter(fmSource);
  const readTime = readingTime(content || '');
  const meta = ensureMeta(data, slug);
  return { slug, content, readTime: readTime.text, ...meta };
}

export function getAllCategories() {
  const posts = getAllPosts();
  const categories = {};
  posts.forEach((post) => {
    const category = post.category || 'Uncategorized';
    if (!categories[category]) {
      categories[category] = { name: category, slug: category.toLowerCase().replace(/\s+/g, '-'), count: 0 };
    }
    categories[category].count++;
  });
  return Object.values(categories).sort((a, b) => b.count - a.count);
}

export function getPostsByCategory(categorySlug) {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => (post.category || 'Uncategorized').toLowerCase().replace(/\s+/g, '-') === categorySlug);
}

export function getAllAuthors() {
  const posts = getAllPosts();
  const authors = {};
  posts.forEach((post) => {
    const author = post.author || 'Unknown Author';
    if (!authors[author]) {
      authors[author] = { name: author, slug: author.toLowerCase().replace(/\s+/g, '-'), count: 0, posts: [] };
    }
    authors[author].count++;
    authors[author].posts.push(post);
  });
  return Object.values(authors);
}

export function getPostsByAuthor(authorSlug) {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => (post.author || 'Unknown Author').toLowerCase().replace(/\s+/g, '-') === authorSlug);
}

export function getRelatedPosts(currentPost, limit = 3) {
  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== currentPost.slug)
    .map((p) => {
      let score = 0;
      if ((p.category || '') === (currentPost.category || '')) score += 3;
      const currentTags = currentPost.tags || [];
      const postTags = p.tags || [];
      const common = currentTags.filter((t) => postTags.includes(t));
      score += common.length;
      return { ...p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return related;
}
