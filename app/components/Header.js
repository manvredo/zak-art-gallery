"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Header({ currentView, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [availableCategories, setAvailableCategories] = useState([]);
  const { cartItemCount } = useCart();
  const { language, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();

  // Prüfe welche Kategorien Published-Artikel haben
  useEffect(() => {
    const fetchAvailableCategories = async () => {
      const categories = ['news', 'story', 'press', 'private'];
      const available = [];

      for (const category of categories) {
        const { data, error } = await supabase
          .from('content')
          .select('id')
          .eq('category', category)
          .eq('status', 'published')
          .limit(1);

        if (!error && data && data.length > 0) {
          available.push(category);
        }
      }

      setAvailableCategories(available);
    };

    fetchAvailableCategories();
  }, []);

  // Prüfe ob wir auf einer Kategorie-Seite sind
  const isOnCategoryPage = pathname?.startsWith('/news') || 
                           pathname?.startsWith('/story') || 
                           pathname?.startsWith('/press') || 
                           pathname?.startsWith('/private');

  const categoryLabels = {
    news: 'News',
    story: 'Stories',
    press: 'Press',
    private: 'Private'
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-4 cursor-pointer" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <img 
              src="/logo.png" 
              alt="ZAK Art Gallery" 
              className="h-10 cursor-pointer"
              onClick={() => onNavigate('welcome')}
            />
          </div>
          
          <nav className="hidden lg:flex space-x-8">
            <button 
              onClick={() => onNavigate('welcome')}
              className={`transition cursor-pointer ${
                currentView === 'welcome' ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {t.nav.welcome}
            </button>
            <button 
              onClick={() => onNavigate('gallery')}
              className={`transition cursor-pointer ${
                currentView === 'gallery' ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {t.nav.gallery}
            </button>
            <button 
              onClick={() => onNavigate('shop')}
              className={`transition cursor-pointer ${
                currentView === 'shop' ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {t.nav.shop}
            </button>
            
            {/* Dynamische Kategorie-Links */}
            {availableCategories.map(category => (
              <Link 
                key={category}
                href={`/${category}`}
                className="text-gray-700 hover:text-gray-900 transition cursor-pointer"
              >
                {categoryLabels[category]}
              </Link>
            ))}
            
            <button 
              onClick={() => onNavigate('contact')}
              className={`transition cursor-pointer ${
                currentView === 'contact' ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {t.nav.contact}
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleLanguage} 
              className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer font-medium"
            >
              {language === 'en' ? '🇩🇪 DE' : '🇬🇧 EN'}
            </button>
            <button className="text-gray-700 hover:text-gray-900 cursor-pointer">
              <Search size={20} />
            </button>
            <button 
              onClick={() => onNavigate('cart')}
              className="relative text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <button 
              onClick={() => {onNavigate('welcome'); setMobileMenuOpen(false);}} 
              className="block w-full text-left text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              {t.nav.welcome}
            </button>
            <button 
              onClick={() => {onNavigate('gallery'); setMobileMenuOpen(false);}} 
              className="block w-full text-left text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              {t.nav.gallery}
            </button>
            <button 
              onClick={() => {onNavigate('shop'); setMobileMenuOpen(false);}} 
              className="block w-full text-left text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              {t.nav.shop}
            </button>
            
            {/* Mobile Kategorie-Links */}
            {availableCategories.length > 0 && (
              <div className="border-t border-gray-200 pt-3 mt-3">
                {availableCategories.map(category => (
                  <Link 
                    key={category}
                    href={`/${category}`}
                    className="block py-2 text-gray-700 hover:text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {categoryLabels[category]}
                  </Link>
                ))}
              </div>
            )}
            
            <button 
              onClick={() => {onNavigate('contact'); setMobileMenuOpen(false);}} 
              className="block w-full text-left text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              {t.nav.contact}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}