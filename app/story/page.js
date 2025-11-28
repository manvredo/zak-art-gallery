'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import ContentSidebar from '@/app/components/ContentSidebar';
import { useLanguage } from '@/app/context/LanguageContext';
import { Calendar, ArrowRight } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CATEGORY = 'story';

export default function StoryPage() {
  const { language } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
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
      setFilteredArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredArticles(articles);
      return;
    }

    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filtered);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content - OHNE Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <ContentSidebar 
            currentCategory={CATEGORY}
            onSearch={handleSearch}
          />

          {/* Articles Grid */}
          <div className="col-span-1 lg:col-span-3">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <p className="text-gray-500 text-lg">
                  {language === 'de' 
                    ? 'Keine Artikel gefunden.' 
                    : 'No articles found.'}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <Link 
                    key={article.id}
                    href={`/${CATEGORY}/${article.slug}`}
                    className="elegant-card group cursor-pointer block"
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

                      {/* Read More Link - jetzt nur noch visuell */}
                      <span className="elegant-card-link">
                        {language === 'de' ? 'Weiterlesen' : 'Read more'}
                        <ArrowRight size={18} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}