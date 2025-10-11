import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CATEGORIES = {
  news: { title: 'News', emoji: '📰' },
  story: { title: 'Stories', emoji: '📖' },
  press: { title: 'Press', emoji: '📢' },
  private: { title: 'Private', emoji: '🔒' }
};

async function getContentBySlug(category, slug) {
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('category', category)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching content:', error);
    return null;
  }
  
  return data;
}

async function getRelatedContent(category, currentId) {
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('category', category)
    .eq('status', 'published')
    .neq('id', currentId)
    .order('published_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching related content:', error);
    return [];
  }
  
  return data || [];
}

export default async function ArticlePage({ params }) {
  const { category, slug } = params;

  if (!CATEGORIES[category]) {
    notFound();
  }

  const content = await getContentBySlug(category, slug);

  if (!content) {
    notFound();
  }

  const relatedContents = await getRelatedContent(category, content.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-light tracking-wider text-gray-900 cursor-pointer">
                ZAK ART GALLERY
              </h1>
            </Link>
            <div className="flex items-center gap-4">
              <Link href={`/${category}`} className="text-gray-700 hover:text-gray-900">
                ← Back to {CATEGORIES[category].title}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <article>
          <div className="mb-8">
            <Link
              href={`/${category}`}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
            >
              {CATEGORIES[category].emoji} {CATEGORIES[category].title}
            </Link>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              {content.title}
            </h1>
            <div className="flex items-center gap-3 text-gray-600">
              {content.author && <span>{content.author}</span>}
              {content.published_at && (
                <>
                  <span>•</span>
                  <time dateTime={content.published_at}>
                    {new Date(content.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </>
              )}
            </div>
          </div>

          {/* Featured Image */}
          {content.featured_image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={content.featured_image}
                alt={content.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {content.content}
            </div>
          </div>
        </article>

        {/* Related Content */}
        {relatedContents.length > 0 && (
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h2 className="text-2xl font-light text-gray-900 mb-8">
              More from {CATEGORIES[category].title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedContents.map((related) => (
                <Link
                  key={related.id}
                  href={`/${category}/${related.slug}`}
                  className="group"
                >
                  {related.featured_image && (
                    <div className="aspect-video overflow-hidden bg-gray-100 rounded-lg mb-4">
                      <img
                        src={related.featured_image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                  )}
                  <h3 className="font-light text-gray-900 mb-2 group-hover:text-gray-600 transition">
                    {related.title}
                  </h3>
                  {related.excerpt && (
                    <p className="text-sm text-gray-600 line-clamp-2">{related.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>© 2024 ZAK Art Gallery. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}