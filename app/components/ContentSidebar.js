'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

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

export default function ContentSidebar({ currentCategory = null, onSearch = null }) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    fetchAvailableCategories();
  }, []);

  const fetchAvailableCategories = async () => {
    const categories = ['news', 'story', 'press', 'private'];
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
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const categoryLabels = {
    news: t.content?.news?.title || 'News',
    story: t.content?.stories?.title || 'Stories',
    press: t.content?.press?.title || 'Press',
    private: t.content?.private?.title || 'Private'
  };

  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-8 space-y-6">
        
        {/* Search Box - FIRST & PROMINENT */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
            <Search size={24} />
            Suche
          </h3>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Artikel durchsuchen..."
              className="w-full px-4 py-3 pr-10 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-white/50 focus:outline-none transition"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Categories - Clean & Simple */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategorien</h3>
          <nav className="space-y-2">
            {availableCategories.map(cat => (
              <Link
                key={cat}
                href={`/${cat}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  currentCategory === cat
                    ? 'bg-gray-900 text-white shadow-md transform scale-105'
                    : 'text-gray-700 hover:bg-gray-50 hover:translate-x-1'
                }`}
              >
                <span className="text-2xl">{CATEGORIES[cat].emoji}</span>
                <span className="font-medium">{categoryLabels[cat]}</span>
              </Link>
            ))}
            
            {/* Vita Link */}
            <Link
              href="/vita"
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-700 hover:bg-gray-50 hover:translate-x-1 border-t border-gray-100 mt-4 pt-4"
            >
              <span className="text-2xl">👤</span>
              <span className="font-medium">Künstler Vita</span>
            </Link>
          </nav>
        </div>

      </div>
    </aside>
  );
}