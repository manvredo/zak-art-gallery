import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Valid categories
const CATEGORIES = {
  news: { title: 'News', emoji: '📰', description: 'Latest updates and announcements' },
  story: { title: 'Stories', emoji: '📖', description: 'Behind the scenes and artist stories' },
  press: { title: 'Press', emoji: '📢', description: 'Press releases and media coverage' },
  private: { title: 'Private', emoji: '🔒', description: 'Personal reflections and thoughts' }
};

async function getContentByCategory(category) {
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('category', category)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching content:', error);
    return [];
  }
  
  return data || [];
}

export default async function CategoryPage({ params }) {
  const { category } = params;

  // Check if category is valid
  if (!CATEGORIES[category]) {
    notFound();
  }

  const contents = await getContentByCategory(category);
  const categoryInfo = CATEGORIES[category];

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
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              ← Back to Shop
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Header */}
        <div className="mb-12 text-center">
          <div className="text-6xl mb-4">{categoryInfo.emoji}</div>
          <h1 className="text-4xl font-light text-gray-900 mb-4">{categoryInfo.title}</h1>
          <p className="text-gray-600 text-lg">{categoryInfo.description}</p>
        </div>

        {/* Content List */}
        {contents.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-600 text-lg">No published {category} articles yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contents.map((content) => (
              <Link
                key={content.id}
                href={`/${category}/${content.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group"
              >
                {content.featured_image && (
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={content.featured_image}
                      alt={content.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                    {content.author && <span>{content.author}</span>}
                    {content.published_at && (
                      <span>
                        • {new Date(content.published_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-light text-gray-900 mb-3 group-hover:text-gray-600 transition">
                    {content.title}
                  </h2>
                  {content.excerpt && (
                    <p className="text-gray-600 line-clamp-3">{content.excerpt}</p>
                  )}
                  <div className="mt-4 text-gray-900 font-medium text-sm group-hover:underline">
                    Read more →
                  </div>
                </div>
              </Link>
            ))}
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