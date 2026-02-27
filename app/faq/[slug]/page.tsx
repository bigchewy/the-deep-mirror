import { getAllPosts, getPostBySlug } from '../../../lib/content';
import MarkdownRenderer from '../../../components/content/MarkdownRenderer';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getAllPosts('faq');
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug('faq', slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function FaqDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug('faq', slug);
  if (!post) return <div>FAQ not found.</div>;

  return (
    <main className="flex-1 mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <MarkdownRenderer html={post.content} />
    </main>
  );
}
