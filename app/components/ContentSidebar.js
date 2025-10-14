'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CATEGORIES = {
  news: { titleKey: 'news', emoji: '📰' },
  story: { titleKey: 'stories', emoji: '🎬' },
  press: { titleKey: 'press', emoji: '📢' },
  private: { titleKey: 'private', emoji: '🔒' },
  archive: { titleKey: 'archive', emoji: '📦' }
};

export default function ContentSidebar({ currentCategory = null, onSearch = null }) {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    fetchAvailableCategories();
  }, []);

  const fetchAvailableCategories = async () => {
    const categories = ['news', 'story', 'press', 'private', 'archive'];
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

  const handleSearch = (e) => {
    e.preventDefault();
    const value = searchQuery.trim();
    
    // Wenn onSearch Prop übergeben wurde (z.B. auf News-Seite)
    if (onSearch) {
      onSearch(value);
      return;
    }
    
    // Ansonsten URL-basierte Suche
    if (value) {
      router.push(`${pathname}?search=${encodeURIComponent(value)}`);
    } else {
      router.push(pathname);
    }
  };

  const categoryLabels = {
    news: t.content?.news?.title || 'News',
    story: 'Making-of',
    press: t.content?.press?.title || 'Presse',
    private: t.content?.private?.title || 'Privat',
    archive: t.content?.archive?.title || 'Archiv'
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

        {/* Categories */}
        <div className="elegant-categories-box">
          <h3 className="elegant-categories-title">Kategorien</h3>
          <nav className="space-y-2">
            {availableCategories.map(cat => (
              <Link
                key={cat}
                href={`/${cat}`}
                className={`elegant-category-link ${currentCategory === cat ? 'active' : ''}`}
              >
                <span className="elegant-category-emoji">{CATEGORIES[cat].emoji}</span>
                <span>{categoryLabels[cat]}</span>
              </Link>
            ))}
            
            {/* Vita Link */}
            <Link
              href="/vita"
              className="elegant-category-link"
              style={{ marginTop: '1rem' }}
            >
              <span className="elegant-category-emoji">👤</span>
              <span>Künstler Vita</span>
            </Link>
          </nav>
        </div>

      </div>
    </aside>
  );
}