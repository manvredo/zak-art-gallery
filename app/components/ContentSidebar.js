'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Newspaper, Film, Megaphone, Lock, User } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
const CATEGORIES = {
  news: { titleKey: 'news', Icon: Newspaper },
  story: { titleKey: 'stories', Icon: Film },
  press: { titleKey: 'press', Icon: Megaphone },
  private: { titleKey: 'private', Icon: Lock }
};
export default function ContentSidebar({ currentCategory = null, onSearch = null }) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
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
    news: t.content?.news?.title || 'News',
    story: 'Making-of',
    press: t.content?.press?.title || 'Presse',
    private: t.content?.private?.title || 'Privat'
  };
  return (
    <aside className="elegant-sidebar">
      <div className="space-y-6">
        
        {/* Search Box */}
        <div className="elegant-search-box">
          <h3 className="elegant-search-title">
            <Search size={18} />
            Suche
          </h3>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Artikel durchsuchen..."
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
        {/* Categories - IMMER ALLE ANZEIGEN */}
        <div className="elegant-categories-box">
          <h3 className="elegant-categories-title">Kategorien</h3>
          <nav className="space-y-2">
            {Object.keys(CATEGORIES).map(cat => {
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
            
            {/* Vita Link */}
            <Link
              href="/vita"
              className="elegant-category-link"
              style={{ marginTop: '1rem' }}
            >
              <User size={20} strokeWidth={2} />
              <span>Künstler Vita</span>
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
}