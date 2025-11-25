import { getPostBySlug } from '../lib/mdx.js';
import { serialize } from 'next-mdx-remote/serialize';
const p = getPostBySlug('legal-mistakes-small-business');
(async ()=>{
  try{
    const mdx = await serialize(p.content, { mdxOptions: { remarkPlugins: [], rehypePlugins: [] } });
    console.log('serialized keys:', Object.keys(mdx));
    console.log('serialized type:', typeof mdx);
    console.log('preview:', JSON.stringify(mdx).slice(0,200));
  }catch(err){
    console.error('serialize error', err);
  }
})();
