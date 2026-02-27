import { getAllPosts } from '../../lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Comparisons — The Deep Mirror`,
};

export default async function ComparisonsPage() {
  const posts = await getAllPosts('comparison');
  return (
    <main className="flex-1 mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Comparisons</h1>
      {posts.length === 0 ? (
        <p>No comparisons yet.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <a key={post.slug} href={`/comparisons/${post.slug}`} className="block p-6 border rounded-xl">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm mt-1">{post.description}</p>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
