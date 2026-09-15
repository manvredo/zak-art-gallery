'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { Calendar, ArrowRight } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CATEGORY = 'archive';

export default function ArchivePage() {
  const { language } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('category', CATEGORY)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Lädt...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="mb-8 flex items-center gap-4">
          <h1 className="font-light text-gray-900 whitespace-nowrap tracking-wide" style={{ fontSize: 32 }}>
            Moving Images
          </h1>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <p
          className="max-w-3xl text-gray-700 leading-relaxed mb-12"
          style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '18px', lineHeight: '32.48px' }}
        >
          Before returning to the physical canvas, I spent two decades exploring the boundaries of digital space. This archive holds a selection of past semi-abstract 3D animations and hybrid art films—constructed as fluid studies of light, form, and atmosphere. Today, this closed chapter of algorithmic and digital exploration serves as the invisible backbone and conceptual foundation for my analog painting practice.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {articles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500 text-lg">
              {language === 'de'
                ? 'Keine Artikel gefunden.'
                : 'No articles found.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="elegant-card"
              >
                {/* Featured Image */}
                {article.featured_image && (
                  <div className="aspect-video overflow-hidden bg-gray-200">
                    <img
                      src={article.featured_image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {formatDate(article.created_at)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="elegant-card-title">
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="elegant-card-excerpt line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Read More Link */}
                  <Link
                    href={`/${CATEGORY}/${article.slug}`}
                    className="elegant-card-link"
                  >
                    {language === 'de' ? 'Weiterlesen' : 'Read more'}
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}