'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import ContentSidebar from '@/app/components/ContentSidebar';
import { useLanguage } from '@/app/context/LanguageContext';
import { Calendar, ArrowRight, Lock, Eye, EyeOff } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ⚠️ WICHTIG: Ändere dieses Passwort!
const PRIVATE_PASSWORD = 'gallery2025';

const CATEGORY = 'private';

export default function PrivatePage() {
  const { language } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Beim Laden prüfen, ob bereits authentifiziert (Session)
  useEffect(() => {
    const auth = sessionStorage.getItem('private_access');
    if (auth === 'granted') {
      setIsAuthenticated(true);
      fetchArticles();
    } else {
      setLoading(false);
    }
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (passwordInput === PRIVATE_PASSWORD) {
      // Passwort korrekt
      sessionStorage.setItem('private_access', 'granted');
      setIsAuthenticated(true);
      setError('');
      fetchArticles();
    } else {
      // Passwort falsch
      setError(language === 'de' ? 'Falsches Passwort' : 'Wrong password');
      setPasswordInput('');
    }
  };

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

  // NICHT AUTHENTIFIZIERT - Zeige Passwort-Eingabe (OHNE Hero)
  if (!isAuthenticated && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
        <div className="max-w-md w-full px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-amber-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              {language === 'de' ? 'Geschützter Bereich' : 'Protected Area'}
            </h2>
            
            <p className="text-gray-600 mb-8 text-center">
              {language === 'de' 
                ? 'Bitte geben Sie das Zugangswort ein'
                : 'Please enter the access password'}
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder={language === 'de' ? 'Passwort eingeben...' : 'Enter password...'}
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-gray-900 font-medium ${
                    error ? 'border-red-500' : 'border-gray-300'
                  }`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                  <span>❌</span>
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium"
              >
                {language === 'de' ? 'Zugang freischalten' : 'Unlock Access'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                {language === 'de' 
                  ? 'Kein Passwort? Kontaktieren Sie uns für VIP-Zugang.'
                  : 'No password? Contact us for VIP access.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTIFIZIERT - Zeige Inhalte (OHNE Hero Header)
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">{language === 'de' ? 'Lädt...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content - OHNE Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* VIP Badge oben */}
        <div className="mb-8 text-center">
          <div className="inline-block bg-amber-100 px-6 py-3 rounded-full border border-amber-200">
            <p className="text-sm font-medium text-amber-900">
              ✨ {language === 'de' ? 'VIP-Zugang aktiv' : 'VIP Access Active'}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <ContentSidebar 
            currentCategory={CATEGORY}
            onSearch={handleSearch}
          />

          {/* Articles Grid */}
          <div className="lg:col-span-3">
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
      </div>
    </div>
  );
}