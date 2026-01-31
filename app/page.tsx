import { client } from '@/sanity/lib/client'
import { POSTS_QUERY } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'

interface Post {
  _id: string;
  title: string;
  mainImage?: any;
  publishedAt?: string;
  slug?: {
    current: string;
  };
}

export default async function HomePage() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY })
  const typedPosts = posts as Post[];

  return (
    <main style={{ padding: '2rem' }}>
      <h1>我的文章列表</h1>
      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {typedPosts.map((post) => (
          <article key={post._id} style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
            {post.mainImage && (
              <img
                src={urlFor(post.mainImage)
                      .width(1600)
                      .height(1000)
                      .url()}
                alt={post.title}
                style={{ width: '100%', height: '1000px', objectFit: 'cover' }}
              />
            )}
            <div style={{ padding: '1rem' }}>
              <h2>{post.title}</h2>
              {post.publishedAt && (
                <p style={{ fontSize: '0.8rem', color: '#666' }}>
                  發布日期: {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
