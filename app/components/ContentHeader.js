"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ContentHeader({ currentCategory }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [user, setUser] = useState(null);
  const { cartItemCount } = useCart();
  const { language, toggleLanguage, t } = useLanguage();

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

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const categoryLabels = {
    news: t.content.news.title,
    story: t.content.stories.title,
    press: t.content.press.title,
    private: t.content.private.title
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Main Header Row */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                className="lg:hidden mr-4 cursor-pointer" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link href="/">
                <h1 className="text-2xl font-light tracking-wider text-gray-900 cursor-pointer">
                  ZAK ART GALLERY
                </h1>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleLanguage} 
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                title={language === 'en' ? 'Deutsch' : 'English'}
              >
                <span className="text-2xl">{language === 'en' ? '🇩🇪' : '🇬🇧'}</span>
              </button>
              
              {/* User Account Button */}
              {user ? (
                <Link 
                  href="/account"
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                >
                  <User size={20} />
                  <span className="hidden sm:inline text-sm">{t.nav.account}</span>
                </Link>
              ) : (
                <Link 
                  href="/login"
                  className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer font-medium"
                >
                  {t.nav.login}
                </Link>
              )}
              
              <Link 
                href="/"
                className="relative text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation Row */}
      <div className="hidden lg:block bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-8 py-3">
            {availableCategories.map(category => (
              <Link 
                key={category}
                href={`/${category}`}
                className={`transition cursor-pointer ${
                  currentCategory === category 
                    ? 'text-gray-900 font-medium border-b-2 border-gray-900 pb-1' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {categoryLabels[category]}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            {/* Main Navigation */}
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              ← {t.auth.login.backToShop}
            </Link>

            {/* Category Links */}
            {availableCategories.length > 0 && (
              <div className="border-t border-gray-200 pt-3 mt-3">
                <p className="text-xs text-gray-500 uppercase mb-2 px-2">Content</p>
                {availableCategories.map(category => (
                  <Link 
                    key={category}
                    href={`/${category}`}
                    className={`block py-2 ${
                      currentCategory === category 
                        ? 'text-gray-900 font-medium' 
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {categoryLabels[category]}
                  </Link>
                ))}
              </div>
            )}
            
            {/* User Links */}
            <div className="border-t border-gray-200 pt-3 mt-3">
              {user ? (
                <Link
                  href="/account"
                  className="block py-2 text-gray-700 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  👤 {t.nav.account}
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block py-2 text-gray-700 hover:text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.login}
                  </Link>
                  <Link
                    href="/register"
                    className="block py-2 text-gray-700 hover:text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.register}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}