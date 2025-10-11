"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Search, ChevronDown } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Header({ currentView, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contentMenuOpen, setContentMenuOpen] = useState(false);
  const [availableCategories, setAvailableCategories] = useState([]);
  const { cartItemCount } = useCart();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    checkAvailableCategories();
  }, []);

  const checkAvailableCategories = async () => {
    const { data, error } = await supabase
      .from('content')
      .select('category')
      .eq('status', 'published');

    if (!error && data) {
      // Get unique categories
      const categories = [...new Set(data.map(item => item.category))];
      setAvailableCategories(categories);
    }
  };

  const categoryConfig = {
    news: { label: '📰 News', href: '/news' },
    story: { label: '📖 Stories', href: '/story' },
    press: { label: '📢 Press', href: '/press' },
    private: { label: '🔒 Private', href: '/private' }
  };

  // Only show content menu if there are published articles
  const hasContent = availableCategories.length > 0;

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
            
            {/* Content Dropdown - Only show if content exists */}
            {hasContent && (
              <div 
                className="relative"
                onMouseEnter={() => setContentMenuOpen(true)}
                onMouseLeave={() => setContentMenuOpen(false)}
              >
                <button 
                  className="text-gray-700 hover:text-gray-900 transition cursor-pointer flex items-center gap-1"
                >
                  Content
                  <ChevronDown size={16} />
                </button>
                
                {contentMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    {Object.keys(categoryConfig).map((category) => (
                      availableCategories.includes(category) && (
                        <Link 
                          key={category}
                          href={categoryConfig[category].href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          {categoryConfig[category].label}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
            )}
            
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
            
            {/* Mobile Content Links - Only show if content exists */}
            {hasContent && (
              <div className="border-t border-gray-200 pt-3 mt-3">
                <p className="text-xs text-gray-500 uppercase mb-2 px-2">Content</p>
                {Object.keys(categoryConfig).map((category) => (
                  availableCategories.includes(category) && (
                    <Link 
                      key={category}
                      href={categoryConfig[category].href}
                      className="block py-2 text-gray-700 hover:text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {categoryConfig[category].label}
                    </Link>
                  )
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
            
            {/* Content Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setContentMenuOpen(true)}
              onMouseLeave={() => setContentMenuOpen(false)}
            >
              <button 
                className="text-gray-700 hover:text-gray-900 transition cursor-pointer flex items-center gap-1"
              >
                Content
                <ChevronDown size={16} />
              </button>
              
              {contentMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <Link 
                    href="/news"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    📰 News
                  </Link>
                  <Link 
                    href="/story"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    📖 Stories
                  </Link>
                  <Link 
                    href="/press"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    📢 Press
                  </Link>
                  <Link 
                    href="/private"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    🔒 Private
                  </Link>
                </div>
              )}
            </div>
            
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
            
            {/* Mobile Content Links */}
            <div className="border-t border-gray-200 pt-3 mt-3">
              <p className="text-xs text-gray-500 uppercase mb-2 px-2">Content</p>
              <Link 
                href="/news"
                className="block py-2 text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                📰 News
              </Link>
              <Link 
                href="/story"
                className="block py-2 text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                📖 Stories
              </Link>
              <Link 
                href="/press"
                className="block py-2 text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                📢 Press
              </Link>
              <Link 
                href="/private"
                className="block py-2 text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                🔒 Private
              </Link>
            </div>
            
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