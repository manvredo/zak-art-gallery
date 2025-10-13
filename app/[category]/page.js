'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import ContentHeader from '@/app/components/ContentHeader';
import { Search, Calendar, User as UserIcon } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Valid categories with translations keys
const CATEGORIES = {
  news: { 
    titleKey: 'news',
    emoji: '📰'
  },
  story: { 
    titleKey: 'stories',
    emoji: '📖'
  },
  press: { 
    titleKey: 'press',
    emoji: '📢'
  },
  private: { 
    titleKey: 'private',
    emoji: '🔒'
  }
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category;
  const { t } = useLanguage();
  const [contents, setContents] = useState([]);
  const [filteredContents, setFilteredContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    if (!CATEGORIES[category]) {
      notFound();
    }
    fetchContents();
    fetchAvailableCategories();
  }, [category]);

  useEffect(() => {
    // Filter contents based on search
    if (searchQuery.trim() === '') {
      setFilteredContents(contents);
    } else {
      const filtered = contents.filter(content => 
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.author?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContents(filtered);
    }
  }, [searchQuery, contents]);

  const fetchContents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching content:', error);
      setContents([]);
      setFilteredContents([]);
    } else {
      setContents(data || []);
      setFilteredContents(data || []);
    }
    setLoading(false);
  };

  const fetchAvailableCategories = async () => {
    const categories = ['news', 'story', 'press', 'private'];
    const available = [];

    for (const cat of categories) {
      const { data, error } = await supabase
        .from('content')
        .select('id')
        .eq('category', cat)
        .eq('status', 'published')
        .limit(1);

      if (!error && data && data.length > 0) {
        available.push(cat);
      }
    }

    setAvailableCategories(available);
  };

  if (!CATEGORIES[category]) {
    notFound();
  }

  const categoryInfo = CATEGORIES[category];
  const contentInfo = t.content[categoryInfo.titleKey];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">{t.common.loading}</p>
        </div>
      </div>
    );
  }

  const categoryLabels = {
    news: t.content.news.title,
    story: t.content.stories.title,
    press: t.content.press.title,
    private: t.content.private.title
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ContentHeader currentCategory={category} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              
              {/* Search Box - FIRST & PROMINENT */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                  <Search size={24} />
                  Suche
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Artikel durchsuchen..."
                    className="w-full px-4 py-3 pr-10 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-white/50 focus:outline-none transition"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {searchQuery && (
                  <div className="mt-3 text-sm bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                    ✓ {filteredContents.length} Ergebnis(se) gefunden
                  </div>
                )}
              </div>

              {/* Categories - Clean & Simple */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategorien</h3>
                <nav className="space-y-2">
                  {availableCategories.map(cat => (
                    <Link
                      key={cat}
                      href={`/${cat}`}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        category === cat
                          ? 'bg-gray-900 text-white shadow-md transform scale-105'
                          : 'text-gray-700 hover:bg-gray-50 hover:translate-x-1'
                      }`}
                    >
                      <span className="text-2xl">{CATEGORIES[cat].emoji}</span>
                      <span className="font-medium">{categoryLabels[cat]}</span>
                    </Link>
                  ))}
                  
                  {/* Vita Link */}
                  <Link
                    href="/vita"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-700 hover:bg-gray-50 hover:translate-x-1 border-t border-gray-100 mt-4 pt-4"
                  >
                    <span className="text-2xl">👤</span>
                    <span className="font-medium">Künstler Vita</span>
                  </Link>
                </nav>
              </div>

            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="lg:col-span-3">
            {/* Category Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{categoryInfo.emoji}</div>
                <div>
                  <h1 className="text-3xl font-light text-gray-900">{contentInfo.title}</h1>
                  <p className="text-gray-600">{contentInfo.description}</p>
                </div>
              </div>
            </div>

            {/* Content List */}
            {filteredContents.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg">
                <div className="text-6xl mb-4">
                  {searchQuery ? '🔍' : '📝'}
                </div>
                <p className="text-gray-600 text-lg">
                  {searchQuery 
                    ? `Keine Artikel gefunden für "${searchQuery}"`
                    : t.content.noArticles
                  }
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-4 text-gray-900 hover:underline"
                  >
                    Suche zurücksetzen
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredContents.map((content) => (
                  <Link
                    key={content.id}
                    href={`/${category}/${content.slug}`}
                    className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group"
                  >
                    <div className="lg:flex">
                      {content.featured_image && (
                        <div className="lg:w-80 h-64 lg:h-auto overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={content.featured_image}
                            alt={content.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                        </div>
                      )}
                      <div className="p-6 flex-1">
                        <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                          {content.author && (
                            <span className="flex items-center gap-1">
                              <UserIcon size={14} />
                              {content.author}
                            </span>
                          )}
                          {content.published_at && (
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(content.published_at).toLocaleDateString('de-DE', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          )}
                        </div>
                        <h2 className="text-2xl font-light text-gray-900 mb-3 group-hover:text-gray-600 transition">
                          {content.title}
                        </h2>
                        {content.excerpt && (
                          <p className="text-gray-600 mb-4 line-clamp-2">{content.excerpt}</p>
                        )}
                        <div className="text-gray-900 font-medium text-sm group-hover:underline inline-flex items-center gap-2">
                          {t.content.readMore} →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>{t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}