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
  // DEBUG: Zeige ALLE Artikel (auch Drafts)
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('category', category)
    // .eq('status', 'published')  // <-- TEMPORÄR DEAKTIVIERT FÜR DEBUG
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Error fetching content:', error);
    return { contents: [], error: error.message };
  }
  
  console.log(`✅ Found ${data?.length || 0} articles for category: ${category}`);
  return { contents: data || [], error: null };
}

export default async function CategoryPage({ params }) {
  const { category } = params;

  // Check if category is valid
  if (!CATEGORIES[category]) {
    notFound();
  }

  const { contents, error } = await getContentByCategory(category);
  const categoryInfo = CATEGORIES[category];

  // DEBUG INFO
  const hasEnvVars = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

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
        {/* DEBUG INFO BANNER */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8">
          <h3 className="font-bold text-yellow-900 mb-2">🐛 DEBUG MODE</h3>
          <div className="text-sm text-yellow-800 space-y-1">
            <p>✓ Category: <strong>{category}</strong></p>
            <p>✓ Env Vars: <strong>{hasEnvVars ? '✅ OK' : '❌ MISSING'}</strong></p>
            <p>✓ Articles Found: <strong>{contents.length}</strong></p>
            {error && <p className="text-red-600">❌ Error: {error}</p>}
            <p className="text-xs mt-2">💡 Zeigt ALLE Artikel (inkl. Drafts) für Debug-Zwecke</p>
          </div>
        </div>

        {/* Category Header */}
        <div className="mb-12 text-center">
          <div className="text-6xl mb-4">{categoryInfo.emoji}</div>
          <h1 className="text-4xl font-light text-gray-900 mb-4">{categoryInfo.title}</h1>
          <p className="text-gray-600 text-lg">{categoryInfo.description}</p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {Object.keys(CATEGORIES).map((cat) => (
            <Link
              key={cat}
              href={`/${cat}`}
              className={`px-6 py-2 rounded-full transition ${
                category === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {CATEGORIES[cat].emoji} {CATEGORIES[cat].title}
            </Link>
          ))}
        </div>

        {/* Content List */}
        {contents.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-light text-gray-900 mb-2">
              Keine Artikel gefunden
            </h3>
            <p className="text-gray-600 mb-4">
              Es gibt noch keine {categoryInfo.title} Artikel in der Datenbank.
            </p>
            <div className="bg-gray-50 p-4 rounded text-left text-sm text-gray-700 max-w-md mx-auto">
              <p className="font-semibold mb-2">Mögliche Gründe:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Keine Artikel im Admin Panel erstellt</li>
                <li>Artikel haben falsche Kategorie: "{category}"</li>
                <li>Datenbankverbindung funktioniert nicht</li>
              </ul>
            </div>
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
                  {/* DEBUG: Status Badge */}
                  <div className="mb-3">
                    <span className={`inline-block px-2 py-1 text-xs rounded ${
                      content.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {content.status === 'published' ? '✅ Published' : '📝 Draft'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                    {content.author && <span>{content.author}</span>}
                    {content.published_at && (
                      <span>
                        • {new Date(content.published_at).toLocaleDateString('de-DE', {
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
                    Weiterlesen →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* DEBUG: Raw Data Display */}
        {contents.length > 0 && (
          <details className="mt-12 bg-gray-100 p-4 rounded">
            <summary className="cursor-pointer font-semibold text-gray-900 mb-2">
              🔍 Rohdaten anzeigen (für Entwickler)
            </summary>
            <pre className="text-xs overflow-auto bg-white p-4 rounded mt-2">
              {JSON.stringify(contents, null, 2)}
            </pre>
          </details>
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