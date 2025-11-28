'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User as UserIcon } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CATEGORY = 'news';

export default function NewsArticleDetailPage() {
  const { language } = useLanguage();
  const params = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const slug = params.slug;

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('category', CATEGORY)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) {
        console.error('Error fetching article:', error);
        setNotFound(true);
      } else if (!data) {
        setNotFound(true);
      } else {
        setArticle(data);
      }
    } catch (error) {
      console.error('Error:', error);
      setNotFound(true);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Lädt...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-4">Artikel nicht gefunden</h1>
          <p className="text-gray-600 mb-8">Der gesuchte Artikel existiert nicht oder wurde gelöscht.</p>
          <Link 
            href={`/${CATEGORY}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition rounded"
          >
            <ArrowLeft size={20} />
            Zurück zu News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href={`/${CATEGORY}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft size={20} />
            <span>Zurück zu News</span>
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Featured Image */}
        {article.featured_image && (
          <div className="aspect-video w-full overflow-hidden rounded-lg mb-8 bg-gray-200">
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Header */}
        <header className="mb-8">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-gray-900 text-white text-sm rounded-full">
              News
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <time dateTime={article.created_at}>
                {formatDate(article.created_at)}
              </time>
            </div>
            {article.author && (
              <div className="flex items-center gap-2">
                <UserIcon size={18} />
                <span>{article.author}</span>
              </div>
            )}
          </div>
        </header>

        {/* Excerpt/Lead */}
        {article.excerpt && (
          <div className="text-xl text-gray-700 font-light leading-relaxed mb-8 pb-8 border-b border-gray-200">
            {article.excerpt}
          </div>
        )}

        {/* Article Content (HTML) */}
        <div 
          className="prose prose-lg max-w-none
            prose-headings:font-light prose-headings:text-gray-900
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-gray-900 prose-a:underline hover:prose-a:text-gray-600
            prose-strong:text-gray-900 prose-strong:font-medium
            prose-img:rounded-lg prose-img:shadow-sm"
          dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }}
        />

        {/* Back to Overview Button */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link 
            href={`/${CATEGORY}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition rounded"
          >
            <ArrowLeft size={20} />
            Zurück zur Übersicht
          </Link>
        </div>

      </article>
    </div>
  );
}