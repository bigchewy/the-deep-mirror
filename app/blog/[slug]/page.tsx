import { getAllPosts, getPostBySlug } from '../../../lib/content';
import MarkdownRenderer from '../../../components/content/MarkdownRenderer';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getAllPosts('blog-post');
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug('blog-post', slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug('blog-post', slug);
  if (!post) return <div>Post not found.</div>;

  return (
    <main className="flex-1 mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <MarkdownRenderer html={post.content} />
    </main>
  );
}
