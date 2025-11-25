import { getPostBySlug } from '../lib/mdx.js';
const p = getPostBySlug('legal-mistakes-small-business');
if (!p) {
  console.error('no post');
  process.exit(1);
}
console.log('content length', p.content ? p.content.length : 'no content');
console.log(p.content ? p.content.slice(0,200) : '');
