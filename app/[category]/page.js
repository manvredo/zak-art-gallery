'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import ContentHeader from '@/app/components/ContentHeader';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!CATEGORIES[category]) {
      notFound();
    }
    fetchContents();
  }, [category]);

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
    } else {
      setContents(data || []);
    }
    setLoading(false);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content Header */}
      <ContentHeader currentCategory={category} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Header */}
        <div className="mb-12 text-center">
          <div className="text-6xl mb-4">{categoryInfo.emoji}</div>
          <h1 className="text-4xl font-light text-gray-900 mb-4">{contentInfo.title}</h1>
          <p className="text-gray-600 text-lg">{contentInfo.description}</p>
        </div>

        {/* Content List */}
        {contents.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-600 text-lg">{t.content.noArticles}</p>
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
                    {content.author && <span>{t.content.by} {content.author}</span>}
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
                    {t.content.readMore} →
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
            <p>{t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}