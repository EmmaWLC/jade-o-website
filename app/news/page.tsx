import { ALL_NEWS_QUERY } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface InternationalizedString {
  _key: string;
  _type: 'internationalizedArrayStringValue';
  value?: string;
}

interface Author {
  _id: string;
  name: string;
  image?: SanityImageSource;
}

interface Post {
  _id: string;
  title: InternationalizedString[];  // 🔧 改成陣列
  slug: {
    _type: 'slug';
    current: string;
  };
  publishedAt: string;
  mainImage?: SanityImageSource;
  author?: Author;
}

// 🔧 輔助函數:取得國際化文字
function getLocalizedText(arr: InternationalizedString[], locale: string = 'en'): string {
  const item = arr?.find(item => item._key === locale);
  return item?.value || arr?.[0]?.value || '';
}

export default async function News() {
  const { data: posts } = await sanityFetch({ query: ALL_NEWS_QUERY })
  const typedPosts = posts as Post[];

  return (
    <main style={{ padding: '2rem' }}>
      <h1>我的文章列表</h1>
      <div style={{ 
        display: 'grid', 
        gap: '2rem', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' 
      }}>
        {typedPosts.map((post) => (
          <article 
            key={post._id} 
            style={{ 
              border: '1px solid #ccc', 
              borderRadius: '8px', 
              overflow: 'hidden' 
            }}
          >
            {post.mainImage && (
              <img
                src={urlFor(post.mainImage)
                  .width(600)
                  .height(400)
                  .fit('crop')
                  .auto('format')
                  .quality(80)
                  .url()}
                alt={getLocalizedText(post.title)}
                style={{ 
                  width: '100%', 
                  height: '200px',
                  objectFit: 'cover' 
                }}
              />
            )}
            <div style={{ padding: '1rem' }}>
              {/* ✅ 使用輔助函數取得文字 */}
              <h2 style={{ margin: '0 0 0.5rem 0' }}>
                {getLocalizedText(post.title)}
              </h2>
              
              {post.author?.name && (
                <p style={{ fontSize: '0.85rem', color: '#444', margin: '0 0 0.5rem 0' }}>
                  作者: {post.author.name}
                </p>
              )}
              
              {post.publishedAt && (
                <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>
                  發布日期: {new Date(post.publishedAt).toLocaleDateString('zh-TW')}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}