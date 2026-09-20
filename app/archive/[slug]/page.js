'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ArrowLeft, Share2 } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

const CATEGORY = 'archive';

export default function ArchiveDetailPage() {
  const params = useParams();
  const { language } = useLanguage();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const slug = params.slug;

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const { data: articleData, error: articleError } = await supabase
        .from('content')
        .select('*')
        .eq('category', CATEGORY)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (articleError) throw articleError;
      setArticle(articleData);

      const { data: relatedData, error: relatedError } = await supabase
        .from('content')
        .select('*')
        .eq('category', CATEGORY)
        .neq('slug', slug)
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(3);

      if (!relatedError) {
        setRelatedArticles(relatedData || []);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(language === 'de' ? 'Link kopiert!' : 'Link copied!');
    }
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

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-8">
            {language === 'de' ? 'Artikel nicht gefunden' : 'Article not found'}
          </p>
          <Link href={`/${CATEGORY}`} className="text-gray-900 hover:text-gray-700 font-medium">
            ← {language === 'de' ? 'Zurück zur Übersicht' : 'Back to overview'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href={`/${CATEGORY}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            {language === 'de' ? 'Zurück' : 'Back'}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {language === 'de' ? 'Archiv' : 'Archive'}
            </span>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar size={18} />
                <time>{formatDate(article.created_at)}</time>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
              >
                <Share2 size={18} />
                <span className="hidden sm:inline">
                  {language === 'de' ? 'Teilen' : 'Share'}
                </span>
              </button>
            </div>

            <h1 className="text-2xl font-light text-gray-900 mb-6">
              {article.title}
            </h1>

            {article.excerpt && (
              <p
                className="text-gray-700 mb-8 leading-relaxed"
                style={{ fontFamily: "'Vollkorn', Georgia, serif", fontSize: '25px' }}
              >
                {article.excerpt}
              </p>
            )}

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>

        {relatedArticles.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'de' ? 'Weitere Arbeiten' : 'More from the Archive'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/${CATEGORY}/${related.slug}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden group"
                >
                  {related.featured_image && (
                    <div className="aspect-video overflow-hidden bg-gray-200">
                      <img
                        src={related.featured_image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-900 transition">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {related.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
