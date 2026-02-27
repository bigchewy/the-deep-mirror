import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

type ContentType = 'blog-post' | 'comparison' | 'faq';

const TYPE_TO_DIR: Record<ContentType, string> = {
  'blog-post': 'content/blog',
  'comparison': 'content/comparisons',
  'faq': 'content/faq',
};

export interface Post {
  slug: string;
  title: string;
  description: string;
  type: ContentType;
  date: string;
  content: string;
  targetKeywords: string[];
}

export async function getAllPosts(type: ContentType): Promise<Post[]> {
  const dir = path.join(process.cwd(), TYPE_TO_DIR[type]);
  let filenames: string[];
  try {
    filenames = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  } catch (error) {
    console.debug('[templates] post directory read failed:', error);
    return [];
  }

  const posts: Post[] = [];
  for (const filename of filenames) {
    const slug = filename.replace(/\.md$/, '');
    const post = await getPostBySlug(type, slug);
    if (post) posts.push(post);
  }

  posts.sort((a, b) => (a.date > b.date ? -1 : 1));
  return posts;
}

export async function getPostBySlug(type: ContentType, slug: string): Promise<Post | null> {
  const dir = path.join(process.cwd(), TYPE_TO_DIR[type]);
  const filePath = path.join(dir, slug + '.md');

  let raw: string;
  try {
    raw = fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.debug('[templates] post file read failed:', error);
    return null;
  }

  const { data, content: md } = matter(raw);
  const result = await remark().use(html).process(md);

  return {
    slug,
    title: (data.title as string) || slug,
    description: (data.description as string) || '',
    type,
    date: (data.date as string) || '',
    content: result.toString(),
    targetKeywords: (data.targetKeywords as string[]) || [],
  };
}
