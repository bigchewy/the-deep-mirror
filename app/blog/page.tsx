import { getAllPosts } from '../../lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Blog — The Deep Mirror`,
};

export default async function BlogPage() {
  const posts = await getAllPosts('blog-post');
  return (
    <main className="flex-1 mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="block p-6 border rounded-xl">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm mt-1">{post.description}</p>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
