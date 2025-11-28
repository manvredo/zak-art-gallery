'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Newspaper, Film, Megaphone, Lock, User } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CATEGORIES = {
  news: { titleKey: 'news', Icon: Newspaper },
  story: { titleKey: 'stories', Icon: Film },
  press: { titleKey: 'press', Icon: Megaphone },
  private: { titleKey: 'private', Icon: Lock }
};

export default function ContentSidebar({ currentCategory = null, onSearch = null, isAdminMode = false }) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [availableCategories, setAvailableCategories] = useState(Object.keys(CATEGORIES));
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Prüfe welche Kategorien Content haben (nur im Public-Modus)
  useEffect(() => {
    if (isAdminMode) {
      // Im Admin-Modus: Zeige ALLE Kategorien
      setAvailableCategories(Object.keys(CATEGORIES));
      setIsLoadingCategories(false);
    } else {
      // Im Public-Modus: Prüfe welche Kategorien Content haben
      checkAvailableCategories();
    }
  }, [isAdminMode]);

  const checkAvailableCategories = async () => {
    try {
      const categoriesWithContent = [];
      
      // Prüfe jede Kategorie
      for (const category of Object.keys(CATEGORIES)) {
        const { data, error } = await supabase
          .from('content')
          .select('id')
          .eq('category', category)
          .limit(1);
        
        if (!error && data && data.length > 0) {
          categoriesWithContent.push(category);
        }
      }
      
      setAvailableCategories(categoriesWithContent);
    } catch (error) {
      console.error('Error checking categories:', error);
      // Bei Fehler: Zeige alle Kategorien
      setAvailableCategories(Object.keys(CATEGORIES));
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const value = searchQuery.trim();
    
    if (onSearch) {
      onSearch(value);
      return;
    }
    
    // Weiterleitung zur Suchseite
    if (value) {
      router.push(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  const categoryLabels = {
    news: language === 'de' ? 'News' : 'News',
    story: language === 'de' ? 'Work in Progress' : 'Work in Progress',
    press: language === 'de' ? 'Presse' : 'Press',
    private: language === 'de' ? 'Kundenlogin' : 'Customer Login'
  };

  return (
    <aside className="elegant-sidebar">
      <div className="space-y-6">
        
        {/* Search Box */}
        <div className="elegant-search-box">
          <h3 className="elegant-search-title">
            <Search size={18} />
            {language === 'de' ? 'Suche' : 'Search'}
          </h3>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'de' ? 'Artikel durchsuchen...' : 'Search articles...'}
              className="elegant-search-input"
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Categories - Im Admin alle anzeigen, im Public nur mit Content */}
        <div className="elegant-categories-box">
          <h3 className="elegant-categories-title">{language === 'de' ? 'Kategorien' : 'Categories'}</h3>
          <nav className="space-y-2">
            {isLoadingCategories ? (
              // Loading Skeleton
              <>
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="h-10 bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </>
            ) : (
              <>
                {availableCategories.map(cat => {
                  const CategoryIcon = CATEGORIES[cat].Icon;
                  return (
                    <Link
                      key={cat}
                      href={`/${cat}`}
                      className={`elegant-category-link ${currentCategory === cat ? 'active' : ''}`}
                    >
                      <CategoryIcon size={20} strokeWidth={2} />
                      <span>{categoryLabels[cat]}</span>
                    </Link>
                  );
                })}
              </>
            )}
            
            {/* Vita Link - immer anzeigen */}
            <Link
              href="/vita"
              className="elegant-category-link"
              style={{ marginTop: '1rem' }}
            >
              <User size={20} strokeWidth={2} />
              <span>{language === 'de' ? 'Künstler Vita' : 'Artist Bio'}</span>
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
}