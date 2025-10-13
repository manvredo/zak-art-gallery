'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import ContentHeader from '@/app/components/ContentHeader';
import ContentSidebar from '@/app/components/ContentSidebar';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CATEGORIES = {
  news: { titleKey: 'news', emoji: '📰' },
  story: { titleKey: 'stories', emoji: '📖' },
  press: { titleKey: 'press', emoji: '📢' },
  private: { titleKey: 'private', emoji: '🔒' }
};

export default function ArticlePage() {
  const params = useParams();
  const category = params.category;
  const slug = params.slug;
  const { t } = useLanguage();
  
  const [content, setContent] = useState(null);
  const [relatedContents, setRelatedContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!CATEGORIES[category]) {
      notFound();
    }
    fetchContent();
  }, [category, slug]);

  const fetchContent = async () => {
    setLoading(true);
    
    // Get main content
    const { data: contentData, error: contentError } = await supabase
      .from('content')
      .select('*')
      .eq('category', category)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (contentError || !contentData) {
      notFound();
      return;
    }

    setContent(contentData);

    // Get related content
    const { data: relatedData, error: relatedError } = await supabase
      .from('content')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .neq('id', contentData.id)
      .order('published_at', { ascending: false })
      .limit(3);

    if (!relatedError && relatedData) {
      setRelatedContents(relatedData);
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

  if (!content) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content Header */}
      <ContentHeader currentCategory={category} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <article>
          <div className="mb-8">
            <Link
              href={`/${category}`}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
            >
              {categoryInfo.emoji} {contentInfo.title}
            </Link>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              {content.title}
            </h1>
            <div className="flex items-center gap-3 text-gray-600">
              {content.author && <span>{t.content.by} {content.author}</span>}
              {content.published_at && (
                <>
                  <span>•</span>
                  <time dateTime={content.published_at}>
                    {new Date(content.published_at).toLocaleDateString('de-DE', {
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
              {t.content.moreFrom} {contentInfo.title}
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
            <p>{t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}